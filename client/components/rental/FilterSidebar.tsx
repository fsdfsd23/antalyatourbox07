import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import type { Car, Class, Fuel, Transmission } from "@/lib/cars";

export interface Filters {
  classes: Record<Class, boolean>;
  fuels: Record<Fuel, boolean>;
  transmissions: Record<Transmission, boolean>;
}

export default function FilterSidebar({
  cars,
  filters,
  onChange,
  onReset,
}: {
  cars: Car[];
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
  onReset: () => void;
}) {
  const counts = useMemo(() => {
    const c: any = { class: {}, fuel: {}, transmission: {} };
    cars.forEach((car) => {
      c.class[car.class] = (c.class[car.class] || 0) + 1;
      c.fuel[car.fuel] = (c.fuel[car.fuel] || 0) + 1;
      c.transmission[car.transmission] = (c.transmission[car.transmission] || 0) + 1;
    });
    return c as {
      class: Record<Class, number>;
      fuel: Record<Fuel, number>;
      transmission: Record<Transmission, number>;
    };
  }, [cars]);

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="rounded-xl border bg-white p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filtreler</h3>
          <button className="text-xs text-primary underline" onClick={onReset}>
            Hepsini Temizle
          </button>
        </div>
        <Separator className="my-3" />

        <Section title="Araç Sınıfı">
          {Object.entries(filters.classes).map(([k, v]) => (
            <Row
              key={k}
              label={`${k} (${counts.class[k as Class] || 0})`}
              checked={v}
              onCheckedChange={(checked) =>
                onChange({ classes: { ...filters.classes, [k]: Boolean(checked) } as any })
              }
            />
          ))}
        </Section>

        <Separator className="my-3" />

        <Section title="Yakıt Tipi">
          {Object.entries(filters.fuels).map(([k, v]) => (
            <Row
              key={k}
              label={`${k} (${counts.fuel[k as Fuel] || 0})`}
              checked={v}
              onCheckedChange={(checked) =>
                onChange({ fuels: { ...filters.fuels, [k]: Boolean(checked) } as any })
              }
            />
          ))}
        </Section>

        <Separator className="my-3" />

        <Section title="Vites Tipi">
          {Object.entries(filters.transmissions).map(([k, v]) => (
            <Row
              key={k}
              label={`${k} (${counts.transmission[k as Transmission] || 0})`}
              checked={v}
              onCheckedChange={(checked) =>
                onChange({ transmissions: { ...filters.transmissions, [k]: Boolean(checked) } as any })
              }
            />
          ))}
        </Section>
      </div>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-slate-700">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Row({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox checked={checked} onCheckedChange={(v) => onCheckedChange(Boolean(v))} />
      <span>{label}</span>
    </label>
  );
}
