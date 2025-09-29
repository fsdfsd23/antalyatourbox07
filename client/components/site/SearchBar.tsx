import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

export default function SearchBar() {
  const navigate = useNavigate();
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const tourRef = useRef<HTMLInputElement>(null);
  const onTransferSubmit = (e: FormEvent) => {
    e.preventDefault();
    const from = fromRef.current?.value?.trim() || "";
    const to = toRef.current?.value?.trim() || "";
    if (!from || !to) return;
    const date =
      dateRef.current?.value || new Date().toISOString().slice(0, 10);
    const time = timeRef.current?.value || "12:00";
    navigate(
      `/transfer-sonuclar?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&time=${time}&rt=0`,
    );
  };
  return (
    <div id="search" className="-mt-10 relative z-10">
      <div className="container max-w-6xl container-px">
        <div className="rounded-2xl bg-white/95 shadow-xl ring-1 ring-black/5 backdrop-blur p-4 sm:p-6">
          <Tabs defaultValue="tur" className="w-full">
            <TabsList className="w-full overflow-x-auto">
              <div className="flex gap-1 w-full min-w-max">
                <TabsTrigger value="tur">TUR</TabsTrigger>
                <TabsTrigger value="transfer">TRANSFER</TabsTrigger>
                <TabsTrigger value="arac">ARAÇ KİRALAMA</TabsTrigger>
                <TabsTrigger value="otel">OTELLER</TabsTrigger>
                <TabsTrigger value="villa">VİLLA KİRALAMA</TabsTrigger>
                <TabsTrigger value="yat">YAT KİRALAMA</TabsTrigger>
                <TabsTrigger value="cruise">CRUISE TURLARI</TabsTrigger>
                <TabsTrigger value="otobus">OTOBÜS BİLETİ</TabsTrigger>
                <TabsTrigger value="ucak">UÇAK BİLETİ</TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="tur">
              <form
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = tourRef.current?.value?.trim() || "";
                  if (q) {
                    sessionStorage.setItem("tour:query", q);
                    window.dispatchEvent(
                      new CustomEvent("tour:query", { detail: q }),
                    );
                    navigate(`/tours?query=${encodeURIComponent(q)}`);
                  } else {
                    navigate(`/tours`);
                  }
                }}
              >
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nereye?
                  </label>
                  <input
                    ref={tourRef}
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şehir / Ülke"
                    onChange={(e) => {
                      const v = e.target.value;
                      sessionStorage.setItem("tour:query", v);
                      window.dispatchEvent(
                        new CustomEvent("tour:query", { detail: v }),
                      );
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Giriş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Çıkış
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="yat">
              <YatForm />
            </TabsContent>

            <TabsContent value="cruise">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Kalkış Limanı
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="İstanbul / İzmir / Kuşadası"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Rota
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ege Adaları / Akdeniz"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Gidiş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Dönüş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="transfer">
              <form
                onSubmit={onTransferSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
              >
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Alış Noktası
                  </label>
                  <input
                    ref={fromRef}
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Havalimanı / Otel / Adres"
                    required
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Varış Noktası
                  </label>
                  <input
                    ref={toRef}
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Havalimanı / Otel / Adres"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Tarih
                  </label>
                  <input
                    ref={dateRef}
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Saat
                  </label>
                  <input
                    ref={timeRef}
                    type="time"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="12:00"
                  />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="arac">
              <AracForm />
            </TabsContent>

            <TabsContent value="otel">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Şehir / İlçe
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Antalya / Bodrum"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Giriş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Çıkış
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Kişi
                  </label>
                  <input
                    type="number"
                    min={1}
                    defaultValue={2}
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="lg:col-span-1 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="villa">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Bölge
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Kaş / Kalkan / Fethiye"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Giriş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Çıkış
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="otobus">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nereden
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şehir"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nereye
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şehir"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Tarih
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="lg:col-span-1 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="ucak">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nereden
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şehir / Havalimanı"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">
                    Nereye
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Şehir / Havalimanı"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Gidiş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">
                    Dönüş
                  </label>
                  <input
                    type="date"
                    className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">
                    Ara
                  </button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function AracForm() {
  const navigate = useNavigate();
  const [dropDifferent, setDropDifferent] = useState(false);
  const pickupRef = useRef<HTMLInputElement>(null);
  const dropoffRef = useRef<HTMLInputElement>(null);
  const pickupAtRef = useRef<HTMLInputElement>(null);
  const returnAtRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const pickup = pickupRef.current?.value?.trim() || "";
        if (!pickup) return;
        const dropoff = dropDifferent
          ? dropoffRef.current?.value?.trim() || ""
          : "";
        const pickupAt =
          pickupAtRef.current?.value || new Date().toISOString().slice(0, 16);
        const returnAt =
          returnAtRef.current?.value ||
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16);
        const params = new URLSearchParams({ pickup, pickupAt, returnAt });
        if (dropDifferent && dropoff) params.set("dropoff", dropoff);
        navigate(`/arac-kiralama?${params.toString()}`);
      }}
    >
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">
          Alınış Lokasyonu
        </label>
        <input
          ref={pickupRef}
          className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Şehir / Ofis"
          required
        />
        <label className="mt-2 flex items-center gap-2 text-xs text-slate-700">
          <Checkbox
            checked={dropDifferent}
            onCheckedChange={(v) => setDropDifferent(Boolean(v))}
          />
          Farklı yerde bırakmak istiyorum
        </label>
      </div>

      {dropDifferent && (
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Bırakılış Lokasyonu
          </label>
          <input
            ref={dropoffRef}
            className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Şehir / Ofis"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-700">
          Alış Tarihi
        </label>
        <input
          ref={pickupAtRef}
          type="datetime-local"
          className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue={new Date().toISOString().slice(0, 16)}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">
          Teslim Tarihi
        </label>
        <input
          ref={returnAtRef}
          type="datetime-local"
          className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          defaultValue={new Date(Date.now() + 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 16)}
        />
      </div>
      <div className="flex items-end">
        <button className="btn btn-primary h-11 w-full" type="submit">
          Ara
        </button>
      </div>
    </form>
  );
}

function YatForm() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"hourly" | "daily">("hourly");
  const regionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const daysRef = useRef<HTMLInputElement>(null);
  const hoursRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const region = regionRef.current?.value?.trim() || "";
        const params = new URLSearchParams({ mode, region });
        if (mode === "hourly") {
          params.set(
            "hours",
            String(Math.max(1, Number(hoursRef.current?.value || 2))),
          );
        } else {
          const d =
            dateRef.current?.value || new Date().toISOString().slice(0, 10);
          params.set("date", d);
          params.set(
            "days",
            String(Math.max(1, Number(daysRef.current?.value || 1))),
          );
        }
        navigate(`/yat-kiralama?${params.toString()}`);
      }}
    >
      <div className="lg:col-span-2">
        <div className="flex gap-3 text-sm mb-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ymode"
              value="hourly"
              checked={mode === "hourly"}
              onChange={() => setMode("hourly")}
            />{" "}
            Saatlik Kiralama
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="ymode"
              value="daily"
              checked={mode === "daily"}
              onChange={() => setMode("daily")}
            />{" "}
            Günlük Kiralama
          </label>
        </div>
        <label className="block text-xs font-semibold text-slate-700">
          Bölge
        </label>
        <input
          ref={regionRef}
          className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Antalya / Bodrum / Marmaris"
        />
      </div>

      {mode === "hourly" ? (
        <div className="lg:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">
            Süre (saat)
          </label>
          <input
            ref={hoursRef}
            type="number"
            min={1}
            defaultValue={2}
            className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      ) : (
        <>
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Tarih
            </label>
            <input
              ref={dateRef}
              type="date"
              className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Gün (adet)
            </label>
            <input
              ref={daysRef}
              type="number"
              min={1}
              defaultValue={1}
              className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </>
      )}

      <div className="flex items-end">
        <button className="btn btn-primary h-11 w-full" type="submit">
          Ara
        </button>
      </div>
    </form>
  );
}
