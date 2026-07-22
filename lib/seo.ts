import type { Metadata } from "next";
import { SITE } from "@/constants/site";
import type { PageSeo } from "@/types";
import { absoluteUrl } from "@/utils/url";

/**
 * Build Next.js Metadata from a page SEO config.
 */
export function createPageMetadata(seo: PageSeo): Metadata {
  const url = absoluteUrl(seo.path);
  const title = seo.title;
  const description = seo.description;
  const images = seo.image
    ? [{ url: seo.image.startsWith("http") ? seo.image : absoluteUrl(seo.image) }]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images?.map((image) => image.url),
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Organization JSON-LD for SEO / Schema.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
  };
}

/**
 * WebSite JSON-LD.
 */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
}

/**
 * FAQPage JSON-LD — reuse FAQ copy for rich results.
 */
export function faqPageJsonLd(
  items: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * Serialize JSON-LD for a script tag (safe for HTML embedding).
 */
export function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
