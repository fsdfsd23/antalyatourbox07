import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { generateTrips, parseSelected } from "@/lib/bus";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BusCheckout() {
  const q = useQuery();
  const navigate = useNavigate();
  const from = q.get("from") || "İstanbul";
  const to = q.get("to") || "İzmir";
  const date = q.get("date") || new Date().toISOString().slice(0, 10);
  const tripId = q.get("trip");
  const seatsParam = q.get("seats");

  const trips = useMemo(() => generateTrips(from, to, date), [from, to, date]);
  const trip = trips.find((t) => t.id === tripId) || trips[0];
  const selected = parseSelected(seatsParam);
  const subtotal = (selected.length || 0) * trip.price;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [holder, setHolder] = useState("");
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const valid = name && /.+@.+\..+/.test(email) && phone && holder && number.replace(/\s+/g, "").length >= 12 && /^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry) && cvc.length >= 3;

  return (
    <div className="container max-w-6xl container-px py-6 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
      <main className="space-y-4">
        <h1 className="text-2xl font-extrabold">Yolcu ve Ödeme Bilgileri</h1>
        <Card className="p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} />
            <Input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </Card>
        <Card className="p-4 space-y-4">
          <div className="font-semibold">Kredi Kartı</div>
          <div className="h-40" style={{ perspective: 1000 }}>
            <motion.div
              className="relative w-full h-full rounded-xl text-white"
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformStyle: "preserve-3d", background: "linear-gradient(135deg,#22c55e,#16a34a)" }}
            >
              <div className="absolute inset-0 p-4" style={{ backfaceVisibility: "hidden" }}>
                <div className="text-lg font-bold">VISA</div>
                <div className="mt-6 text-xl tracking-widest">{number || "•••• •••• •••• ••••"}</div>
                <div className="mt-6 flex justify-between text-sm">
                  <div>
                    <div>Kart Sahibi</div>
                    <div className="font-semibold">{holder || "AD SOYAD"}</div>
                  </div>
                  <div>
                    <div>Son Kullanma</div>
                    <div className="font-semibold">{expiry || "MM/YY"}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input placeholder="Kart Sahibi" value={holder} onChange={(e) => setHolder(e.target.value)} />
            <Input placeholder="Kart Numarası" value={number} onChange={(e) => setNumber(e.target.value.replace(/[^\d\s]/g, ""))} />
            <Input placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            <Input placeholder="CVC" value={cvc} onChange={(e) => setCvc(e.target.value)} />
          </div>
        </Card>
        <div className="flex justify-end">
          <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white text-lg font-extrabold px-6 py-6" disabled={!valid}
            onClick={() => {
              const code = Math.random().toString(36).toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
              const seats = selected.map((s) => `${s.no}-${s.gender}`).join(",");
              navigate(`/otobus/voucher?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&trip=${trip.id}&seats=${seats}&code=${code}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`);
            }}
          >Güvenli Ödeme Yap • ₺ {subtotal.toLocaleString("tr-TR")}</Button>
        </div>
      </main>
      <aside className="space-y-3">
        <Card className="p-4 text-sm space-y-1">
          <div className="font-semibold">Sefer Özeti</div>
          <div>{trip.company}</div>
          <div>{trip.from} → {trip.to}</div>
          <div>{date} {trip.depart} • Varış {trip.arrive}</div>
          <div>Koltuklar: {selected.map((s) => `${s.no}-${s.gender}`).join(", ")}</div>
          <div className="font-bold">Tutar: ₺ {subtotal.toLocaleString("tr-TR")}</div>
        </Card>
      </aside>
    </div>
  );
}
