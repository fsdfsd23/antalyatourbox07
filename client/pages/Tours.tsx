import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

type Tour = {
  id: string;
  title: string;
  image: string;
  nights: number;
  days: number;
  price: number; // TL
  region: string; // Bölge
  departure: string; // Çıkış Noktası
  transport: string; // Ula��ım Tipi
  durationBucket: "1-3" | "4-7" | "8-10" | "10+";
  period: string; // Dönem
};

const ALL_TOURS: Tour[] = [
  {
    id: "moskova",
    title: "Prime Moskova Turu (Pegasus ile Tüm Geziler Dahil)",
    image:
      "https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1200&auto=format&fit=crop",
    nights: 3,
    days: 4,
    price: 49068,
    region: "Avrupa",
    departure: "İstanbul",
    transport: "Uçak",
    durationBucket: "4-7",
    period: "Yıl Boyu",
  },
  {
    id: "stpetersburg",
    title: "Prime St. Petersburg Turu (Pegasus ile Tüm Geziler Dahil)",
    image:
      "https://images.unsplash.com/photo-1564669890849-114ba0f019f5?q=80&w=1200&auto=format&fit=crop",
    nights: 3,
    days: 4,
    price: 49068,
    region: "Avrupa",
    departure: "İstanbul",
    transport: "Uçak",
    durationBucket: "4-7",
    period: "Yıl Boyu",
  },
  {
    id: "sharm",
    title: "Prime Ankara Hareketli Sharm El Sheikh Turu",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1200&auto=format&fit=crop",
    nights: 2,
    days: 3,
    price: 19605,
    region: "Orta Doğu",
    departure: "Ankara",
    transport: "Uçak",
    durationBucket: "1-3",
    period: "K��ş",
  },
  {
    id: "kapadokya",
    title: "Kapadokya Balon Deneyimi ve Bölge Turu",
    image:
      "https://images.unsplash.com/photo-1573496529574-be85d6a60704?q=80&w=1200&auto=format&fit=crop",
    nights: 1,
    days: 2,
    price: 5200,
    region: "İç Anadolu",
    departure: "Antalya",
    transport: "Otobüs",
    durationBucket: "1-3",
    period: "İlkbahar",
  },
  {
    id: "ege-koylari",
    title: "Ege Koyları Tekne Turu",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    nights: 2,
    days: 3,
    price: 8600,
    region: "Ege",
    departure: "İzmir",
    transport: "Gemi",
    durationBucket: "1-3",
    period: "Yaz",
  },
  {
    id: "bogaz",
    title: "İstanbul Boğaz Turu",
    image:
      "https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop",
    nights: 0,
    days: 1,
    price: 950,
    region: "Marmara",
    departure: "İstanbul",
    transport: "Gemi",
    durationBucket: "1-3",
    period: "Yıl Boyu",
  },
  {
    id: "karadeniz",
    title: "Rize Ayder Yaylası ve Uzungöl",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200&auto=format&fit=crop",
    nights: 2,
    days: 3,
    price: 20000,
    region: "Karadeniz",
    departure: "Trabzon",
    transport: "Otobüs",
    durationBucket: "1-3",
    period: "Yaz",
  },
  {
    id: "pamukkale",
    title: "Pamukkale & Hierapolis Günübirlik",
    image:
      "https://images.unsplash.com/photo-1609582848250-8867287cab4c?q=80&w=1200&auto=format&fit=crop",
    nights: 0,
    days: 1,
    price: 1800,
    region: "Ege",
    departure: "Antalya",
    transport: "Otobüs",
    durationBucket: "1-3",
    period: "Yıl Boyu",
  },
  {
    id: "efes",
    title: "Efes Antik Kenti Rehberli Tur",
    image:
      "https://images.unsplash.com/photo-1607326948082-5f3199a5742f?q=80&w=1200&auto=format&fit=crop",
    nights: 1,
    days: 2,
    price: 1900,
    region: "Ege",
    departure: "İzmir",
    transport: "Otobüs",
    durationBucket: "1-3",
    period: "İlkbahar",
  },
  {
    id: "uludag",
    title: "Bursa Uludağ Kayak Turu",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=1200&auto=format&fit=crop",
    nights: 2,
    days: 3,
    price: 3400,
    region: "Marmara",
    departure: "Bursa",
    transport: "Otobüs",
    durationBucket: "1-3",
    period: "Kış",
  },
];

const REGIONS = [
  "Akdeniz",
  "Ege",
  "Karadeniz",
  "Marmara",
  "İç Anadolu",
  "Avrupa",
  "Orta Doğu",
];
const DEPARTURES = [
  "Antalya",
  "İstanbul",
  "İzmir",
  "Ankara",
  "Bursa",
  "Trabzon",
];
const TRANSPORTS = ["Uçak", "Otobüs", "Gemi", "Özel Araç"];
const DURATIONS: Tour["durationBucket"][] = ["1-3", "4-7", "8-10", "10+"];
const PERIODS = ["Yıl Boyu", "İlkbahar", "Yaz", "Sonbahar", "Kış"];

export default function Tours() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const [price, setPrice] = useState<[number, number]>([0, 50000]);
  const [regions, setRegions] = useState<string[]>([]);
  const [departures, setDepartures] = useState<string[]>([]);
  const [transports, setTransports] = useState<string[]>([]);
  const [durations, setDurations] = useState<Tour["durationBucket"][]>([]);
  const [periods, setPeriods] = useState<string[]>([]);
  const [sort, setSort] = useState("pop");

  useEffect(() => {
    const qp =
      searchParams.get("query") ||
      searchParams.get("q") ||
      searchParams.get("tur");
    if (qp) setQ(qp);
  }, [searchParams]);

  const suggestions = useMemo(
    () =>
      ALL_TOURS.map((t) => t.title)
        .concat(REGIONS)
        .filter((s, i, arr) => arr.indexOf(s) === i)
        .filter((s) => s.toLowerCase().includes(q.trim().toLowerCase()))
        .slice(0, 8),
    [q],
  );

  const filtered = useMemo(() => {
    let list = ALL_TOURS.filter((t) =>
      (t.title + " " + t.region + " " + t.departure)
        .toLowerCase()
        .includes(q.trim().toLowerCase()),
    ).filter((t) => t.price >= price[0] && t.price <= price[1]);

    if (regions.length) list = list.filter((t) => regions.includes(t.region));
    if (departures.length)
      list = list.filter((t) => departures.includes(t.departure));
    if (transports.length)
      list = list.filter((t) => transports.includes(t.transport));
    if (durations.length)
      list = list.filter((t) => durations.includes(t.durationBucket));
    if (periods.length) list = list.filter((t) => periods.includes(t.period));

    if (sort === "asc") list = list.slice().sort((a, b) => a.price - b.price);
    if (sort === "desc") list = list.slice().sort((a, b) => b.price - a.price);

    return list;
  }, [q, price, regions, departures, transports, durations, periods, sort]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : arr.concat(v));

  return (
    <div className="container max-w-7xl container-px py-8">
      {/* Only Tours Search */}
      <div className="rounded-2xl bg-white border shadow-sm p-4 sm:p-6 sticky top-20 z-10">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 relative">
          <div className="sm:col-span-10">
            <Label htmlFor="tour-search">Tur Ara</Label>
            <Input
              id="tour-search"
              placeholder="Örn. Moskova, Kapadokya, Ege Koyları..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setShowSuggest(true);
              }}
              onFocus={() => setShowSuggest(true)}
              onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
            />
            {showSuggest && q && suggestions.length > 0 && (
              <div className="absolute mt-1 w-full max-w-[unset] sm:max-w-none bg-white border rounded-md shadow-md p-1 sm:col-span-10">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-100 rounded"
                    onMouseDown={() => {
                      setQ(s);
                      setShowSuggest(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="sm:col-span-2 flex items-end">
            <button
              className="btn btn-primary h-10 w-full"
              onClick={() =>
                navigate(
                  q.trim()
                    ? `/tours?query=${encodeURIComponent(q.trim())}`
                    : "/tours",
                )
              }
            >
              Tur Ara
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="rounded-2xl border bg-white p-4 sm:p-6 shadow-sm">
            <h2 className="text-base font-semibold">Sonuçları Filtrele</h2>
            <div className="mt-4 space-y-6">
              {/* Fiyat Aralığı */}
              <div>
                <Label className="text-xs font-semibold">Fiyat Aralığı</Label>
                <div className="mt-3">
                  <Slider
                    value={price}
                    onValueChange={(v) =>
                      setPrice([v[0] ?? 0, v[1] ?? 0] as [number, number])
                    }
                    min={0}
                    max={100000}
                    step={100}
                    className="py-2"
                  />
                  <div className="mt-2 text-xs text-slate-600">
                    {price[0].toLocaleString("tr-TR")} TL -{" "}
                    {price[1].toLocaleString("tr-TR")} TL
                  </div>
                </div>
              </div>

              {/* Bölgelere göre Turlar */}
              <div>
                <Label className="text-xs font-semibold">
                  Bölgelere göre Turlar
                </Label>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {REGIONS.map((r) => (
                    <label
                      key={r}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={regions.includes(r)}
                        onCheckedChange={() => toggle(regions, setRegions, r)}
                        aria-label={r}
                      />
                      {r}
                    </label>
                  ))}
                </div>
              </div>

              {/* Çıkış Noktası */}
              <div>
                <Label className="text-xs font-semibold">Çıkış Noktası</Label>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {DEPARTURES.map((d) => (
                    <label
                      key={d}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={departures.includes(d)}
                        onCheckedChange={() =>
                          toggle(departures, setDepartures, d)
                        }
                        aria-label={d}
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>

              {/* Ulaşım Tipi */}
              <div>
                <Label className="text-xs font-semibold">Ulaşım Tipi</Label>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {TRANSPORTS.map((t) => (
                    <label
                      key={t}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={transports.includes(t)}
                        onCheckedChange={() =>
                          toggle(transports, setTransports, t)
                        }
                        aria-label={t}
                      />
                      {t}
                    </label>
                  ))}
                </div>
              </div>

              {/* Tur Süresi */}
              <div>
                <Label className="text-xs font-semibold">Tur Süresi</Label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {DURATIONS.map((b) => (
                    <label
                      key={b}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={durations.includes(b)}
                        onCheckedChange={() =>
                          toggle(durations, setDurations as any, b)
                        }
                        aria-label={b}
                      />
                      {b} gün
                    </label>
                  ))}
                </div>
              </div>

              {/* Tur Dönemi */}
              <div>
                <Label className="text-xs font-semibold">Tur Dönemi</Label>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {PERIODS.map((p) => (
                    <label
                      key={p}
                      className="inline-flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={periods.includes(p)}
                        onCheckedChange={() => toggle(periods, setPeriods, p)}
                        aria-label={p}
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              {/* Temizle */}
              <div className="pt-2">
                <button
                  className="btn btn-outline h-10 w-full"
                  onClick={() => {
                    setPrice([0, 50000]);
                    setRegions([]);
                    setDepartures([]);
                    setTransports([]);
                    setDurations([]);
                    setPeriods([]);
                  }}
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Results */}
        <main className="lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-slate-600">
              Toplam {filtered.length} tur listeleniyor
            </div>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Sırala</Label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 rounded-md border px-3 text-sm bg-white"
              >
                <option value="pop">Popüler</option>
                <option value="asc">Fiyat Artan</option>
                <option value="desc">Fiyat Azalan</option>
              </select>
            </div>
          </div>

          <div className="mt-3 space-y-4">
            {filtered.map((t) => (
              <article
                key={t.id}
                className="rounded-xl border bg-white shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                  <div className="sm:col-span-3 relative">
                    <img
                      src={t.image}
                      alt={t.title}
                      className="h-44 sm:h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="sm:col-span-6 p-4">
                    <h3 className="font-semibold text-slate-900 leading-snug">
                      {t.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                        {t.nights} Gece {t.days} Gün
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                        {t.region}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                        {t.departure} Çıkışlı
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                        {t.transport}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1">
                        {t.period}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">
                      Tüm gezi ve transferler dahil, rehber eşliğinde keyifli
                      bir deneyim.
                    </p>
                  </div>

                  <div className="sm:col-span-3 p-4 border-t sm:border-t-0 sm:border-l flex sm:flex-col items-center sm:items-end justify-between gap-3">
                    <div className="text-right">
                      <div className="text-xs text-slate-500">Kişi Başı</div>
                      <div className="text-xl font-extrabold text-primary">
                        {t.price.toLocaleString("tr-TR")} TL
                      </div>
                    </div>
                    <Link
                      className="btn btn-accent h-10 w-full sm:w-auto px-4"
                      to={`/tours/${t.id}`}
                    >
                      Tur İncele
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
