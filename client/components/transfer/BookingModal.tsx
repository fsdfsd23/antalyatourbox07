import { useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import tr from "date-fns/locale/tr";

import type { Vehicle } from "./VehicleList";

export interface BookingInit {
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  roundTrip: boolean;
  distanceKm: number;
}

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  vehicle: Vehicle | null;
  basePrice: number; // computed total for chosen direction(s) without extras
  init: BookingInit;
}

const EXTRAS = [
  { id: "baby", label: "Bebek Koltuğu", price: 50 },
  { id: "meet", label: "Meet & Greet", price: 70 },
  { id: "water", label: "Su & İçecek", price: 40 },
];

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function BookingModal({
  open,
  onOpenChange,
  vehicle,
  basePrice,
  init,
}: Props) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);
  const [roundTrip, setRoundTrip] = useState(init.roundTrip);
  const [date, setDate] = useState(init.date);
  const [time, setTime] = useState(init.time);
  const [returnDate, setReturnDate] = useState(init.date);
  const [returnTime, setReturnTime] = useState(init.time);
  const [extras, setExtras] = useState<string[]>([]);

  // Passenger + flight
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const [driverNote, setDriverNote] = useState("");

  // Payment
  const [payMethod, setPayMethod] = useState<"card" | "cash" | null>(null);
  const [agree, setAgree] = useState(false);

  // Card form
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const voucherRef = useRef<HTMLDivElement>(null);

  const extrasTotal = useMemo(
    () =>
      extras.reduce(
        (acc, id) => acc + (EXTRAS.find((e) => e.id === id)?.price || 0),
        0,
      ),
    [extras],
  );
  const total = useMemo(
    () => basePrice + extrasTotal,
    [basePrice, extrasTotal],
  );

  const reservationCode = useMemo(() => generateCode(), [step === 4]);

  const formatDate = (d: string, t: string) => {
    try {
      const iso = new Date(`${d}T${t}:00`);
      return format(iso, "d MMM yyyy, HH:mm", { locale: tr });
    } catch {
      return `${d} ${t}`;
    }
  };

  const printVoucher = () => {
    const node = voucherRef.current;
    if (!node) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      `<html><head><title>Voucher</title><link rel=stylesheet href="/client/global.css"></head><body>${node.outerHTML}</body></html>`,
    );
    win.document.close();
    win.focus();
    win.print();
  };

  const sendEmail = () => {
    const subject = `Rezervasyon Onayı ${reservationCode}`;
    const body = `Rezervasyon Kodu: ${reservationCode}%0D%0A\nAd Soyad: ${contactName}%0D%0A\nUçuş: ${flightNo}%0D%0A\nAraç: ${vehicle?.title}%0D%0A\nGidiş: ${formatDate(date, time)}%0D%0A\n${roundTrip ? `Dönüş: ${formatDate(returnDate, returnTime)}%0D%0A` : ""}\nKişi: Yetişkin ${adult}, Çocuk ${child}, Bebek ${infant}%0D%0A\nToplam: ${total.toLocaleString("tr-TR")} TL`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setStep(1);
      }}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Rezervasyon • {vehicle?.title}</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <Label>Yetişkin</Label>
                <Input
                  type="number"
                  min={1}
                  value={adult}
                  onChange={(e) => setAdult(parseInt(e.target.value || "0"))}
                />
              </div>
              <div>
                <Label>Çocuk</Label>
                <Input
                  type="number"
                  min={0}
                  value={child}
                  onChange={(e) => setChild(parseInt(e.target.value || "0"))}
                />
              </div>
              <div>
                <Label>Bebek</Label>
                <Input
                  type="number"
                  min={0}
                  value={infant}
                  onChange={(e) => setInfant(parseInt(e.target.value || "0"))}
                />
              </div>
              <div className="flex items-end gap-2">
                <Switch checked={roundTrip} onCheckedChange={setRoundTrip} />
                <Label>Gidiş + Dönüş</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <Label>Gidiş Tarihi</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <Label>Gidiş Saati</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              {roundTrip && (
                <>
                  <div>
                    <Label>Dönüş Tarihi</Label>
                    <Input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Dönüş Saati</Label>
                    <Input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="font-medium mb-2">Ek Hizmetler</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {EXTRAS.map((e) => (
                  <label
                    key={e.id}
                    className="flex items-center gap-2 rounded border p-2 cursor-pointer"
                  >
                    <Checkbox
                      checked={extras.includes(e.id)}
                      onCheckedChange={(c) => {
                        const checked = Boolean(c);
                        setExtras((prev) =>
                          checked
                            ? [...prev, e.id]
                            : prev.filter((x) => x !== e.id),
                        );
                      }}
                    />
                    <span className="text-sm flex-1">{e.label}</span>
                    <span className="text-xs text-slate-600">
                      +{e.price} TL
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-600">Toplam Fiyat</div>
              <div className="text-2xl font-bold text-primary">
                {total.toLocaleString("tr-TR")} TL
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                İptal
              </Button>
              <Button className="btn btn-primary" onClick={() => setStep(2)}>
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label>Ad Soyad</Label>
                <Input
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
              </div>
              <div>
                <Label>E-posta</Label>
                <Input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
              <div>
                <Label>Uçuş No</Label>
                <Input
                  value={flightNo}
                  onChange={(e) => setFlightNo(e.target.value)}
                  placeholder="TK123"
                />
              </div>
            </div>
            <div>
              <Label>Sürücüye Mesaj</Label>
              <Input
                value={driverNote}
                onChange={(e) => setDriverNote(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Geri
              </Button>
              <Button className="btn btn-primary" onClick={() => setStep(3)}>
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                className={`border rounded p-3 cursor-pointer ${payMethod === "card" ? "ring-2 ring-primary" : ""}`}
              >
                <input
                  type="radio"
                  name="pay"
                  className="hidden"
                  onChange={() => setPayMethod("card")}
                />
                <div className="font-medium">Kredi Kartı ile Ödeme</div>
                <div className="text-xs text-slate-600">Visa / MasterCard</div>
              </label>
              <label
                className={`border rounded p-3 cursor-pointer ${payMethod === "cash" ? "ring-2 ring-primary" : ""}`}
              >
                <input
                  type="radio"
                  name="pay"
                  className="hidden"
                  onChange={() => setPayMethod("cash")}
                />
                <div className="font-medium">Sürücüye Nakit Ödeme</div>
                <div className="text-xs text-slate-600">
                  Yolculuk sonunda ödeme
                </div>
              </label>
            </div>

            {payMethod === "card" && (
              <div className="grid gap-3">
                <div className="relative mx-auto w-full max-w-sm rounded-xl bg-gradient-to-tr from-primary to-rose-500 text-white p-4 shadow-lg transition-transform">
                  <div className="text-xs opacity-80">Kart Sahibi</div>
                  <div className="text-sm font-semibold tracking-wide">
                    {cardName || "AD SOYAD"}
                  </div>
                  <div className="mt-4 text-xs opacity-80">Kart Numarası</div>
                  <div className="text-lg font-mono tracking-widest">
                    {(
                      cardNumber
                        .replace(/\s+/g, "")
                        .padEnd(16, "•")
                        .match(/.{1,4}/g) || []
                    ).join(" ")}
                  </div>
                  <div className="mt-4 flex justify-between text-xs">
                    <div>
                      SKT: {(cardMonth || "MM") + "/" + (cardYear || "YY")}
                    </div>
                    <div>CVC: {cardCvc || "•••"}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Kart Sahibi</Label>
                    <Input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Kart Numarası</Label>
                    <Input
                      inputMode="numeric"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/(.{4})/g, "$1 ")
                            .trim(),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Ay</Label>
                    <Input
                      inputMode="numeric"
                      maxLength={2}
                      value={cardMonth}
                      onChange={(e) =>
                        setCardMonth(
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 2),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Yıl</Label>
                    <Input
                      inputMode="numeric"
                      maxLength={2}
                      value={cardYear}
                      onChange={(e) =>
                        setCardYear(
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 2),
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>CVC</Label>
                    <Input
                      inputMode="numeric"
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) =>
                        setCardCvc(
                          e.target.value.replace(/[^0-9]/g, "").slice(0, 4),
                        )
                      }
                    />
                  </div>
                </div>
              </div>
            )}

            {payMethod === "cash" && (
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={agree}
                    onCheckedChange={(c) => setAgree(Boolean(c))}
                  />
                  <span>
                    Sözleşme, KVKK ve Aydınlatma Metinlerini okudum, kabul
                    ediyorum.
                  </span>
                </label>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Geri
              </Button>
              <Button
                className="btn btn-primary"
                onClick={() => setStep(4)}
                disabled={payMethod === "cash" && !agree}
              >
                Ödemeyi Tamamla
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4">
            <div ref={voucherRef} className="rounded-md border p-4 bg-white">
              <div className="text-center text-2xl font-extrabold tracking-widest">
                {reservationCode}
              </div>
              <div className="text-center text-xs text-slate-500 mb-2">
                Rezervasyon Numarası
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-semibold">Rezervasyon Sahibi</div>
                  <div>{contactName}</div>
                  <div>
                    {contactEmail} • {contactPhone}
                  </div>
                  <div>
                    Ödeme:{" "}
                    {payMethod === "card" ? "Kredi Kartı" : "Sürücüye Nakit"}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Uçuş Bilgileri</div>
                  <div>Uçuş No: {flightNo || "-"}</div>
                  <div>Sürücü Notu: {driverNote || "-"}</div>
                </div>
                <div>
                  <div className="font-semibold">Araç ve Rota</div>
                  <div>{vehicle?.title}</div>
                  <div>
                    {init.from} → {init.to}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Tarih / Saat</div>
                  <div>Gidiş: {formatDate(date, time)}</div>
                  {roundTrip && (
                    <div>Dönüş: {formatDate(returnDate, returnTime)}</div>
                  )}
                </div>
                <div>
                  <div className="font-semibold">Kişi Sayıları</div>
                  <div>
                    Yetişkin: {adult}, Çocuk: {child}, Bebek: {infant}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Toplam</div>
                  <div className="text-xl font-bold text-primary">
                    {total.toLocaleString("tr-TR")} TL
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={printVoucher}>
                Yazdır
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={sendEmail}>
                  E-postana Gönder
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => onOpenChange(false)}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
