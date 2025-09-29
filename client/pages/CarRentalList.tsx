import { useEffect, useMemo, useState } from "react";
import Stepper from "@/components/rental/Stepper";
import FilterSidebar, { type Filters } from "@/components/rental/FilterSidebar";
import CarCard from "@/components/rental/CarCard";
import { CARS, type Car } from "@/lib/cars";
import { useCarRental } from "@/context/CarRentalContext";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function CarRentalList() {
  const { setSearch, days } = useCarRental();
  const q = useQuery();

  useEffect(() => {
    const pickupLocation = q.get("pickup");
    const dropoffLocation = q.get("dropoff") || undefined;
    const pickupAt = q.get("pickupAt");
    const returnAt = q.get("returnAt");
    if (pickupLocation && pickupAt && returnAt) {
      setSearch({ pickupLocation, dropoffLocation, pickupAt, returnAt });
    }
  }, []);

  const [filters, setFilters] = useState<Filters>({
    classes: { Ekonomik: false, Orta: false, SUV: false, Minibüs: false, Lüks: false },
    fuels: { Benzin: false, Dizel: false, Hibrit: false, Elektrik: false },
    transmissions: { Otomatik: false, Manuel: false },
  });

  const filteredCars = useMemo(() => {
    const cls = Object.entries(filters.classes).filter(([, v]) => v).map(([k]) => k);
    const fuels = Object.entries(filters.fuels).filter(([, v]) => v).map(([k]) => k);
    const tr = Object.entries(filters.transmissions).filter(([, v]) => v).map(([k]) => k);
    return CARS.filter((c) =>
      (cls.length ? cls.includes(c.class) : true) &&
      (fuels.length ? fuels.includes(c.fuel) : true) &&
      (tr.length ? tr.includes(c.transmission) : true),
    );
  }, [filters]);

  const onReset = () =>
    setFilters({
      classes: { Ekonomik: false, Orta: false, SUV: false, Minibüs: false, Lüks: false },
      fuels: { Benzin: false, Dizel: false, Hibrit: false, Elektrik: false },
      transmissions: { Otomatik: false, Manuel: false },
    });

  return (
    <div>
      <Stepper step={1} />
      <div className="container max-w-7xl container-px py-6">
        <h1 className="text-xl sm:text-2xl font-extrabold">Araç Sınıfını Seç</h1>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4">
          <FilterSidebar cars={CARS} filters={filters} onChange={(f) => setFilters((p) => ({ ...p, ...f }))} onReset={onReset} />
          <div className="space-y-3">
            {filteredCars.map((car) => (
              <CarCard key={car.id} car={car as Car} totalDays={days} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
