"use client";

import { useState } from "react";
import { provinces } from "@/lib/site";

const kigaliDistricts = provinces["Kigali City"];

/* Placeholder listings from the design, until real Milk Zone locations are supplied. */
function zonesIn(district: string) {
  return [1, 2, 3].map((n) => ({
    name: `[Milk Zone name ${n}]`,
    address: `[Street address], ${district}`,
    hours: "[Opening hours]",
  }));
}

export function MilkZoneFinder() {
  const [district, setDistrict] = useState(kigaliDistricts[0]);
  const [area, setArea] = useState("");
  const zones = zonesIn(district);

  return (
    <div className="row" style={{ gap: 24, alignItems: "stretch" }}>
      <div className="stack" style={{ flex: "1 1 360px", minWidth: 0, gap: 16 }}>
        <div className="field">
          <label htmlFor="mz-district">District</label>
          <select id="mz-district" value={district} onChange={(e) => setDistrict(e.target.value)}>
            {kigaliDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="mz-area">
            Neighbourhood or landmark <span className="hint">(optional)</span>
          </label>
          <input
            id="mz-area"
            type="text"
            placeholder="e.g. Kimironko market"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <p className="caption" aria-live="polite">
          Showing Milk Zones in {district}
        </p>
        <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 12 }}>
          {zones.map((z) => (
            <li key={z.name} className="row-card row" style={{ justifyContent: "space-between", gap: 16, alignItems: "flex-start" }}>
              <div className="stack" style={{ gap: 4 }}>
                <span className="title">{z.name}</span>
                <span className="caption">{z.address}</span>
              </div>
              <div className="stack" style={{ gap: 4, alignItems: "flex-end" }}>
                <span className="caption">{z.hours}</span>
                <a className="more" href="#find">
                  Directions →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div role="img" aria-label="Map of Milk Zones" className="map-box" style={{ flex: "1 1 420px", minHeight: 420 }}>
        <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M0 210 C80 180 140 240 220 200 S340 150 400 170" fill="none" stroke="#8fd3f5" strokeWidth="10" opacity=".7" />
          <path d="M60 0 L120 300 M0 90 L400 140 M260 0 L300 300" stroke="#d3e3f2" strokeWidth="6" fill="none" />
          <circle cx="130" cy="120" r="9" fill="#005eaa" />
          <circle cx="250" cy="90" r="9" fill="#005eaa" />
          <circle cx="290" cy="200" r="9" fill="#005eaa" />
          <circle cx="180" cy="230" r="9" fill="#005eaa" />
        </svg>
        <span className="map-label">[Live map of Milk Zone locations]</span>
      </div>
    </div>
  );
}
