import type { CSSProperties } from "react";

/** Two layers of milk across the seam between a blue band and the next section (design system: WaveDivider). */
export function WaveDivider({
  top = "var(--surface-brand)",
  bottom = "var(--surface)",
}: {
  top?: string;
  bottom?: string;
}) {
  return (
    <div className="iy-wave" aria-hidden="true" style={{ "--wave-top": top, "--wave-bottom": bottom } as CSSProperties}>
      <svg className="iy-wave-back" viewBox="0 0 2880 48" preserveAspectRatio="none">
        <path d="M0 22 C240 42 480 42 720 22 S1200 2 1440 22 S1920 42 2160 22 S2640 2 2880 22 V48 H0 Z" />
      </svg>
      <svg className="iy-wave-front" viewBox="0 0 2880 48" preserveAspectRatio="none">
        <path d="M0 26 C240 8 480 8 720 26 S1200 44 1440 26 S1920 8 2160 26 S2640 44 2880 26 V48 H0 Z" />
      </svg>
    </div>
  );
}

/** The rolling milk line along the bottom of a product card's image well. */
export function CardMilk({ height = "30%" }: { height?: string }) {
  return (
    <div className="iy-card-milk" aria-hidden="true" style={{ height }}>
      <svg viewBox="0 0 2880 48" preserveAspectRatio="none">
        <path d="M0 14 C240 2 480 2 720 14 S1200 26 1440 14 S1920 2 2160 14 S2640 26 2880 14 V48 H0 Z" />
      </svg>
    </div>
  );
}
