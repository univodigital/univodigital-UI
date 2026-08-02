/**
 * Site-wide brand & SEO defaults.
 */
export const SITE = {
  name: "Univo Digital",
  legalName: "Univo Digital",
  tagline: "We Don't Just Market Brands. We Build Businesses That Grow.",
  description:
    "Univo Digital is a modern digital agency specializing in branding, website development, social media marketing, and performance marketing.",
  url: "https://univodigital.com",
  locale: "en_US",
  email: "univodigital@gmail.com",
  phone: "+91 70236 10789",
  address: {
    line1: "",
    city: "",
    region: "",
    postalCode: "",
    country: "IN",
  },
} as const;

/** Official brand assets — wordmark + icon (transparent PNGs). */
export const BRAND = {
  logo: "/brand/logo.png",
  icon: "/brand/icon.png",
  logoWidth: 727,
  logoHeight: 276,
  iconWidth: 208,
  iconHeight: 299,
  /** Logo palette — keep CSS tokens in sync (`styles/tokens/colors.css`). */
  colors: {
    navy: "#001028",
    blue: "#0048F8",
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
