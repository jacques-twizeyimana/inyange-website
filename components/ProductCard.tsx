import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { KeepChilledIcon } from "./icons";
import { CardMilk } from "./WaveDivider";

export type Variant = "whole-gold" | "sky" | "pasture" | "butter" | "inyange-blue";
export type CardBadge = "chilled" | { label: string; tone: "gold" | "milk" | "frost" | "blue" | "pasture" };

type Media =
  /** A cut-out pack shot sitting above the milk line. */
  | { kind: "shot"; src: StaticImageData; alt: string; maxWidth?: string }
  /** A full-bleed photo filling the image well (no milk line). */
  | { kind: "photo"; src: StaticImageData; alt: string; position?: string }
  /** A 96px pack icon, standing in until a pack shot exists. */
  | { kind: "icon"; icon: ReactNode };

export function ProductCard({
  variant,
  media,
  badge,
  milkHeight = "30%",
  eyebrow,
  title,
  description,
  sizes,
  note,
  href = "/distributors",
  linkLabel = "Where to buy →",
}: {
  variant: Variant;
  media: Media;
  badge?: CardBadge;
  milkHeight?: string;
  eyebrow: string;
  title: string;
  description: string;
  sizes?: string[];
  note?: { label: string; text: string } | string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article className="iy-card" style={{ width: "auto", "--variant": `var(--${variant})` } as CSSProperties}>
      <div className="iy-card-media has-shot">
        {badge === "chilled" ? (
          <span className="iy-badge iy-badge--frost" style={{ zIndex: 2 }}>
            <KeepChilledIcon />
            Keep refrigerated
          </span>
        ) : badge ? (
          <span className={`iy-badge iy-badge--${badge.tone}`} style={{ zIndex: 2 }}>
            {badge.label}
          </span>
        ) : null}
        {media.kind === "shot" && (
          <Image className="shot" src={media.src} alt={media.alt} sizes="300px" style={media.maxWidth ? { maxWidth: media.maxWidth } : undefined} />
        )}
        {media.kind === "photo" && (
          <Image
            className="photo"
            src={media.src}
            alt={media.alt}
            sizes="(max-width: 720px) 100vw, 400px"
            style={media.position ? { objectPosition: media.position } : undefined}
          />
        )}
        {media.kind === "icon" && media.icon}
        {media.kind !== "photo" && <CardMilk height={milkHeight} />}
      </div>
      <div className="iy-card-stripe" />
      <div className="iy-card-body">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="iy-card-title">{title}</h3>
        <p className="plain muted">{description}</p>
        {sizes && (
          <div className="sizes">
            {sizes.map((s) => (
              <span key={s} className="size">
                {s}
              </span>
            ))}
          </div>
        )}
        {typeof note === "string" ? (
          <p className="caption">{note}</p>
        ) : note ? (
          <p className="caption">
            <strong style={{ color: "var(--ink)" }}>{note.label}</strong> {note.text}
          </p>
        ) : null}
        <div className="iy-card-actions">
          <Link className="more" href={href}>
            {linkLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

/** A home-page card that links to a product family. */
export function FamilyCard({
  href,
  variant,
  src,
  alt,
  shotMaxWidth,
  milkHeight,
  eyebrow,
  title,
  description,
  linkLabel,
}: {
  href: string;
  variant: Variant;
  src: StaticImageData;
  alt: string;
  shotMaxWidth?: string;
  milkHeight: string;
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
}) {
  return (
    <Link href={href} className="iy-card" style={{ width: "auto", "--variant": `var(--${variant})` } as CSSProperties}>
      <div className="iy-card-media has-shot">
        <Image className="shot" src={src} alt={alt} sizes="300px" style={shotMaxWidth ? { maxWidth: shotMaxWidth } : undefined} />
        <CardMilk height={milkHeight} />
      </div>
      <div className="iy-card-stripe" />
      <div className="iy-card-body">
        <p className="eyebrow">{eyebrow}</p>
        <h3 className="iy-card-title">{title}</h3>
        <p className="plain muted">{description}</p>
        <span className="more" style={{ marginTop: "auto", paddingTop: 8 }}>
          {linkLabel}
        </span>
      </div>
    </Link>
  );
}
