export interface LatLng {
  lat: number;
  lng: number;
}

export interface GeocodeResult extends LatLng {
  label: string;
}

export async function geocode(query: string): Promise<GeocodeResult | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query,
  )}`;
  const res = await fetch(url, {
    headers: {
      "Accept-Language": "tr",
      "User-Agent": "AntalyaTourbox-Fusion/1.0",
      Referer:
        typeof window !== "undefined"
          ? window.location.origin
          : "https://antalyatourbox.com",
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as Array<{
    lat: string;
    lon: string;
    display_name: string;
  }>;
  if (!data?.length) return null;
  const top = data[0];
  return {
    lat: parseFloat(top.lat),
    lng: parseFloat(top.lon),
    label: top.display_name,
  };
}

export function haversineKm(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const sinDLat = Math.sin(dLat / 2);
  const sinDLon = Math.sin(dLon / 2);
  const h =
    sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

export function estimateDuration(distanceKm: number) {
  // Assume average speed 60 km/h
  const hoursFloat = distanceKm / 60;
  const hours = Math.floor(hoursFloat);
  const minutes = Math.round((hoursFloat - hours) * 60);
  const text = `${hours > 0 ? hours + " sa " : ""}${minutes} dk`;
  return { hours, minutes, text };
}

export function formatKm(km: number) {
  return `${km.toFixed(1)} km`;
}

export async function computeRoute(from: string, to: string) {
  const [a, b] = await Promise.all([geocode(from), geocode(to)]);
  if (!a || !b) return null;
  const distanceKm = haversineKm(a, b);
  const duration = estimateDuration(distanceKm);
  return { from: a, to: b, distanceKm, duration };
}
