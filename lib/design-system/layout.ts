/**
 * Layout — containers, grid, breakpoints, z-index
 * Max container: 1280 | Content: 1200 | Grid: 12 columns
 * Breakpoints: Mobile 480 | Tablet 768 | Laptop 1024 | Desktop 1200
 */

export const containers = {
  max: "var(--uds-container-max)",
  content: "var(--uds-container-content)",
  narrow: "var(--uds-container-narrow)",
  wide: "var(--uds-container-wide)",
} as const;

export const containersPx = {
  max: 1280,
  content: 1200,
  narrow: 768,
  wide: 1440,
} as const;

export const grid = {
  columns: 12,
  gutter: "var(--uds-grid-gutter)",
  gutterSm: "var(--uds-grid-gutter-sm)",
  gutterLg: "var(--uds-grid-gutter-lg)",
  margin: "var(--uds-grid-margin)",
  marginLg: "var(--uds-grid-margin-lg)",
} as const;

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1200,
  max: 1280,
} as const;

export const breakpointsRem = {
  mobile: "30rem",
  tablet: "48rem",
  laptop: "64rem",
  desktop: "75rem",
  max: "80rem",
} as const;

/** Media query helpers */
export const mediaQueries = {
  mobile: `(min-width: ${breakpoints.mobile}px)`,
  tablet: `(min-width: ${breakpoints.tablet}px)`,
  laptop: `(min-width: ${breakpoints.laptop}px)`,
  desktop: `(min-width: ${breakpoints.desktop}px)`,
  max: `(min-width: ${breakpoints.max}px)`,
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 50,
  sticky: 100,
  overlay: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;

export const layoutClasses = {
  containerMax: "container-max",
  containerContent: "container-content",
  containerNarrow: "container-narrow",
  containerWide: "container-wide",
  gridSystem: "grid-system",
  gridSystemSm: "grid-system-sm",
  gridSystemLg: "grid-system-lg",
  sectionSpace: "section-space",
  sectionSpaceSm: "section-space-sm",
  sectionSpaceLg: "section-space-lg",
} as const;
