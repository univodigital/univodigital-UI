/**
 * Semantic color token keys for Univo Digital.
 * Prefer these names in components — never hardcode colors.
 */
export const colorTokens = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  background: "background",
  surface: "surface",
  surfaceElevated: "surface-elevated",
  textPrimary: "text-primary",
  textSecondary: "text-secondary",
  textInverse: "text-inverse",
  border: "border",
  borderStrong: "border-strong",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

export type ColorToken = (typeof colorTokens)[keyof typeof colorTokens];

/** CSS variable references for inline styles / Framer Motion */
export const colors = {
  primary: "var(--uds-color-primary)",
  primaryForeground: "var(--uds-color-primary-foreground)",
  secondary: "var(--uds-color-secondary)",
  secondaryForeground: "var(--uds-color-secondary-foreground)",
  accent: "var(--uds-color-accent)",
  accentForeground: "var(--uds-color-accent-foreground)",
  background: "var(--uds-color-background)",
  surface: "var(--uds-color-surface)",
  surfaceElevated: "var(--uds-color-surface-elevated)",
  textPrimary: "var(--uds-color-text-primary)",
  textSecondary: "var(--uds-color-text-secondary)",
  textInverse: "var(--uds-color-text-inverse)",
  border: "var(--uds-color-border)",
  borderStrong: "var(--uds-color-border-strong)",
  ring: "var(--uds-color-ring)",
  success: "var(--uds-color-success)",
  warning: "var(--uds-color-warning)",
  danger: "var(--uds-color-danger)",
} as const;
