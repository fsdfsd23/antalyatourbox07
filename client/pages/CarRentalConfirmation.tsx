import Stepper from "@/components/rental/Stepper";
import { useCarRental } from "@/context/CarRentalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CarRentalConfirmation() {
  const { search, selectedCar, totals } = useCarRental();

  return (
    <div>
      <Stepper step={4} />
      <div className="container max-w-3xl container-px py-10 space-y-6 text-center">
        <h1 className="text-2xl font-extrabold">Rezervasyon Alındı</h1>
        <p className="text-slate-600">Rezervasyon detaylarınız e‑posta adresinize gönderildi.</p>

        <Card className="text-left">
          <CardHeader>
            <CardTitle>Özet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {selectedCar && (
              <div>
                <div className="text-slate-500">Ara��</div>
                <div className="font-medium">{selectedCar.brand} {selectedCar.model}</div>
              </div>
            )}
            {search && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <div className="text-slate-500">Alış</div>
                  <div className="font-medium">{search.pickupLocation} — {new Date(search.pickupAt).toLocaleString("tr-TR")}</div>
                </div>
                <div>
                  <div className="text-slate-500">Teslim</div>
                  <div className="font-medium">{search.dropoffLocation || search.pickupLocation} — {new Date(search.returnAt).toLocaleString("tr-TR")}</div>
                </div>
              </div>
            )}
            <div className="font-extrabold text-lg mt-2">Toplam: ₺ {totals.total.toLocaleString("tr-TR")}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
