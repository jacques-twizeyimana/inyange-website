import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { NewsCard, NewsCover } from "@/components/NewsCard";
import { articles, formatDate, getArticle, relatedArticles, type Block } from "@/lib/newsroom";
import { company } from "@/lib/site";
import "../newsroom.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: "article", publishedTime: article.date },
  };
}

function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure>
      <div className="nr-figure-frame">
        <Image src={src} alt={alt} fill sizes="(max-width: 720px) 100vw, 720px" />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return <p key={i}>{block.text}</p>;
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "list":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i}>
          {block.text}
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    case "image":
      return <Figure key={i} src={block.src} alt={block.alt} caption={block.caption} />;
    case "gallery":
      return (
        <figure key={i}>
          <div className="nr-gallery">
            {block.images.map((img) => (
              <div key={img.src} className="nr-figure-frame">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 720px) 100vw, 360px" />
              </div>
            ))}
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
  }
}

export default function ArticlePage({ params }: Props) {
  return (
    <Suspense fallback={<div style={{ minHeight: 360 }} aria-busy="true" />}>
      <ArticleView params={params} />
    </Suspense>
  );
}

async function ArticleView({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const more = relatedArticles(slug);

  return (
    <>
      <header className="wrap nr-head">
        <Link href="/newsroom" className="nr-back">
          <ArrowLeft aria-hidden="true" /> Back to newsroom
        </Link>
        <div className="nr-article-meta">
          <span className="iy-badge iy-badge--frost">{article.category}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readMinutes} min read</span>
        </div>
        <h1 className="display-xl nr-title">{article.title}</h1>
        <p className="body-l muted" style={{ maxWidth: 720 }}>
          {article.summary}
        </p>
      </header>

      <div className="wrap">
        <div className="nr-hero-figure">
          <NewsCover article={article} sizes="(max-width: 960px) 100vw, 960px" priority />
        </div>
      </div>

      <section className="section" style={{ paddingTop: 56 }}>
        <div className="wrap nr-layout">
          <article className="stack" style={{ gap: 0 }}>
            <div className="prose">{article.body.map(renderBlock)}</div>
            <div className="nr-share">
              <span className="caption">Published {formatDate(article.date)} by {company.legalName}</span>
            </div>
          </article>

          <aside className="stack" style={{ gap: 24 }} aria-label="Downloads and contact">
            {article.attachments && article.attachments.length > 0 && (
              <div className="nr-downloads">
                <div>
                  <p className="eyebrow">Downloads</p>
                  <h2 className="heading" style={{ marginTop: 6 }}>
                    Files for this story
                  </h2>
                </div>
                <ul>
                  {article.attachments.map((file) => (
                    <li key={file.href} className="nr-file">
                      <div className="nr-file-head">
                        <span className="nr-file-icon">
                          <FileText aria-hidden="true" />
                        </span>
                        <div>
                          <p className="nr-file-title">{file.label}</p>
                          <p className="nr-file-note">
                            {file.kind}
                            {file.note ? ` · ${file.note}` : ""}
                          </p>
                        </div>
                      </div>
                      <a
                        className="iy-btn iy-btn--primary iy-btn--small"
                        href={file.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Download ${file.label} (${file.kind}, opens in a new tab)`}
                      >
                        <Download aria-hidden="true" /> Download {file.kind}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="tile">
              <p className="eyebrow">Media contact</p>
              <p className="plain">Questions about this story, interviews or images?</p>
              <div className="nr-contact">
                <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Media enquiry: ${article.title}`)}`}>
                  {company.email}
                </a>
                <a href={company.phoneHref}>{company.phone}</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="section" style={{ background: "var(--surface-sunken)" }}>
          <div className="wrap stack" style={{ gap: 32 }}>
            <div className="row" style={{ justifyContent: "space-between", gap: 16 }}>
              <h2 className="display-l">More from the newsroom</h2>
              <Link href="/newsroom" className="more">
                All stories →
              </Link>
            </div>
            <ul className="nr-grid">
              {more.map((a) => (
                <li key={a.slug}>
                  <NewsCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
