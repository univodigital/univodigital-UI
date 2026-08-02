"use client";

import { notFound } from "next/navigation";

import { getServiceBySlug } from "@/data/services";
import type { ServiceSlug } from "@/types";

import { Benefits } from "./benefits";
import { FeatureGrid } from "./feature-grid";
import { ProjectShowcase } from "./project-showcase";
import { ServiceCards } from "./service-cards";
import { ServiceCta } from "./service-cta";
import { ServiceFaq } from "./service-faq";
import { ServiceHero } from "./service-hero";
import { ServiceOverview } from "./service-overview";
import { ServiceTimeline } from "./service-timeline";

type ServicePageProps = {
  slug: ServiceSlug;
};

/**
 * Composes all service page sections from a single data object.
 */
export function ServicePage({ slug }: ServicePageProps) {
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceHero service={service} />
      <ServiceOverview service={service} />
      <ServiceCards service={service} />
      <ServiceTimeline service={service} />
      <FeatureGrid service={service} />
      <ProjectShowcase service={service} />
      <Benefits service={service} />
      <ServiceFaq service={service} />
      <ServiceCta service={service} />
    </>
  );
}
