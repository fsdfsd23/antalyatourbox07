import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function BusRouteMap({ from, to }: { from: { lat: number; lng: number }; to: { lat: number; lng: number } }) {
  const center: [number, number] = [
    (from.lat + to.lat) / 2,
    (from.lng + to.lng) / 2,
  ];
  const line: [number, number][] = [
    [from.lat, from.lng],
    [to.lat, to.lng],
  ];
  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border">
      <MapContainer center={center as any} zoom={6} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Polyline positions={line as any} color="#ef4444" />
        <Marker position={[from.lat, from.lng] as any} />
        <Marker position={[to.lat, to.lng] as any} />
      </MapContainer>
    </div>
  );
}
