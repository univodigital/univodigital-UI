/**
 * Typography scale — H1 64–72 | H2 48 | H3 36 | H4 28 | Body 18/16 | Caption 14
 */
export const fontFamilies = {
  heading: "var(--uds-font-heading)",
  body: "var(--uds-font-body)",
  mono: "var(--uds-font-mono)",
} as const;

export const fontSizes = {
  h1: "var(--uds-text-h1)",
  h2: "var(--uds-text-h2)",
  h3: "var(--uds-text-h3)",
  h4: "var(--uds-text-h4)",
  bodyLg: "var(--uds-text-body-lg)",
  body: "var(--uds-text-body)",
  caption: "var(--uds-text-caption)",
  overline: "var(--uds-text-overline)",
} as const;

/** Rem/px reference values for documentation & tests */
export const fontSizeScale = {
  h1Min: "4rem", // 64px
  h1Max: "4.5rem", // 72px
  h2: "3rem", // 48px
  h3: "2.25rem", // 36px
  h4: "1.75rem", // 28px
  bodyLg: "1.125rem", // 18px
  body: "1rem", // 16px
  caption: "0.875rem", // 14px
  overline: "0.75rem", // 12px
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const lineHeights = {
  h1: 1.05,
  h2: 1.15,
  h3: 1.2,
  h4: 1.25,
  body: 1.6,
  caption: 1.45,
  tight: 1.2,
  relaxed: 1.75,
} as const;

export const letterSpacings = {
  h1: "-0.03em",
  h2: "-0.025em",
  h3: "-0.02em",
  h4: "-0.015em",
  body: "0",
  caption: "0.01em",
  overline: "0.08em",
} as const;

/** Tailwind class aliases for the type scale */
export const typographyClasses = {
  h1: "text-h1 font-heading",
  h2: "text-h2 font-heading",
  h3: "text-h3 font-heading",
  h4: "text-h4 font-heading",
  bodyLg: "text-body-lg",
  body: "text-body",
  caption: "text-caption",
  overline: "text-overline uppercase",
} as const;
