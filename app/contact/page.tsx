import type { Metadata } from "next";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { ContactPageContent } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import {
  createPageMetadata,
  faqPageJsonLd,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";
import { CONTACT_FAQ_ITEMS } from "@/data/contact";

export const metadata: Metadata = createPageMetadata({
  title: `Contact | ${SITE.name}`,
  description:
    "Start your project with Univo Digital. Get in touch for branding, website development, social media, and performance marketing.",
  path: ROUTES.contact,
});

/**
 * Contact — premium conversion-focused page for project inquiries.
 */
export default function ContactPage() {
  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <ContactPageContent />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(organizationJsonLd()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqPageJsonLd(CONTACT_FAQ_ITEMS)),
        }}
      />
    </PageWrapper>
  );
}
