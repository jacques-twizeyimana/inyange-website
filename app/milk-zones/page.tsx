import type { Metadata } from "next";
import { CartonIcon, CheckIcon, GlassIcon, JerrycanIcon, YoghurtCupIcon } from "@/components/icons";
import { Faq, SectionHead } from "@/components/sections";
import { WaveDivider } from "@/components/WaveDivider";
import { FranchiseForm } from "./FranchiseForm";
import { MilkZoneFinder } from "./MilkZoneFinder";

export const metadata: Metadata = {
  title: "Milk Zones",
  description: "Inyange Milk Zones pour fresh pasteurised milk and Ikivuguto by the glass in neighbourhoods across Kigali.",
};

const offers = [
  { icon: GlassIcon, title: "Fresh milk by the glass", text: "Pasteurised, kept cold and ready to drink — hot or cold." },
  { icon: YoghurtCupIcon, title: "Ikivuguto", text: "Our fermented milk, the taste of home, by the glass or to take away." },
  { icon: JerrycanIcon, title: "Milk to take home", text: "Bring your own clean container or jerrycan and fill up — no packaging needed." },
  { icon: CartonIcon, title: "The Inyange range", text: "UHT milk, yoghurt, butter, water and juice on the shelf." },
];

const steps = [
  { title: "Collected each morning", text: "Farmers deliver milk to Inyange collection centres, where it is chilled straight away." },
  { title: "Pasteurised", text: "Milk Zones sell pasteurised milk only, so it is safe and ready to drink." },
  { title: "Delivered chilled", text: "Refrigerated vehicles bring it to each Milk Zone." },
  { title: "Poured from a cold tank", text: "It stays in a refrigerated tank until the moment it’s poured for you." },
];

const benefits = [
  { strong: "A trusted brand.", text: "Inyange has been Rwanda’s dairy name since 1997." },
  { strong: "Fresh supply.", text: "Pasteurised milk delivered chilled to your Milk Zone." },
  { strong: "The full range.", text: "Sell UHT milk, yoghurt, butter, water and juice too." },
];

export default function MilkZonesPage() {
  return (
    <>
      <section className="band on-brand" style={{ overflow: "hidden" }}>
        <div className="wrap grid-2" style={{ gap: 40, paddingTop: 64, paddingBottom: 24 }}>
          <div className="stack" style={{ alignItems: "flex-start", gap: 20 }}>
            <p className="eyebrow">Inyange Milk Zones</p>
            <h1 className="display-xl" style={{ color: "var(--on-brand)" }}>
              Fresh milk, by the glass.
            </h1>
            <p className="body-l" style={{ maxWidth: 540 }}>
              Milk Zones are Inyange’s neighbourhood milk bars. Every day, fresh pasteurised milk arrives chilled and is
              poured straight from a cold tank — to drink on the spot, to take home in your own container, or alongside
              the whole Inyange range.
            </p>
            <div className="row" style={{ gap: 20 }}>
              <a className="iy-btn iy-btn--milk" href="#find">
                Find a Milk Zone
              </a>
              <a className="more" href="#franchise">
                Open your own Milk Zone →
              </a>
            </div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 20, minHeight: 340, paddingTop: 24 }}>
            <svg viewBox="0 0 120 180" style={{ width: 120, height: 180 }}>
              <path d="M10 6 H110 L98 170 Q97 176 91 176 H29 Q23 176 22 170 Z" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
              <path d="M14 40 C40 30 60 46 84 38 S106 36 106 36 L97.5 164 Q97 170 91 170 H29 Q23 170 22.5 164 Z" fill="#ffffff" />
              <rect x="20" y="20" width="5" height="120" rx="2.5" fill="#ffffff" opacity=".35" />
            </svg>
            <svg viewBox="0 0 160 240" style={{ width: 170, height: 255 }}>
              <path d="M14 8 H146 L130 226 Q129 233 121 233 H39 Q31 233 30 226 Z" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinejoin="round" />
              <path d="M19 60 C50 48 80 70 112 58 S141 54 141 54 L129.5 218 Q129 226 121 226 H39 Q31 226 30.5 218 Z" fill="#ffffff" />
              <rect x="26" y="26" width="6" height="160" rx="3" fill="#ffffff" opacity=".35" />
            </svg>
            <JerrycanIcon strokeWidth={1.2} style={{ width: 150, height: 150, color: "#ffffff" }} />
          </div>
        </div>
      </section>
      <WaveDivider />

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <SectionHead eyebrow="At every Milk Zone" title="What you’ll find" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {offers.map(({ icon: Icon, title, text }) => (
              <div key={title} className="tile">
                <Icon className="tile-icon" />
                <h3 className="title">{title}</h3>
                <p className="plain muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface-sunken)" }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <SectionHead eyebrow="How it stays fresh" title="From the farm to your glass, cold all the way." />
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <li key={s.title} className="stack" style={{ gap: 10 }}>
                <span
                  aria-hidden="true"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "var(--radius-pill)",
                    background: "var(--inyange-blue)",
                    color: "var(--on-brand)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                <h3 className="title">{s.title}</h3>
                <p className="plain muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="find" className="section">
        <div className="wrap stack" style={{ gap: 32 }}>
          <SectionHead eyebrow="Find a Milk Zone" title="There’s one near you." lead="Choose your district to see Milk Zones nearby." />
          <MilkZoneFinder />
        </div>
      </section>

      <section id="franchise" className="band on-brand">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: 48, paddingTop: 96, paddingBottom: 96 }}>
          <div className="stack" style={{ gap: 20 }}>
            <p className="eyebrow">Franchise</p>
            <h2 className="display-l" style={{ color: "var(--on-brand)" }}>
              Open an Inyange Milk Zone.
            </h2>
            <p className="body-l">
              Milk Zones are run by local owners in partnership with Inyange. Bring a good location and a love for your
              neighbourhood — we bring a name people already ask for.
            </p>
            <ul className="stack" style={{ listStyle: "none", margin: 0, padding: 0, gap: 14 }}>
              {benefits.map((b) => (
                <li key={b.strong} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      width: 28,
                      height: 28,
                      borderRadius: "var(--radius-pill)",
                      background: "var(--milk)",
                      color: "var(--inyange-blue)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <CheckIcon style={{ width: 16, height: 16 }} />
                  </span>
                  <span>
                    <strong>{b.strong}</strong> {b.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="stack" style={{ background: "rgba(255,255,255,.12)", borderRadius: "var(--radius-md)", padding: 20, gap: 8 }}>
              <p className="eyebrow">What you’ll need</p>
              <p className="plain">[Franchise requirements — premises size and location, investment range, equipment, licences]</p>
            </div>
            <ol className="stack" style={{ margin: 0, paddingLeft: 20, gap: 6 }}>
              <li>Send us your enquiry</li>
              <li>We visit your proposed site</li>
              <li>Agreement, set-up and training</li>
              <li>Open your doors</li>
            </ol>
          </div>
          <div className="panel" style={{ color: "var(--ink)", boxShadow: "var(--shadow-glass)", alignSelf: "start" }}>
            <FranchiseForm />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap stack" style={{ maxWidth: 880, gap: 16 }}>
          <p className="eyebrow">Questions</p>
          <h2 className="display-l" style={{ marginBottom: 8 }}>
            Good to know
          </h2>
          <Faq
            items={[
              {
                q: "Is Milk Zone milk safe to drink straight away?",
                a: "Yes. Milk Zones serve pasteurised milk only, kept cold in a refrigerated tank until it is poured.",
              },
              {
                q: "Can I bring my own container?",
                a: "Yes — bring a clean container or jerrycan and we’ll fill it. Keep the milk in the fridge at home.",
              },
              {
                q: "When are Milk Zones open?",
                a: "[Opening hours] Hours can vary by location; check the finder above.",
              },
              {
                q: "Do Milk Zones sell packaged products?",
                a: "Yes. Alongside fresh milk and Ikivuguto, Milk Zones stock Inyange UHT milk, yoghurt, butter, water and juice.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
