/**
 * Backend REST API path segments.
 * Prefixed by NEXT_PUBLIC_API_BASE_URL at the service client.
 */
export const API_PATHS = {
  health: "/health",
  contact: "/contact",
  consultation: "/consultation",
  services: {
    root: "/services",
    bySlug: (slug: string) => `/services/${slug}` as const,
  },
  portfolio: {
    root: "/portfolio",
    bySlug: (slug: string) => `/portfolio/${slug}` as const,
    featured: "/portfolio/featured",
  },
  testimonials: {
    root: "/testimonials",
    featured: "/testimonials/featured",
  },
  faqs: {
    root: "/faqs",
  },
} as const;

export const API_DEFAULTS = {
  timeoutMs: 15_000,
  revalidate: 60,
} as const;
