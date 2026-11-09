import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHead } from "@/components/sections";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Inyange Industries Ltd is a leading food processing company in Rwanda, making milk, milk products, mineral water and fruit juice since 1997.",
};

const journey = [
  { year: "1997", text: "The Inyange brand is born." },
  { year: "1999", text: "We begin processing pasteurised milk and yoghurt." },
  { year: "2001", text: "Inyange Mineral Water joins the range." },
  { year: "2010", text: "A US$27 million factory in Masaka multiplies our capacity tenfold." },
  { year: "2014", text: "The first Inyange Milk Zone opens in Kigali." },
  { year: "2016", text: "Partnership with a farmer cooperative for the Mukamira Dairy Plant." },
  { year: "2018", text: "Partnership with a farmer cooperative for the Giheke Dairy Plant." },
  { year: "2020", text: "Daily milk collection reaches 200,000 litres — up from 3,000 litres in 2009." },
  { year: "2021", text: "Work begins on the US$54 million Milk Powder Plant in Nyagatare." },
  { year: "2024", text: "Prime Minister Dr Édouard Ngirente inaugurates the Milk Powder Plant on 24 July." },
  { year: "2025", text: "Inyange instant whole milk powder launches for Rwandan homes." },
];

const plants = [
  {
    where: "Kigali",
    name: "Masaka factory",
    text: "Our main plant, on KN 3 Rd in Masaka. Milk, milk products, water and juice are processed and packed here.",
    brand: true,
  },
  {
    where: "Nyagatare District",
    name: "Milk Powder Plant",
    text: "Built to process 650,000 litres of milk a day into skimmed and whole milk powder, butter and ghee.",
    brand: true,
  },
  {
    where: "With farmer cooperatives",
    name: "Mukamira and Giheke dairy plants",
    text: "Run in partnership with dairy farmer cooperatives since 2016 and 2018.",
    brand: false,
  },
];

const community = [
  { figure: "42", text: "dairy farmer cooperatives supply our milk every day." },
  { figure: "Rwf 1.3 bn", text: "paid to farmers by the Milk Powder Plant between April and June 2024." },
  { figure: "270", text: "permanent jobs at the Milk Powder Plant, and hundreds more along the value chain." },
  { figure: "Rwf 10 bn", text: "injected into Rwanda’s economy each year by the plant, approximately." },
];

const certifications = [
  { name: "ISO 22000", text: "Food safety management" },
  { name: "Rwanda FDA", text: "Rwanda Food and Drugs Authority" },
  { name: "RSB", text: "Rwanda Standards Board" },
  { name: "Halal", text: "Halal certification" },
];

const pressDocs = [
  { label: "Press release (PDF) →", href: "https://www.inyangeindustries.com/img/2024/Inyange%20MPP%20Launch%20Press%20Release.pdf" },
  { label: "Factsheet (PDF) →", href: "https://www.inyangeindustries.com/img/2024/Inyange%20MPP%20Launch%20Factsheet.pdf" },
  { label: "FAQs (PDF) →", href: "https://www.inyangeindustries.com/img/2024/Inyange%20MPP%20Launch%20FAQs.pdf" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Inyange Industries"
        title="Rwanda’s dairy, since 1997."
        titleMaxWidth={900}
        leadMaxWidth={720}
        lead="Inyange Industries Ltd is a leading food processing company in Rwanda. Under the Inyange brand we make milk, milk products, Inyange Mineral Water and fruit juice — in modern, hygienic plants, with milk from Rwandan farmers."
      />

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 16 }}>
            <p className="eyebrow">Who we are</p>
            <h2 className="display-l">A household name, made at home.</h2>
          </div>
          <div className="stack" style={{ gap: 16 }}>
            <p className="body-l">
              The Inyange brand began in 1997. In 1999 we started processing and selling pasteurised milk and yoghurt,
              and in 2001 we added Inyange Mineral Water.
            </p>
            <p className="plain">
              Demand for Inyange grew faster than our first plant could supply, so our shareholders invested US$27
              million in a new factory in Masaka, near Kigali — increasing our production capacity tenfold. Today we
              serve homes and businesses across Rwanda and sell regionally through certified distributors, taking part
              in the East African Community market.
            </p>
            <p className="plain">Inyange Industries is part of Crystal Ventures Ltd.</p>
          </div>
        </div>
      </section>

      <section id="journey" className="section" style={{ background: "var(--surface-sunken)" }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <SectionHead eyebrow="Our journey" title="From 3,000 litres a day to 200,000." maxWidth={9999} />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "0 32px" }}>
            {journey.map((j) => (
              <li key={j.year} className="stack" style={{ borderTop: "2px solid var(--control-border)", padding: "20px 0 28px", gap: 6 }}>
                <span className="stat-figure" style={{ fontSize: 32, lineHeight: "36px" }}>
                  {j.year}
                </span>
                <span>{j.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ gap: 32 }}>
          <SectionHead eyebrow="Where we make it" title="Our plants" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {plants.map((p) => (
              <article
                key={p.name}
                className={`stack${p.brand ? " on-brand" : ""}`}
                style={{
                  background: p.brand ? "var(--surface-brand)" : "var(--frost)",
                  color: p.brand ? "var(--on-brand)" : undefined,
                  borderRadius: "var(--radius-lg)",
                  padding: 32,
                  gap: 12,
                }}
              >
                <p className="eyebrow" style={{ color: p.brand ? "var(--on-brand)" : "var(--ink)" }}>
                  {p.where}
                </p>
                <h3 className="heading" style={p.brand ? { color: "var(--on-brand)" } : undefined}>
                  {p.name}
                </h3>
                <p className="plain">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band-deep on-brand">
        <div className="wrap stack" style={{ gap: 40, paddingTop: 96, paddingBottom: 96 }}>
          <div className="stack" style={{ gap: 12, maxWidth: 760 }}>
            <p className="eyebrow">Farmers and community</p>
            <h2 className="display-l" style={{ color: "var(--on-brand)" }}>
              When Rwandan farmers grow, we grow.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {community.map((c) => (
              <div key={c.figure} className="stack" style={{ gap: 6 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 44, lineHeight: "48px", fontWeight: 800 }}>{c.figure}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
          <p className="plain" style={{ fontSize: 13, lineHeight: "18px" }}>
            Sources: Inyange Milk Powder Plant factsheet (2024); DSF–IFAD case study on Inyange Industries (2023).
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2">
          <div className="stack" style={{ gap: 16 }}>
            <p className="eyebrow">Quality</p>
            <h2 className="display-l">Certified from farm to pack.</h2>
            <p className="body-l muted">
              We take pride in quality at every step, from buying raw milk to delivering the final product. Our products
              are certified to local and international standards.
            </p>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
            {certifications.map((c) => (
              <li
                key={c.name}
                className="stack"
                style={{ background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: "var(--radius-md)", padding: 20, gap: 4 }}
              >
                <span className="title">{c.name}</span>
                <span className="caption">{c.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
          <div className="cta-card is-frost">
            <p className="eyebrow" style={{ color: "var(--ink)" }}>
              Media
            </p>
            <h2 className="heading">Press materials</h2>
            <p className="plain">Download the Milk Powder Plant launch documents.</p>
            <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 8 }}>
              {pressDocs.map((d) => (
                <li key={d.href}>
                  <a className="more" href={d.href}>
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="cta-card is-brand on-brand">
            <p className="eyebrow">Careers</p>
            <h2 className="heading">Work with us</h2>
            <p className="plain">
              From the farm gate to the factory floor and the Milk Zone counter, we’re always looking for people who
              care about quality.
            </p>
            <Link className="iy-btn iy-btn--milk" href="/contact" style={{ marginTop: 8 }}>
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
