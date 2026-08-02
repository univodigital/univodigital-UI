import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { ServicePage } from "@/components/sections/services";
import { Footer } from "@/components/sections/footer";
import { SITE } from "@/constants/site";
import {
  getAllServiceSlugs,
  getServiceBySlug,
  getServiceHref,
} from "@/data/services";
import type { ServiceSlug } from "@/types";
import {
  createPageMetadata,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

type ServiceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: `Services | ${SITE.name}`,
      description: SITE.description,
      path: "/services",
    });
  }

  return createPageMetadata({
    title: `${service.title} | ${SITE.name}`,
    description: service.metaDescription,
    path: getServiceHref(service.slug),
  });
}

/**
 * Dynamic service detail page — branding, web, social, performance.
 */
export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <ServicePage slug={service.slug as ServiceSlug} />
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
