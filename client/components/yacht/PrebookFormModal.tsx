import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReservationSummary from "./ReservationSummary";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export interface PrebookFormModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onContinue: (data: { fullName: string; email: string; phone: string; notes?: string; time?: string; pier?: string; }) => void;
}

export default function PrebookFormModal({ open, onOpenChange, onContinue }: PrebookFormModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [time, setTime] = useState("");

  const valid = fullName.trim() && /.+@.+\..+/.test(email) && phone.trim();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Rezervasyon Formu</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px] gap-6">
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <Input placeholder="Ad Soyad" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <Input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="GSM" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="time" placeholder="Saat" value={time} onChange={(e) => setTime(e.target.value)} />
              </div>
              <Textarea placeholder="Özel istekler" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button disabled={!valid} onClick={() => onContinue({ fullName, email, phone, notes, time })}>Rezervasyona Devam Et</Button>
            </div>
          </div>
          <ReservationSummary fullName={fullName} email={email} phone={phone} time={time} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
