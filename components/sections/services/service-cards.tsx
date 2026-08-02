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

type ServiceCardsProps = {
  service: ServicePageData;
  className?: string;
};

/**
 * What We Offer — interactive capability cards with icon hover.
 */
export function ServiceCards({ service, className }: ServiceCardsProps) {
  const prefersReducedMotion = useReducedMotion();
  const { offerings, slug } = service;

  return (
    <Section
      id={`${slug}-offerings`}
      spacing="lg"
      tone="default"
      aria-labelledby={`${slug}-offerings-heading`}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, color-mix(in oklab, var(--uds-color-accent) 7%, transparent), transparent 70%)",
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
            {offerings.eyebrow}
          </motion.p>

          <motion.h2
            id={`${slug}-offerings-heading`}
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
            {offerings.heading}
          </motion.h2>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          once
        >
          {offerings.items.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.id}
                className="h-full"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -5,
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
                    "group/card relative flex h-full flex-col overflow-hidden p-6",
                  )}
                >
                  <motion.span
                    className={cn(
                      cardIconWrapClassName,
                      "size-11 transition-colors duration-[var(--uds-duration-normal)] group-hover/card:bg-accent/15",
                    )}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : { scale: 1.08, rotate: -4 }
                    }
                    transition={{
                      duration: duration.fast,
                      ease: easing.standard,
                    }}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </motion.span>

                  <h3 className={cn("mt-5 text-lg", cardTitleClassName)}>
                    {item.title}
                  </h3>
                  <p className={cn("mt-2 flex-1", cardDescriptionClassName)}>
                    {item.description}
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
