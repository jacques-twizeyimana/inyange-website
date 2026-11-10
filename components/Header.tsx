"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/public/images/inyange-logo.png";
import { mainNav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const isCurrent = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="site-header" data-open={open}>
      <div className="wrap">
        <Link href="/" className="brand" aria-label="Inyange Industries — home">
          <Image src={logo} alt="Inyange" width={64} height={67} priority style={{ display: "block" }} />
          <span className="stack" style={{ gap: 2 }}>
            <span className="brand-name">Inyange Industries</span>
            <span className="brand-tag">Made in Rwanda since 1997</span>
          </span>
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          {open ? <X size={26} aria-hidden /> : <Menu size={26} aria-hidden />}
        </button>
        <nav id="main-nav" className="main-nav" aria-label="Main">
          <ul className="nav-list">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link className="nav-link" href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link className="iy-btn iy-btn--primary iy-btn--small nav-cta" href="/distributors">
            Find a distributor
          </Link>
        </nav>
      </div>
    </header>
  );
}
