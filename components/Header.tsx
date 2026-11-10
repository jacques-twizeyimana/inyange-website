"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/images/inyange-logo.png";
import { mainNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Inyange Industries — home">
          <Image src={logo} alt="Inyange" width={64} height={67} priority style={{ display: "block" }} />
          <span className="stack" style={{ gap: 2 }}>
            <span className="brand-name">Inyange Industries</span>
            <span className="brand-tag">Made in Rwanda since 1997</span>
          </span>
        </Link>
        <nav aria-label="Main" style={{ display: "flex" }}>
          <ul className="nav-list">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="iy-btn iy-btn--primary iy-btn--small" href="/distributors">
          Find a distributor
        </Link>
      </div>
    </header>
  );
}
