import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCarRental } from "@/context/CarRentalContext";
import type { Car } from "@/lib/cars";
import { useNavigate } from "react-router-dom";

export default function CarCard({ car, totalDays }: { car: Car; totalDays: number }) {
  const { selectCar } = useCarRental();
  const navigate = useNavigate();
  const total = car.pricePerDay * totalDays;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr_auto] gap-4 items-center">
          <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-28 object-cover rounded-md" />
          <div className="space-y-1">
            <h4 className="font-semibold text-slate-900">
              {car.brand} {car.model} {car.fuel} {car.transmission} veya Benzeri
            </h4>
            <p className="text-sm text-slate-600">
              {car.transmission} • {car.seats} Kişi • {car.luggage} Çanta
            </p>
            {car.freeCancellation && (
              <p className="text-xs text-green-600">Ücretsiz iptal</p>
            )}
          </div>
          <div className="text-right space-y-2">
            <div>
              <div className="text-xs text-slate-500">Günlük</div>
              <div className="text-lg font-bold">₺ {car.pricePerDay.toLocaleString("tr-TR")}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Toplam</div>
              <div className="text-xl font-extrabold">₺ {total.toLocaleString("tr-TR")}</div>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                selectCar(car.id);
                navigate(`/arac-kiralama/arac/${car.id}`);
              }}
            >
              Seç
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
