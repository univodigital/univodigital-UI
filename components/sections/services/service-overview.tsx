"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ServiceOverviewProps = {
  service: ServicePageData;
  className?: string;
};

/**
 * Introduction — two-column "Why This Service Matters" section.
 */
export function ServiceOverview({ service, className }: ServiceOverviewProps) {
  const prefersReducedMotion = useReducedMotion();
  const { introduction, slug } = service;

  return (
    <Section
      id={`${slug}-introduction`}
      spacing="lg"
      tone="surface"
      aria-labelledby={`${slug}-introduction-heading`}
      className={cn("relative overflow-hidden", className)}
    >
      <Container size="max">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <div>
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
              {introduction.eyebrow}
            </motion.p>

            <motion.h2
              id={`${slug}-introduction-heading`}
              className="font-heading mt-3 text-h2 text-balance text-text-primary lg:text-[clamp(2.25rem,4vw,3.25rem)]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.slow,
                ease: easing.emphasized,
                delay: prefersReducedMotion ? 0 : 0.05,
              }}
            >
              {introduction.heading}
            </motion.h2>
          </div>

          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : 0.12,
            }}
          >
            <p className="font-heading text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
              {introduction.subheading}
            </p>
            <p className="mt-5 text-body-lg text-pretty text-text-secondary">
              {introduction.body}
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
