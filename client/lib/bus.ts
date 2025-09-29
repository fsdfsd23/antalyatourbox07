export type Gender = "M" | "F";

export interface Seat {
  no: number;
  taken: Gender | null;
}

export interface BusTrip {
  id: string;
  company: string;
  logo?: string;
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  depart: string; // HH:mm
  arrive: string; // HH:mm
  durationMin: number;
  price: number; // TL
  busType: string; // 2+1, 2+2, Travego...
  seats: Seat[];
}

const COMPANIES = [
  { id: "istanbul-seyahat", name: "İstanbul Seyahat" },
  { id: "kamil-koc", name: "Kamil Koç" },
  { id: "varan", name: "Varan" },
  { id: "metro", name: "Metro" },
  { id: "nilufer", name: "Nilüfer" },
];

// City centers (rough)
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Istanbul: { lat: 41.015137, lng: 28.97953 },
  "İstanbul": { lat: 41.015137, lng: 28.97953 },
  Izmir: { lat: 38.423733, lng: 27.142826 },
  "İzmir": { lat: 38.423733, lng: 27.142826 },
  Ankara: { lat: 39.92077, lng: 32.85411 },
  Antalya: { lat: 36.89689, lng: 30.71332 },
  Bursa: { lat: 40.195, lng: 29.06 },
  Eskisehir: { lat: 39.7767, lng: 30.5206 },
  "Eskişehir": { lat: 39.7767, lng: 30.5206 },
};

function formatTime(h: number, m: number) {
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function addMinutes(time: string, add: number) {
  const [h, m] = time.split(":").map((x) => parseInt(x));
  const date = new Date();
  date.setHours(h, m + add, 0, 0);
  return formatTime(date.getHours(), date.getMinutes());
}

function randomSeats(total: number): Seat[] {
  const seats: Seat[] = [];
  for (let i = 1; i <= total; i++) {
    const r = Math.random();
    seats.push({ no: i, taken: r < 0.65 ? (r < 0.325 ? "M" : "F") : null });
  }
  return seats;
}

export function generateTrips(from: string, to: string, date: string): BusTrip[] {
  const clean = (s: string) => s.trim() || "İstanbul";
  from = clean(from);
  to = clean(to);
  date = date || new Date().toISOString().slice(0, 10);
  const baseTime = 6; // 06:00 first trip
  const trips: BusTrip[] = [];
  for (let i = 0; i < 12; i++) {
    const company = COMPANIES[i % COMPANIES.length];
    const departH = baseTime + i;
    const depart = formatTime(departH % 24, [0, 15, 30, 45][i % 4]);
    const duration = 420 + (i % 5) * 20; // 7h..8h40m
    const arrive = addMinutes(depart, duration);
    const price = 650 + (i % 6) * 25;
    const seats = randomSeats(44);
    trips.push({
      id: `${company.id}-${depart.replace(":", "")}`,
      company: company.name,
      from,
      to,
      date,
      depart,
      arrive,
      durationMin: duration,
      price,
      busType: i % 2 === 0 ? "2+1" : "2+2",
      seats,
    });
  }
  return trips;
}

export function seatsSummary(seats: Seat[]) {
  const total = seats.length;
  const empty = seats.filter((s) => !s.taken).length;
  return { total, empty, taken: total - empty };
}

export function parseSelected(seatsParam: string | null): Array<{ no: number; gender: Gender }>{
  if (!seatsParam) return [];
  return seatsParam.split(",").map((p) => {
    const [no, g] = p.split("-");
    return { no: parseInt(no), gender: (g as Gender) || "M" };
  });
}
