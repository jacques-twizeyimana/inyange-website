import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { GreekYoghurtIcon } from "@/components/icons";
import { ProductCard } from "@/components/ProductCard";
import { PageHero } from "@/components/sections";
import butter from "@/public/images/butter-500g.webp";
import flavouredMilk from "@/public/images/flavoured-milk.webp";
import freshCream from "@/public/images/fresh-cream.webp";
import ikivuguto from "@/public/images/ikivuguto-5l.webp";
import juice1lApple from "@/public/images/juice-1l-apple.webp";
import juice1lCocktail from "@/public/images/juice-1l-cocktail.webp";
import juice1lGuava from "@/public/images/juice-1l-guava.webp";
import juice1lMango from "@/public/images/juice-1l-mango.webp";
import juice1lOrange from "@/public/images/juice-1l-orange.webp";
import juice1lPassion from "@/public/images/juice-1l-passion.webp";
import juice250 from "@/public/images/juice-250ml-mango.webp";
import juice500 from "@/public/images/juice-500ml-mango.webp";
import juiceRange from "@/public/images/juice-range.webp";
import juiceTable from "@/public/images/juice-table.jpg";
import lowFat from "@/public/images/low-fat-milk-500ml.webp";
import milkPowder from "@/public/images/milk-powder-1kg.webp";
import milkRange from "@/public/images/milk-range.webp";
import pureGhee1kg from "@/public/images/pure-ghee-1kg.webp";
import pureGhee from "@/public/images/pure-ghee.webp";
import water189 from "@/public/images/water-18-9l.webp";
import waterBottle from "@/public/images/water-bottle.webp";
import waterGlass from "@/public/images/water-glass-350ml.jpg";
import waterRange from "@/public/images/water-range.webp";
import wholeMilk from "@/public/images/whole-milk-1l.webp";
import yoghurts from "@/public/images/yoghurt-400g-range.webp";

export const metadata: Metadata = {
  title: "Products",
  description: "Milk, milk products, Inyange Mineral Water and fruit juice — made in Rwanda.",
};

const juiceFlavours: { name: string; className: string; style?: CSSProperties }[] = [
  { name: "Mango", className: "iy-badge--gold" },
  { name: "Apple", className: "iy-badge--pasture" },
  { name: "Guava", className: "iy-badge--frost" },
  { name: "Orange", className: "", style: { background: "var(--butter)", color: "var(--on-accent)" } },
  { name: "Cocktail", className: "iy-badge--milk" },
  { name: "Passion", className: "iy-badge--blue" },
];

/** Inyange Premium 1 L boxes, one per flavour, in the same order as the flavour badges. */
const premiumBoxes: { name: string; src: StaticImageData }[] = [
  { name: "Mango", src: juice1lMango },
  { name: "Apple", src: juice1lApple },
  { name: "Guava", src: juice1lGuava },
  { name: "Orange", src: juice1lOrange },
  { name: "Cocktail", src: juice1lCocktail },
  { name: "Passion", src: juice1lPassion },
];

const packIcon = { className: "iy-pack" };

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our products"
        title="Made in Rwanda, for every part of the day."
        titleMaxWidth={820}
        lead="Milk, milk products, mineral water and fruit juice. Inyange doesn’t sell online — find any product through a certified distributor near you, or fresh at a Milk Zone."
      >
        <nav aria-label="Product families" className="row" style={{ gap: 12, marginTop: 8 }}>
          <a className="chip" href="#milk">Milk</a>
          <a className="chip" href="#dairy">Milk products</a>
          <a className="chip" href="#water">Water</a>
          <a className="chip" href="#juice">Juices</a>
        </nav>
      </PageHero>

      <FamilySection
        id="milk"
        style={{ paddingTop: 56 }}
        eyebrow="01 · Milk"
        title="Milk"
        lead="Fresh and fermented, long-life, flavoured or instant. Choose by how soon you’ll drink it."
        aside={<RangeShot src={milkRange} alt="Inyange Ikivuguto, 1 L Whole Milk box and 500 ml Low Fat Milk sachet beside a bowl of cereal" />}
      >
        <ProductCard
          variant="pasture"
          badge="chilled"
          media={{ kind: "shot", src: ikivuguto, alt: "Inyange Ikivuguto 5 L jerrycan" }}
          eyebrow="Fermented milk"
          title="Ikivuguto"
          description="Rwanda’s traditional fermented milk — thick, tangy and made fresh."
          sizes={["1 L", "3 L", "5 L jerrycan"]}
          note={{ label: "Keeps:", text: "a few days up to 2 weeks, in the fridge." }}
        />
        <ProductCard
          variant="whole-gold"
          badge={{ label: "Whole", tone: "gold" }}
          media={{ kind: "shot", src: wholeMilk, alt: "Inyange Whole Milk 1 L box" }}
          eyebrow="Long life UHT"
          title="Whole Milk"
          description="Full-cream milk, ultra-heat treated and sealed. No additives or preservatives added."
          sizes={["500 ml sachet", "1 L sachet", "1 L box"]}
          note={{
            label: "Keeps:",
            text: "6 months and more unopened, no fridge needed. Once opened, keep at 4–8 °C and finish within 3–4 days.",
          }}
        />
        <ProductCard
          variant="sky"
          badge={{ label: "Low fat", tone: "milk" }}
          media={{ kind: "shot", src: lowFat, alt: "Inyange Low Fat Milk 500 ml sachet" }}
          eyebrow="Long life UHT"
          title="Low Fat Milk"
          description="The lighter choice, with the same long life. No additives or preservatives added."
          sizes={["500 ml sachet", "1 L sachet", "1 L box"]}
          note={{ label: "Keeps:", text: "6 months and more unopened. Once opened, keep at 4–8 °C and finish within 3–4 days." }}
        />
        <ProductCard
          variant="butter"
          badge={{ label: "Flavoured", tone: "milk" }}
          media={{
            kind: "shot",
            src: flavouredMilk,
            alt: "Inyange Strawberry, Vanilla and Chocolate Flavoured Milk 250 ml sachets",
            maxWidth: "92%",
          }}
          eyebrow="Long life UHT"
          title="Flavoured Milk"
          description="Long-life milk with a treat inside — a favourite for school bags and lunchboxes."
          sizes={["Strawberry", "Vanilla", "Chocolate"]}
          note={{ label: "Size:", text: "250 ml sachet. Once opened, keep in the fridge." }}
        />
        <ProductCard
          variant="inyange-blue"
          badge={{ label: "New", tone: "milk" }}
          media={{ kind: "shot", src: milkPowder, alt: "Inyange Instant Whole Milk Powder pouch" }}
          eyebrow="Instant milk powder"
          title="Instant Whole Milk Powder"
          description="Made at our Nyagatare plant from Rwandan farmers’ milk. Just add water."
          sizes={["[Pack sizes]"]}
          note={{ label: "Keeps:", text: "[Shelf life] in a cool, dry place. Close the pack after use." }}
        />
      </FamilySection>

      <FamilySection
        id="dairy"
        sunken
        eyebrow="02 · Milk products"
        title="Butter, ghee, cream and yoghurt"
        lead="Made from the same Rwandan milk, for cooking, baking and spooning."
        aside={
          <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
            <Image
              src={freshCream}
              alt="Inyange Fresh Cream 400 ml tub with a bowl of fruit salad"
              sizes="(max-width: 720px) 50vw, 300px"
              style={{ width: "52%", height: "auto", display: "block", filter: "drop-shadow(0 18px 22px rgba(0,57,107,.22))" }}
            />
            <Image
              src={pureGhee}
              alt="Inyange Pure Ghee tub with a bowl of curry and rice"
              sizes="(max-width: 720px) 50vw, 300px"
              style={{
                width: "52%",
                height: "auto",
                display: "block",
                marginLeft: "-6%",
                filter: "drop-shadow(0 18px 22px rgba(0,57,107,.22))",
              }}
            />
          </div>
        }
      >
        <ProductCard
          variant="butter"
          media={{ kind: "shot", src: butter, alt: "Inyange Unsalted Butter 500 g tub", maxWidth: "80%" }}
          eyebrow="Salted or unsalted"
          title="Butter"
          description="Made from 100% pure cow’s milk, for the table and the kitchen."
          sizes={["10 g", "250 g", "500 g"]}
        />
        <ProductCard
          variant="butter"
          media={{ kind: "shot", src: pureGhee1kg, alt: "Inyange Pure Ghee 1 kg tub" }}
          eyebrow="Clarified butter"
          title="Pure Ghee"
          description="Pure clarified butter for frying, curries and rice — made at our Nyagatare plant."
          sizes={["[Pack sizes]"]}
        />
        <ProductCard
          variant="butter"
          badge="chilled"
          media={{ kind: "shot", src: freshCream, alt: "Inyange Fresh Cream 400 ml tub with a bowl of fruit salad" }}
          eyebrow="Cooking crème"
          title="Fresh Cream"
          description="100% fresh and natural — for sauces, soups, salads and desserts."
          sizes={["400 ml"]}
        />
        <ProductCard
          variant="sky"
          badge="chilled"
          media={{
            kind: "shot",
            src: yoghurts,
            alt: "Inyange Strawberry, Vanilla and Apricot Yoghurt 400 g cups",
            maxWidth: "92%",
          }}
          eyebrow="Drinking and spooning"
          title="Yoghurt"
          description="Smooth and creamy, in a range of flavours."
          sizes={["Strawberry", "Vanilla", "Apricot", "[More flavours]"]}
          note={{ label: "Sizes:", text: "200 g and 400 g" }}
        />
        <ProductCard
          variant="inyange-blue"
          media={{ kind: "icon", icon: <GreekYoghurtIcon {...packIcon} /> }}
          eyebrow="Strained, extra thick"
          title="Greek Yoghurt"
          description="Thick, strained Greek-style yoghurt — for breakfast bowls, dips and desserts."
          sizes={["[Pack sizes]"]}
        />
      </FamilySection>

      <FamilySection
        id="water"
        eyebrow="03 · Water"
        title="Inyange Mineral Water"
        lead="Sourced from natural springs in Gasabo, Rwanda. One water, a size for every occasion."
        aside={<RangeShot src={waterRange} alt="Inyange Mineral Water large dispenser bottle and small bottles on ice" />}
      >
        <ProductCard
          variant="sky"
          milkHeight="24%"
          media={{ kind: "shot", src: waterBottle, alt: "Inyange Natural Mineral Water bottle" }}
          eyebrow="On the go"
          title="Bottled water"
          description="Light bottles to take on journeys, to work, school and the gym."
          sizes={["500 ml bottle", "1 L bottle"]}
        />
        <ProductCard
          variant="sky"
          milkHeight="24%"
          media={{ kind: "photo", src: waterGlass, alt: "Inyange water in a 350 ml glass bottle, with a splash", position: "center 40%" }}
          eyebrow="Events and hospitality"
          title="Reusable glass bottle"
          description="An elegant returnable glass bottle for weddings, conferences, hotels and restaurants."
          sizes={["350 ml glass"]}
        />
        <ProductCard
          variant="sky"
          milkHeight="24%"
          media={{ kind: "shot", src: water189, alt: "Inyange Mineral Water large dispenser bottle" }}
          eyebrow="Families and offices"
          title="20 L jerrycan"
          description="A big bottle of mineral water for the home kitchen and the office dispenser."
          sizes={["20 L"]}
        />
      </FamilySection>

      <FamilySection
        id="juice"
        sunken
        eyebrow="04 · Juices"
        title="Inyange Juices"
        lead="Six flavours, three ways to pack them."
        extraHead={
          <ul aria-label="Flavours" className="row" style={{ gap: 10, listStyle: "none", margin: 0, padding: 0 }}>
            {juiceFlavours.map((f) => (
              <li key={f.name} className={`iy-badge ${f.className}`} style={{ fontSize: 13, padding: "8px 16px", ...f.style }}>
                {f.name}
              </li>
            ))}
          </ul>
        }
        aside={<RangeShot src={juiceRange} alt="Inyange juice bottles with glasses of juice and fresh fruit" />}
        after={
          <>
            <div className="stack" style={{ gap: 16 }}>
              <h3 className="title">Inyange Premium 1 L, flavour by flavour</h3>
              <ul className="pack-row">
                {premiumBoxes.map((b) => (
                  <li key={b.name}>
                    <Image src={b.src} alt={`Inyange Premium ${b.name} 1 L box`} sizes="140px" />
                    <span>{b.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src={juiceTable}
              alt="The Inyange juice range: Premium 1 litre boxes, 500 ml bottles and 250 ml boxes on a wooden table"
              sizes="(max-width: 1200px) 100vw, 1152px"
              style={{ width: "100%", height: 420, objectFit: "cover", borderRadius: "var(--radius-lg)", display: "block" }}
            />
          </>
        }
      >
        <ProductCard
          variant="whole-gold"
          media={{ kind: "shot", src: juice250, alt: "Inyange Mango 250 ml juice box" }}
          eyebrow="Lunchbox size"
          title="250 ml box"
          description="Fruit-based soft drink with its own straw. All six flavours."
          note="Mango · Apple · Guava · Orange · Cocktail · Passion"
        />
        <ProductCard
          variant="whole-gold"
          media={{ kind: "shot", src: juice500, alt: "Inyange Mango Fruit Drink 500 ml bottle" }}
          eyebrow="On the go"
          title="500 ml bottle"
          description="Fruit drink in the same handy bottle as our water."
          note="Mango · Apple"
        />
        <ProductCard
          variant="whole-gold"
          media={{ kind: "shot", src: juice1lApple, alt: "Inyange Premium Apple 1 L juice box" }}
          eyebrow="Inyange Premium"
          title="1 L box"
          description="100% fruit juices and fruit nectars for the family table, in the same box as our milk. All six flavours."
          note="Mango · Apple · Guava · Orange · Cocktail · Passion"
        />
      </FamilySection>

      <section className="section">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: 24 }}>
          <div className="cta-card is-brand">
            <h2 className="heading">Stock Inyange in your shop</h2>
            <p className="plain">Shops, supermarkets, hotels, schools and offices order through our certified distributors.</p>
            <Link className="iy-btn iy-btn--milk" href="/distributors" style={{ marginTop: 8 }}>
              Find a distributor
            </Link>
          </div>
          <div className="cta-card is-frost">
            <h2 className="heading">Drink it fresh at a Milk Zone</h2>
            <p className="plain">Fresh milk and Ikivuguto by the glass, plus the Inyange range, in neighbourhoods across Kigali.</p>
            <Link className="iy-btn iy-btn--primary" href="/milk-zones" style={{ marginTop: 8 }}>
              Find a Milk Zone
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function RangeShot({ src, alt }: { src: StaticImageData; alt: string }) {
  return <Image className="range-shot" src={src} alt={alt} sizes="(max-width: 720px) 100vw, 560px" />;
}

function FamilySection({
  id,
  sunken,
  style,
  eyebrow,
  title,
  lead,
  extraHead,
  aside,
  after,
  children,
}: {
  id: string;
  sunken?: boolean;
  style?: CSSProperties;
  eyebrow: string;
  title: string;
  lead: string;
  extraHead?: ReactNode;
  aside: ReactNode;
  after?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section" style={{ ...(sunken ? { background: "var(--surface-sunken)" } : null), ...style }}>
      <div className="wrap stack" style={{ gap: 40 }}>
        <div className="grid-2" style={{ gap: 40 }}>
          <div className="stack" style={{ gap: extraHead ? 16 : 12 }}>
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="display-l">{title}</h2>
            <p className="body-l muted">{lead}</p>
            {extraHead}
          </div>
          {aside}
        </div>
        <div className="grid-auto">{children}</div>
        {after}
      </div>
    </section>
  );
}
