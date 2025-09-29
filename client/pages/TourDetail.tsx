import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Maximize2, PlayCircle, Star } from "lucide-react";
import PeoplePicker from "@/components/site/PeoplePicker";
import TourReservationFlow from "@/components/site/TourReservationFlow";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
];

const DETAILS: Record<
  string,
  {
    title: string;
    images: string[];
    video?: string;
    base: number;
    code: string;
    departures: string[];
    capacity: number;
    departureTimes: string;
    days: string;
  }
> = {
  moskova: {
    title: "Prime Moskova Turu (Pegasus ile Tüm Geziler Dahil)",
    code: "1919",
    departures: ["İstanbul SAW", "İstanbul IST"],
    capacity: 45,
    departureTimes: "06:45, 12:30",
    days: "Pazartesi - Çarşamba - Cuma",
    images: [
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=1600&auto=format&fit=crop",
    ],
    video: "https://www.youtube.com/embed/ty0G5E3mB1o",
    base: 49068,
  },
  stpetersburg: {
    title: "Prime St. Petersburg Turu (Pegasus ile Tüm Geziler Dahil)",
    code: "1920",
    departures: ["İstanbul SAW"],
    capacity: 42,
    departureTimes: "07:30, 13:15",
    days: "Salı - Perşembe - Cumartesi",
    images: [
      "https://images.unsplash.com/photo-1564669890849-114ba0f019f5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop",
    ],
    video: "https://www.youtube.com/embed/cs2YH0e6J1w",
    base: 49068,
  },
  sharm: {
    title: "Prime Ankara Hareketli Sharm El Sheikh Turu",
    code: "1101",
    departures: ["Ankara ESB"],
    capacity: 40,
    departureTimes: "09:10",
    days: "Haftanın belirli günleri",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558980394-0c0ad3f6a0b5?q=80&w=1600&auto=format&fit=crop",
    ],
    video: "https://www.youtube.com/embed/jYlxw9sVJAc",
    base: 19605,
  },
};

const DATE_OPTIONS = [
  { id: "opt1", label: "26 - 29 Aralık 2025", price: 39900 },
  { id: "opt2", label: "2 - 5 Ocak 2026", price: 41800 },
  { id: "opt3", label: "16 - 19 Ocak 2026", price: 39250 },
];

export default function TourDetail() {
  const { id = "moskova" } = useParams();
  const detail = DETAILS[id] || {
    title: "Tur Detayı",
    images: FALLBACK_IMAGES,
    base: 29900,
    code: "0000",
    departures: ["Belirsiz"],
    capacity: 0,
    departureTimes: "-",
    days: "-",
  };
  const images = detail.images.length ? detail.images : FALLBACK_IMAGES;

  const [selected, setSelected] = useState<string>(DATE_OPTIONS[0].id);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [infants, setInfants] = useState<number>(0);
  const selectedOption = useMemo(
    () => DATE_OPTIONS.find((d) => d.id === selected)!,
    [selected],
  );
  const adultPrice = selectedOption?.price ?? detail.base;
  const childUnit = Math.round(adultPrice * 0.5);
  const infantUnit = Math.round(adultPrice * 0.1);
  const total =
    adults * adultPrice + children * childUnit + infants * infantUnit;
  const [rating, setRating] = useState<number>(0);
  const [flowOpen, setFlowOpen] = useState(false);

  return (
    <>
      <TourReservationFlow
        open={flowOpen}
        onOpenChange={setFlowOpen}
        tourTitle={detail.title}
        tourCode={detail.code}
        dateLabel={selectedOption.label}
        departureTimes={detail.departureTimes}
        counts={{ adults, children, infants }}
        prices={{ adult: adultPrice, child: childUnit, infant: infantUnit }}
      />
      <div className="container max-w-7xl container-px py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden border bg-white">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {images.map((src, i) => (
                    <CarouselItem key={src + i}>
                      <div className="relative aspect-[16/9] sm:aspect-[21/9]">
                        <Dialog>
                          <img
                            src={src}
                            alt={detail.title + " görsel " + (i + 1)}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                          />
                          <DialogTrigger asChild>
                            <button
                              className="absolute inset-0"
                              aria-label="Görseli büyüt"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
                            <DialogTitle className="sr-only">
                              Görsel Önizleme
                            </DialogTitle>
                            <img
                              src={src}
                              alt="Büyük görsel"
                              className="w-full h-auto rounded-md"
                            />
                          </DialogContent>
                        </Dialog>

                        <div className="absolute right-3 top-3 z-10">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                className="h-8 w-8 rounded-full bg-white/90 text-slate-900 hover:bg-white"
                                aria-label="Büyüt"
                              >
                                <Maximize2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
                              <DialogTitle className="sr-only">
                                Görsel Önizleme
                              </DialogTitle>
                              <img
                                src={src}
                                alt="Büyük görsel"
                                className="w-full h-auto rounded-md"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>

            {/* Title row */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {detail.title}
              </h1>
              <div className="flex items-center gap-2">
                {detail.video && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="h-10 px-4 bg-slate-900 text-white">
                        <PlayCircle className="h-4 w-4 mr-2" /> Video
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogTitle>Tanıtım Videosu</DialogTitle>
                      <DialogDescription>
                        Tur hakkında kısa video.
                      </DialogDescription>
                      <div
                        className="relative w-full overflow-hidden rounded-md"
                        style={{ paddingTop: "56.25%" }}
                      >
                        <iframe
                          src={detail.video}
                          title="Tur Videosu"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <Button variant="outline" className="h-10">
                  <ExternalLink className="h-4 w-4 mr-2" /> Paylaş
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-5 rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
              <Tabs defaultValue="program">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="program">Tur Programı</TabsTrigger>
                  <TabsTrigger value="kosullar">Genel Şartlar</TabsTrigger>
                  <TabsTrigger value="konaklama">Konaklama</TabsTrigger>
                  <TabsTrigger value="vize">Vize ve Ülke</TabsTrigger>
                  <TabsTrigger value="kampanya">Kampanyalar</TabsTrigger>
                </TabsList>
                <TabsContent value="program" className="mt-4 space-y-4">
                  <DayItem
                    day={1}
                    title="İlk Gün - Varış ve Şehir Turu"
                    text="Uçuş sonrası otele yerleşme, panoramik şehir turu ve akşam serbest zaman."
                  />
                  <DayItem
                    day={2}
                    title="Müze ve Tarihi Bölgeler"
                    text="Rehber eşliğinde önemli müzeler ve tarihi bölgelerin ziyareti."
                  />
                  <DayItem
                    day={3}
                    title="Serbest Zaman ve Alışveriş"
                    text="Kişisel keşifler ve alışveriş için serbest zaman."
                  />
                  <DayItem
                    day={4}
                    title="Dönüş"
                    text="Havaalanı transferi ve dönüş uçuşu."
                  />
                </TabsContent>
                <TabsContent
                  value="kosullar"
                  className="mt-4 text-sm text-slate-700 space-y-3"
                >
                  <p>
                    Tur ücreti; belirtilen uçak bileti, otel konaklaması,
                    kahvaltılar ve programdaki gezileri kapsar.
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Pasaport ve vize işlemleri misafire aittir.</li>
                    <li>
                      Programda belirtilmeyen ekstra harcamalar dahil değildir.
                    </li>
                    <li>
                      Rehber; program akışını hava/operasyon koşullarına göre
                      değiştirebilir.
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent
                  value="konaklama"
                  className="mt-4 text-sm text-slate-700 space-y-3"
                >
                  <p>
                    4* merkezî konumlu otellerde oda-kahvaltı konaklama
                    sağlanır. Odalarda Wi‑Fi, kasa ve klima mevcuttur.
                  </p>
                </TabsContent>
                <TabsContent
                  value="vize"
                  className="mt-4 text-sm text-slate-700 space-y-3"
                >
                  <p>
                    Vize gereksinimleri ülkeye göre değişir. Lütfen
                    pasaportunuzun en az 6 ay geçerliliği olduğundan emin olun.
                  </p>
                </TabsContent>
                <TabsContent
                  value="kampanya"
                  className="mt-4 text-sm text-slate-700 space-y-3"
                >
                  <p>
                    Erken rezervasyonda ek indirim ve taksit avantajları
                    uygulanır. Kampanyalar stoklarla sınırlıdır.
                  </p>
                </TabsContent>
              </Tabs>
            </div>

            {/* Comments */}
            <div className="mt-6 rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold">Yorumlar</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          "h-4 w-4 " +
                          (i < 4
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-slate-300")
                        }
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    Rehber çok ilgiliydi, program dengeliydi. Tavsiye ederim.
                  </p>
                  <div className="mt-1 text-xs text-slate-500">Ayşe K.</div>
                </div>

                <Separator />

                <h4 className="font-semibold">Yorum Yazın</h4>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Ad Soyad</Label>
                    <Input placeholder="Adınız Soyadınız" />
                  </div>
                  <div>
                    <Label className="text-xs">E-posta</Label>
                    <Input type="email" placeholder="ornek@posta.com" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Puanlama</Label>
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setRating(i + 1)}
                          aria-label={`${i + 1} yıldız`}
                        >
                          <Star
                            className={
                              "h-6 w-6 " +
                              (i < rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-slate-300")
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-xs">Mesajınız</Label>
                    <Textarea placeholder="Deneyiminizi paylaşın" rows={4} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button className="h-10">Gönder</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm sticky top-24">
              <div>
                <h2 className="text-[10pt] font-semibold leading-snug">
                  {detail.title}
                </h2>
                <div className="mt-2 grid grid-cols-1 gap-1 text-xs text-slate-700">
                  <div>
                    <span className="opacity-70">Tur Kodu:</span>{" "}
                    <span className="ml-1 font-mono font-extrabold tracking-wide text-slate-900">
                      {detail.code}
                    </span>
                  </div>
                  <div>
                    <span className="opacity-70">Kalkış Bölgeleri:</span>{" "}
                    <span className="ml-1">{detail.departures.join(", ")}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Kapasite:</span>{" "}
                    <span className="ml-1">{detail.capacity} kişi</span>
                  </div>
                  <div>
                    <span className="opacity-70">Kalkış Saatleri:</span>{" "}
                    <span className="ml-1">{detail.departureTimes}</span>
                  </div>
                  <div>
                    <span className="opacity-70">Günler:</span>{" "}
                    <span className="ml-1">{detail.days}</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">Yetişkin Fiyatı</div>
                  <div className="text-2xl font-extrabold text-primary">
                    {adultPrice.toLocaleString("tr-TR")} TL
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Toplam</div>
                  <div className="text-xl font-extrabold">
                    {total.toLocaleString("tr-TR")} TL
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3">
                <div>
                  <Label className="text-xs">Kişi Sayıları</Label>
                  <PeoplePicker
                    value={{ adults, children, infants }}
                    onChange={(v) => {
                      setAdults(v.adults);
                      setChildren(v.children);
                      setInfants(v.infants);
                    }}
                  />
                  <div className="mt-1 text-[11px] text-slate-500">
                    Çocuk kişi başı: {childUnit.toLocaleString("tr-TR")} TL —
                    Bebek kişi başı: {infantUnit.toLocaleString("tr-TR")} TL
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Tarih</Label>
                  <Select value={selected} onValueChange={setSelected}>
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DATE_OPTIONS.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.label} — {d.price.toLocaleString("tr-TR")} TL
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Yetişkin x {adults}</span>
                  <span>
                    {(adults * adultPrice).toLocaleString("tr-TR")} TL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Çocuk x {children}</span>
                  <span>
                    {(children * childUnit).toLocaleString("tr-TR")} TL
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Bebek x {infants}</span>
                  <span>
                    {(infants * infantUnit).toLocaleString("tr-TR")} TL
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <Label className="text-xs">Alternatif Tarih Seçenekleri</Label>
                <div className="mt-2 grid grid-cols-1 gap-2">
                  {DATE_OPTIONS.filter((d) => d.id !== selected).map((d) => (
                    <button
                      key={d.id}
                      className="w-full rounded-md border px-3 py-2 text-left text-sm hover:bg-slate-50"
                      onClick={() => setSelected(d.id)}
                    >
                      <div className="font-medium">{d.label}</div>
                      <div className="text-xs text-slate-600">
                        {d.price.toLocaleString("tr-TR")} TL
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <Button
                  className="w-full h-11"
                  onClick={() => setFlowOpen(true)}
                >
                  Rezervasyonu Tamamla
                </Button>
              </div>

              <Separator className="my-4" />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="dahil">
                  <AccordionTrigger>
                    Fiyata Dahil Olan Hizmetler
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Gidiş-dönüş ekonomi sınıfı uçak bileti</li>
                      <li>4* otellerde oda-kahvaltı konaklama</li>
                      <li>Alan-otel transferleri ve şehir turları</li>
                      <li>Profesyonel Türkçe rehberlik</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="haric">
                  <AccordionTrigger>
                    Fiyata Dahil Olmayan Hizmetler
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                      <li>Vize ücreti ve seyahat sağlık sigortası</li>
                      <li>Öğle ve akşam yemekleri</li>
                      <li>Kişisel harcamalar ve ekstra turlar</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function DayItem({
  day,
  title,
  text,
}: {
  day: number;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-md border p-4">
      <div className="text-xs text-slate-500">{day}. GÜN</div>
      <div className="font-semibold mt-1">{title}</div>
      <p className="text-sm text-slate-700 mt-1">{text}</p>
    </div>
  );
}
