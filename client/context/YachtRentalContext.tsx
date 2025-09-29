import { createContext, useContext, useMemo, useState } from "react";
import type { Yacht } from "@/lib/yachts";
import {
  YACHTS,
  MENU_OPTIONS,
  EXTRA_SERVICES_YACHT,
  ENTERTAINMENT_PACKAGES,
} from "@/lib/yachts";

export type RentMode = "hourly" | "daily";

export interface YachtSearch {
  mode: RentMode;
  region: string;
  date?: string; // ISO date for daily
  days?: number;
  hours?: number;
}

export interface QtyMap {
  [id: string]: number;
}

interface State {
  search?: YachtSearch;
  yacht?: Yacht;
  quantities: QtyMap; // extras quantities
  passengers: number;
}

interface Ctx extends State {
  setSearch: (s: YachtSearch) => void;
  selectYacht: (id: string) => void;
  setPassengers: (n: number) => void;
  setQty: (id: string, qty: number) => void;
  clearExtras: () => void;
  totals: { base: number; extras: number; total: number };
}

const CtxImpl = createContext<Ctx | undefined>(undefined);

export function YachtRentalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<State>({ quantities: {}, passengers: 2 });

  const setSearch: Ctx["setSearch"] = (s) =>
    setState((p) => ({ ...p, search: s }));
  const selectYacht: Ctx["selectYacht"] = (id) =>
    setState((p) => ({ ...p, yacht: YACHTS.find((y) => y.id === id) }));
  const setPassengers: Ctx["setPassengers"] = (n) =>
    setState((p) => ({ ...p, passengers: Math.max(1, n) }));
  const setQty: Ctx["setQty"] = (id, qty) =>
    setState((p) => ({
      ...p,
      quantities: { ...p.quantities, [id]: Math.max(0, qty) },
    }));
  const clearExtras = () => setState((p) => ({ ...p, quantities: {} }));

  const totals = useMemo(() => {
    const base = (() => {
      if (!state.search || !state.yacht) return 0;
      return state.search.mode === "hourly"
        ? state.yacht.hourlyPriceFrom * (state.search.hours || 1)
        : state.yacht.dailyPriceFrom * (state.search.days || 1);
    })();

    const all = [
      ...MENU_OPTIONS,
      ...EXTRA_SERVICES_YACHT,
      ...ENTERTAINMENT_PACKAGES,
    ];
    const extras = Object.entries(state.quantities).reduce((sum, [id, qty]) => {
      const item = all.find((i) => i.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);

    return { base, extras, total: base + extras };
  }, [state.search, state.yacht, state.quantities]);

  const value: Ctx = {
    ...state,
    setSearch,
    selectYacht,
    setPassengers,
    setQty,
    clearExtras,
    totals,
  };
  return <CtxImpl.Provider value={value}>{children}</CtxImpl.Provider>;
}

export function useYachtRental() {
  const ctx = useContext(CtxImpl);
  if (!ctx)
    throw new Error("useYachtRental must be used within YachtRentalProvider");
  return ctx;
}
