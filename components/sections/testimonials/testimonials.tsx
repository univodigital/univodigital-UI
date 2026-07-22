"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { CompanyLogos } from "./company-logos";
import { TESTIMONIAL_COMPANIES, TESTIMONIALS } from "./data";
import { TestimonialCarousel } from "./testimonial-carousel";

type TestimonialsProps = {
  className?: string;
};

/**
 * Testimonials — modern carousel with client cards and company logos.
 */
export function Testimonials({ className }: TestimonialsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="testimonials"
      spacing="lg"
      tone="default"
      aria-labelledby="testimonials-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 9%, transparent), transparent 70%)",
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
            Testimonials
          </motion.p>

          <motion.h2
            id="testimonials-heading"
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
            Clients who grew with us
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
            Real feedback from founders and marketing leaders who trusted Univo
            Digital with their brand and growth.
          </motion.p>
        </div>

        <motion.div
          className="mt-12 lg:mt-16"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.slow,
            ease: easing.emphasized,
          }}
        >
          <TestimonialCarousel items={TESTIMONIALS} />
        </motion.div>

        <div className="mt-14 lg:mt-16">
          <CompanyLogos companies={TESTIMONIAL_COMPANIES} />
        </div>
      </Container>
    </Section>
  );
}
