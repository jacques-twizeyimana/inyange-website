import type { ReactNode } from "react";
import { WaveDivider } from "./WaveDivider";

/** Blue page-opening band with an eyebrow, headline and lead, poured into the page by a wave. */
export function PageHero({
  eyebrow,
  title,
  lead,
  titleMaxWidth,
  leadMaxWidth = 680,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  titleMaxWidth?: number;
  leadMaxWidth?: number;
  children?: ReactNode;
}) {
  return (
    <>
      <section className="band on-brand">
        <div className="wrap page-hero">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-xl" style={titleMaxWidth ? { maxWidth: titleMaxWidth } : undefined}>
            {title}
          </h1>
          <p className="body-l" style={{ maxWidth: leadMaxWidth }}>
            {lead}
          </p>
          {children}
        </div>
      </section>
      <WaveDivider />
    </>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  maxWidth = 720,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  maxWidth?: number;
}) {
  return (
    <div className="section-head" style={{ maxWidth }}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-l">{title}</h2>
      {lead && <p className="body-l muted">{lead}</p>}
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <>
      {items.map((item) => (
        <details key={item.q} className="faq">
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </>
  );
}

/** "Sent" confirmation shown in place of a form after it is submitted. */
export function SentNotice({
  badge,
  title,
  body,
  resetLabel,
  onReset,
  headingLevel = 3,
}: {
  badge: string;
  title: string;
  body: string;
  resetLabel: string;
  onReset: () => void;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="stack" role="status" style={{ gap: 12, alignItems: "flex-start", padding: "24px 0" }}>
      <span className="iy-badge iy-badge--pasture">{badge}</span>
      <H className="heading">{title}</H>
      <p className="plain muted">{body}</p>
      <button className="iy-btn iy-btn--outline iy-btn--small" type="button" onClick={onReset}>
        {resetLabel}
      </button>
    </div>
  );
}
