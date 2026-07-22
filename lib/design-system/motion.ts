/**
 * Motion tokens — Fast 150ms | Normal 250ms | Slow 500ms
 * Framer Motion variants live in @/animations.
 */

/** Durations in seconds (Framer Motion) */
export const duration = {
  instant: 0,
  fast: 0.15,
  normal: 0.25,
  slow: 0.5,
  slower: 0.7,
} as const;

/** Durations in milliseconds (CSS / setTimeout) */
export const durationMs = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 500,
  slower: 700,
} as const;

export const easing = {
  standard: [0.22, 1, 0.36, 1] as const,
  emphasized: [0.16, 1, 0.3, 1] as const,
  entrance: [0, 0, 0.2, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
  linear: "linear" as const,
};

export const motion = {
  fadeDistance: 24,
  lift: -4,
  scaleHover: 1.02,
  zoom: 1.05,
  stagger: 0.08,
} as const;

export const transitions = {
  colors: "var(--uds-transition-colors)",
  transform: "var(--uds-transition-transform)",
  shadow: "var(--uds-transition-shadow)",
  all: "var(--uds-transition-all)",
} as const;
