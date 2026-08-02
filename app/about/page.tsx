import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { AboutHero } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { SITE } from "@/constants/site";
import {
  createPageMetadata,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

const AboutStory = dynamic(() =>
  import("@/components/sections/about/about-story").then((m) => m.AboutStory),
);
const AboutBeliefs = dynamic(() =>
  import("@/components/sections/about/about-beliefs").then(
    (m) => m.AboutBeliefs,
  ),
);
const AboutProcess = dynamic(() =>
  import("@/components/sections/about/about-process").then(
    (m) => m.AboutProcess,
  ),
);
const AboutWhy = dynamic(() =>
  import("@/components/sections/about/about-why").then((m) => m.AboutWhy),
);
const AboutNumbers = dynamic(() =>
  import("@/components/sections/about/about-numbers").then(
    (m) => m.AboutNumbers,
  ),
);
const AboutBrandVisual = dynamic(() =>
  import("@/components/sections/about/about-brand-visual").then(
    (m) => m.AboutBrandVisual,
  ),
);
const AboutCta = dynamic(() =>
  import("@/components/sections/about/about-cta").then((m) => m.AboutCta),
);

export const metadata: Metadata = createPageMetadata({
  title: `About | ${SITE.name}`,
  description:
    "Univo Digital helps ambitious businesses build stronger brands, generate quality leads, and achieve sustainable growth.",
  path: "/about",
});

/**
 * About — premium visual narrative matching homepage design system.
 */
export default function AboutPage() {
  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <AboutHero />
        <AboutStory />
        <AboutBeliefs />
        <AboutProcess />
        <AboutWhy />
        <AboutNumbers />
        <AboutBrandVisual />
        <AboutCta />
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
