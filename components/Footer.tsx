import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/inyange-logo.png";
import { company } from "@/lib/site";
import { WaveDivider } from "./WaveDivider";

export function Footer() {
  return (
    <footer className="site-footer on-brand">
      <WaveDivider top="var(--surface)" bottom="var(--blue-deep)" />
      <div className="wrap stack" style={{ paddingTop: 48, paddingBottom: 32, gap: 40 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40 }}>
          <div className="stack" style={{ gap: 16 }}>
            <Image src={logo} alt="Inyange" width={80} height={84} style={{ display: "block" }} />
            <p className="script" style={{ color: "var(--on-brand)" }}>
              Always ask for Inyange.
            </p>
            <p className="plain" style={{ fontSize: 15, lineHeight: "24px" }}>
              Milk, dairy, water and juice — made in Rwanda since 1997.
            </p>
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <p className="eyebrow">Explore</p>
            <Link className="foot-link" href="/products">Products</Link>
            <Link className="foot-link" href="/milk-zones">Milk Zones</Link>
            <Link className="foot-link" href="/distributors">Find a distributor</Link>
            <Link className="foot-link" href="/about">About us</Link>
            <Link className="foot-link" href="/contact">Contact</Link>
          </div>
          <div className="stack" style={{ gap: 8 }}>
            <p className="eyebrow">Get in touch</p>
            <p className="plain" style={{ fontSize: 15, lineHeight: "24px" }}>
              {company.address[0]}
              <br />
              {company.address[1]}
            </p>
            <a className="foot-link" href={company.phoneHref}>{company.phone}</a>
            <a className="foot-link" href={`mailto:${company.email}`}>{company.email}</a>
          </div>
          <div className="stack" style={{ gap: 12 }}>
            <p className="eyebrow">Follow @AlwaysInyange</p>
            <div className="row" style={{ gap: 8 }}>
              {company.social.map((s) => (
                <a key={s.href} className="social" href={s.href}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            gap: 12,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,.25)",
            fontSize: 13,
            lineHeight: "18px",
          }}
        >
          <span>© 2026 Inyange Industries Ltd. All rights reserved.</span>
          <span>A Crystal Ventures Ltd company</span>
        </div>
      </div>
    </footer>
  );
}
