"use client";

import { useMediaQuery } from "./use-media-query";
import { mediaQueries } from "@/lib/design-system";

/**
 * Respect prefers-reduced-motion for Framer Motion / CSS.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery(mediaQueries.reducedMotion);
}
