"use client";

import { useState } from "react";
import { SentNotice } from "@/components/sections";
import { allDistricts, company } from "@/lib/site";

/* Front-end only: the enquiry is not sent anywhere yet. Wire `onSubmit` to a Server Action or CRM. */
export function FranchiseForm() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const firstName = name.trim().split(/\s+/)[0];

  if (sent) {
    return (
      <SentNotice
        badge="Enquiry received"
        title={`Thank you${firstName ? `, ${firstName}` : ""}.`}
        body="Our Milk Zone team will call you within [response time] to talk about your location."
        resetLabel="Send another enquiry"
        onReset={() => {
          setSent(false);
          setName("");
        }}
      />
    );
  }

  return (
    <form
      className="stack"
      style={{ gap: 16 }}
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <h3 className="heading">Franchise enquiry</h3>
      <div className="field-row">
        <div className="field">
          <label htmlFor="fr-name">Full name</label>
          <input id="fr-name" name="name" type="text" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="fr-phone">Phone</label>
          <input id="fr-phone" name="phone" type="tel" autoComplete="tel" placeholder="+250" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="fr-email">Email</label>
        <input id="fr-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="fr-district">District</label>
          <select id="fr-district" name="district">
            {allDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="fr-premises">Do you have premises?</label>
          <select id="fr-premises" name="premises">
            <option>Yes, I have a location</option>
            <option>Not yet</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="fr-msg">Tell us about the location</label>
        <textarea id="fr-msg" name="message" placeholder="Street, landmarks, who passes by…" />
      </div>
      <button className="iy-btn iy-btn--primary" type="submit" style={{ alignSelf: "flex-start" }}>
        Send enquiry
      </button>
      <p className="hint plain">
        Prefer to talk? Call {company.phone} or email {company.email}.
      </p>
    </form>
  );
}
