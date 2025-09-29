import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PrebookFormModal from "./PrebookFormModal";
import OnlinePayFormModal from "./OnlinePayFormModal";
import CardPaymentModal from "./CardPaymentModal";
import VoucherModal from "./VoucherModal";

export default function ReservationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [type, setType] = useState("pre-book");
  const [preFormOpen, setPreFormOpen] = useState(false);
  const [onlineFormOpen, setOnlineFormOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [voucherOpen, setVoucherOpen] = useState(false);
  const [guest, setGuest] = useState<null | {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    time?: string;
  }>(null);

  const startFlow = () => {
    onOpenChange(false);
    if (type === "pre-book") setPreFormOpen(true);
    else setOnlineFormOpen(true);
  };

  const handlePrebookContinue = (g: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    time?: string;
  }) => {
    setGuest(g);
    setPreFormOpen(false);
    setVoucherOpen(true);
  };

  const handleOnlineContinue = (g: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
    time?: string;
  }) => {
    setGuest(g);
    setOnlineFormOpen(false);
    setCardOpen(true);
  };

  const handlePaid = () => {
    setCardOpen(false);
    setVoucherOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rezervasyon Tipi</DialogTitle>
          </DialogHeader>
          <RadioGroup
            value={type}
            onValueChange={setType}
            className="space-y-3"
          >
            <label className="flex items-center gap-2 border rounded-md p-3">
              <RadioGroupItem value="pre-book" />
              <div>
                <div className="font-medium">Ön Rezervasyon Yap</div>
                <div className="text-xs text-slate-600">
                  Talebiniz onaylandığında ödeme yapılır.
                </div>
              </div>
            </label>
            <label className="flex items-center gap-2 border rounded-md p-3">
              <RadioGroupItem value="online-pay" />
              <div>
                <div className="font-medium">Online Ön Ödeme</div>
                <div className="text-xs text-slate-600">
                  Kredi kartı ile güvenli ödeme.
                </div>
              </div>
            </label>
          </RadioGroup>
          <div className="flex justify-end">
            <Button onClick={startFlow}>Devam Et</Button>
          </div>
        </DialogContent>
      </Dialog>

      <PrebookFormModal
        open={preFormOpen}
        onOpenChange={setPreFormOpen}
        onContinue={handlePrebookContinue}
      />
      <OnlinePayFormModal
        open={onlineFormOpen}
        onOpenChange={setOnlineFormOpen}
        onContinue={handleOnlineContinue}
      />
      <CardPaymentModal
        open={cardOpen}
        onOpenChange={setCardOpen}
        onPaid={() => handlePaid()}
        guest={guest}
      />
      <VoucherModal open={voucherOpen} onOpenChange={setVoucherOpen} />
    </>
  );
}
