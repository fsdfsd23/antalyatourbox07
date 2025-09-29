import Stepper from "@/components/rental/Stepper";
import { useCarRental } from "@/context/CarRentalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function CarRentalCheckout() {
  const { search, selectedCar, insurance, extras, totals, days } = useCarRental();
  const navigate = useNavigate();

  if (!selectedCar || !search) return null;

  return (
    <div>
      <Stepper step={3} />
      <div className="container max-w-7xl container-px py-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
        <aside className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kiralama Detayları</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div>
                <div className="text-slate-500">Alış Yeri</div>
                <div className="font-medium">{search.pickupLocation}</div>
              </div>
              {search.dropoffLocation && (
                <div>
                  <div className="text-slate-500">Bırakılış Yeri</div>
                  <div className="font-medium">{search.dropoffLocation}</div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-slate-500">Alış</div>
                  <div className="font-medium">{new Date(search.pickupAt).toLocaleString("tr-TR")}</div>
                </div>
                <div>
                  <div className="text-slate-500">Teslim</div>
                  <div className="font-medium">{new Date(search.returnAt).toLocaleString("tr-TR")}</div>
                </div>
              </div>
              <div className="text-slate-500">Süre</div>
              <div className="font-medium">{days} gün</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Araç</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="font-semibold">
                {selectedCar.brand} {selectedCar.model}
              </div>
              <div className="text-slate-600">
                {selectedCar.transmission} • {selectedCar.seats} Kişi • {selectedCar.luggage} Çanta
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ekstralar</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <div className="flex justify-between"><span>Araç Kira Bedeli</span><span>₺ {totals.base.toLocaleString("tr-TR")}</span></div>
              {insurance && (
                <div className="flex justify-between"><span>Sigorta ({insurance.name})</span><span>₺ {totals.insurance.toLocaleString("tr-TR")}</span></div>
              )}
              {Object.values(extras).map((e) => (
                <div key={e.id} className="flex justify-between">
                  <span>
                    {e.name} {e.perRental ? "(Rezervasyon)" : `(${days} gün)`}
                  </span>
                  <span>
                    ₺ {(e.perRental ? e.price : e.price * days).toLocaleString("tr-TR")}
                  </span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-extrabold text-lg">
                <span>Genel Toplam</span>
                <span>₺ {totals.total.toLocaleString("tr-TR")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kiralama Şartları</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2 text-slate-600">
              <p>• Sürücü yaşı en az 21 ve en az 1 yıllık geçerli ehliyet zorunludur.</p>
              <p>• Yakıt, HGS/OGS, Otopark ve Trafik cezaları kiralayana aittir.</p>
              <p>• Gecikmelerde günlük ücret üzerinden ek ücret uygulanır.</p>
              <p>• Rezervasyon iptal/iade koşulları paket seçimine göre değişebilir.</p>
            </CardContent>
          </Card>
        </aside>

        <main className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Kişisel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>İsim</Label>
                <Input placeholder="Adınız" required />
              </div>
              <div>
                <Label>Soyisim</Label>
                <Input placeholder="Soyadınız" required />
              </div>
              <div>
                <Label>E-posta</Label>
                <Input type="email" placeholder="ornek@mail.com" required />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input type="tel" placeholder="(5xx) xxx xx xx" required />
              </div>
              <div>
                <Label>Doğum Tarihi</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>TC Kimlik No</Label>
                <Input />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fatura Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Fatura Tipi</Label>
                <Input placeholder="Bireysel / Kurumsal" />
              </div>
              <div>
                <Label>Vergi No / TCKN</Label>
                <Input />
              </div>
              <div className="sm:col-span-2">
                <Label>Adres</Label>
                <Input placeholder="Fatura adresi" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ödeme Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label>Kart Üzerindeki İsim</Label>
                <Input />
              </div>
              <div>
                <Label>Kart Numarası</Label>
                <Input placeholder="•••• •••• •••• ••••" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>SKT</Label>
                  <Input placeholder="AA/YY" />
                </div>
                <div>
                  <Label>CVC</Label>
                  <Input placeholder="***" />
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button onClick={() => navigate("/arac-kiralama/sonuc")}>Ödemeyi Tamamla</Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
