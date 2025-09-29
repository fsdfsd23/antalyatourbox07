import { useYachtRental } from "@/context/YachtRentalContext";
import {
  ENTERTAINMENT_PACKAGES,
  EXTRA_SERVICES_YACHT,
  MENU_OPTIONS,
} from "@/lib/yachts";

export interface ReservationSummaryProps {
  fullName?: string;
  email?: string;
  phone?: string;
  time?: string; // preferred time HH:mm
  pier?: string;
}

export default function ReservationSummary({
  fullName,
  email,
  phone,
  time,
  pier,
}: ReservationSummaryProps) {
  const { yacht, search, passengers, quantities, totals } = useYachtRental();
  if (!yacht || !search) return null;

  const allExtras = [
    ...MENU_OPTIONS,
    ...EXTRA_SERVICES_YACHT,
    ...ENTERTAINMENT_PACKAGES,
  ];
  const selectedExtras = Object.entries(quantities)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => {
      const item = allExtras.find((i) => i.id === id)!;
      return {
        id,
        name: item.name,
        price: item.price,
        qty,
        total: item.price * qty,
      };
    });

  const modeLabel = search.mode === "hourly" ? "Saatlik" : "Günlük";
  const unitCount =
    search.mode === "hourly" ? search.hours || 1 : search.days || 1;
  const unitPrice =
    search.mode === "hourly" ? yacht.hourlyPriceFrom : yacht.dailyPriceFrom;

  return (
    <div className="space-y-3 text-sm">
      <div className="font-bold text-base">Seçilen Tekne</div>
      <div className="border rounded-md p-3 space-y-1">
        <div className="font-semibold">{yacht.name}</div>
        <div className="text-slate-600">{yacht.supplier || "Tedarikçi"}</div>
        <div className="text-slate-600">Yolcu Kapasitesi: {yacht.capacity}</div>
      </div>

      <div className="font-bold text-base">Rezervasyon Bilgileri</div>
      <div className="border rounded-md p-3 space-y-1">
        <div>
          Tarih:{" "}
          <strong>
            {search.date || new Date().toISOString().slice(0, 10)}
          </strong>
        </div>
        <div>
          Saat: <strong>{time || "—"}</strong>
        </div>
        <div>
          Çıkış İskelesi: <strong>{pier || yacht.piers[0]}</strong>
        </div>
        <div>
          {modeLabel} Ücret:{" "}
          <strong>₺ {unitPrice.toLocaleString("tr-TR")}</strong>
        </div>
        <div>
          {modeLabel} Sayısı: <strong>{unitCount}</strong>
        </div>
        <div>
          Yolcu Sayısı: <strong>{passengers}</strong>
        </div>
      </div>

      {selectedExtras.length > 0 && (
        <div>
          <div className="font-bold text-base">Seçilen Ekstra Hizmetler</div>
          <ul className="border rounded-md divide-y">
            {selectedExtras.map((e) => (
              <li key={e.id} className="p-2 flex items-center justify-between">
                <span>
                  {e.name} × {e.qty}
                </span>
                <span className="font-semibold">
                  ₺ {e.total.toLocaleString("tr-TR")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div className="border rounded-md p-2">
          <div className="text-slate-500">Ana Tekne Ücreti</div>
          <div className="font-bold text-lg">
            ₺ {totals.base.toLocaleString("tr-TR")}
          </div>
        </div>
        <div className="border rounded-md p-2">
          <div className="text-slate-500">Ekstralar</div>
          <div className="font-bold text-lg">
            ₺ {totals.extras.toLocaleString("tr-TR")}
          </div>
        </div>
        <div className="col-span-2 border rounded-md p-2 text-right">
          <div className="text-slate-500">Toplam</div>
          <div className="text-xl font-extrabold">
            ₺ {totals.total.toLocaleString("tr-TR")}
          </div>
        </div>
      </div>

      {(fullName || email || phone) && (
        <div>
          <div className="font-bold text-base">Misafir Bilgileri</div>
          <div className="border rounded-md p-3 space-y-1">
            {fullName && (
              <div>
                Ad Soyad: <strong>{fullName}</strong>
              </div>
            )}
            {email && (
              <div>
                E-posta: <strong>{email}</strong>
              </div>
            )}
            {phone && (
              <div>
                GSM: <strong>{phone}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
