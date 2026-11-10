"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts its children only once the box scrolls near the viewport, so the map
 * library (and its tiles) are never downloaded for visitors who don't reach it.
 * Pair with next/dynamic so the map code lives in its own chunk.
 */
export function LazyOnView({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      className="map-box"
      style={{ flex: "1 1 auto", minHeight: "inherit", width: "100%", display: "block" }}
    >
      {visible ? children : null}
    </div>
  );
}
