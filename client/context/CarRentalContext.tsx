import { createContext, useContext, useMemo, useState } from "react";
import type { Car, ExtraService, InsurancePackage } from "@/lib/cars";
import { getCarById } from "@/lib/cars";

export interface RentalSearch {
  pickupLocation: string;
  dropoffLocation?: string;
  pickupAt: string; // ISO datetime (local)
  returnAt: string; // ISO datetime (local)
}

export interface RentalState {
  search?: RentalSearch;
  selectedCar?: Car;
  insurance?: InsurancePackage;
  extras: Record<string, ExtraService>;
}

interface Ctx extends RentalState {
  setSearch: (s: RentalSearch) => void;
  selectCar: (carId: string) => void;
  setInsurance: (p: InsurancePackage | undefined) => void;
  toggleExtra: (e: ExtraService) => void;
  clearExtras: () => void;
  days: number;
  totals: { base: number; insurance: number; extras: number; total: number };
}

const CarRentalContext = createContext<Ctx | undefined>(undefined);

export function CarRentalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<RentalState>({ extras: {} });

  const setSearch: Ctx["setSearch"] = (s) => setState((p) => ({ ...p, search: s }));
  const selectCar: Ctx["selectCar"] = (carId) =>
    setState((p) => ({ ...p, selectedCar: getCarById(carId), extras: p.extras || {} }));
  const setInsurance: Ctx["setInsurance"] = (ins) => setState((p) => ({ ...p, insurance: ins }));
  const toggleExtra: Ctx["toggleExtra"] = (e) =>
    setState((p) => {
      const extras = { ...(p.extras || {}) } as Record<string, ExtraService>;
      if (extras[e.id]) delete extras[e.id];
      else extras[e.id] = e;
      return { ...p, extras };
    });
  const clearExtras = () => setState((p) => ({ ...p, extras: {} }));

  const days = useMemo(() => {
    const { search } = state;
    if (!search) return 1;
    const start = new Date(search.pickupAt).getTime();
    const end = new Date(search.returnAt).getTime();
    const diff = Math.max(end - start, 0);
    const d = Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
    return d;
  }, [state.search]);

  const totals = useMemo(() => {
    const base = state.selectedCar ? state.selectedCar.pricePerDay * days : 0;
    const insurance = state.insurance ? state.insurance.pricePerDay * days : 0;
    const extras = Object.values(state.extras || {}).reduce((sum, e) => {
      if (e.perRental) return sum + e.price;
      return sum + e.price * days;
    }, 0);
    return { base, insurance, extras, total: base + insurance + extras };
  }, [state.selectedCar, state.insurance, state.extras, days]);

  const value: Ctx = {
    ...state,
    extras: state.extras || {},
    setSearch,
    selectCar,
    setInsurance,
    toggleExtra,
    clearExtras,
    days,
    totals,
  };

  return (
    <CarRentalContext.Provider value={value}>{children}</CarRentalContext.Provider>
  );
}

export function useCarRental() {
  const ctx = useContext(CarRentalContext);
  if (!ctx) throw new Error("useCarRental must be used within CarRentalProvider");
  return ctx;
}
