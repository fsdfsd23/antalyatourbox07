import { useEffect, useMemo } from "react";
import Stepper from "@/components/rental/Stepper";
import { useParams, useNavigate } from "react-router-dom";
import { getCarById, INSURANCE_PACKAGES, EXTRA_SERVICES } from "@/lib/cars";
import { useCarRental } from "@/context/CarRentalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CarRentalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectCar, selectedCar, setInsurance, insurance, toggleExtra, extras, days } = useCarRental();

  useEffect(() => {
    if (id) selectCar(id);
  }, [id]);

  const upgrade = useMemo(() => (selectedCar?.upgradeTo ? getCarById(selectedCar.upgradeTo) : undefined), [selectedCar]);

  if (!selectedCar) return null;

  return (
    <div>
      <Stepper step={2} />
      <div className="container max-w-7xl container-px py-6 space-y-6">
        {upgrade && (
          <Card>
            <CardHeader>
              <CardTitle>Üst Model Önerisi</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-4">
              <img src={upgrade.image} alt={`${upgrade.brand} ${upgrade.model}`} className="w-full sm:w-56 h-32 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">
                  {upgrade.brand} {upgrade.model}
                </div>
                <p className="text-sm text-slate-600">Daha geniş bagaj, daha güçlü motor ve gelişmiş donanım.</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Günlük</div>
                <div className="text-lg font-bold">₺ {upgrade.pricePerDay.toLocaleString("tr-TR")}</div>
                <Button className="mt-2" variant="secondary" onClick={() => selectCar(upgrade.id)}>
                  Yükselt
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Ek Sigorta Paketleri</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={insurance?.id || "basic"}
              onValueChange={(v) => setInsurance(INSURANCE_PACKAGES.find((p) => p.id === v))}
              className="grid grid-cols-1 md:grid-cols-3 gap-3"
            >
              {INSURANCE_PACKAGES.map((p) => (
                <label key={p.id} className="rounded-lg border p-4 hover:border-primary cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{p.name}</div>
                    <RadioGroupItem value={p.id} />
                  </div>
                  <ul className="mt-2 text-sm text-slate-600 space-y-1">
                    {p.description.map((d) => (
                      <li key={d}>• {d}</li>
                    ))}
                  </ul>
                  <div className="mt-3 text-right text-sm">
                    Günlük <span className="font-bold">₺ {p.pricePerDay.toLocaleString("tr-TR")}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ek Hizmetler</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {EXTRA_SERVICES.map((e) => {
              const selected = Boolean(extras[e.id]);
              return (
                <div key={e.id} className="rounded-lg border p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Checkbox checked={selected} onCheckedChange={() => toggleExtra(e)} />
                    <div>
                      <div className="font-medium">{e.name}</div>
                      <div className="text-xs text-slate-600 mt-1">{e.perRental ? "Rezervasyon başına" : "Günlük"} ücrettir.</div>
                      <Dialog>
                        <DialogTrigger className="text-xs text-primary underline mt-1">Detay</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{e.name}</DialogTitle>
                          </DialogHeader>
                          <p className="text-sm text-slate-700">{e.description}</p>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    {e.perRental ? (
                      <span>₺ {e.price.toLocaleString("tr-TR")}</span>
                    ) : (
                      <span>
                        Günlük ₺ {e.price.toLocaleString("tr-TR")}<br />Toplam ₺ {(e.price * days).toLocaleString("tr-TR")}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={() => navigate("/arac-kiralama/checkout")}>Rezervasyona Devam Et</Button>
        </div>
      </div>
    </div>
  );
}
