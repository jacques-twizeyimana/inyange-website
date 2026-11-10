import Image from "next/image";
import Link from "next/link";
import { MilkGlass } from "@/components/icons";
import { FamilyCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/sections";
import { WaveDivider } from "@/components/WaveDivider";
import { company } from "@/lib/site";
import freshCream from "@/public/images/fresh-cream.webp";
import juiceRange from "@/public/images/juice-range.webp";
import milkPowder from "@/public/images/milk-powder-1kg.webp";
import milkRange from "@/public/images/milk-range.webp";
import waterRange from "@/public/images/water-range.webp";

/* Home: hero, product families, the milk powder spotlight, Milk Zones, where to buy and newsroom. */

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

export default function HomePage() {
  return (
    <>
      {/* Hero: one promise and the range */}
      <section className="band on-brand">
        <div className="wrap grid-2 home-hero" style={{ gap: 40 }}>
          <div className="stack" style={{ alignItems: "flex-start", gap: 20 }}>
            <h1 className="display-xl" style={{ color: "var(--on-brand)" }}>
              Fresh from Rwandan farms, every morning.
            </h1>
            <p className="body-l" style={{ maxWidth: 520 }}>
              Milk collected from 42 farmer cooperatives each day becomes Inyange milk, Ikivuguto, yoghurt and butter —
              alongside our mineral water and fruit juice.
            </p>
            <Link className="iy-btn iy-btn--milk" href="/products">
              Explore our products
            </Link>
          </div>
          <Image
            className="home-hero-shot"
            src={milkRange}
            alt="Inyange Ikivuguto, Whole Milk and Low Fat Milk"
            sizes="(max-width: 720px) 100vw, 560px"
            priority
          />
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
              title="Mineral Water"
              description="Inyange Mineral Water from springs in Gasabo, in bottles from 350 ml to 20 L — for the road, events, home and office."
              linkLabel="See water →"
            />
            <FamilyCard
              href="/products#juice"
              variant="whole-gold"
              src={juiceRange}
              alt="Inyange juice bottles with glasses of juice and fresh fruit"
              shotMaxWidth="94%"
              milkHeight="24%"
              title="Juices"
              description="Mango, apple, guava, orange, cocktail and passion — in 250 ml and 1 L boxes and 500 ml bottles."
              linkLabel="See juices →"
            />
          </div>
        </div>
      </section>

      {/* New offering: Instant Whole Milk Powder, made in Nyagatare */}
      <section style={{ paddingBottom: 96 }}>
        <div className="wrap">
          <div className="spotlight">
            <span className="iy-badge iy-badge--blue spotlight-badge">New</span>
            <Image
              className="spotlight-shot"
              src={milkPowder}
              alt="Inyange Instant Whole Milk Powder 1 kg pouch"
              sizes="(max-width: 720px) 80vw, 420px"
            />
            <div className="stack" style={{ gap: 16, alignItems: "flex-start" }}>
              <h2 className="display-l">Instant Whole Milk Powder</h2>
              <p className="script" style={{ color: "var(--inyange-blue)" }}>
                The jewel of Nyagatare.
              </p>
              <p className="body-l muted">
                Our newest product is made at the Nyagatare Milk Powder Plant from Rwandan farmers’ milk, to replace
                imported powder. Just add water. In 1 kg packs.
              </p>
              <Link className="iy-btn iy-btn--primary" href="/milk-powder">
                Discover milk powder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Milk Zones */}
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

      {/* Where to buy */}
      <section style={{ paddingTop: 96, paddingBottom: 96 }}>
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
              <article key={n.title} className="panel stack" style={{ gap: 12 }}>
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
