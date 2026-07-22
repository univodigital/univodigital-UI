"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { StaggerContainer } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { SERVICE_PREVIEW_ITEMS } from "./data";
import { ServiceCard } from "./service-card";

type ServicesPreviewProps = {
  className?: string;
};

/**
 * Home Services Preview — interactive cards with imagery and CTA.
 */
export function ServicesPreview({ className }: ServicesPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="services-preview"
      spacing="lg"
      tone="surface"
      aria-labelledby="services-preview-heading"
      className={cn("relative", className)}
    >
      <Container size="max">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.p
              className="text-caption font-medium tracking-wide text-accent uppercase"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.normal,
                ease: easing.standard,
              }}
            >
              Services
            </motion.p>

            <motion.h2
              id="services-preview-heading"
              className="font-heading mt-3 text-h2 text-balance text-text-primary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.slow,
                ease: easing.emphasized,
                delay: prefersReducedMotion ? 0 : 0.05,
              }}
            >
              Capabilities built to grow your brand
            </motion.h2>

            <motion.p
              className="mt-4 text-body-lg text-pretty text-text-secondary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.normal,
                ease: easing.standard,
                delay: prefersReducedMotion ? 0 : 0.1,
              }}
            >
              From identity to acquisition — explore how Univo Digital helps
              ambitious teams look sharper and perform better.
            </motion.p>
          </div>

          <motion.div
            className="shrink-0"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.12,
            }}
          >
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={ROUTES.services.root}>View all services</Link>
            </Button>
          </motion.div>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:gap-6"
          once
        >
          {SERVICE_PREVIEW_ITEMS.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </StaggerContainer>

        <motion.div
          className="mt-10 flex justify-center sm:mt-12"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.normal,
            ease: easing.standard,
          }}
        >
          <Button asChild size="lg">
            <Link href={ROUTES.contact}>Start a project</Link>
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
