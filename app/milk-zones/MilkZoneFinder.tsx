"use client";

import { useState } from "react";
import { LazyMilkZoneMap } from "@/components/maps/lazy";
import { milkZones, provinceOf } from "@/lib/milk-zones";
import { provinces } from "@/lib/site";

const provinceNames = Object.keys(provinces);

export function MilkZoneFinder() {
  const [province, setProvince] = useState(""); // "" = all of Rwanda
  const [district, setDistrict] = useState(""); // "" = all districts in the province
  const zones = milkZones.filter((z) =>
    district ? z.district === district : province ? provinceOf(z.district) === province : true,
  );
  const where = district || province || "Rwanda";

  return (
    <div className="row" style={{ gap: 24, alignItems: "stretch" }}>
      <div className="stack" style={{ flex: "1 1 360px", minWidth: 0, gap: 16 }}>
        <div className="field">
          <label htmlFor="mz-province">Province</label>
          <select
            id="mz-province"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setDistrict("");
            }}
          >
            <option value="">All of Rwanda</option>
            {provinceNames.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        {province && (
          <div className="field">
            <label htmlFor="mz-district">District</label>
            <select id="mz-district" value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">All districts</option>
              {provinces[province].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        )}
        <p className="caption" aria-live="polite">
          {zones.length > 0
            ? `Showing ${zones.length} Milk Zone${zones.length === 1 ? "" : "s"} in ${where}`
            : `No Milk Zone listed in ${where} yet`}
        </p>
        <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 12, maxHeight: 560, overflowY: "auto" }}>
          {zones.map((z) => (
            <li key={`${z.longitude},${z.latitude}`} className="row-card row" style={{ justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
              <div className="stack" style={{ gap: 4 }}>
                <span className="title">{z.name}</span>
                <span className="caption">{[z.address, z.district].filter(Boolean).join(" · ")}</span>
                {z.phone && <a className="caption" href={`tel:${z.phone.replace(/\s/g, "")}`}>{z.phone}</a>}
              </div>
              <a
                className="more"
                href={`https://www.google.com/maps/dir/?api=1&destination=${z.latitude},${z.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Directions →
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: "1 1 420px", minHeight: 420, display: "flex" }}>
        <LazyMilkZoneMap zones={zones} />
      </div>
    </div>
  );
}
