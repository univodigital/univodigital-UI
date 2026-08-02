import type { Metadata } from "next";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import {
  ServicesIndexGrid,
  ServicesIndexHero,
} from "@/components/sections/services/services-index";
import { Footer } from "@/components/sections/footer";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import {
  createPageMetadata,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `Services | ${SITE.name}`,
  description:
    "Univo Digital offers branding, website development, social media marketing, and performance marketing — helping businesses build brands that stand out digitally.",
  path: ROUTES.services.root,
});

/**
 * Services index — overview of all service offerings.
 */
export default function ServicesPage() {
  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <ServicesIndexHero />
        <ServicesIndexGrid />
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
