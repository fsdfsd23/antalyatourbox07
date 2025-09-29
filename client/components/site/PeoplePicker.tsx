import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Minus, Plus, Users } from "lucide-react";

export interface PeopleCounts {
  adults: number;
  children: number;
  infants: number;
}

interface Props {
  value: PeopleCounts;
  onChange: (v: PeopleCounts) => void;
}

export default function PeoplePicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const total = value.adults + value.children + value.infants;

  const summary = () => {
    const parts: string[] = [];
    if (value.adults > 0) parts.push(`Yetişkin ${value.adults}`);
    if (value.children > 0) parts.push(`Çocuk ${value.children}`);
    if (value.infants > 0) parts.push(`Bebek ${value.infants}`);
    return parts.join(", ") || "Kişi sayısı seçin";
  };

  const inc = (k: keyof PeopleCounts) => {
    const next = { ...value, [k]: value[k] + 1 } as PeopleCounts;
    onChange(next);
  };
  const dec = (k: keyof PeopleCounts) => {
    const nextVal = Math.max(0, value[k] - 1);
    const next = { ...value, [k]: nextVal } as PeopleCounts;
    onChange(next);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start h-10">
          <Users className="h-4 w-4 mr-2" />
          <span className="truncate">
            {total > 0 ? summary() : "Kişi sayısı seçin"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80">
        <div className="space-y-3">
          <div className="grid grid-cols-3 items-center gap-2">
            <Label>Yetişkin</Label>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => dec("adults")}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-8 text-center font-semibold">
                {value.adults}
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => inc("adults")}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <Label>Çocuk</Label>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => dec("children")}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-8 text-center font-semibold">
                {value.children}
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => inc("children")}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <Label>Bebek</Label>
            <div className="col-span-2 flex items-center justify-end gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => dec("infants")}
                className="h-8 w-8"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-8 text-center font-semibold">
                {value.infants}
              </div>
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => inc("infants")}
                className="h-8 w-8"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)} className="h-9">
              Tamam
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
