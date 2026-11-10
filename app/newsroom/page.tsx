import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { NewsCard, NewsCover, NewsMeta } from "@/components/NewsCard";
import { PageHero } from "@/components/sections";
import { categories, isCategory, sortedArticles } from "@/lib/newsroom";
import { company } from "@/lib/site";
import "./newsroom.css";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "News, press releases and downloads from Inyange Industries.",
};

export default function NewsroomPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News from Inyange."
        lead="Company announcements, press releases and the stories behind our milk, water and juice. Journalists can download releases and factsheets with each story."
        leadMaxWidth={680}
      />
      <Suspense fallback={<section className="section" style={{ minHeight: 640 }} aria-busy="true" />}>
        <Stories searchParams={searchParams} />
      </Suspense>
      <MediaCta />
    </>
  );
}

async function Stories({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const active = isCategory(category) ? category : undefined;
  const list = active ? sortedArticles.filter((a) => a.category === active) : sortedArticles;
  // The featured story is the latest overall, shown only on the unfiltered view.
  const featured = active ? undefined : list[0];
  const rest = featured ? list.slice(1) : list;

  return (
    <>
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap stack" style={{ gap: 48 }}>
          <nav aria-label="Filter stories by category">
            <ul className="nr-filters" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              <li>
                <Link href="/newsroom" className="chip" aria-current={!active ? "true" : undefined}>
                  All stories
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c}>
                  <Link
                    href={`/newsroom?category=${encodeURIComponent(c)}`}
                    className="chip"
                    aria-current={active === c ? "true" : undefined}
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {featured && (
            <Link href={`/newsroom/${featured.slug}`} className="nr-featured">
              <NewsCover article={featured} sizes="(max-width: 720px) 100vw, 600px" priority />
              <div className="nr-featured-body">
                <p className="eyebrow">Latest</p>
                <NewsMeta article={featured} />
                <h2 className="display-l nr-link-title" style={{ fontSize: 36, lineHeight: "40px" }}>
                  {featured.title}
                </h2>
                <p className="body-l muted">{featured.summary}</p>
                <span className="more">Read story →</span>
              </div>
            </Link>
          )}

          {rest.length > 0 ? (
            <ul className="nr-grid" aria-label={active ? `${active} stories` : "More stories"}>
              {rest.map((a) => (
                <li key={a.slug}>
                  <NewsCard article={a} />
                </li>
              ))}
            </ul>
          ) : (
            !featured && (
              <div className="nr-empty">
                <p className="title">No stories in this category yet.</p>
                <p className="muted" style={{ marginTop: 8 }}>
                  <Link href="/newsroom">See all stories</Link>
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}

function MediaCta() {
  return (
    <>
      <section className="section" style={{ background: "var(--surface-sunken)", paddingTop: 64, paddingBottom: 64 }}>
        <div className="wrap">
          <div className="cta-card is-brand">
            <h2 className="display-l">Media enquiries</h2>
            <p className="body-l" style={{ maxWidth: 620 }}>
              Need a comment, an interview or a high-resolution image? Our team will get back to you.
            </p>
            <a className="iy-btn iy-btn--milk" href={`mailto:${company.email}?subject=Media%20enquiry`}>
              {company.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
