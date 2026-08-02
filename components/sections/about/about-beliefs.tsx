"use client";

import { motion } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { StaggerContainer } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  cardDescriptionClassName,
  cardIconWrapClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { BELIEFS } from "./data";

type AboutBeliefsProps = {
  className?: string;
};

/**
 * What We Believe — three glass cards.
 */
export function AboutBeliefs({ className }: AboutBeliefsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="what-we-believe"
      spacing="lg"
      tone="surface"
      aria-labelledby="what-we-believe-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 9%, transparent), transparent 70%)",
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
            Principles
          </motion.p>

          <motion.h2
            id="what-we-believe-heading"
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
            What we believe
          </motion.h2>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-16 lg:gap-6"
          once
        >
          {BELIEFS.map((belief) => {
            const Icon = belief.icon;
            return (
              <motion.article
                key={belief.id}
                className="h-full"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: {
                          duration: duration.normal,
                          ease: easing.standard,
                        },
                      }
                }
              >
                <div
                  className={cn(
                    cardSurfaceClassName("glassElevated"),
                    "group/belief relative flex h-full flex-col p-6 md:p-7",
                  )}
                  style={{
                    boxShadow:
                      "0 0 0 0 transparent, inset 0 1px 0 color-mix(in oklab, white 6%, transparent)",
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[var(--uds-duration-normal)] group-hover/belief:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 36px color-mix(in oklab, var(--uds-color-accent) 22%, transparent)",
                    }}
                  />

                  <span className={cn(cardIconWrapClassName, "relative size-12 transition-transform duration-[var(--uds-duration-normal)] group-hover/belief:scale-105")}>
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>

                  <h3 className={cn("relative mt-5 text-lg md:text-xl", cardTitleClassName)}>
                    {belief.title}
                  </h3>
                  <p className={cn("relative mt-2", cardDescriptionClassName)}>
                    {belief.description}
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
