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
    const date = dateRef.current?.value || new Date().toISOString().slice(0, 10);
    const time = timeRef.current?.value || "12:00";
    navigate(`/transfer-sonuclar?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&time=${time}&rt=0`);
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
                  if (q) navigate(`/tours?query=${encodeURIComponent(q)}`);
                  else navigate(`/tours`);
                }}
              >
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Nereye?</label>
                  <input ref={tourRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir / Ülke" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Giriş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Çıkış</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="transfer">
              <form onSubmit={onTransferSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Alış Noktası</label>
                  <input ref={fromRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Havalimanı / Otel / Adres" required />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Varış Noktası</label>
                  <input ref={toRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Havalimanı / Otel / Adres" required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Tarih</label>
                  <input ref={dateRef} type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={new Date().toISOString().slice(0, 10)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Saat</label>
                  <input ref={timeRef} type="time" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue="12:00" />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="arac">
              <AracForm />
            </TabsContent>

            <TabsContent value="otel">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Şehir / İlçe</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Antalya / Bodrum" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Giriş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Çıkış</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Kişi</label>
                  <input type="number" min={1} defaultValue={2} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="lg:col-span-1 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="villa">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Bölge</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Kaş / Kalkan / Fethiye" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Giriş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Çıkış</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="yat">
              <YatForm />
            </TabsContent>

            <TabsContent value="cruise">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Kalkış Limanı</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="İstanbul / İzmir / Kuşadası" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Rota</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Ege Adaları / Akdeniz" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Gidiş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Dönüş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="otobus">
              <OtobusForm />
            </TabsContent>

            <TabsContent value="ucak">
              <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Nereden</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir / Havalimanı" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700">Nereye</label>
                  <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir / Havalimanı" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Gidiş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700">Dönüş</label>
                  <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="lg:col-span-6 flex items-end">
                  <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
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
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Alış Lokasyonu</label>
        <input ref={pickupRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir / Ofis" />
      </div>
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">İade Lokasyonu</label>
        <input ref={dropoffRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir / Ofis" disabled={!dropDifferent} />
        <label className="mt-1 flex items-center gap-2 text-xs"><Checkbox checked={dropDifferent} onCheckedChange={(c) => setDropDifferent(Boolean(c))} /> Farklı lokasyona bırakacağım</label>
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Alış</label>
        <input ref={pickupAtRef} type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={new Date().toISOString().slice(0,10)} />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">İade</label>
        <input ref={returnAtRef} type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={new Date(Date.now()+86400000).toISOString().slice(0,10)} />
      </div>
      <div className="lg:col-span-6 flex items-end">
        <button className="btn btn-primary h-11 w-full" type="button" onClick={() => navigate("/arac-kiralama")}>Ara</button>
      </div>
    </form>
  );
}

function YatForm() {
  const navigate = useNavigate();
  return (
    <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3" onSubmit={(e) => { e.preventDefault(); navigate("/yat-kiralama"); }}>
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Bölge</label>
        <input className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Antalya / Kaş / Kemer" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Tarih</label>
        <input type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Kişi</label>
        <input type="number" min={1} defaultValue={4} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
      </div>
      <div className="lg:col-span-6 flex items-end">
        <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
      </div>
    </form>
  );
}

function OtobusForm() {
  const navigate = useNavigate();
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const from = fromRef.current?.value?.trim() || "İstanbul";
        const to = toRef.current?.value?.trim() || "İzmir";
        const date = dateRef.current?.value || new Date().toISOString().slice(0, 10);
        navigate(`/otobus?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
      }}
    >
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Nereden</label>
        <input ref={fromRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir" defaultValue="İstanbul" />
      </div>
      <div className="lg:col-span-2">
        <label className="block text-xs font-semibold text-slate-700">Nereye</label>
        <input ref={toRef} className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Şehir" defaultValue="İzmir" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-700">Tarih</label>
        <input ref={dateRef} type="date" className="mt-2 h-11 w-full rounded-md border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" defaultValue={new Date().toISOString().slice(0, 10)} />
      </div>
      <div className="lg:col-span-1 flex items-end">
        <button className="btn btn-primary h-11 w-full" type="submit">Ara</button>
      </div>
    </form>
  );
}
