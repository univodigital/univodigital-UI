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

import { SERVICE_CAPABILITIES } from "./data";
import { ServiceCapabilityCard } from "./service-capability-card";

type ServicesPreviewProps = {
  className?: string;
};

/**
 * Services — 2×2 capability cards (title, tags, illustration) before Portfolio.
 */
export function ServicesPreview({ className }: ServicesPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="capabilities"
      spacing="lg"
      tone="surface"
      aria-labelledby="capabilities-heading"
      className={cn("relative", className)}
    >
      <Container size="max">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
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
              id="capabilities-heading"
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
              What we take on with you
            </motion.h2>
          </div>

          <motion.div
            className="shrink-0"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            <Button asChild variant="accent" size="lg" className="w-full sm:w-auto">
              <Link href={ROUTES.contact}>Talk through a brief</Link>
            </Button>
          </motion.div>
        </div>

        <StaggerContainer
          className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6 lg:mt-14"
          once
        >
          {SERVICE_CAPABILITIES.map((service) => (
            <ServiceCapabilityCard key={service.id} service={service} />
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
