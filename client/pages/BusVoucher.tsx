import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { generateTrips, parseSelected } from "@/lib/bus";
import { CITY_COORDS } from "@/lib/bus";
import { Card } from "@/components/ui/card";
import BusRouteMap from "@/components/bus/BusRouteMap";
import { haversineKm } from "@/lib/geo";
import { CheckCircle } from "lucide-react";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BusVoucher() {
  const q = useQuery();
  const from = q.get("from") || "İstanbul";
  const to = q.get("to") || "İzmir";
  const date = q.get("date") || new Date().toISOString().slice(0, 10);
  const tripId = q.get("trip");
  const seatsParam = q.get("seats");
  const code =
    q.get("code") ||
    Math.random()
      .toString(36)
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8);
  const name = q.get("name") || "";
  const email = q.get("email") || "";
  const phone = q.get("phone") || "";

  const trips = useMemo(() => generateTrips(from, to, date), [from, to, date]);
  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const selected = parseSelected(seatsParam);
  const distanceKm = (() => {
    const a = CITY_COORDS[from] || CITY_COORDS["İstanbul"];
    const b = CITY_COORDS[to] || CITY_COORDS["İzmir"];
    return haversineKm(a, b);
  })();

  return (
    <div className="container max-w-5xl container-px py-6 space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg">
          <CheckCircle className="w-7 h-7" />
          <div className="text-3xl font-extrabold tracking-widest">{code}</div>
        </div>
        <div className="mt-2 text-slate-600">Rezervasyon Kodunuz</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-3">
          <img
            src="/placeholder.svg"
            alt="Otobüs"
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="text-2xl font-bold">{trip.company}</div>
          <div className="text-lg">Otobüs Tipi: {trip.busType}</div>
          <div className="text-lg">
            Koltuklar: {selected.map((s) => `${s.no}-${s.gender}`).join(", ")}
          </div>
        </div>
        <div className="text-lg space-y-2">
          <Card className="p-4 space-y-1">
            <div className="font-semibold">Yolcu Bilgileri</div>
            <div>
              Ad Soyad: <strong>{name}</strong>
            </div>
            <div>
              E-posta: <strong>{email}</strong>
            </div>
            <div>
              Telefon: <strong>{phone}</strong>
            </div>
          </Card>
          <Card className="p-4 space-y-1">
            <div className="font-semibold">Sefer Bilgileri</div>
            <div>
              {from} → {to}
            </div>
            <div>
              {date} {trip.depart} • Varış {trip.arrive}
            </div>
            <div>
              Mesafe: <strong>{distanceKm.toFixed(1)} km</strong>
            </div>
          </Card>
        </div>
      </div>

      <BusRouteMap
        from={CITY_COORDS[from] || CITY_COORDS["İstanbul"]}
        to={CITY_COORDS[to] || CITY_COORDS["İzmir"]}
      />
    </div>
  );
}
