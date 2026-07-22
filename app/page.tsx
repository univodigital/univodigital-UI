import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { FAQ_ITEMS } from "@/components/sections/faq/data";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { SITE } from "@/constants/site";
import {
  createPageMetadata,
  faqPageJsonLd,
  organizationJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

/**
 * Below-fold sections — code-split for Lighthouse / TTI while keeping SSR for SEO.
 */
const WhyChooseUs = dynamic(() =>
  import("@/components/sections/why-choose-us").then((m) => m.WhyChooseUs),
);
const ServicesPreview = dynamic(() =>
  import("@/components/sections/services-preview").then(
    (m) => m.ServicesPreview,
  ),
);
const PortfolioPreview = dynamic(() =>
  import("@/components/sections/portfolio-preview").then(
    (m) => m.PortfolioPreview,
  ),
);
const Process = dynamic(() =>
  import("@/components/sections/process").then((m) => m.Process),
);
const Testimonials = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.Testimonials),
);
const Faq = dynamic(() =>
  import("@/components/sections/faq").then((m) => m.Faq),
);
const ContactCta = dynamic(() =>
  import("@/components/sections/contact-cta").then((m) => m.ContactCta),
);

export const metadata: Metadata = createPageMetadata({
  title: `${SITE.name} | Brand, Web & Growth`,
  description: SITE.description,
  path: "/",
});

/**
 * Home — assembled from existing marketing sections (page specs order).
 */
export default function Home() {
  const jsonLd = [
    organizationJsonLd(),
    websiteJsonLd(),
    faqPageJsonLd(FAQ_ITEMS),
  ];

  return (
    <PageWrapper>
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <WhyChooseUs />
        <ServicesPreview />
        <PortfolioPreview />
        <Process />
        <Testimonials />
        <Faq />
        <ContactCta />
      </main>

      <Footer />

      {jsonLd.map((data, index) => (
        <script
          // Stable order; schema types are unique per entry
          key={String(data["@type"] ?? index)}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
      ))}
    </PageWrapper>
  );
}
