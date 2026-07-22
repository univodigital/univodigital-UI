export const radius = {
  none: "var(--uds-radius-none)",
  sm: "var(--uds-radius-sm)",
  md: "var(--uds-radius-md)",
  lg: "var(--uds-radius-lg)",
  xl: "var(--uds-radius-xl)",
  "2xl": "var(--uds-radius-2xl)",
  "3xl": "var(--uds-radius-3xl)",
  full: "var(--uds-radius-full)",
  button: "var(--uds-radius-button)",
  card: "var(--uds-radius-card)",
  image: "var(--uds-radius-image)",
  input: "var(--uds-radius-input)",
  badge: "var(--uds-radius-badge)",
} as const;

export const radiusScalePx = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: 9999,
} as const;
