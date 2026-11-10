import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { CardMilk } from "./WaveDivider";

export type Variant = "whole-gold" | "sky" | "pasture" | "butter" | "inyange-blue";

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
  milkHeight = "30%",
  title,
  description,
  href = "/distributors",
  linkLabel = "Where to buy →",
}: {
  variant: Variant;
  media: Media;
  milkHeight?: string;
  title: string;
  /** One or two sentences; pack sizes and storage go here rather than in tags. */
  description: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <article className="iy-card" style={{ width: "auto", "--variant": `var(--${variant})` } as CSSProperties}>
      <div className="iy-card-media has-shot">
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
        <h3 className="iy-card-title">{title}</h3>
        <p className="plain muted">{description}</p>
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
        <h3 className="iy-card-title">{title}</h3>
        <p className="plain muted">{description}</p>
        <span className="more" style={{ marginTop: "auto", paddingTop: 8 }}>
          {linkLabel}
        </span>
      </div>
    </Link>
  );
}
