import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Navbar, PageWrapper, SkipToContent } from "@/components/layout";
import { ProjectPage } from "@/components/sections/portfolio-detail";
import { Footer } from "@/components/sections/footer";
import { SITE } from "@/constants/site";
import {
  getAllPortfolioSlugs,
  getNextPortfolioProject,
  getPortfolioProject,
} from "@/data/portfolio-projects";
import {
  createPageMetadata,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/seo";

const ContactCta = dynamic(() =>
  import("@/components/sections/contact-cta").then((m) => m.ContactCta),
);

type PortfolioProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPortfolioSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    return createPageMetadata({
      title: `Project not found | ${SITE.name}`,
      description: SITE.description,
      path: `/portfolio/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: `${project.title} | ${SITE.name}`,
    description: project.summary,
    path: `/portfolio/${slug}`,
    image: project.imageSrc,
  });
}

/**
 * Portfolio project detail — data-driven case study page.
 */
export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextPortfolioProject(slug);

  return (
    <PageWrapper className="dark">
      <SkipToContent />

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <ProjectPage project={project} nextProject={nextProject} />
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
