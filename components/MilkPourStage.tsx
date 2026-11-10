"use client";

import { useEffect, useRef } from "react";
import type { MilkPourHandle } from "@/lib/inyange/bundle";

/**
 * Hero stage for the design system's MilkPour simulation. The bundle is plain browser JS that
 * assigns `window.Inyange`, so it is loaded only on the client, after mount.
 */
export function MilkPourStage({
  pourKey,
  label,
  x = 0.5,
  fill = 0.8,
  height = 520,
}: {
  pourKey: string;
  label: string;
  x?: number;
  fill?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let handle: MilkPourHandle | null = null;
    let cancelled = false;
    import("@/lib/inyange/bundle.js").then(() => {
      const el = ref.current;
      if (cancelled || !el || !window.Inyange) return;
      // Same key every time: a re-mounted stage takes over the running pour instead of restarting it.
      handle = window.Inyange.MilkPour(el, { key: pourKey, x, fill, loop: false, label });
    });
    return () => {
      cancelled = true;
      handle?.release();
    };
  }, [pourKey, label, x, fill]);

  return <div ref={ref} className="iy-pour-stage" style={{ height, borderRadius: 0 }} />;
}
