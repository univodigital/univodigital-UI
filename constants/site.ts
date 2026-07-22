/**
 * Site-wide brand & SEO defaults.
 */
export const SITE = {
  name: "Univo Digital",
  legalName: "Univo Digital",
  tagline: "Premium digital agency for brand, web, and growth.",
  description:
    "Univo Digital is a modern digital agency specializing in branding, website development, social media marketing, and performance marketing.",
  url: "https://univodigital.com",
  locale: "en_US",
  email: "hello@univodigital.com",
  phone: "+91 00000 00000",
  address: {
    line1: "",
    city: "",
    region: "",
    postalCode: "",
    country: "IN",
  },
} as const;

export const SITE_METADATA = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website" as const,
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image" as const,
  },
} as const;
