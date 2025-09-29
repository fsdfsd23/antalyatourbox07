import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function BusRouteMap({ from, to }: { from: { lat: number; lng: number }; to: { lat: number; lng: number } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const map = L.map(ref.current, { zoomControl: true, scrollWheelZoom: false });
    const tile = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors" });
    tile.addTo(map);

    const fromLatLng = L.latLng(from.lat, from.lng);
    const toLatLng = L.latLng(to.lat, to.lng);
    const group = L.featureGroup([
      L.marker(fromLatLng),
      L.marker(toLatLng),
      L.polyline([fromLatLng, toLatLng], { color: "#ef4444", weight: 4 }),
    ]).addTo(map);

    map.fitBounds(group.getBounds(), { padding: [20, 20] });

    return () => {
      map.remove();
    };
  }, [from.lat, from.lng, to.lat, to.lng]);

  return <div ref={ref} className="h-64 w-full rounded-lg overflow-hidden border" />;
}
