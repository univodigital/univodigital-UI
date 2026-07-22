/**
 * 8pt spacing system.
 * Base unit: 8px. Half-steps (4px) allowed for fine tuning.
 */
export const space = {
  0: "var(--uds-space-0)",
  0.5: "var(--uds-space-0-5)",
  1: "var(--uds-space-1)",
  2: "var(--uds-space-2)",
  3: "var(--uds-space-3)",
  4: "var(--uds-space-4)",
  5: "var(--uds-space-5)",
  6: "var(--uds-space-6)",
  7: "var(--uds-space-7)",
  8: "var(--uds-space-8)",
  9: "var(--uds-space-9)",
  10: "var(--uds-space-10)",
  12: "var(--uds-space-12)",
  14: "var(--uds-space-14)",
  16: "var(--uds-space-16)",
  20: "var(--uds-space-20)",
  24: "var(--uds-space-24)",
  28: "var(--uds-space-28)",
  32: "var(--uds-space-32)",
  40: "var(--uds-space-40)",
  48: "var(--uds-space-48)",
} as const;

/** Pixel reference for the 8pt scale */
export const spaceScalePx = {
  0: 0,
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  40: 160,
  48: 192,
} as const;

export const semanticSpace = {
  section: "var(--uds-space-section)",
  sectionSm: "var(--uds-space-section-sm)",
  sectionLg: "var(--uds-space-section-lg)",
  gutter: "var(--uds-space-gutter)",
  gutterLg: "var(--uds-space-gutter-lg)",
  stack: "var(--uds-space-stack)",
  stackLg: "var(--uds-space-stack-lg)",
} as const;

/** Tailwind spacing class tokens (gap-uds-4, p-section, etc.) */
export const spacingClasses = {
  section: "p-section",
  sectionY: "py-section",
  sectionSmY: "py-section-sm",
  sectionLgY: "py-section-lg",
  gutter: "gap-gutter",
  stack: "gap-stack",
} as const;
