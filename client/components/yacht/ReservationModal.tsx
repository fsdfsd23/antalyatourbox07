import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ReservationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [type, setType] = useState("pre-book");
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rezervasyon Tipi</DialogTitle>
        </DialogHeader>
        <RadioGroup value={type} onValueChange={setType} className="space-y-3">
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
          <Button onClick={() => onOpenChange(false)}>Devam Et</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
