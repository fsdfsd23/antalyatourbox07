export type Transmission = "Otomatik" | "Manuel";
export type Fuel = "Benzin" | "Dizel" | "Hibrit" | "Elektrik";
export type Class = "Ekonomik" | "Orta" | "SUV" | "Minibüs" | "Lüks";

export interface Car {
  id: string;
  brand: string;
  model: string;
  class: Class;
  seats: number;
  luggage: number;
  transmission: Transmission;
  fuel: Fuel;
  image: string;
  pricePerDay: number; // TL
  freeCancellation: boolean;
  airConditioning: boolean;
  upgradeTo?: string; // id of higher model
}

export interface InsurancePackage {
  id: string;
  name: string;
  description: string[];
  pricePerDay: number; // TL
}

export interface ExtraService {
  id: string;
  name: string;
  description: string;
  price: number; // TL (per day unless perRental true)
  perRental?: boolean;
}

export const CARS: Car[] = [
  {
    id: "hyundai-i20",
    brand: "Hyundai",
    model: "i20",
    class: "Ekonomik",
    seats: 5,
    luggage: 2,
    transmission: "Otomatik",
    fuel: "Benzin",
    image:
      "https://images.unsplash.com/photo-1511914265872-c40672584c9a?q=80&w=1200&auto=format&fit=crop",
    pricePerDay: 2308,
    freeCancellation: true,
    airConditioning: true,
    upgradeTo: "ford-puma",
  },
  {
    id: "ford-puma",
    brand: "Ford",
    model: "Puma",
    class: "SUV",
    seats: 5,
    luggage: 3,
    transmission: "Otomatik",
    fuel: "Benzin",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1f?q=80&w=1200&auto=format&fit=crop",
    pricePerDay: 2772,
    freeCancellation: true,
    airConditioning: true,
  },
  {
    id: "fiat-egea",
    brand: "Fiat",
    model: "Egea",
    class: "Orta",
    seats: 5,
    luggage: 3,
    transmission: "Manuel",
    fuel: "Dizel",
    image:
      "https://images.unsplash.com/photo-1570793166761-6086e0a23553?q=80&w=1200&auto=format&fit=crop",
    pricePerDay: 2440,
    freeCancellation: true,
    airConditioning: true,
  },
  {
    id: "ford-transit-courier",
    brand: "Ford",
    model: "Transit Courier",
    class: "Minibüs",
    seats: 5,
    luggage: 5,
    transmission: "Otomatik",
    fuel: "Benzin",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c46f3d6a2?q=80&w=1200&auto=format&fit=crop",
    pricePerDay: 2362,
    freeCancellation: true,
    airConditioning: true,
  },
];

export const INSURANCE_PACKAGES: InsurancePackage[] = [
  {
    id: "basic",
    name: "Basic",
    description: [
      "Temel hasar güvencesi",
      "7/24 Yol Yardım",
      "Limitli sorumluluk",
    ],
    pricePerDay: 0,
  },
  {
    id: "standard",
    name: "Standart",
    description: [
      "Orta seviye hasar güvencesi",
      "Cam-Far-Lastik koruma",
      "Düşük muafiyet",
    ],
    pricePerDay: 299,
  },
  {
    id: "premium",
    name: "Premium",
    description: [
      "Tam kapsamlı güvence",
      "Muafiyetsiz",
      "Kişisel eşya koruması",
    ],
    pricePerDay: 499,
  },
];

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: "baby-seat",
    name: "Bebek Koltuğu",
    description:
      "ECE R44/04 standartlarına uygun 9-18 kg için bebek koltuğu. Araç tesliminde koltuk sabitlenir.",
    price: 120,
  },
  {
    id: "additional-driver",
    name: "Ek Sürücü",
    description:
      "Sözleşmeye ikinci sürücünün eklenmesi. Ehliyet bilgileri teslimde kontrol edilir.",
    price: 199,
    perRental: true,
  },
  {
    id: "navigation",
    name: "Navigasyon",
    description: "Güncel haritalı GPS navigasyon cihazı.",
    price: 90,
  },
  {
    id: "wifi",
    name: "Araç İçi Wi‑Fi",
    description: "Sınırsız 4G mobil internet erişimi (adill kullanım politikası geçerlidir).",
    price: 150,
  },
];

export function getCarById(id: string): Car | undefined {
  return CARS.find((c) => c.id === id);
}
