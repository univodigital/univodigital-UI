"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { AboutStoryInfographic } from "./about-story-infographic";

type AboutStoryProps = {
  className?: string;
};

/**
 * Our Story — short copy + animated growth infographic.
 */
export function AboutStory({ className }: AboutStoryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="our-story"
      spacing="lg"
      tone="default"
      aria-labelledby="our-story-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 40%, color-mix(in oklab, var(--uds-color-accent) 10%, transparent), transparent 70%)",
        }}
      />

      <Container size="max">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-lg">
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
              Our Story
            </motion.p>

            <motion.h2
              id="our-story-heading"
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
              Built for measurable growth
            </motion.h2>

            <motion.p
              className="mt-5 text-body-lg text-pretty text-text-secondary"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 16, filter: "blur(6px)" }
              }
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.slow,
                ease: easing.emphasized,
                delay: prefersReducedMotion ? 0 : 0.1,
              }}
            >
              Univo Digital was founded with one simple belief: marketing should
              drive measurable business growth, not just impressions.
            </motion.p>
          </div>

          <AboutStoryInfographic />
        </div>
      </Container>
    </Section>
  );
}
