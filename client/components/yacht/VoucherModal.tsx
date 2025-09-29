import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import ReservationSummary from "./ReservationSummary";
import { useYachtRental } from "@/context/YachtRentalContext";

function genCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function VoucherModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void; }) {
  const { yacht } = useYachtRental();
  const code = genCode();
  if (!yacht) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="sr-only">Rezervasyon Özeti</DialogTitle>
        </DialogHeader>
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg">
            <CheckCircle className="w-7 h-7" />
            <div className="text-3xl font-extrabold tracking-widest">{code}</div>
          </div>
          <div className="mt-2 text-slate-600">Rezervasyon Kodunuz</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-3">
            <img src={yacht.images[0]} alt={yacht.name} className="w-full h-40 object-cover rounded-lg" />
            <div className="text-2xl font-bold">{yacht.name}</div>
            <div className="text-lg">{yacht.supplier || "Tedarikçi"}</div>
            <div className="text-lg">Yolcu Kapasitesi: {yacht.capacity}</div>
          </div>
          <div className="text-lg">
            <ReservationSummary />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
