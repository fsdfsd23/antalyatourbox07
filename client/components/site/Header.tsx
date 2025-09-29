import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import TopBanner from "@/components/site/TopBanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const nav = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/destinations", label: "Destinasyonlar" },
  { to: "/tours", label: "Turlar" },
  { to: "/about", label: "Hakkımızda" },
  { to: "/contact", label: "İletişim" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [lang, setLang] = useState("TR");
  const [currency, setCurrency] = useState("TL");
  const [tourQuery, setTourQuery] = useState("");

  useEffect(() => {
    const d = localStorage.getItem("topBanner:dismissed");
    setShowBanner(d !== "1");
    const lsLang = localStorage.getItem("pref:lang");
    const lsCur = localStorage.getItem("pref:currency");
    if (lsLang) setLang(lsLang);
    if (lsCur) setCurrency(lsCur);
  }, []);

  useEffect(() => {
    localStorage.setItem("pref:lang", lang);
  }, [lang]);
  useEffect(() => {
    localStorage.setItem("pref:currency", currency);
  }, [currency]);

  useEffect(() => {
    try {
      const q = sessionStorage.getItem("tour:query") || "";
      setTourQuery(q);
    } catch {}
    const handler = (e: any) =>
      setTourQuery(e.detail || sessionStorage.getItem("tour:query") || "");
    window.addEventListener("tour:query", handler as any);
    return () => window.removeEventListener("tour:query", handler as any);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      {showBanner && (
        <TopBanner
          onClose={() => {
            localStorage.setItem("topBanner:dismissed", "1");
            setShowBanner(false);
          }}
        />
      )}

      <div className="container max-w-7xl container-px">
        <div className="flex items-center justify-end gap-4 py-1 text-xs text-slate-600">
          <div className="hidden sm:flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1">
              <span className="opacity-70">Dil:</span>
              <Select value={lang} onValueChange={setLang}>
                <SelectTrigger className="h-7 w-[90px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TR">TR - Türkçe</SelectItem>
                  <SelectItem value="EN">EN - English</SelectItem>
                  <SelectItem value="DE">DE - Deutsch</SelectItem>
                  <SelectItem value="RU">RU - Русский</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <span className="opacity-70">Para Birimi:</span>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="h-7 w-[90px] text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TL">TL - ₺</SelectItem>
                  <SelectItem value="USD">USD - $</SelectItem>
                  <SelectItem value="EUR">EUR - €</SelectItem>
                  <SelectItem value="GBP">GBP - £</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2"
              aria-label="Antalya Tourbox anasayfa"
            >
              <img
                src="https://antalyatourbox.com/image/cache/catalog/yeni-logo-400x84.png.webp"
                alt="Antalya Tourbox"
                className="h-9 w-auto"
                width={120}
                height={25}
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => {
              if (n.to === "/tours") {
                const to = tourQuery.trim()
                  ? `/tours?query=${encodeURIComponent(tourQuery.trim())}`
                  : "/tours";
                return (
                  <NavLink
                    key={n.to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                        isActive && "text-primary bg-primary/10",
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                );
              }
              return (
                <NavLink
                  key={n.to}
                  to={n.to}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                      isActive && "text-primary bg-primary/10",
                    )
                  }
                >
                  {n.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="#" className="btn btn-outline h-10 px-4">
              Giriş
            </Link>
            <Link to="#" className="btn btn-accent h-10 px-4">
              Hemen Rezervasyon
            </Link>
          </div>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menüyü Aç/Kapat"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-slate-700"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4">
            <nav className="grid gap-1">
              {nav.map((n) => {
                if (n.to === "/tours") {
                  const to = tourQuery.trim()
                    ? `/tours?query=${encodeURIComponent(tourQuery.trim())}`
                    : "/tours";
                  return (
                    <NavLink
                      key={n.to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                          isActive && "text-primary bg-primary/10",
                        )
                      }
                    >
                      {n.label}
                    </NavLink>
                  );
                }
                return (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100",
                        isActive && "text-primary bg-primary/10",
                      )
                    }
                  >
                    {n.label}
                  </NavLink>
                );
              })}
              <div className="flex items-center gap-2 pt-2">
                <Link to="#" className="btn btn-outline h-10 px-4 flex-1">
                  Giriş
                </Link>
                <Link to="#" className="btn btn-accent h-10 px-4 flex-1">
                  Rezervasyon
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
