"use client";

import { useState } from "react";
import { SentNotice } from "@/components/sections";

/* Front-end only: the application is not sent anywhere yet. Wire `onSubmit` to a Server Action or CRM. */
export function DistributorForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SentNotice
        badge="Application received"
        title="Thank you."
        body="Our commercial team will be in touch about distribution in your area."
        resetLabel="Send another"
        onReset={() => setSent(false)}
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
      <h3 className="heading">Distributor enquiry</h3>
      <div className="field">
        <label htmlFor="b-company">Company name</label>
        <input id="b-company" name="company" type="text" autoComplete="organization" required />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="b-name">Contact person</label>
          <input id="b-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="b-phone">Phone</label>
          <input id="b-phone" name="phone" type="tel" autoComplete="tel" placeholder="+250" required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="b-email">Email</label>
        <input id="b-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="b-area">Area you would serve</label>
        <input id="b-area" name="area" type="text" placeholder="District, province or country" />
      </div>
      <div className="field">
        <label htmlFor="b-msg">About your business</label>
        <textarea id="b-msg" name="message" placeholder="Vehicles, storage, current customers…" />
      </div>
      <button className="iy-btn iy-btn--primary" type="submit" style={{ alignSelf: "flex-start" }}>
        Send enquiry
      </button>
    </form>
  );
}
