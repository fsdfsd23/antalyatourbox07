import { useEffect, useMemo, useRef, useState } from "react";
import * as L from "leaflet";
import type { LatLng } from "@/lib/geo";
import "leaflet/dist/leaflet.css";

interface Props {
  fromLabel: string;
  toLabel: string;
  from: LatLng | null;
  to: LatLng | null;
  distanceKm: number | null;
  durationText: string | null;
}

export default function MapSidebar({
  fromLabel,
  toLabel,
  from,
  to,
  distanceKm,
  durationText,
}: Props) {
  const center = useMemo<LatLng>(
    () => ({ lat: from?.lat ?? 36.8969, lng: from?.lng ?? 30.7133 }),
    [from],
  );
  const positions = useMemo(() => (from && to ? [from, to] : []), [from, to]);
  const [height, setHeight] = useState(320);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polyRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    const onResize = () =>
      setHeight(
        Math.max(240, Math.min(520, Math.floor(window.innerHeight * 0.45))),
      );
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Ensure single init
    if (!mapRef.current) {
      // Fix default icon URLs for bundlers
      const markerIcon = new URL(
        "../../node_modules/leaflet/dist/images/marker-icon.png",
        import.meta.url,
      ).href;
      const markerRetina = new URL(
        "../../node_modules/leaflet/dist/images/marker-icon-2x.png",
        import.meta.url,
      ).href;
      const markerShadow = new URL(
        "../../node_modules/leaflet/dist/images/marker-shadow.png",
        import.meta.url,
      ).href;
      (L.Icon.Default as any).mergeOptions({
        iconUrl: markerIcon,
        iconRetinaUrl: markerRetina,
        shadowUrl: markerShadow,
      });

      const map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: false,
      });
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);
      map.setView([center.lat, center.lng], 10);
    }

    const map = mapRef.current!;

    // Clear existing markers/polyline
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (polyRef.current) {
      polyRef.current.remove();
      polyRef.current = null;
    }

    // Add markers
    if (from) {
      const m = L.marker([from.lat, from.lng]).addTo(map);
      markersRef.current.push(m);
    }
    if (to) {
      const m = L.marker([to.lat, to.lng]).addTo(map);
      markersRef.current.push(m);
    }

    // Add polyline
    if (positions.length === 2) {
      const latlngs = positions.map((p) => [p.lat, p.lng] as [number, number]);
      polyRef.current = L.polyline(latlngs, { color: "#ef4444" }).addTo(map);
      const group = L.featureGroup([...markersRef.current, polyRef.current]);
      map.fitBounds(group.getBounds().pad(0.2));
    } else if (markersRef.current.length === 1) {
      map.setView([center.lat, center.lng], 10);
    }

    return () => {
      // Keep map alive between rerenders; cleanup on unmount handled below
    };
  }, [containerRef, center, positions, from, to]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <aside className="space-y-3">
      <div className="rounded-lg border overflow-hidden bg-white">
        <div ref={containerRef} style={{ height }} />
      </div>

      <div className="rounded-lg border bg-white p-3 text-sm">
        <div className="font-semibold mb-2">Rota Özeti</div>
        <div className="space-y-1">
          <div>
            <span className="text-slate-500">Alış:</span> {fromLabel || "-"}
          </div>
          <div>
            <span className="text-slate-500">Varış:</span> {toLabel || "-"}
          </div>
          <div>
            <span className="text-slate-500">Mesafe:</span>{" "}
            {distanceKm != null ? `${distanceKm.toFixed(1)} km` : "-"}
          </div>
          <div>
            <span className="text-slate-500">Süre:</span> {durationText ?? "-"}
          </div>
        </div>
      </div>
    </aside>
  );
}
