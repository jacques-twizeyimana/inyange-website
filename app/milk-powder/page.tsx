import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "@/components/icons";
import { Faq, SectionHead } from "@/components/sections";
import { WaveDivider } from "@/components/WaveDivider";
import { company } from "@/lib/site";
import milkPowder from "@/public/images/milk-powder-1kg.webp";

export const metadata: Metadata = {
  title: "Instant Whole Milk Powder",
  description:
    "Inyange Instant Whole Milk Powder: 100% cow milk from Rwandan farmers, made in Nyagatare. Just add water and stir. How to prepare it, what it’s for and where to buy.",
};

const facts = ["100% cow milk", "Instant: add water and stir", "Whole milk, full taste", "1 kg pack"];

const benefits = [
  {
    title: "Instant, no cooking",
    text: "Add water, stir and it’s ready. No boiling, no waiting, no fuss on a busy morning.",
  },
  {
    title: "Full, creamy taste",
    text: "Whole milk keeps its natural creaminess, so tea, porridge and baking taste the way they should.",
  },
  {
    title: "Good for the whole family",
    text: "Milk is a natural source of protein and calcium: a glass for the kids, a creamy cup of tea for you.",
  },
  {
    title: "Always in the cupboard",
    text: "No fridge needed until you mix it, so you always have milk at home, even when the shop is far.",
  },
];

const uses = [
  { title: "Tea and coffee", text: "A creamy cup, morning or evening." },
  { title: "Porridge and cereal", text: "Stir it in for a richer, warmer breakfast." },
  { title: "Baking and cooking", text: "Cakes, mandazi, sauces and desserts." },
  { title: "Milkshakes and smoothies", text: "Blend with fruit for a cold treat." },
];

const journey = [
  { title: "Milked on Rwandan farms", text: "Farmers across Rwanda milk their cows every day." },
  { title: "Collected from cooperatives", text: "Inyange collects the milk and keeps it chilled on its way to the plant." },
  { title: "Made into powder in Nyagatare", text: "Our Milk Powder Plant turns fresh milk into instant whole milk powder." },
  { title: "Packed and sent to you", text: "Sealed in a 1 kg pouch and delivered to shops through Inyange distributors." },
];

const certifications = ["Rwanda Standards Board", "Rwanda FDA", "FSSC 22000", "ISO 22000", "Halal"];

const faqs = [
  {
    q: "How do I prepare Inyange milk powder?",
    a: "Pour water into a clean glass or jug, add the powder and stir until smooth. The exact amount of powder for a glass is printed on the back of your pack, so follow that for the best taste.",
  },
  {
    q: "Is it really 100% cow milk?",
    a: "Yes. Inyange Instant Whole Milk Powder is made from 100% cow’s milk, from Rwandan farmers.",
  },
  {
    q: "Can I give it to my baby instead of infant formula?",
    a: "No. Whole milk powder is not infant formula and does not replace breast milk or formula for babies. Please ask your doctor or health worker what is right for your child.",
  },
  {
    q: "How should I store it?",
    a: "Close the pouch tightly after each use and keep it in a cool, dry place. Once you’ve mixed it with water, treat it like fresh milk: keep it chilled and drink it the same day. Check your pack for the best-before date.",
  },
  {
    q: "Where can I buy it?",
    a: "Through Inyange’s certified distributors across Rwanda. Tell us your district and we’ll point you to the nearest one.",
  },
];

/** Little illustrations for the three preparation steps. */
function PrepArt({ step }: { step: 1 | 2 | 3 }) {
  const glass = "M52 40h56l-5 62a6 6 0 0 1-6 5H63a6 6 0 0 1-6-5z";
  return (
    <svg className="mp-art" viewBox="0 0 160 124" fill="none" aria-hidden="true">
      <ellipse cx="80" cy="113" rx="46" ry="5" fill="var(--sky-light)" opacity=".5" />
      {step === 1 && (
        <>
          <path d="M57 74h46l-3.4 28a6 6 0 0 1-6 5H66.4a6 6 0 0 1-6-5z" fill="var(--sky-light)" />
          <path d="M80 8c7 10 12 17 12 24a12 12 0 0 1-24 0c0-7 5-14 12-24z" fill="var(--sky)" />
        </>
      )}
      {step === 2 && (
        <>
          <path d="M57 74h46l-3.4 28a6 6 0 0 1-6 5H66.4a6 6 0 0 1-6-5z" fill="var(--sky-light)" />
          <g transform="rotate(28 112 18)">
            <ellipse cx="112" cy="16" rx="14" ry="9" fill="var(--milk)" stroke="var(--inyange-blue)" strokeWidth="3" />
            <path d="M126 16h26" stroke="var(--inyange-blue)" strokeWidth="3" strokeLinecap="round" />
            <ellipse cx="108" cy="13" rx="9" ry="4" fill="var(--butter)" />
          </g>
          <g fill="var(--butter)">
            <circle cx="88" cy="40" r="2.6" />
            <circle cx="80" cy="48" r="2.2" />
            <circle cx="90" cy="54" r="2.6" />
            <circle cx="76" cy="60" r="2" />
          </g>
        </>
      )}
      {step === 3 && (
        <>
          <path d="M55 52h50l-3.6 50a6 6 0 0 1-6 5H64.6a6 6 0 0 1-6-5z" fill="var(--milk)" />
          <path d="M66 70c8 5 13-5 21 0s9 3 9 3" stroke="var(--sky-light)" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 30l5 5m0-5l-5 5M128 22l4 4m0-4l-4 4M40 14v8m-4-4h8" stroke="var(--whole-gold)" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      <path d={glass} stroke="var(--inyange-blue)" strokeWidth="3.5" strokeLinejoin="round" />
    </svg>
  );
}

const prep = [
  { step: 1 as const, title: "Pour the water", text: "Fill a clean glass or jug with water." },
  { step: 2 as const, title: "Add the powder", text: "Add the amount shown on the back of your pack." },
  { step: 3 as const, title: "Stir and enjoy", text: "Stir until smooth. Drink it now, or use it in your tea, porridge or baking." },
];

export default function MilkPowderPage() {
  return (
    <>
      {/* Hero */}
      <section className="band on-brand">
        <div className="wrap grid-2 home-hero" style={{ gap: 40 }}>
          <div className="stack" style={{ alignItems: "flex-start", gap: 20 }}>
            <h1 className="display-xl" style={{ color: "var(--on-brand)" }}>
              Real cow’s milk, ready in seconds.
            </h1>
            <p className="body-l" style={{ maxWidth: 520 }}>
              Inyange Instant Whole Milk Powder is 100% cow milk from Rwandan farmers. Just add water and stir — for a
              glass of milk, a creamy cup of tea or a warm bowl of porridge.
            </p>
            <div className="row" style={{ gap: 16 }}>
              <Link className="iy-btn iy-btn--milk" href="/distributors">
                Find a distributor
              </Link>
              <a className="more" href="#prepare" style={{ color: "var(--on-brand)" }}>
                How to prepare →
              </a>
            </div>
          </div>
          <Image
            className="home-hero-shot"
            src={milkPowder}
            alt="Inyange Instant Whole Milk Powder 1 kg pouch"
            sizes="(max-width: 720px) 80vw, 420px"
            priority
          />
        </div>
      </section>
      <WaveDivider />

      {/* At a glance */}
      <section style={{ paddingTop: 48 }}>
        <div className="wrap">
          <ul className="mp-facts">
            {facts.map((f) => (
              <li key={f}>
                <CheckIcon className="mp-check" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Benefits */}
      <section className="section">
        <div className="wrap stack" style={{ gap: 40 }}>
          <SectionHead
            eyebrow="Why Inyange milk powder"
            title="All the goodness of milk, whenever you need it."
            lead="Fresh milk from Rwandan farms, dried into a powder that keeps in your cupboard and is ready in seconds."
          />
          <div className="grid-auto">
            {benefits.map((b) => (
              <div key={b.title} className="tile">
                <h3 className="heading" style={{ fontSize: 22, lineHeight: "28px" }}>
                  {b.title}
                </h3>
                <p className="plain muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation */}
      <section id="prepare" className="band-deep" style={{ scrollMarginTop: 24 }}>
        <div className="wrap stack" style={{ gap: 40, paddingTop: 80, paddingBottom: 80 }}>
          <div className="section-head">
            <p className="eyebrow" style={{ color: "var(--sky-light)" }}>
              How to prepare
            </p>
            <h2 className="display-l" style={{ color: "var(--on-brand)" }}>
              Three easy steps to a glass of milk.
            </h2>
          </div>
          <ol className="mp-steps">
            {prep.map((p) => (
              <li key={p.step}>
                <PrepArt step={p.step} />
                <p className="mp-step-n">Step {p.step}</p>
                <h3 className="heading" style={{ color: "var(--on-brand)" }}>
                  {p.title}
                </h3>
                <p className="plain">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Ways to enjoy */}
      <section className="section">
        <div className="wrap stack" style={{ gap: 40 }}>
          <SectionHead
            eyebrow="Ways to enjoy"
            title="One pack, a hundred uses."
            lead="From the first cup of tea to the last cake of the weekend, keep a pack of Inyange milk powder within reach."
          />
          <div className="grid-auto">
            {uses.map((u) => (
              <div key={u.title} className="row-card stack" style={{ gap: 4 }}>
                <strong className="heading" style={{ fontSize: 20, lineHeight: "26px" }}>
                  {u.title}
                </strong>
                <span className="plain muted">{u.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farm to pack */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="spotlight" style={{ display: "block" }}>
            <div className="stack" style={{ gap: 40 }}>
              <SectionHead
                eyebrow="From farm to pack"
                title="Rwandan milk, made in Rwanda."
                lead="Our Milk Powder Plant in Nyagatare is run by Rwandan technicians, using processing and safety technology that is the first of its kind in Africa. Every pack replaces imported powder with milk from home."
                maxWidth={780}
              />
              <ol className="cold-chain">
                {journey.map((j) => (
                  <li key={j.title}>
                    <h3 className="heading" style={{ fontSize: 22, lineHeight: "28px" }}>
                      {j.title}
                    </h3>
                    <p className="plain muted">{j.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap stack" style={{ gap: 24 }}>
          <SectionHead
            eyebrow="Quality you can trust"
            title="Certified, so you can pour with confidence."
            lead="Inyange products are certified by national and international bodies."
          />
          <ul className="row" style={{ gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
            {certifications.map((c) => (
              <li key={c} className="chip">
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32, maxWidth: 860 }}>
          <SectionHead eyebrow="Questions" title="Good to know." />
          <div>
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      {/* Where to buy */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="cta-card is-brand">
            <h2 className="display-l" style={{ color: "var(--on-brand)" }}>
              Ready to try it?
            </h2>
            <p className="body-l" style={{ maxWidth: 560 }}>
              Find Inyange Instant Whole Milk Powder at a distributor near you, or call our sales team on{" "}
              <a href={company.phoneHref} style={{ color: "inherit", fontWeight: 700 }}>
                {company.phone}
              </a>
              .
            </p>
            <div className="row" style={{ gap: 20 }}>
              <Link className="iy-btn iy-btn--milk" href="/distributors">
                Find a distributor
              </Link>
              <Link className="more" href="/products" style={{ color: "var(--on-brand)" }}>
                See all products →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
