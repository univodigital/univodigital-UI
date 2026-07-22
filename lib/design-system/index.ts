/**
 * Univo Digital design system — single entry for tokens.
 * Prefer importing from here rather than individual modules.
 */

export * from "./colors";
export * from "./typography";
export * from "./spacing";
export * from "./radius";
export * from "./shadows";
export * from "./layout";
export * from "./motion";

import { colors } from "./colors";
import { containers, breakpoints, grid, zIndex } from "./layout";
import { duration, durationMs, easing, motion } from "./motion";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { space, semanticSpace } from "./spacing";
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
} from "./typography";

/** Aggregated token map for tooling / theme providers */
export const designTokens = {
  colors,
  typography: {
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
  },
  space,
  semanticSpace,
  radius,
  shadows,
  layout: {
    containers,
    breakpoints,
    grid,
    zIndex,
  },
  motion: {
    duration,
    durationMs,
    easing,
    ...motion,
  },
} as const;

export type DesignTokens = typeof designTokens;
