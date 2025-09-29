import { useEffect, useMemo, useState } from "react";
import YachtFilterSidebar, {
  type YachtFilters,
} from "@/components/yacht/YachtFilterSidebar";
import YachtCard from "@/components/yacht/YachtCard";
import { YACHTS, YACHT_FEATURES, type YachtType } from "@/lib/yachts";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function YachtList() {
  const q = useQuery();
  const mode = (q.get("mode") === "hourly" ? "hourly" : "daily") as
    | "hourly"
    | "daily";

  const [filters, setFilters] = useState<YachtFilters>(() => ({
    types: {
      Yat: false,
      Motoryat: false,
      Gulet: false,
      "Sürat Teknesi": false,
      Katamaran: false,
      Yelkenli: false,
    },
    price: [0, mode === "hourly" ? 10000 : 60000],
    marinas: Object.fromEntries(
      Array.from(new Set(YACHTS.map((y) => y.marina))).map((m) => [m, false]),
    ),
    minCapacity: 0,
    features: Object.fromEntries(YACHT_FEATURES.map((f) => [f.id, false])),
  }));

  const results = useMemo(() => {
    const activeTypes = Object.entries(filters.types)
      .filter(([, v]) => v)
      .map(([k]) => k as YachtType);
    const activeMarinas = Object.entries(filters.marinas)
      .filter(([, v]) => v)
      .map(([k]) => k);
    const activeFeatures = Object.entries(filters.features)
      .filter(([, v]) => v)
      .map(([k]) => k);

    return YACHTS.filter(
      (y) =>
        (activeTypes.length ? activeTypes.includes(y.type) : true) &&
        (activeMarinas.length ? activeMarinas.includes(y.marina) : true) &&
        y.capacity >= filters.minCapacity &&
        (activeFeatures.length
          ? activeFeatures.every((f) => y.features.includes(f))
          : true) &&
        (mode === "hourly" ? y.hourlyPriceFrom : y.dailyPriceFrom) >=
          filters.price[0] &&
        (mode === "hourly" ? y.hourlyPriceFrom : y.dailyPriceFrom) <=
          filters.price[1],
    ).slice(0, 12);
  }, [filters, mode]);

  return (
    <div className="container max-w-7xl container-px py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-extrabold">
          Saatlik Yat & Tekne Kiralama
        </h1>
        <div className="text-sm text-slate-600">
          Sıralama:{" "}
          <select className="border rounded px-2 py-1 text-sm">
            <option>Öne Çıkanlar</option>
            <option>En Düşük Fiyat</option>
          </select>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <YachtFilterSidebar
          mode={mode}
          filters={filters}
          onChange={(f) => setFilters((p) => ({ ...p, ...f }))}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {results.map((y) => (
            <YachtCard key={y.id} yacht={y} />
          ))}
        </div>
      </div>
    </div>
  );
}
