"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down" | null;

/**
 * Tracks scroll direction for sticky nav show/hide patterns.
 */
export function useScrollDirection(threshold = 8): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(null);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) < threshold) return;

      setDirection(delta > 0 ? "down" : "up");
      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return direction;
}
