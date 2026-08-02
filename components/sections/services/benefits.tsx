"use client";

import { motion } from "framer-motion";

import { StaggerContainer } from "@/animations";
import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  cardDescriptionClassName,
  cardIconWrapClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type BenefitsProps = {
  service: ServicePageData;
  className?: string;
};

/**
 * Benefits — outcome-focused cards with large icons.
 */
export function Benefits({ service, className }: BenefitsProps) {
  const prefersReducedMotion = useReducedMotion();
  const { benefits, slug } = service;

  return (
    <Section
      id={`${slug}-benefits`}
      spacing="lg"
      tone="surface"
      aria-labelledby={`${slug}-benefits-heading`}
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
            {benefits.eyebrow}
          </motion.p>

          <motion.h2
            id={`${slug}-benefits-heading`}
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
            {benefits.heading}
          </motion.h2>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          once
        >
          {benefits.items.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={benefit.id}
                className="h-full"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: {
                          duration: duration.normal,
                          ease: easing.standard,
                        },
                      }
                }
              >
                <div
                  className={cn(
                    cardSurfaceClassName("glass"),
                    "group/benefit flex h-full flex-col items-start p-6",
                  )}
                >
                  <span className={cn(cardIconWrapClassName, "size-14 rounded-2xl transition-transform duration-[var(--uds-duration-normal)] group-hover/benefit:scale-105")}>
                    <Icon className="size-7" strokeWidth={1.5} aria-hidden />
                  </span>

                  <h3 className={cn("mt-5 text-lg", cardTitleClassName)}>
                    {benefit.title}
                  </h3>
                  <p className={cn("mt-2", cardDescriptionClassName)}>
                    {benefit.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
