import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReservationSummary from "./ReservationSummary";
import { useState } from "react";
import { motion } from "framer-motion";

export interface CardPaymentModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onPaid: (holder: string) => void;
  guest: {
    fullName: string;
    email: string;
    phone: string;
    time?: string;
  } | null;
}

export default function CardPaymentModal({
  open,
  onOpenChange,
  onPaid,
  guest,
}: CardPaymentModalProps) {
  const [holder, setHolder] = useState(guest?.fullName || "");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focusBack, setFocusBack] = useState(false);

  const valid =
    holder.trim() &&
    number.replace(/\s+/g, "").length >= 12 &&
    /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry) &&
    cvc.length >= 3;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Kredi Kartı ile Ödeme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-4">
            <div className="h-40" style={{ perspective: 1000 }}>
              <motion.div
                className="relative w-full h-full rounded-xl text-white"
                animate={{ rotateY: focusBack ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(135deg,#ef4444,#dc2626)",
                }}
              >
                <div
                  className="absolute inset-0 p-4"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-lg font-bold">VISA</div>
                  <div className="mt-6 text-xl tracking-widest">
                    {number || "•••• •••• •••• ••••"}
                  </div>
                  <div className="mt-6 flex justify-between text-sm">
                    <div>
                      <div>Kart Sahibi</div>
                      <div className="font-semibold">
                        {holder || "AD SOYAD"}
                      </div>
                    </div>
                    <div>
                      <div>Son Kullanma</div>
                      <div className="font-semibold">{expiry || "MM/YY"}</div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 p-4"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-full h-8 bg-black/70 mt-6" />
                  <div className="mt-6 text-right">
                    <div className="inline-block bg-white px-2 py-1 text-black rounded">
                      {cvc || "•••"}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                placeholder="Kart Sahibi"
                value={holder}
                onChange={(e) => setHolder(e.target.value)}
              />
              <Input
                placeholder="Kart Numarası"
                value={number}
                onChange={(e) =>
                  setNumber(e.target.value.replace(/[^\d\s]/g, ""))
                }
              />
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <Input
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={() => setFocusBack(true)}
                onBlur={() => setFocusBack(false)}
              />
            </div>
            <div className="flex justify-end">
              <Button disabled={!valid} onClick={() => onPaid(holder)}>
                Ödemeyi Tamamla
              </Button>
            </div>
          </div>
          <ReservationSummary
            fullName={guest?.fullName}
            email={guest?.email}
            phone={guest?.phone}
            time={guest?.time}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
