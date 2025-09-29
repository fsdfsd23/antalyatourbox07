import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function TopBanner({
  deadline,
  onClose,
}: {
  deadline?: Date | string | number;
  onClose: () => void;
}) {
  const target = useMemo(() => {
    if (!deadline) {
      const d = new Date();
      d.setDate(d.getDate() + 5);
      d.setHours(23, 59, 59, 0);
      return d.getTime();
    }
    return new Date(deadline).getTime();
  }, [deadline]);

  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, Math.floor((target - now) / 1000));
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return (
    <div className="relative w-full bg-primary text-primary-foreground">
      <div className="container max-w-7xl container-px">
        <div className="flex items-center gap-4 py-2">
          <p className="whitespace-nowrap text-xs sm:text-sm font-semibold">
            %50'ye Varan İndirimlerle Erken Rezervasyon Başladı!
          </p>

          <div className="ml-2 hidden sm:flex items-center gap-2 text-[10px] sm:text-xs">
            <span className="opacity-90">Son</span>
            <TimeBox label="Gün" value={pad(days)} />
            <TimeBox label="Saat" value={pad(hours)} />
            <TimeBox label="Dakika" value={pad(minutes)} />
            <TimeBox label="Saniye" value={pad(seconds)} />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="h-8 px-3 bg-white text-primary hover:opacity-90"
            >
              <a href="/tours">Otelleri İncele</a>
            </Button>
            <button
              aria-label="Bannerı kapat"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-white text-primary px-2 py-0.5 shadow-sm animate-pulse">
      <span className="leading-none text-[11px] font-bold tracking-wider">
        {value}
      </span>
      <span className="leading-none text-[9px] font-medium opacity-80">
        {label}
      </span>
    </div>
  );
}
