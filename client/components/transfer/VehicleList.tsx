import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export interface Vehicle {
  id: string;
  title: string;
  image: string;
  capacity: { adult: number; baggage: number };
  features: string[];
  basePrice: number; // TL base
  perKm: number; // TL per km
}

export const vehiclesCatalog: Vehicle[] = [
  {
    id: "vito",
    title: "Mercedes Vito (VIP 1-6 kişi)",
    image:
      "https://images.unsplash.com/photo-1606663889134-d95d7fdb1627?q=80&w=1400&auto=format&fit=crop",
    capacity: { adult: 6, baggage: 6 },
    features: ["Wi-Fi", "İçecekler", "Klima", "Profesyonel Sürücü"],
    basePrice: 450,
    perKm: 9,
  },
  {
    id: "vipvito",
    title: "Mercedes VIP Vito (1-8 kişi)",
    image:
      "https://images.unsplash.com/photo-1605559424843-d7b9242e3d43?q=80&w=1400&auto=format&fit=crop",
    capacity: { adult: 8, baggage: 8 },
    features: ["Wi-Fi", "Bebek Koltuğu (İsteğe bağlı)", "Geniş Bagaj"],
    basePrice: 550,
    perKm: 10,
  },
  {
    id: "sprinter",
    title: "Mercedes Sprinter (1-16 kişi)",
    image:
      "https://images.unsplash.com/photo-1593941707808-4f8f79a8f64a?q=80&w=1400&auto=format&fit=crop",
    capacity: { adult: 16, baggage: 16 },
    features: ["Klima", "Geniş İç Hacim", "Ekstra Güvenlik"],
    basePrice: 900,
    perKm: 13,
  },
];

export function computeVehiclePrice(
  v: Vehicle,
  distanceKm: number,
  roundTrip: boolean,
) {
  const oneWay = v.basePrice + v.perKm * Math.max(0, distanceKm);
  return roundTrip ? Math.round(oneWay * 2 * 0.95) : Math.round(oneWay); // %5 gidiş-dönüş indirimi
}

interface Props {
  distanceKm: number;
  roundTrip: boolean;
  onSelect: (vehicle: Vehicle, price: number) => void;
}

export default function VehicleList({
  distanceKm,
  roundTrip,
  onSelect,
}: Props) {
  const items = useMemo(() => vehiclesCatalog, []);
  return (
    <div className="space-y-4">
      {items.map((v) => {
        const price = computeVehiclePrice(v, distanceKm, roundTrip);
        return (
          <div
            key={v.id}
            className="grid grid-cols-1 md:grid-cols-[220px_1fr_220px] gap-4 p-3 border rounded-md bg-white"
          >
            <div className="aspect-video md:aspect-square overflow-hidden rounded-md border bg-slate-50">
              <img
                src={v.image}
                alt={v.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="space-y-2">
              <div className="font-semibold text-base md:text-lg">
                {v.title}
              </div>
              <div className="text-sm text-slate-600">
                Kapasite: {v.capacity.adult} kişi • {v.capacity.baggage} bagaj
              </div>
              <ul className="flex flex-wrap gap-2 text-xs text-slate-600">
                {v.features.map((f) => (
                  <li key={f} className="px-2 py-1 rounded bg-slate-100">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex md:flex-col justify-between md:justify-center items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-slate-500">Toplam</div>
                <div className="text-xl font-bold text-primary">
                  {price.toLocaleString("tr-TR")} TL
                </div>
                <div className="text-[11px] text-slate-500">
                  {roundTrip ? "Gidiş + Dönüş" : "Tek Yön"}
                </div>
              </div>
              <Button
                className="btn btn-primary h-10 w-full md:w-auto"
                onClick={() => onSelect(v, price)}
              >
                Araç Seç
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
