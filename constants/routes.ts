/**
 * Application route paths — single source of truth for navigation & links.
 */
export const ROUTES = {
  home: "/",
  about: "/about",
  services: {
    root: "/services",
    branding: "/services/branding",
    websiteDevelopment: "/services/website-development",
    socialMediaMarketing: "/services/social-media-marketing",
    performanceMarketing: "/services/performance-marketing",
  },
  portfolio: {
    root: "/portfolio",
    detail: (slug: string) => `/portfolio/${slug}` as const,
  },
  contact: "/contact",
  blog: {
    root: "/blog",
    detail: (slug: string) => `/blog/${slug}` as const,
  },
  admin: {
    root: "/admin",
    login: "/admin/login",
    portfolio: "/admin/portfolio",
    testimonials: "/admin/testimonials",
    faqs: "/admin/faqs",
    leads: "/admin/leads",
    blog: "/admin/blog",
  },
} as const;

export type AppRoute = typeof ROUTES;
