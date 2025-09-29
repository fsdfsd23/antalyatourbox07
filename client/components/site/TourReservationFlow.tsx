import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, Mail, Printer } from "lucide-react";

export interface TourReservationProps {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  tourTitle: string;
  tourCode: string;
  dateLabel: string;
  departureTimes: string; // comma separated times
  counts: { adults: number; children: number; infants: number };
  prices: { adult: number; child: number; infant: number };
}

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function TourReservationFlow({
  open,
  onOpenChange,
  tourTitle,
  tourCode,
  dateLabel,
  departureTimes,
  counts,
  prices,
}: TourReservationProps) {
  const [detailsOpen, setDetailsOpen] = useState(open);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [voucherOpen, setVoucherOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setDetailsOpen(true);
      setPaymentOpen(false);
      setVoucherOpen(false);
    }
  }, [open]);

  // left fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hotel, setHotel] = useState("");
  const [message, setMessage] = useState("");
  const times = useMemo(
    () =>
      departureTimes
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [departureTimes],
  );
  const [time, setTime] = useState(times[0] || "");

  // payment
  const [payMethod, setPayMethod] = useState<"card" | "agency" | null>(null);
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);
  const [agree3, setAgree3] = useState(false);

  // animated card state
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const voucherRef = useRef<HTMLDivElement>(null);
  const reservationCode = useMemo(() => generateCode(), [voucherOpen]);

  const total =
    counts.adults * prices.adult +
    counts.children * prices.child +
    counts.infants * prices.infant;

  const closeAll = () => {
    setDetailsOpen(false);
    setPaymentOpen(false);
    setVoucherOpen(false);
    onOpenChange(false);
  };

  const printVoucher = () => {
    const node = voucherRef.current;
    if (!node) return;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(
      `<html><head><title>Voucher</title></head><body>${node.outerHTML}</body></html>`,
    );
    win.document.close();
    win.focus();
    win.print();
  };

  const sendEmail = () => {
    const body = `Rezervasyon Kodu: ${reservationCode}%0D%0AAd Soyad: ${name}%0D%0ATur: ${tourTitle}%0D%0ATarih/Saat: ${dateLabel} ${time}%0D%0AKişiler: Yetişkin ${counts.adults}, Çocuk ${counts.children}, Bebek ${counts.infants}%0D%0AOtel: ${hotel}%0D%0ATur Kodu: ${tourCode}%0D%0AToplam: ${total.toLocaleString("tr-TR")} TL`;
    const subject = `Rezervasyon Onayı ${reservationCode}`;
    window.location.href = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <>
      <Dialog
        open={detailsOpen}
        onOpenChange={(o) => {
          setDetailsOpen(o);
          if (!o) onOpenChange(false);
        }}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Rezervasyon Bilgileri</DialogTitle>
            <DialogDescription>
              İletişim bilgilerinizi doldurun.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <Label>Ad Soyad</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <Label>E-posta</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Konaklanan Otel</Label>
                <Input
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                />
              </div>
              <div>
                <Label>Mesaj</Label>
                <Textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="rounded-md border p-4">
                <div className="font-semibold mb-2">Tur Özeti</div>
                <div className="text-sm space-y-1">
                  <div>
                    Tur: <span className="font-medium">{tourTitle}</span>
                  </div>
                  <div>
                    Tur Kodu:{" "}
                    <span className="font-mono font-semibold">{tourCode}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Rezervasyon Tarihi</span>
                    <span className="font-medium">{dateLabel}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span>Rezervasyon Saati</span>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="h-8 w-32">
                        <SelectValue placeholder="Saat" />
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span>Yetişkin</span>
                    <span>
                      {counts.adults} x {prices.adult.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Çocuk</span>
                    <span>
                      {counts.children} x {prices.child.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bebek</span>
                    <span>
                      {counts.infants} x {prices.infant.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Toplam</span>
                    <span>{total.toLocaleString("tr-TR")} TL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={() => {
                setDetailsOpen(false);
                setPaymentOpen(true);
              }}
            >
              Devam Et
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={paymentOpen}
        onOpenChange={(o) => {
          setPaymentOpen(o);
          if (!o) onOpenChange(false);
        }}
      >
        <DialogContent className="sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle>Ödeme</DialogTitle>
            <DialogDescription>Ödeme yöntemini seçin.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <div className="text-xs text-slate-600">
                    Visa / MasterCard
                  </div>
                </label>
                <label
                  className={`border rounded p-3 cursor-pointer ${payMethod === "agency" ? "ring-2 ring-primary" : ""}`}
                >
                  <input
                    type="radio"
                    name="pay"
                    className="hidden"
                    onChange={() => setPayMethod("agency")}
                  />
                  <div className="font-medium">Acenteye Ödeme</div>
                  <div className="text-xs text-slate-600">Ofiste ödeme</div>
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

              {payMethod === "agency" && (
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm">
                    <Checkbox
                      checked={agree1}
                      onCheckedChange={(c) => setAgree1(Boolean(c))}
                    />{" "}
                    <span>Sözleşmeyi okudum, kabul ediyorum.</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm">
                    <Checkbox
                      checked={agree2}
                      onCheckedChange={(c) => setAgree2(Boolean(c))}
                    />{" "}
                    <span>KVKK metnini okudum, kabul ediyorum.</span>
                  </label>
                  <label className="flex items-center gap-3 text-sm">
                    <Checkbox
                      checked={agree3}
                      onCheckedChange={(c) => setAgree3(Boolean(c))}
                    />{" "}
                    <span>Gizlilik sözleşmesini kabul ediyorum.</span>
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setPaymentOpen(false);
                    setDetailsOpen(true);
                  }}
                >
                  Geri
                </Button>
                <Button
                  onClick={() => {
                    if (payMethod === "agency" && !(agree1 && agree2 && agree3))
                      return;
                    setPaymentOpen(false);
                    setVoucherOpen(true);
                  }}
                >
                  Rezervasyonu Tamamla
                </Button>
              </div>
            </div>

            <div>
              <div className="rounded-md border p-4">
                <div className="font-semibold mb-2">Rezervasyon Özeti</div>
                <div className="text-sm space-y-1">
                  <div>
                    Ad Soyad: <span className="font-medium">{name || "-"}</span>
                  </div>
                  <div>
                    Tur: <span className="font-medium">{tourTitle}</span>
                  </div>
                  <div>
                    Tur Kodu:{" "}
                    <span className="font-mono font-semibold">{tourCode}</span>
                  </div>
                  <div>
                    Tarih/Saat: {dateLabel} {time}
                  </div>
                  <div>Otel: {hotel || "-"}</div>
                  <div>
                    Kişiler: Yetişkin {counts.adults}, Çocuk {counts.children},
                    Bebek {counts.infants}
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between">
                    <span>Yetişkin</span>
                    <span>
                      {counts.adults} x {prices.adult.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Çocuk</span>
                    <span>
                      {counts.children} x {prices.child.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bebek</span>
                    <span>
                      {counts.infants} x {prices.infant.toLocaleString("tr-TR")}{" "}
                      TL
                    </span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Toplam</span>
                    <span>{total.toLocaleString("tr-TR")} TL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={voucherOpen}
        onOpenChange={(o) => {
          setVoucherOpen(o);
          if (!o) closeAll();
        }}
      >
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Rezervasyon Tamamlandı</DialogTitle>
            <DialogDescription>Voucher bilgileri aşağıdadır.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div ref={voucherRef} className="rounded-md border p-4 bg-white">
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle2 className="h-6 w-6" />
                <div className="text-xl font-extrabold">Onaylandı</div>
              </div>
              <div className="text-center text-2xl font-extrabold tracking-widest mt-1">
                {reservationCode}
              </div>
              <div className="text-center text-xs text-slate-500 mb-3">
                Rezervasyon Numarası
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-semibold">Rezervasyon Sahibi</div>
                  <div>{name}</div>
                  <div>
                    {email} • {phone}
                  </div>
                  <div>Otel: {hotel || "-"}</div>
                </div>
                <div>
                  <div className="font-semibold">Tur Bilgileri</div>
                  <div>{tourTitle}</div>
                  <div>Tur Kodu: {tourCode}</div>
                  <div>
                    Tarih/Saat: {dateLabel} {time}
                  </div>
                  <div>Otelden Kalkış Saatleri: {departureTimes}</div>
                </div>
                <div>
                  <div className="font-semibold">Kişi Sayıları</div>
                  <div>
                    Yetişkin: {counts.adults}, Çocuk: {counts.children}, Bebek:{" "}
                    {counts.infants}
                  </div>
                </div>
                <div>
                  <div className="font-semibold">Toplam Fiyat</div>
                  <div>
                    Yetişkin:{" "}
                    {(counts.adults * prices.adult).toLocaleString("tr-TR")} TL
                  </div>
                  <div>
                    Çocuk:{" "}
                    {(counts.children * prices.child).toLocaleString("tr-TR")}{" "}
                    TL
                  </div>
                  <div>
                    Bebek:{" "}
                    {(counts.infants * prices.infant).toLocaleString("tr-TR")}{" "}
                    TL
                  </div>
                  <div className="text-lg font-bold text-primary mt-1">
                    Genel Toplam: {total.toLocaleString("tr-TR")} TL
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={printVoucher}>
                <Printer className="h-4 w-4 mr-2" /> Yazdır
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={sendEmail}>
                  <Mail className="h-4 w-4 mr-2" /> E-posta Adresine Gönder
                </Button>
                <Button onClick={closeAll}>Kapat</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
