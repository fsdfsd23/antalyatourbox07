import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateTrips } from "@/lib/bus";
import BusCard from "@/components/bus/BusCard";
import SeatSelectModal from "@/components/bus/SeatSelectModal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BusResults() {
  const q = useQuery();
  const navigate = useNavigate();
  const from = q.get("from") || "İstanbul";
  const to = q.get("to") || "İzmir";
  const date = q.get("date") || new Date().toISOString().slice(0, 10);

  const trips = useMemo(() => generateTrips(from, to, date), [from, to, date]);
  const [open, setOpen] = useState(false);
  const [tripIdx, setTripIdx] = useState<number | null>(null);

  const onInspect = (i: number) => {
    setTripIdx(i);
    setOpen(true);
  };

  const onSelect = (i: number) => {
    setTripIdx(i);
    setOpen(true);
  };

  return (
    <div className="container max-w-6xl container-px py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold">Otobüs Seferleri</h1>
        <div className="text-sm text-slate-600">{from} → {to} • {date}</div>
      </div>
      <div className="mt-4 grid gap-3">
        {trips.map((t, i) => (
          <BusCard key={t.id} trip={t} onInspect={() => onInspect(i)} onSelect={() => onSelect(i)} />
        ))}
      </div>

      <SeatSelectModal
        open={open}
        onOpenChange={(v) => setOpen(v)}
        trip={tripIdx !== null ? trips[tripIdx] : null}
        onConfirm={(sel) => {
          setOpen(false);
          const trip = tripIdx !== null ? trips[tripIdx] : null;
          if (!trip) return;
          const seats = sel.map((s) => `${s.no}-${s.gender}`).join(",");
          navigate(`/otobus/checkout?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&trip=${trip.id}&seats=${seats}`);
        }}
      />
    </div>
  );
}
