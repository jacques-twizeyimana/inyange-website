import Image from "next/image";
import Link from "next/link";
import { formatDate, type Article } from "@/lib/newsroom";

export function NewsCover({ article, sizes, priority }: { article: Article; sizes: string; priority?: boolean }) {
  const { cover } = article;
  return (
    <div className={`nr-cover${cover.fit === "photo" ? " is-photo" : ""}`}>
      <Image src={cover.src} alt={cover.alt} width={800} height={800} sizes={sizes} priority={priority} />
    </div>
  );
}

export function NewsMeta({ article }: { article: Article }) {
  return (
    <div className="nr-meta">
      <span className="iy-badge iy-badge--frost">{article.category}</span>
      <time dateTime={article.date}>{formatDate(article.date)}</time>
    </div>
  );
}

export function NewsCard({ article }: { article: Article }) {
  return (
    <Link href={`/newsroom/${article.slug}`} className="nr-card">
      <NewsCover article={article} sizes="(max-width: 720px) 100vw, 360px" />
      <div className="nr-card-body">
        <NewsMeta article={article} />
        <h3 className="title nr-link-title">{article.title}</h3>
        <p className="plain muted">{article.summary}</p>
        <span className="more" style={{ marginTop: "auto", paddingTop: 8 }}>
          Read story →
        </span>
      </div>
    </Link>
  );
}
