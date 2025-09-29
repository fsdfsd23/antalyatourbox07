import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MapSidebar from "@/components/transfer/MapSidebar";
import VehicleList from "@/components/transfer/VehicleList";
import BookingModal from "@/components/transfer/BookingModal";
import { computeRoute } from "@/lib/geo";
import { Button } from "@/components/ui/button";

export default function TransferResults() {
  const [params] = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const date = params.get("date") || new Date().toISOString().slice(0, 10);
  const time = params.get("time") || "12:00";
  const roundTrip = params.get("rt") === "1";

  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [durationText, setDurationText] = useState<string | null>(null);
  const [fromCoord, setFromCoord] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [toCoord, setToCoord] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    computeRoute(from, to)
      .then((r) => {
        if (!mounted) return;
        if (!r) {
          setError("Rota bulunamadı. Lütfen adresleri kontrol edin.");
          return;
        }
        setFromCoord(r.from);
        setToCoord(r.to);
        setDistanceKm(r.distanceKm);
        setDurationText(r.duration.text);
      })
      .catch(() => setError("Rota hesaplanırken bir hata oluştu."))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [from, to]);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<{
    vehicle: any;
    price: number;
  } | null>(null);

  const canRender = distanceKm != null;

  return (
    <div className="container max-w-7xl container-px py-6">
      <div className="mb-4">
        <h1 className="text-xl font-semibold">Transfer Araçları</h1>
        <div className="text-sm text-slate-600">
          {from} → {to}
        </div>
      </div>

      {loading && (
        <div className="rounded-md border p-4 bg-white">Yükleniyor...</div>
      )}
      {error && (
        <div className="rounded-md border p-4 bg-white text-red-600">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
          <MapSidebar
            fromLabel={from}
            toLabel={to}
            from={fromCoord}
            to={toCoord}
            distanceKm={distanceKm}
            durationText={durationText}
          />
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-slate-600">
                {canRender
                  ? `${distanceKm!.toFixed(1)} km • ${durationText}`
                  : ""}
              </div>
              <Button variant="outline" onClick={() => window.history.back()}>
                Yeni Arama
              </Button>
            </div>
            {canRender && (
              <VehicleList
                distanceKm={distanceKm!}
                roundTrip={roundTrip}
                onSelect={(vehicle, price) => {
                  setSelected({ vehicle, price });
                  setOpen(true);
                }}
              />
            )}
          </div>
        </div>
      )}

      <BookingModal
        open={open}
        onOpenChange={setOpen}
        vehicle={selected?.vehicle || null}
        basePrice={selected?.price || 0}
        init={{ from, to, date, time, roundTrip, distanceKm: distanceKm || 0 }}
      />
    </div>
  );
}
