export type YachtType =
  | "Yat"
  | "Motoryat"
  | "Gulet"
  | "Sürat Teknesi"
  | "Katamaran"
  | "Yelkenli";

export interface YachtFeature {
  id: string;
  name: string;
}

export interface Yacht {
  id: string;
  name: string;
  type: YachtType;
  capacity: number; // kişi
  location: string; // Bölge
  marina: string; // İskele/Marina
  hourlyPriceFrom: number; // TL
  dailyPriceFrom: number; // TL
  mealIncluded?: boolean;
  features: string[]; // ids of YachtFeature
  images: string[];
  video?: string; // youtube/vimeo/embed url
  piers: string[]; // çıkış iskeleleri
  lengthMeters?: number;
  cruiseCapacity?: number;
  mealCapacity?: number;
  supplier?: string;
  rating?: number; // 0..5
  ratingCount?: number;
  coords?: { lat: number; lng: number };
  usageTerms?: string[];
  offeredFacilities?: string[];
  boatSpecs?: string[];
  safety?: string[];
}

export const YACHT_FEATURES: YachtFeature[] = [
  { id: "kaptanli", name: "Kaptanlı" },
  { id: "yemekli", name: "Yemekli" },
  { id: "wc", name: "WC" },
  { id: "muzik", name: "Müzik Sistemi" },
  { id: "klima", name: "Klima" },
  { id: "guneslenme", name: "Güneşlenme Alanı" },
];

const img = (q: string) =>
  `https://images.unsplash.com/${q}?q=80&w=1200&auto=format&fit=crop`;

export const YACHTS: Yacht[] = [
  {
    id: "my-antalya-1",
    name: "M/Y Akdeniz",
    type: "Motoryat",
    capacity: 8,
    location: "Antalya",
    marina: "Antalya Marina",
    hourlyPriceFrom: 3000,
    dailyPriceFrom: 18000,
    mealIncluded: false,
    features: ["kaptanli", "muzik", "wc"],
    images: [
      img("photo-1508264165352-258a6ee07b11"),
      img("photo-1544551763-7ef0381456d1"),
      img("photo-1518837695005-2083093ee35b"),
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    piers: ["Antalya Marina", "Liman Mah. İskele"],
    lengthMeters: 18,
    cruiseCapacity: 10,
    mealCapacity: 8,
    supplier: "Ege SeaYachts",
    rating: 4.8,
    ratingCount: 42,
    coords: { lat: 36.881, lng: 30.675 },
    usageTerms: [
      "Kaptan ve yakıt dahildir",
      "Dış yiyecek/içecek kabul edilir",
      "Maks. hızda seyir yapılmaz",
    ],
    offeredFacilities: ["Müzik Sistemi", "WC", "Güneşlenme Alanı"],
    boatSpecs: ["Radar", "GPS", "Buzdolabı"],
    safety: ["Can Yeleği", "Yangın Söndürücü", "İlkyardım"],
  },
  {
    id: "my-antalya-2",
    name: "M/Y Lara",
    type: "Yat",
    capacity: 10,
    location: "Antalya",
    marina: "Lara Marina",
    hourlyPriceFrom: 3200,
    dailyPriceFrom: 20000,
    features: ["kaptanli", "muzik", "guneslenme"],
    images: [
      img("photo-1482192505345-5655af888cc4"),
      img("photo-1519671482749-fd09be7ccebf"),
      img("photo-1469474968028-56623f02e42e"),
    ],
    piers: ["Lara Marina"],
  },
  {
    id: "my-antalya-3",
    name: "M/Y Lara",
    type: "Yat",
    capacity: 10,
    location: "Antalya",
    marina: "Lara Marina",
    hourlyPriceFrom: 3200,
    dailyPriceFrom: 20000,
    features: ["kaptanli", "muzik", "guneslenme"],
    images: [
      img("photo-1482192505345-5655af888cc4"),
      img("photo-1519671482749-fd09be7ccebf"),
      img("photo-1469474968028-56623f02e42e"),
    ],
    piers: ["Lara Marina"],
    lengthMeters: 16,
    cruiseCapacity: 10,
    mealCapacity: 8,
    supplier: "Lara Yachting",
    rating: 4.6,
    ratingCount: 28,
    coords: { lat: 36.856, lng: 30.887 },
  },
  {
    id: "gulet-kemer-1",
    name: "Gulet Kemer",
    type: "Gulet",
    capacity: 12,
    location: "Kemer",
    marina: "Kemer Marina",
    hourlyPriceFrom: 2800,
    dailyPriceFrom: 16000,
    mealIncluded: true,
    features: ["yemekli", "wc", "muzik"],
    images: [
      img("photo-1507525428034-b723cf961d3e"),
      img("photo-1500375592092-40eb2168fd21"),
      img("photo-1437623889155-075d40e2e59f"),
    ],
    piers: ["Kemer Marina"],
  },
  {
    id: "gulet-kas-1",
    name: "Gulet Kaş",
    type: "Gulet",
    capacity: 16,
    location: "Kaş",
    marina: "Kaş Marina",
    hourlyPriceFrom: 3500,
    dailyPriceFrom: 22000,
    features: ["yemekli", "wc", "muzik", "guneslenme"],
    images: [
      img("photo-1468413253725-0d5181091126"),
      img("photo-1504711434969-e33886168f5c"),
      img("photo-1506744038136-46273834b3fb"),
    ],
    piers: ["Kaş Marina", "Limanağzı"],
  },
  {
    id: "katamaran-antalya-1",
    name: "Katamaran Deniz",
    type: "Katamaran",
    capacity: 20,
    location: "Antalya",
    marina: "Setur Marina",
    hourlyPriceFrom: 5000,
    dailyPriceFrom: 30000,
    features: ["kaptanli", "klima", "wc"],
    images: [
      img("photo-1505852679233-d9fd70aff56d"),
      img("photo-1519120944692-746b1f2c0f3b"),
      img("photo-1517957754645-708b3a98cc8b"),
    ],
    piers: ["Setur Marina"],
  },
  {
    id: "suratteknesi-olympos-1",
    name: "Sürat 1",
    type: "Sürat Teknesi",
    capacity: 5,
    location: "Olympos",
    marina: "Çıralı Sahil",
    hourlyPriceFrom: 1500,
    dailyPriceFrom: 9000,
    features: ["kaptanli"],
    images: [
      img("photo-1483683804023-6ccdb62f86ef"),
      img("photo-1534082753658-1dcb40af0bda"),
      img("photo-1473186578172-c141e6798cf4"),
    ],
    piers: ["Çıralı Sahil"],
  },
  {
    id: "yelkenli-kas-1",
    name: "Yelkenli Hope",
    type: "Yelkenli",
    capacity: 6,
    location: "Kaş",
    marina: "Kaş Marina",
    hourlyPriceFrom: 2200,
    dailyPriceFrom: 13000,
    features: ["wc"],
    images: [
      img("photo-1501785888041-af3ef285b470"),
      img("photo-1504714146340-959ca07b6f74"),
      img("photo-1507525428034-b723cf961d3e"),
    ],
    piers: ["Kaş Marina"],
  },
  {
    id: "motoryat-bodrum-1",
    name: "Bodrum Star",
    type: "Motoryat",
    capacity: 12,
    location: "Bodrum",
    marina: "Bodrum Marina",
    hourlyPriceFrom: 6000,
    dailyPriceFrom: 36000,
    features: ["kaptanli", "klima", "muzik", "wc"],
    images: [
      img("photo-1526481280698-8fcc13fd9d0d"),
      img("photo-1504196606672-aef5c9cefc92"),
      img("photo-1500375592092-40eb2168fd21"),
    ],
    piers: ["Bodrum Marina"],
  },
  {
    id: "gulet-bodrum-2",
    name: "Gulet Mavi",
    type: "Gulet",
    capacity: 14,
    location: "Bodrum",
    marina: "Bodrum Marina",
    hourlyPriceFrom: 4000,
    dailyPriceFrom: 24000,
    features: ["yemekli", "muzik", "guneslenme"],
    images: [
      img("photo-1473172707857-f9e276582ab6"),
      img("photo-1459664018906-085c36f472af"),
      img("photo-1500375592092-40eb2168fd21"),
    ],
    piers: ["Bodrum Marina"],
  },
  {
    id: "katamaran-marmaris-1",
    name: "Katamaran Pearl",
    type: "Katamaran",
    capacity: 18,
    location: "Marmaris",
    marina: "Marmaris Marina",
    hourlyPriceFrom: 5200,
    dailyPriceFrom: 31000,
    features: ["kaptanli", "wc"],
    images: [
      img("photo-1474073705359-5da2a8270c64"),
      img("photo-1470137430626-983a37b8ea46"),
      img("photo-1500375592092-40eb2168fd21"),
    ],
    piers: ["Marmaris Marina"],
  },
  {
    id: "yelkenli-antalya-2",
    name: "Yelkenli Breeze",
    type: "Yelkenli",
    capacity: 8,
    location: "Antalya",
    marina: "Setur Marina",
    hourlyPriceFrom: 2600,
    dailyPriceFrom: 15000,
    features: ["wc", "guneslenme"],
    images: [
      img("photo-1493558103817-58b2924bce98"),
      img("photo-1517957754645-708b3a98cc8b"),
      img("photo-1519120944692-746b1f2c0f3b"),
    ],
    piers: ["Setur Marina"],
  },
  {
    id: "suratteknesi-bodrum-2",
    name: "Sürat 2",
    type: "Sürat Teknesi",
    capacity: 4,
    location: "Bodrum",
    marina: "Gümbet",
    hourlyPriceFrom: 1400,
    dailyPriceFrom: 8000,
    features: ["kaptanli"],
    images: [
      img("photo-1493558103817-58b2924bce98"),
      img("photo-1470137430626-983a37b8ea46"),
      img("photo-1459664018906-085c36f472af"),
    ],
    piers: ["Gümbet"],
  },
  {
    id: "motoryat-cesme-1",
    name: "Çeşme Pearl",
    type: "Motoryat",
    capacity: 10,
    location: "Çeşme",
    marina: "Çeşme Marina",
    hourlyPriceFrom: 4800,
    dailyPriceFrom: 29000,
    features: ["kaptanli", "klima", "wc"],
    images: [
      img("photo-1519677100203-a0e668c92439"),
      img("photo-1517957754645-708b3a98cc8b"),
      img("photo-1504714146340-959ca07b6f74"),
    ],
    piers: ["Çeşme Marina"],
  },
];

export interface ExtrasItem {
  id: string;
  name: string;
  price: number; // TL per person/unit
}

export const MENU_OPTIONS: ExtrasItem[] = [
  { id: "kahvalti", name: "Serpme Kahvaltı", price: 950 },
  { id: "klasik-menu", name: "Klasik Yemek Menüsü", price: 1250 },
  { id: "luks-kokteyl", name: "Lüks Kokteyl", price: 750 },
  { id: "balik-izgara", name: "Mevsim Balığı Izgara", price: 1250 },
];

export const EXTRA_SERVICES_YACHT: ExtrasItem[] = [
  { id: "foto", name: "Fotoğraf/Video Çekimi", price: 1500 },
  { id: "transfer", name: "Otel Transferi", price: 900 },
  { id: "dekor", name: "Özel Dekorasyon", price: 1200 },
];

export const ENTERTAINMENT_PACKAGES: ExtrasItem[] = [
  { id: "dj", name: "DJ & Ses Sistemi", price: 3000 },
  { id: "canli-muzik", name: "Canlı Müzik Trio", price: 4500 },
  { id: "animasyon", name: "Animasyon Ekibi", price: 2500 },
];
