import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./styles/inyange.css";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Inyange Industries — Made in Rwanda since 1997",
    template: "%s · Inyange Industries",
  },
  description:
    "Milk, Ikivuguto, yoghurt, butter, mineral water and fruit juice — made in Rwanda by Inyange Industries, with milk collected from Rwandan farmers every day.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
