import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Yacht } from "@/lib/yachts";
import { useNavigate } from "react-router-dom";

export default function YachtCard({ yacht }: { yacht: Yacht }) {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3">
        <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr_auto] gap-4 items-center">
          <img
            src={yacht.images[0]}
            alt={yacht.name}
            className="w-full h-36 object-cover rounded-md"
          />
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">{yacht.name}</h4>
            <p className="text-sm text-slate-600">
              {yacht.type} • {yacht.capacity} Kişi • {yacht.marina} (
              {yacht.location}) {yacht.mealIncluded ? "• Yemekli" : ""}
            </p>
            <p className="text-xs text-slate-500">Başlayan fiyatlar</p>
          </div>
          <div className="text-right space-y-2">
            <div>
              <div className="text-xs text-slate-500">Saatlik</div>
              <div className="text-lg font-bold">
                ₺ {yacht.hourlyPriceFrom.toLocaleString("tr-TR")}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Günlük</div>
              <div className="text-lg font-bold">
                ₺ {yacht.dailyPriceFrom.toLocaleString("tr-TR")}
              </div>
            </div>
            <Button onClick={() => navigate(`/yat-kiralama/${yacht.id}`)}>
              İncele
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
