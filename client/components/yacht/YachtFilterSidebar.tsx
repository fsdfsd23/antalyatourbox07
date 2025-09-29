import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { YACHT_FEATURES, YachtType, YACHTS } from "@/lib/yachts";
import { Anchor, Sailboat, Ship, Waves, Wind, LifeBuoy } from "lucide-react";

const typeIcons: Record<YachtType, React.ComponentType<any>> = {
  Yat: Ship,
  Motoryat: Ship,
  Gulet: Anchor,
  "Sürat Teknesi": Waves,
  Katamaran: Sailboat,
  Yelkenli: Wind,
};

export interface YachtFilters {
  types: Record<YachtType, boolean>;
  price: [number, number]; // min, max
  marinas: Record<string, boolean>;
  minCapacity: number;
  features: Record<string, boolean>;
}

export default function YachtFilterSidebar({
  filters,
  onChange,
  mode,
}: {
  filters: YachtFilters;
  onChange: (f: Partial<YachtFilters>) => void;
  mode: "hourly" | "daily";
}) {
  const marinaList = Array.from(new Set(YACHTS.map((y) => y.marina))).sort();

  return (
    <aside className="w-full lg:w-72">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filtrele</h3>
          <button
            className="text-xs text-primary underline"
            onClick={() =>
              onChange({
                types: {
                  Yat: false,
                  Motoryat: false,
                  Gulet: false,
                  "Sürat Teknesi": false,
                  Katamaran: false,
                  Yelkenli: false,
                },
                price: [0, 100000],
                marinas: Object.fromEntries(marinaList.map((m) => [m, false])),
                minCapacity: 0,
                features: Object.fromEntries(
                  YACHT_FEATURES.map((f) => [f.id, false]),
                ),
              })
            }
          >
            Hepsini Temizle
          </button>
        </div>

        <Separator className="my-3" />

        <section>
          <h4 className="text-sm font-medium mb-2">Tekne Tipi</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(filters.types).map(([type, active]) => {
              const Icon = typeIcons[type as YachtType];
              return (
                <button
                  key={type}
                  className={`border rounded-md p-2 text-xs flex flex-col items-center gap-1 ${active ? "border-primary bg-primary/5" : "hover:bg-muted"}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onChange({ types: { ...filters.types, [type]: !active } });
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type}</span>
                </button>
              );
            })}
          </div>
        </section>

        <Separator className="my-3" />

        <section>
          <h4 className="text-sm font-medium">
            Fiyat Aralığı ({mode === "hourly" ? "Saatlik" : "Günlük"})
          </h4>
          <div className="mt-3">
            <Slider
              value={[filters.price[0], filters.price[1]]}
              min={0}
              max={mode === "hourly" ? 10000 : 60000}
              step={100}
              onValueChange={([min, max]) => onChange({ price: [min, max] })}
            />
            <div className="mt-2 text-xs text-slate-600 flex justify-between">
              <span>₺ {filters.price[0].toLocaleString("tr-TR")}</span>
              <span>₺ {filters.price[1].toLocaleString("tr-TR")}</span>
            </div>
          </div>
        </section>

        <Separator className="my-3" />

        <section>
          <h4 className="text-sm font-medium mb-2">Tekne Konumu</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {marinaList.map((m) => (
              <label key={m} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={filters.marinas[m] || false}
                  onCheckedChange={(v) =>
                    onChange({
                      marinas: { ...filters.marinas, [m]: Boolean(v) },
                    })
                  }
                />
                <span>{m}</span>
              </label>
            ))}
          </div>
        </section>

        <Separator className="my-3" />

        <section>
          <h4 className="text-sm font-medium mb-2">Kapasite (min)</h4>
          <Slider
            value={[filters.minCapacity]}
            min={0}
            max={30}
            step={1}
            onValueChange={([v]) => onChange({ minCapacity: v })}
          />
          <div className="mt-2 text-xs">{filters.minCapacity} kişi</div>
        </section>

        <Separator className="my-3" />

        <section>
          <h4 className="text-sm font-medium mb-2">Tekne Özellikleri</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {YACHT_FEATURES.map((f) => (
              <label key={f.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={filters.features[f.id] || false}
                  onCheckedChange={(v) =>
                    onChange({
                      features: { ...filters.features, [f.id]: Boolean(v) },
                    })
                  }
                />
                <span>{f.name}</span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
