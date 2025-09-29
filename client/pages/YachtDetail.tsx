import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useYachtRental } from "@/context/YachtRentalContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ExtrasModal from "@/components/yacht/ExtrasModal";
import ReservationModal from "@/components/yacht/ReservationModal";
import YachtMap from "@/components/yacht/YachtMap";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Expand, Star, Users, Ruler, Ship } from "lucide-react";

export default function YachtDetail() {
  const { id } = useParams();
  const {
    selectYacht,
    yacht,
    setSearch,
    search,
    setPassengers,
    passengers,
    totals,
  } = useYachtRental();
  const [openExtras, setOpenExtras] = useState(false);
  const [openReserve, setOpenReserve] = useState(false);
  const [imageOpen, setImageOpen] = useState<number | null>(null);
  const [mode, setMode] = useState<"hourly" | "daily">(
    search?.mode || "hourly",
  );
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (id) selectYacht(id);
  }, [id]);

  useEffect(() => {
    setSearch({
      mode,
      region: yacht?.location || "Antalya",
      date: new Date().toISOString().slice(0, 10),
      days: 1,
      hours: 2,
    });
  }, [mode, yacht]);

  useEffect(() => {
    if (!api) return;
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const timeSlots = useMemo(
    () => ["10:00", "12:00", "14:00", "16:00", "18:00"],
    [],
  );

  if (!yacht) return null;

  const meta = [
    {
      icon: Ruler,
      label: "Uzunluk",
      value: yacht.lengthMeters ? `${yacht.lengthMeters} m` : "-",
    },
    {
      icon: Users,
      label: "Seyir Kap.",
      value: yacht.cruiseCapacity || yacht.capacity,
    },
    {
      icon: Users,
      label: "Yemekli Kap.",
      value:
        yacht.mealCapacity || Math.max(2, Math.floor(yacht.capacity * 0.8)),
    },
    { icon: Ship, label: "Çıkış İskelesi", value: yacht.marina },
  ];

  const descriptionHourly =
    "Saatlik turlar için ideal rota ve konfor. Kısa kaçamaklar, doğum günü ve kutlamalar için uygundur.";
  const descriptionDaily =
    "Günlük kiralamada geniş rota seçenekleri ve uzun molalar. Aile ve grup gezileri için uygundur.";

  const usageTerms = yacht.usageTerms || [
    "Kaptan dahil hizmet verilir",
    "Rezervasyon saatinde iskelede hazır olun",
    "Yiyecek/içecek getirmek serbest",
  ];
  const facilities = yacht.offeredFacilities || [
    "Müzik Sistemi",
    "WC",
    "Güneşlenme Alanı",
  ];
  const specs = yacht.boatSpecs || ["GPS", "Buzdolabı", "Radar"];
  const safety = yacht.safety || [
    "Can Yeleği",
    "Yangın Söndürücü",
    "İlkyardım",
  ];

  return (
    <div className="container max-w-7xl container-px py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <main className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold">{yacht.name}</h1>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-600">
            {meta.map((m) => (
              <div key={m.label} className="flex items-center gap-1">
                <m.icon className="h-4 w-4 text-primary" />
                <span>{m.label}:</span>
                <strong className="ml-1">{m.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <Carousel setApi={(a) => setApi(a)} className="[&_.embla]:rounded-lg">
            <CarouselContent>
              {yacht.images.map((src, idx) => (
                <CarouselItem key={src}>
                  <div className="relative">
                    <img
                      src={src}
                      alt={`${yacht.name} ${idx + 1}`}
                      className="w-full h-80 md:h-96 object-cover rounded-lg"
                    />
                    <button
                      className="absolute bottom-3 right-3 bg-black/60 text-white p-2 rounded-full hover:bg-black"
                      onClick={() => setImageOpen(idx)}
                      aria-label="Büyüt"
                    >
                      <Expand className="h-5 w-5" />
                    </button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="mt-3 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
            {yacht.images.map((src, idx) => (
              <button
                key={src}
                className={`h-16 rounded-md overflow-hidden border ${current === idx ? "ring-2 ring-primary" : ""}`}
                onClick={() => api?.scrollTo(idx)}
              >
                <img
                  src={src}
                  alt={`${yacht.name} thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <Dialog
          open={imageOpen !== null}
          onOpenChange={(v) => !v && setImageOpen(null)}
        >
          <DialogContent className="p-0 max-w-4xl">
            <DialogTitle className="sr-only">Görüntü Önizleme</DialogTitle>
            {typeof imageOpen === "number" && (
              <div className="relative">
                <img
                  src={yacht.images[imageOpen]}
                  className="w-full h-full object-contain max-h-[80vh] bg-black"
                />
                <button
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  onClick={() =>
                    setImageOpen(
                      (imageOpen - 1 + yacht.images.length) %
                        yacht.images.length,
                    )
                  }
                >
                  ‹
                </button>
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2"
                  onClick={() =>
                    setImageOpen((imageOpen + 1) % yacht.images.length)
                  }
                >
                  ›
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="font-medium">{yacht.supplier || "Tedarikçi"}</div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">
                  {(yacht.rating || 4.7).toFixed(1)}
                </span>
                <span className="text-slate-500">
                  ({yacht.ratingCount || 32} yorum)
                </span>
              </div>
            </div>
            <div
              className="text-xs font-medium px-3 py-1.5 rounded-md text-white"
              style={{ backgroundColor: "hsl(0 72% 50%)" }}
            >
              {mode === "hourly" ? "Minimum 2 saat" : "Minimum 1 gün"} • Yolcu
              Kapasitesi {yacht.capacity} •{" "}
              {mode === "daily"
                ? "Özel günlerde min. 2 gün"
                : "Özel günlerde min. 3 saat"}{" "}
              • Yemekli Kapasite{" "}
              {yacht.mealCapacity ||
                Math.max(2, Math.floor(yacht.capacity * 0.8))}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>İlan Açıklaması</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            {mode === "hourly" ? descriptionHourly : descriptionDaily}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kullanım Şartları</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
              {usageTerms.map((t) => (
                <li key={t} className="flex items-center gap-2 text-green-700">
                  <span>✔</span>
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Teknede Sunulan İmkanlar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {facilities.map((t) => (
                <li key={t} className="flex items-center gap-2 text-green-700">
                  <span>✔</span>
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tekne Özellikleri</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {specs.map((t) => (
                <li key={t} className="flex items-center gap-2 text-green-700">
                  <span>✔</span>
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Güvenlik Ekipmanları</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {safety.map((t) => (
                <li key={t} className="flex items-center gap-2 text-green-700">
                  <span>✔</span>
                  {t}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {yacht.coords && (
          <Card>
            <CardHeader>
              <CardTitle>Tekne Konumu</CardTitle>
            </CardHeader>
            <CardContent>
              <YachtMap
                lat={yacht.coords.lat}
                lng={yacht.coords.lng}
                label={`${yacht.name} — ${yacht.marina}`}
              />
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Misafir Yorumları</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Veli A.", rating: 5, msg: "Harika bir deneyim" },
              { name: "Zeynep K.", rating: 4, msg: "Personel çok ilgili" },
            ].map((r) => (
              <div key={r.name} className="border rounded-md p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{r.name}</div>
                  <div className="flex text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm mt-1 text-slate-700">{r.msg}</p>
              </div>
            ))}

            <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Ad Soyad" />
              <Input type="email" placeholder="E-posta" />
              <div className="md:col-span-2">
                <Input placeholder="Puan (1-5)" />
              </div>
              <div className="md:col-span-2">
                <textarea
                  className="w-full h-24 border rounded-md p-2 text-sm"
                  placeholder="Mesaj"
                ></textarea>
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="button">Yorum Gönder</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Saatlik / Günlük Kiralama</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <RadioGroup
              value={mode}
              onValueChange={(v) => setMode(v as any)}
              className="flex gap-4"
            >
              <label className="flex items-center gap-2">
                <RadioGroupItem value="hourly" />
                Saatlik
              </label>
              <label className="flex items-center gap-2">
                <RadioGroupItem value="daily" />
                Günlük
              </label>
            </RadioGroup>

            <div>
              <div className="text-xs text-slate-600 mb-1">
                Çıkış İskeleleri
              </div>
              <select className="w-full border rounded-md h-10 px-2">
                {yacht.piers.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-xs text-slate-600 mb-1">Tarih</div>
              <Input
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>

            {mode === "hourly" ? (
              <div className="space-y-2">
                <div className="text-xs text-slate-600">Uygun Saatler</div>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      className="border rounded-md py-2 hover:bg-muted"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-slate-600 mb-1">
                      Tur Süresi (saat)
                    </div>
                    <Input
                      type="number"
                      defaultValue={2}
                      min={1}
                      onChange={(e) =>
                        setSearch({
                          ...(search || { mode, region: yacht.location }),
                          hours: Number(e.target.value || 1),
                          mode,
                        })
                      }
                    />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 mb-1">
                      Yolcu Sayısı
                    </div>
                    <Input
                      type="number"
                      value={passengers}
                      min={1}
                      max={yacht.capacity}
                      onChange={(e) =>
                        setPassengers(Number(e.target.value || 1))
                      }
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-xs text-slate-600 mb-1">Gün Sayısı</div>
                  <Input
                    type="number"
                    defaultValue={1}
                    min={1}
                    onChange={(e) =>
                      setSearch({
                        ...(search || { mode, region: yacht.location }),
                        days: Number(e.target.value || 1),
                        mode,
                      })
                    }
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-600 mb-1">
                    Yolcu Sayısı
                  </div>
                  <Input
                    type="number"
                    value={passengers}
                    min={1}
                    max={yacht.capacity}
                    onChange={(e) => setPassengers(Number(e.target.value || 1))}
                  />
                </div>
              </div>
            )}

            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setOpenExtras(true)}
            >
              Yemek ve Hizmet Seçenekleri
            </Button>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="border rounded-md p-2">
                <div className="text-slate-500">Temel Ücret</div>
                <div className="font-bold">
                  ₺ {totals.base.toLocaleString("tr-TR")}
                </div>
              </div>
              <div className="border rounded-md p-2">
                <div className="text-slate-500">Ekstralar</div>
                <div className="font-bold">
                  ₺ {totals.extras.toLocaleString("tr-TR")}
                </div>
              </div>
              <div className="col-span-2 border rounded-md p-2 text-right">
                <div className="text-slate-500">Toplam</div>
                <div className="text-xl font-extrabold">
                  ₺ {totals.total.toLocaleString("tr-TR")}
                </div>
              </div>
            </div>

            <Button className="w-full" onClick={() => setOpenReserve(true)}>
              Tekneyi Rezerve Et
            </Button>
          </CardContent>
        </Card>
      </aside>

      <ExtrasModal open={openExtras} onOpenChange={setOpenExtras} />
      <ReservationModal open={openReserve} onOpenChange={setOpenReserve} />
    </div>
  );
}
