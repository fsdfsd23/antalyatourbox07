import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SeatGrid, { SeatLegend } from "./SeatGrid";
import type { BusTrip, Gender } from "@/lib/bus";
import { useState } from "react";

export default function SeatSelectModal({
  open,
  onOpenChange,
  trip,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  trip: BusTrip | null;
  onConfirm: (sel: Array<{ no: number; gender: Gender }>) => void;
}) {
  const [selected, setSelected] = useState<Record<number, Gender>>({});
  const [gender, setGender] = useState<Gender>("M");
  if (!trip) return null;

  const toggle = (no: number) => {
    setSelected((p) => {
      const next = { ...p } as Record<number, Gender>;
      if (next[no]) delete next[no];
      else next[no] = gender;
      return next;
    });
  };

  const total = Object.keys(selected).length * trip.price;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Koltuk Seçimi • {trip.company}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 items-start">
          <div className="space-y-3">
            <SeatLegend />
            <SeatGrid
              seats={trip.seats}
              selected={selected}
              onToggle={toggle}
            />
            <div className="text-xs text-slate-600">
              Otobüs Tipi: {trip.busType}
            </div>
          </div>
          <div className="space-y-3">
            <div className="border rounded p-3 text-sm">
              <div>
                Sefer:{" "}
                <strong>
                  {trip.from} → {trip.to}
                </strong>
              </div>
              <div>
                Tarih/Saat:{" "}
                <strong>
                  {trip.date} {trip.depart}
                </strong>
              </div>
              <div>
                Fiyat: <strong>₺ {trip.price.toLocaleString("tr-TR")}</strong>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Cinsiyet</div>
              <div className="flex gap-2">
                <label
                  className={`px-3 py-1 rounded border cursor-pointer ${gender === "M" ? "ring-2 ring-primary" : ""}`}
                >
                  <input
                    type="radio"
                    name="g"
                    className="hidden"
                    checked={gender === "M"}
                    onChange={() => setGender("M")}
                  />{" "}
                  Erkek
                </label>
                <label
                  className={`px-3 py-1 rounded border cursor-pointer ${gender === "F" ? "ring-2 ring-primary" : ""}`}
                >
                  <input
                    type="radio"
                    name="g"
                    className="hidden"
                    checked={gender === "F"}
                    onChange={() => setGender("F")}
                  />{" "}
                  Kadın
                </label>
              </div>
            </div>
            <div className="text-sm">
              Seçilen Koltuklar:{" "}
              {Object.entries(selected)
                .map(([n, g]) => `${n}-${g}`)
                .join(", ") || "—"}
            </div>
            <div className="font-bold text-lg">
              Toplam: ₺ {total.toLocaleString("tr-TR")}
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() =>
                  onConfirm(
                    Object.entries(selected).map(([n, g]) => ({
                      no: parseInt(n),
                      gender: g as Gender,
                    })),
                  )
                }
                disabled={!Object.keys(selected).length}
              >
                Seç • Onayla
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
