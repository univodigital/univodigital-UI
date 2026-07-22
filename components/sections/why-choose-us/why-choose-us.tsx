"use client";

import { motion } from "framer-motion";

import { StaggerContainer } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { FeatureCard } from "./feature-card";
import { WHY_CHOOSE_FEATURES } from "./features";

type WhyChooseUsProps = {
  className?: string;
};

/**
 * Why Choose Us — interactive feature cards with reveal + hover motion.
 */
export function WhyChooseUs({ className }: WhyChooseUsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="why-choose-us"
      spacing="lg"
      tone="default"
      aria-labelledby="why-choose-us-heading"
      className={cn("relative overflow-hidden", className)}
    >
      {/* Soft section atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 10%, transparent), transparent 70%)",
        }}
      />

      <Container size="max">
        <div className="mx-auto max-w-2xl text-center">
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
            Why choose us
          </motion.p>

          <motion.h2
            id="why-choose-us-heading"
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
            The difference is in the details
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
            Six reasons teams trust Univo Digital to shape brands, ship sharper
            digital products, and grow with confidence.
          </motion.p>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          once
        >
          {WHY_CHOOSE_FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
