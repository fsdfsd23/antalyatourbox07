import type { BusTrip } from "@/lib/bus";
import { Button } from "@/components/ui/button";
import SeatGrid, { SeatLegend } from "./SeatGrid";

export default function BusCard({
  trip,
  onInspect,
  onSelect,
}: {
  trip: BusTrip;
  onInspect: () => void;
  onSelect: () => void;
}) {
  return (
    <div className="rounded-lg border p-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-slate-200" />
            <div className="font-semibold">{trip.company}</div>
          </div>
          <div className="text-right min-w-[120px]">
            <div className="text-xs text-slate-500">Fiyat</div>
            <div className="text-xl font-bold">
              ₺ {trip.price.toLocaleString("tr-TR")}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-slate-600">
          <div>
            <div className="text-xs">Kalkış</div>
            <div className="font-medium">{trip.depart}</div>
          </div>
          <div>
            <div className="text-xs">Varış</div>
            <div className="font-medium">{trip.arrive}</div>
          </div>
          <div>
            <div className="text-xs">Süre</div>
            <div className="font-medium">
              {Math.floor(trip.durationMin / 60)} sa {trip.durationMin % 60} dk
            </div>
          </div>
          <div>
            <div className="text-xs">Tip</div>
            <div className="font-medium">{trip.busType}</div>
          </div>
        </div>
        <div className="bg-slate-50 rounded p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">Koltuk Düzeni</div>
            <SeatLegend />
          </div>
          <SeatGrid
            seats={trip.seats.slice(0, 18)}
            selected={{}}
            onToggle={() => {}}
          />
          <div className="mt-2 text-right">
            <Button variant="outline" size="sm" onClick={onInspect}>
              İncele
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end gap-3">
        <div className="text-sm text-slate-600">
          {trip.from} → {trip.to}
        </div>
        <Button onClick={onSelect}>Koltuk Seç</Button>
      </div>
    </div>
  );
}
