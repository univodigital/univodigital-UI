import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { PortfolioGrid, PortfolioHero } from "@/components/sections/portfolio";
import { Footer } from "@/components/sections/footer";
import { SITE } from "@/constants/site";
import {
  createPageMetadata,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

const ContactCta = dynamic(() =>
  import("@/components/sections/contact-cta").then((m) => m.ContactCta),
);

export const metadata: Metadata = createPageMetadata({
  title: `Portfolio | ${SITE.name}`,
  description:
    "Explore Univo Digital's portfolio — brand identities, websites, and campaigns built with clarity and purpose.",
  path: "/portfolio",
});

/**
 * Portfolio — full project listing with category filters.
 */
export default function PortfolioPage() {
  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <PortfolioHero />
        <PortfolioGrid />
        <ContactCta />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organizationJsonLd()),
        }}
      />
    </PageWrapper>
  );
}
