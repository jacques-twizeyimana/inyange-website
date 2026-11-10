"use client";

import { useState } from "react";
import { SentNotice } from "@/components/sections";

const topics = {
  Products: "customer care",
  "Orders and distribution": "sales",
  "Milk Zones": "Milk Zone",
  Media: "communications",
  Careers: "HR",
  "Something else": "Inyange",
} as const;
type Topic = keyof typeof topics;

/* Front-end only: the message is not sent anywhere yet. Wire `onSubmit` to a Server Action or email service. */
export function ContactForm() {
  const [topic, setTopic] = useState<Topic>("Products");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <SentNotice
        headingLevel={2}
        badge="Message sent"
        title="Thank you — we’ve got it."
        body={`The ${topics[topic]} team will get back to you by email or phone.`}
        resetLabel="Send another message"
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
      <h2 className="heading">Send us a message</h2>
      <div className="field">
        <label htmlFor="c-topic">What is it about?</label>
        <select id="c-topic" name="topic" value={topic} onChange={(e) => setTopic(e.target.value as Topic)}>
          {(Object.keys(topics) as Topic[]).map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="c-name">Full name</label>
          <input id="c-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="field">
          <label htmlFor="c-phone">
            Phone <span className="hint">(optional)</span>
          </label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="+250" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
        <textarea id="c-msg" name="message" required />
      </div>
      <button className="iy-btn iy-btn--primary" type="submit" style={{ alignSelf: "flex-start" }}>
        Send message
      </button>
    </form>
  );
}
