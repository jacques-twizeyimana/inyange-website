"use client";

import { useEffect } from "react";
import { Map, MapControls, MapMarker, MarkerContent, MarkerTooltip, useMap } from "@/components/ui/map";
import type { MilkZone } from "@/lib/milk-zones";

function FitZones({ zones }: { zones: MilkZone[] }) {
  const { map } = useMap();
  useEffect(() => {
    if (!map || zones.length === 0) return;
    if (zones.length === 1) {
      map.flyTo({ center: [zones[0].longitude, zones[0].latitude], zoom: 14, duration: 800 });
      return;
    }
    const lngs = zones.map((z) => z.longitude);
    const lats = zones.map((z) => z.latitude);
    map.fitBounds(
      [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)],
      ],
      { padding: 60, maxZoom: 14, duration: 800 },
    );
  }, [map, zones]);
  return null;
}

export default function MilkZoneMap({ zones }: { zones: MilkZone[] }) {
  return (
    <Map theme="light" center={[29.9, -1.95]} zoom={7} scrollZoom={false}>
      <MapControls showZoom position="bottom-right" />
      <FitZones zones={zones} />
      {zones.map((z) => (
        <MapMarker key={`${z.longitude},${z.latitude}`} longitude={z.longitude} latitude={z.latitude}>
          <MarkerContent>
            <span
              aria-hidden="true"
              style={{ display: "block", width: 20, height: 20, borderRadius: 999, background: "var(--inyange-blue)", border: "4px solid #fff", boxShadow: "var(--shadow-raised)" }}
            />
          </MarkerContent>
          <MarkerTooltip>{z.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  );
}
