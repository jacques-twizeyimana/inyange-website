"use client";

import Link from "next/link";
import { useState } from "react";
import { company, provinces } from "@/lib/site";

const provinceNames = Object.keys(provinces);
const buyerTypes = [
  "A shop or supermarket",
  "A hotel, restaurant or café",
  "A school, hospital or institution",
  "An office",
  "An event",
  "My home",
];
const families = ["Milk", "Milk products", "Water", "Juices"];

/* Placeholder listings from the design, until the distributor directory is supplied. */
function distributorsFor(province: string, district: string) {
  return [1, 2].map((n) => ({
    name: `[Distributor name ${n}]`,
    area: `Serves ${district} · ${province}`,
    address: `[Street address], ${district}`,
    phone: "[Phone number]",
  }));
}

export function DistributorFinder() {
  const [province, setProvince] = useState(provinceNames[0]);
  const [district, setDistrict] = useState(provinces[provinceNames[0]][0]);
  const results = distributorsFor(province, district);

  return (
    <div className="wrap row" style={{ gap: 32, alignItems: "flex-start" }}>
      <form
        aria-label="Find a distributor"
        className="panel stack"
        style={{ flex: "1 1 340px", minWidth: 0, gap: 18 }}
        onSubmit={(e) => {
          e.preventDefault();
          document.getElementById("results")?.focus();
        }}
      >
        <h2 className="heading">Your area</h2>
        <div className="field">
          <label htmlFor="d-province">Province</label>
          <select
            id="d-province"
            value={province}
            onChange={(e) => {
              setProvince(e.target.value);
              setDistrict(provinces[e.target.value][0]);
            }}
          >
            {provinceNames.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-district">District</label>
          <select id="d-district" value={district} onChange={(e) => setDistrict(e.target.value)}>
            {provinces[province].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="d-type">I’m buying for</label>
          <select id="d-type" name="buyer">
            {buyerTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <fieldset className="stack" style={{ border: 0, margin: 0, padding: 0, gap: 10 }}>
          <legend style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, padding: 0 }}>Products you need</legend>
          {families.map((f) => (
            <label key={f} className="check">
              <input type="checkbox" name="products" value={f} /> {f}
            </label>
          ))}
        </fieldset>
        <button className="iy-btn iy-btn--primary" type="submit">
          Show distributors
        </button>
      </form>

      <div className="stack" style={{ flex: "999 1 520px", minWidth: 0, gap: 16 }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <h2 id="results" tabIndex={-1} className="heading" aria-live="polite">
            Distributors serving {district}
          </h2>
          <span className="caption">{province}</span>
        </div>
        <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 16 }}>
          {results.map((r) => (
            <li
              key={r.name}
              style={{
                background: "var(--surface-raised)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                padding: 24,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 16,
                alignItems: "center",
              }}
            >
              <div className="stack" style={{ gap: 6 }}>
                <span className="iy-badge iy-badge--pasture" style={{ alignSelf: "flex-start" }}>
                  Certified distributor
                </span>
                <span className="title">{r.name}</span>
                <span className="caption">{r.area}</span>
              </div>
              <div className="stack" style={{ gap: 6, fontSize: 15 }}>
                <span>{r.address}</span>
                <span>{r.phone}</span>
              </div>
              <div className="row" style={{ gap: 10, justifyContent: "flex-end" }}>
                <a className="iy-btn iy-btn--outline iy-btn--small" href={company.phoneHref}>
                  Call
                </a>
                <a className="iy-btn iy-btn--primary iy-btn--small" href="#results">
                  Directions
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div
          className="row"
          style={{ background: "var(--frost)", borderRadius: "var(--radius-lg)", padding: 24, gap: 16, justifyContent: "space-between" }}
        >
          <div className="stack" style={{ gap: 4 }}>
            <span className="title">No distributor near you?</span>
            <span className="muted">Our sales team will connect you with the right one.</span>
          </div>
          <a className="iy-btn iy-btn--primary iy-btn--small" href={company.phoneHref}>
            Call {company.phone}
          </a>
        </div>
        <div
          className="row"
          style={{ background: "var(--surface-sunken)", borderRadius: "var(--radius-lg)", padding: 24, gap: 16, justifyContent: "space-between" }}
        >
          <div className="stack" style={{ gap: 4 }}>
            <span className="title">Buying a glass or a jerrycan of fresh milk?</span>
            <span className="muted">Visit your nearest Inyange Milk Zone.</span>
          </div>
          <Link className="more" href="/milk-zones#find">
            Find a Milk Zone →
          </Link>
        </div>
      </div>
    </div>
  );
}
