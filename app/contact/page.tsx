import { LazyContactMap } from "@/components/maps/lazy";
import type { Metadata } from "next";
import Link from "next/link";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Faq, PageHero } from "@/components/sections";
import { company } from "@/lib/site";
import { SocialLinks } from "@/components/SocialLinks";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a product, orders and distribution, Milk Zones, media or careers — reach Inyange Industries here.",
};

const iconStyle = { width: 32, height: 32, color: "var(--inyange-blue)" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We’d love to hear from you."
        leadMaxWidth={640}
        lead="Questions about a product, orders and distribution, Milk Zones, media or careers — reach us here."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          <div className="tile" style={{ gap: 8 }}>
            <PinIcon style={iconStyle} />
            <h2 className="title">Visit</h2>
            <p className="plain">
              {company.legalName}
              <br />
              KN 3 Rd, Masaka
              <br />
              Kigali, Rwanda
            </p>
            <p className="caption">P.O. Box 4584, Kigali</p>
          </div>
          <div className="tile" style={{ gap: 8 }}>
            <PhoneIcon style={iconStyle} />
            <h2 className="title">Call</h2>
            <p className="plain">
              <a href={company.phoneHref} style={{ fontWeight: 700 }}>
                {company.phone}
              </a>
            </p>
            <p className="caption">[Office hours]</p>
          </div>
          <div className="tile" style={{ gap: 8 }}>
            <MailIcon style={iconStyle} />
            <h2 className="title">Email</h2>
            <p className="plain">
              <a href={`mailto:${company.email}`} style={{ fontWeight: 700, overflowWrap: "anywhere" }}>
                {company.email}
              </a>
            </p>
            <p className="caption">We reply on working days.</p>
          </div>
          <div className="tile on-brand" style={{ background: "var(--surface-brand)", color: "var(--on-brand)", gap: 12 }}>
            <h2 className="title" style={{ color: "var(--on-brand)" }}>
              Follow @AlwaysInyange
            </h2>
            <SocialLinks />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap row" style={{ gap: 32, alignItems: "stretch" }}>
          <div className="panel" style={{ flex: "1 1 420px", minWidth: 0 }}>
            <ContactForm />
          </div>
          <div className="stack" style={{ flex: "1 1 420px", minWidth: 0, gap: 16 }}>
            <div style={{ flex: "1 1 auto", minHeight: 360, display: "flex" }}>
              <LazyContactMap />
            </div>
            <a className="iy-btn iy-btn--outline" href={company.mapsUrl} style={{ alignSelf: "flex-start" }}>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface-sunken)" }}>
        <div className="wrap stack" style={{ maxWidth: 880, gap: 16 }}>
          <p className="eyebrow">Frequently asked</p>
          <h2 className="display-l" style={{ marginBottom: 8 }}>
            Quick answers
          </h2>
          <Faq
            items={[
              {
                q: "Where can I buy Inyange products?",
                a: (
                  <>
                    In shops and supermarkets across Rwanda, supplied by our certified distributors. Use{" "}
                    <Link href="/distributors">Find a distributor</Link>, or visit an{" "}
                    <Link href="/milk-zones">Inyange Milk Zone</Link> for fresh milk.
                  </>
                ),
              },
              {
                q: "Does UHT milk contain preservatives?",
                a: "No. UHT milk is heated to an ultra-high temperature for a few seconds and sealed in its pack, which is why it keeps for months. No additives or preservatives are added.",
              },
              {
                q: "How should I store UHT milk once it’s open?",
                a: "Keep it in the fridge at 4–8 °C and finish it within 3–4 days.",
              },
              {
                q: "How long does Ikivuguto keep?",
                a: "Keep Ikivuguto refrigerated. It keeps from a few days up to 2 weeks — check the date on the pack.",
              },
              {
                q: "How do I become a distributor or open a Milk Zone?",
                a: (
                  <>
                    Send an enquiry from <Link href="/distributors#become">Become a distributor</Link> or{" "}
                    <Link href="/milk-zones#franchise">Open a Milk Zone</Link>, and our team will contact you.
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
