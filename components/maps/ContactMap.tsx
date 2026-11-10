"use client";

import { Map, MapControls, MapMarker, MarkerContent, MarkerLabel } from "@/components/ui/map";
import { company } from "@/lib/site";

/** Inyange Industries, KN 3 Rd, Masaka, Kigali (approximate). */
export const inyangeLocation = { longitude: 30.1883, latitude: -1.9857 };

export default function ContactMap() {
  return (
    <Map theme="light" center={[inyangeLocation.longitude, inyangeLocation.latitude]} zoom={14} scrollZoom={false}>
      <MapControls showZoom position="bottom-right" />
      <MapMarker longitude={inyangeLocation.longitude} latitude={inyangeLocation.latitude}>
        <MarkerContent>
          <span
            aria-hidden="true"
            style={{ display: "block", width: 22, height: 22, borderRadius: 999, background: "var(--inyange-blue)", border: "4px solid #fff", boxShadow: "var(--shadow-raised)" }}
          />
          <MarkerLabel position="top">{company.name}</MarkerLabel>
        </MarkerContent>
      </MapMarker>
    </Map>
  );
}
