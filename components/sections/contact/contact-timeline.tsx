"use client";

import { motion } from "framer-motion";
import { ArrowDownIcon } from "lucide-react";

import { StaggerContainer } from "@/animations";
import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  cardDescriptionClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import { CONTACT_TIMELINE } from "@/data/contact";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactTimelineProps = {
  className?: string;
};

export function ContactTimeline({ className }: ContactTimelineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-timeline"
      spacing="lg"
      tone="surface"
      aria-labelledby="contact-timeline-heading"
      className={cn("relative overflow-hidden", className)}
    >
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
            Our process
          </motion.p>

          <motion.h2
            id="contact-timeline-heading"
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
            How we work together
          </motion.h2>

          <motion.p
            className="mt-4 text-body text-pretty text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            A clear, collaborative journey from first conversation to lasting
            growth.
          </motion.p>
        </div>

        <StaggerContainer
          className="mt-12 lg:mt-16"
          once
        >
          <div className="hidden lg:grid lg:grid-cols-6 lg:gap-4">
            {CONTACT_TIMELINE.map((stage, index) => (
              <motion.div
                key={stage.id}
                className="relative flex flex-col"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
              >
                {index < CONTACT_TIMELINE.length - 1 ? (
                  <span
                    aria-hidden
                    className="absolute top-8 left-[calc(50%+1.5rem)] h-px w-[calc(100%-3rem)] bg-border"
                  />
                ) : null}

                <div
                  className={cn(
                    cardSurfaceClassName("glass"),
                    "relative flex h-full flex-col p-5",
                  )}
                >
                  <span className="font-heading text-sm font-bold tracking-tight text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={cn("mt-3 text-base", cardTitleClassName)}>
                    {stage.label}
                  </h3>
                  <p className={cn("mt-2 text-sm", cardDescriptionClassName)}>
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <ol className="space-y-4 lg:hidden">
            {CONTACT_TIMELINE.map((stage, index) => (
              <motion.li
                key={stage.id}
                className="list-none"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
              >
                <div
                  className={cn(
                    cardSurfaceClassName("glass"),
                    "flex flex-col p-5",
                  )}
                >
                  <span className="font-heading text-sm font-bold tracking-tight text-accent">
                    {String(index + 1).padStart(2, "0")} · {stage.label}
                  </span>
                  <p className={cn("mt-2", cardDescriptionClassName)}>
                    {stage.description}
                  </p>
                </div>

                {index < CONTACT_TIMELINE.length - 1 ? (
                  <div className="flex justify-center py-2 text-accent">
                    <ArrowDownIcon className="size-4" aria-hidden />
                  </div>
                ) : null}
              </motion.li>
            ))}
          </ol>
        </StaggerContainer>
      </Container>
    </Section>
  );
}
