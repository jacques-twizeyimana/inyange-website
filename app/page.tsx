import Link from "next/link";
import type { ReactNode } from "react";
import { KeepChilledIcon, MilkGlass } from "@/components/icons";
import { MilkPourStage } from "@/components/MilkPourStage";
import { FamilyCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/sections";
import { WaveDivider } from "@/components/WaveDivider";
import { company } from "@/lib/site";
import freshCream from "@/public/images/fresh-cream.webp";
import juiceRange from "@/public/images/juice-range.webp";
import milkRange from "@/public/images/milk-range.webp";
import waterRange from "@/public/images/water-range.webp";

const stats = [
  { figure: "1997", text: "The year Inyange began. Pasteurised milk and yoghurt followed in 1999, mineral water in 2001." },
  { figure: "240,000 L", text: "Raw milk sourced every day from 42 dairy farmer cooperatives." },
  { figure: "650,000 L", text: "Milk a day our Nyagatare Milk Powder Plant is built to process." },
  { figure: "ISO 22000", text: "Certified food safety, alongside Rwanda FDA, Rwanda Standards Board and Halal certification." },
];

const news = [
  {
    date: "27 August 2026",
    title: "RSSB takes full ownership of Inyange Industries",
    text: "The Rwanda Social Security Board has bought Inyange Industries, together with Ruliba Clays, from Crystal Ventures Ltd.",
    href: "https://www.newtimes.co.rw/article/38467/news/rwanda/rssb-acquires-inyange-industries-ruliba-clays",
    link: "Read the story →",
  },
  {
    date: "October 2025",
    title: "Inyange launches instant whole milk powder",
    text: "A Made in Rwanda instant milk powder for every home, made from Rwandan farmers’ milk to replace imported powder.",
    href: "https://www.newtimes.co.rw/article/30391/news/featured/inyange-launches-instant-milk-powder-strengthening-rwandas-dairy-sector",
    link: "Read the story →",
  },
  {
    date: "24 July 2024",
    title: "Prime Minister inaugurates our Milk Powder Plant in Nyagatare",
    text: "Built with a US$54 million investment, the plant processes milk into skimmed and whole milk powder, butter and ghee.",
    href: "https://www.inyangeindustries.com/img/2024/Inyange%20MPP%20Launch%20Press%20Release.pdf",
    link: "Read the press release →",
  },
];

const cardPanel = {
  background: "var(--surface-raised)",
  borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-raised)",
} as const;

export default function HomePage() {
  return (
    <>
      {/* Hero with the MilkPour stage */}
      <section className="band on-brand">
        <div className="wrap grid-2" style={{ gap: 32, paddingTop: 56, paddingBottom: 8 }}>
          <div className="stack" style={{ alignItems: "flex-start", gap: 20, paddingBottom: 32 }}>
            <span className="iy-badge iy-badge--milk">Made in Rwanda since 1997</span>
            <h1 className="display-xl" style={{ color: "var(--on-brand)" }}>
              Pour a glass of joy.
            </h1>
            <p className="body-l" style={{ maxWidth: 520 }}>
              Milk, Ikivuguto, yoghurt, butter, mineral water and fruit juice — made in Rwanda by Inyange Industries,
              with milk collected from Rwandan farmers every day.
            </p>
            <div className="row" style={{ gap: 20 }}>
              <Link className="iy-btn iy-btn--milk" href="/products">
                Explore our products
              </Link>
              <Link className="more" href="/milk-zones">
                Visit a Milk Zone →
              </Link>
            </div>
            <p className="script" style={{ color: "var(--on-brand)", marginTop: 8 }}>
              Always ask for Inyange.
            </p>
          </div>
          <MilkPourStage pourKey="inyange-home-hero" label="Inyange milk pouring into a chilled glass" />
        </div>
      </section>
      <WaveDivider />

      {/* Product families */}
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="wrap stack" style={{ gap: 40 }}>
          <SectionHead
            eyebrow="Our products"
            title="Four families, one name you trust."
            lead="From the morning glass of milk to water for the road and juice for the lunchbox — every Inyange product is processed in Rwanda to the same standard."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            <FamilyCard
              href="/products#milk"
              variant="whole-gold"
              src={milkRange}
              alt="Inyange Ikivuguto, Whole Milk and Low Fat Milk"
              milkHeight="30%"
              eyebrow="Ikivuguto · UHT · Powder"
              title="Milk"
              description="Fresh Ikivuguto, long-life UHT whole, low fat and flavoured milk, and instant milk powder."
              linkLabel="See milk →"
            />
            <FamilyCard
              href="/products#dairy"
              variant="butter"
              src={freshCream}
              alt="Inyange Fresh Cream 400 ml tub with a bowl of fruit salad"
              milkHeight="30%"
              eyebrow="Butter · Ghee · Cream · Yoghurt"
              title="Milk products"
              description="Butter, pure ghee, fresh cream and yoghurt in many flavours — including Greek yoghurt."
              linkLabel="See milk products →"
            />
            <FamilyCard
              href="/products#water"
              variant="sky"
              src={waterRange}
              alt="Inyange Mineral Water bottles on ice"
              milkHeight="24%"
              eyebrow="350 ml to 20 L"
              title="Water"
              description="Inyange Mineral Water, from springs in Gasabo — for the road, for events, for home and office."
              linkLabel="See water →"
            />
            <FamilyCard
              href="/products#juice"
              variant="whole-gold"
              src={juiceRange}
              alt="Inyange juice bottles with glasses of juice and fresh fruit"
              shotMaxWidth="94%"
              milkHeight="24%"
              eyebrow="Six flavours"
              title="Juices"
              description="Mango, apple, guava, orange, cocktail and passion — in 250 ml and 1 L boxes and 500 ml bottles."
              linkLabel="See juices →"
            />
          </div>
        </div>
      </section>

      {/* Fresh or long life */}
      <section className="section" style={{ background: "var(--surface-sunken)" }}>
        <div className="wrap grid-2">
          <div className="stack" style={{ gap: 16 }}>
            <p className="eyebrow">Fresh or long life?</p>
            <h2 className="display-l">Two milks, two rhythms.</h2>
            <p className="body-l muted">
              Ikivuguto is fermented fresh and lives in the fridge. UHT milk is heated for a few seconds at
              ultra-high temperature and sealed, so it keeps for months on the shelf — with no additives or
              preservatives added.
            </p>
            <Link className="more" href="/products#milk">
              Compare all milk →
            </Link>
          </div>
          <div className="stack" style={{ gap: 20 }}>
            <ShelfLife
              name="Ikivuguto"
              descriptor="fermented milk"
              badge={
                <span className="iy-badge iy-badge--frost">
                  <KeepChilledIcon />
                  Keep refrigerated
                </span>
              }
              meterLabel="Keeps from a few days up to 2 weeks"
              width="8%"
              color="var(--pasture)"
              caption="A few days to 2 weeks in the fridge · 1 L, 3 L and 5 L"
            />
            <ShelfLife
              name="UHT milk"
              descriptor="whole and low fat"
              badge={<span className="iy-badge iy-badge--blue">Long life UHT</span>}
              meterLabel="Keeps for 6 months or more unopened"
              width="100%"
              color="var(--whole-gold)"
              caption="6 months and more unopened · once opened, keep at 4–8 °C and finish within 3–4 days"
            />
          </div>
        </div>
      </section>

      {/* Milk Zones promo */}
      <section className="band on-brand" style={{ overflow: "hidden" }}>
        <div className="wrap grid-2" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="stack" style={{ alignItems: "flex-start", gap: 16 }}>
            <p className="eyebrow">Inyange Milk Zones</p>
            <h2 className="display-l" style={{ color: "var(--on-brand)" }}>
              Fresh milk by the glass, around the corner.
            </h2>
            <p className="body-l">
              Since 2014, Inyange Milk Zones have poured fresh pasteurised milk and Ikivuguto by the glass or to take
              home — alongside the whole Inyange range — in neighbourhoods across Kigali.
            </p>
            <div className="row" style={{ gap: 20, marginTop: 8 }}>
              <Link className="iy-btn iy-btn--milk" href="/milk-zones">
                Find a Milk Zone
              </Link>
              <Link className="more" href="/milk-zones#franchise">
                Open your own Milk Zone →
              </Link>
            </div>
          </div>
          <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 24, minHeight: 300 }}>
            <MilkGlass width={150} height={225} />
            <MilkGlass width={110} height={165} level="high" />
          </div>
        </div>
      </section>

      {/* Farm to glass stats */}
      <section className="section">
        <div className="wrap stack" style={{ gap: 40 }}>
          <SectionHead eyebrow="From farm to glass" title="Grown with Rwandan farmers." />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {stats.map((s) => (
              <div key={s.figure} className="stack" style={{ borderTop: "4px solid var(--inyange-blue)", paddingTop: 20, gap: 8 }}>
                <p className="stat-figure" style={{ fontSize: 48, lineHeight: "52px" }}>
                  {s.figure}
                </p>
                <p className="plain">{s.text}</p>
              </div>
            ))}
          </div>
          <p className="caption">
            Sources: Inyange Industries Milk Powder Plant factsheet (2024); DSF–IFAD case study on Inyange Industries
            (2023).
          </p>
        </div>
      </section>

      {/* Where to buy */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div
            style={{
              background: "var(--frost)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(28px, 5vw, 48px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
              gap: 32,
              alignItems: "center",
            }}
          >
            <div className="stack" style={{ gap: 12 }}>
              <p className="eyebrow" style={{ color: "var(--ink)" }}>
                Where to buy
              </p>
              <h2 className="heading">Looking for Inyange near you?</h2>
              <p className="plain">
                We sell through certified distributors across Rwanda and the region. Tell us your district and we’ll
                point you to the nearest one — for your shop, hotel, school or office.
              </p>
            </div>
            <div className="stack" style={{ gap: 12, alignItems: "flex-start" }}>
              <Link className="iy-btn iy-btn--primary" href="/distributors">
                Find a distributor
              </Link>
              <p className="plain">
                Or call our sales team on{" "}
                <a href={company.phoneHref} style={{ fontWeight: 700 }}>
                  {company.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsroom */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap stack" style={{ gap: 32 }}>
          <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
            <div className="stack" style={{ gap: 12 }}>
              <p className="eyebrow">Newsroom</p>
              <h2 className="display-l">News from Inyange</h2>
            </div>
            <Link className="more" href="/about#journey">
              Our journey →
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
            {news.map((n) => (
              <article key={n.title} className="stack" style={{ ...cardPanel, padding: 32, gap: 12 }}>
                <p className="caption">{n.date}</p>
                <h3 className="heading" style={{ fontSize: 24, lineHeight: "28px" }}>
                  {n.title}
                </h3>
                <p className="plain muted">{n.text}</p>
                <a className="more" href={n.href}>
                  {n.link}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ShelfLife({
  name,
  descriptor,
  badge,
  meterLabel,
  width,
  color,
  caption,
}: {
  name: string;
  descriptor: string;
  badge: ReactNode;
  meterLabel: string;
  width: string;
  color: string;
  caption: string;
}) {
  return (
    <div className="stack" style={{ ...cardPanel, padding: 24, gap: 14 }}>
      <div className="row" style={{ justifyContent: "space-between", gap: 12 }}>
        <h3 className="title">
          {name}{" "}
          <span className="caption" style={{ display: "inline" }}>
            {descriptor}
          </span>
        </h3>
        {badge}
      </div>
      <div
        role="img"
        aria-label={meterLabel}
        style={{ height: 14, borderRadius: "var(--radius-pill)", background: "var(--frost)", overflow: "hidden" }}
      >
        <div style={{ width, height: "100%", borderRadius: "var(--radius-pill)", background: color }} />
      </div>
      <p className="caption">{caption}</p>
    </div>
  );
}
