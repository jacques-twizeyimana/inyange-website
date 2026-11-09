import type { CSSProperties, ReactNode } from "react";

/* 24px line icons from the Inyange design: 1.75 stroke (1.5 for pack icons), round caps and joins,
   drawn with currentColor so they follow the text colour. All decorative (aria-hidden). */

type IconProps = { className?: string; style?: CSSProperties; strokeWidth?: number };

function Icon({ children, className, style, strokeWidth = 1.75 }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {children}
    </svg>
  );
}

export const KeepChilledIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.5v19M3.8 7.25l16.4 9.5M3.8 16.75l16.4-9.5" />
    <path d="M9.5 3.5L12 6l2.5-2.5M9.5 20.5L12 18l2.5 2.5" />
  </Icon>
);

export const PowderIcon = (p: IconProps) => (
  <Icon strokeWidth={1.5} {...p}>
    <path d="M5 3.5h14V6H5z" />
    <path d="M6 6h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
    <path d="M9 12h6M9 15.5h6" />
  </Icon>
);

export const ButterIcon = (p: IconProps) => (
  <Icon strokeWidth={1.5} {...p}>
    <path d="M3 13l4-4h14l-4 4z" />
    <path d="M3 13v5h14v-5" />
    <path d="M17 18l4-4V9" />
    <path d="M7 13v5" />
  </Icon>
);

export const YoghurtCupIcon = (p: IconProps) => (
  <Icon strokeWidth={1.5} {...p}>
    <path d="M4 4h16v3H4z" />
    <path d="M5.5 7l1.4 13a1.5 1.5 0 0 0 1.5 1.3h7.2a1.5 1.5 0 0 0 1.5-1.3L18.5 7" />
    <path d="M6.3 12c1.9.9 3.8-.9 5.7 0s3.8.9 5.7 0" />
  </Icon>
);

export const GreekYoghurtIcon = (p: IconProps) => (
  <Icon strokeWidth={1.5} {...p}>
    <path d="M4 7.5h16" />
    <path d="M5 7.5l1.2 11.5A2.2 2.2 0 0 0 8.4 21h7.2a2.2 2.2 0 0 0 2.2-2l1.2-11.5" />
    <path d="M6 7.5c0-2 2.5-3.5 6-3.5s6 1.5 6 3.5" />
    <path d="M8.5 13h7" />
  </Icon>
);

export const GlassBottleIcon = (p: IconProps) => (
  <Icon strokeWidth={1.5} {...p}>
    <path d="M10 6V2.5h4V6c2 1 2.5 2.5 2.5 4.5V20a1.5 1.5 0 0 1-1.5 1.5H9A1.5 1.5 0 0 1 7.5 20v-9.5C7.5 8.5 8 7 10 6z" />
    <path d="M7.5 13h9" />
    <path d="M9.5 2.5h5" />
  </Icon>
);

export const GlassIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 3h12l-1.6 17.1A1.5 1.5 0 0 1 14.9 21.5H9.1a1.5 1.5 0 0 1-1.5-1.4z" />
    <path d="M6.7 10c1.8.9 3.5-.9 5.3 0s3.5.9 5.3 0" />
  </Icon>
);

export const JerrycanIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 9a2 2 0 0 1 2-2h7.5L19 10.5V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z" />
    <path d="M8 7V4.5h5V7" />
    <path d="M16 8.5l1.5-3h2" />
    <path d="M8 12h6M8 15.5h6" />
  </Icon>
);

export const CartonIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M8 4h8l2 3v12.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5V7z" />
    <path d="M6 7h12" />
    <path d="M13 2h3v2h-3z" />
    <path d="M6 15c2 1 4-1 6 0s4 1 6 0" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Icon>
);

export const MailIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 6h18v12H3z" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon strokeWidth={2.5} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Icon>
);

/** Outline glass with a white milk fill, used as illustration on blue bands. */
export function MilkGlass({ width, height, level = "mid" }: { width: number; height: number; level?: "mid" | "high" }) {
  const milk =
    level === "high"
      ? "M14 40 C40 30 60 46 84 38 S106 36 106 36 L97.5 164 Q97 170 91 170 H29 Q23 170 22.5 164 Z"
      : "M17 64 C40 56 55 70 80 62 S104 58 104 58 L97.5 164 Q97 170 91 170 H29 Q23 170 22.5 164 Z";
  return (
    <svg viewBox="0 0 120 180" style={{ width, height }} aria-hidden="true">
      <path d="M10 6 H110 L98 170 Q97 176 91 176 H29 Q23 176 22 170 Z" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round" />
      <path d={milk} fill="#ffffff" />
      <rect x="20" y="20" width="5" height="120" rx="2.5" fill="#ffffff" opacity=".35" />
    </svg>
  );
}

/* Social network marks, simplified and drawn in currentColor. Decorative: the link carries the name. */
export function SocialIcon({ network }: { network: "facebook" | "instagram" | "x" }) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {network === "facebook" ? (
        <path d="M13.6 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.6-1.5h1.6V4.3a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6V21z" />
      ) : (
        <path d="M17.6 3.5h3l-6.6 7.5 7.7 9.5h-6l-4.7-6-5.4 6H2.6l7-8L2.3 3.5h6.2l4.3 5.6zm-1 15.3h1.7L7.5 5.1H5.7z" />
      )}
    </svg>
  );
}
