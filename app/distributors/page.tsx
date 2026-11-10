import type { Metadata } from "next";
import { PageHero } from "@/components/sections";
import { DistributorFinder } from "./DistributorFinder";
import { DistributorForm } from "./DistributorForm";

export const metadata: Metadata = {
  title: "Find a distributor",
  description: "Find a certified Inyange distributor for your shop, hotel, school or office, or apply to become one.",
};

export default function DistributorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Where to buy"
        title="Find an Inyange distributor."
        titleMaxWidth={860}
        lead="We don’t sell online. Our products reach shops, supermarkets, hotels, schools and offices through certified distributors across Rwanda and the region. Choose your area to find the one nearest you."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <DistributorFinder />
      </section>

      <section id="become" className="section" style={{ background: "var(--surface-sunken)" }}>
        <div className="wrap grid-2" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: 16 }}>
            <p className="eyebrow">Partner with us</p>
            <h2 className="display-l">Become an Inyange distributor.</h2>
            <p className="body-l muted">
              We work with certified distributors in Kigali, across every province, and in neighbouring markets of the
              East African Community. If you have the reach, the storage and the vehicles to serve your area, we’d like
              to hear from you.
            </p>
            <div className="stack" style={{ background: "var(--surface-raised)", borderRadius: "var(--radius-md)", padding: 20, gap: 6 }}>
              <p className="eyebrow">What we look for</p>
              <p className="plain">[Distributor requirements — registration, warehouse and cold storage, delivery fleet, territory]</p>
            </div>
          </div>
          <div className="panel">
            <DistributorForm />
          </div>
        </div>
      </section>
    </>
  );
}
