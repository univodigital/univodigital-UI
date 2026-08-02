"use client";

import { motion } from "framer-motion";
import { QuoteIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import {
  cardMetaClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";

type ProjectTestimonialProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Client testimonial — premium glass quote block (optional per project).
 */
export function ProjectTestimonial({
  project,
  className,
}: ProjectTestimonialProps) {
  const prefersReducedMotion = useReducedMotion();
  const testimonial = project.testimonial;

  if (!testimonial) return null;

  return (
    <Section
      id="testimonial"
      spacing="lg"
      tone="default"
      aria-labelledby="testimonial-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in oklab, var(--uds-color-accent) 10%, transparent), transparent 70%)",
        }}
      />

      <Container size="max">
        <motion.p
          id="testimonial-heading"
          className="text-center text-caption font-medium tracking-wide text-accent uppercase"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.normal,
            ease: easing.standard,
          }}
        >
          Client testimonial
        </motion.p>

        <motion.blockquote
          className={cn(
            cardSurfaceClassName("glass"),
            "relative mx-auto mt-10 max-w-3xl p-8 sm:p-10 md:p-12",
          )}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.slow,
            ease: easing.emphasized,
          }}
        >
          <QuoteIcon
            className="size-10 text-accent/40"
            aria-hidden
          />

          <p className={cn("mt-6 text-body-lg leading-relaxed md:text-xl", cardTitleClassName)}>
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <footer className="mt-8 flex items-center gap-3 border-t border-border/60 pt-6">
            <span
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-caption font-semibold text-accent"
              aria-hidden
            >
              {testimonial.author
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
            <cite className="not-italic">
              <span className={cn("block text-sm", cardTitleClassName)}>
                {testimonial.author}
              </span>
              <span className={cn("block", cardMetaClassName)}>
                {project.client}
              </span>
            </cite>
          </footer>
        </motion.blockquote>
      </Container>
    </Section>
  );
}
