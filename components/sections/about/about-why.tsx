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
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { WHY_FEATURES } from "./data";

type AboutWhyProps = {
  className?: string;
};

/**
 * Why Choose Univo — premium feature grid with glow hover.
 */
export function AboutWhy({ className }: AboutWhyProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="why-univo"
      spacing="lg"
      tone="surface"
      aria-labelledby="why-univo-heading"
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
            Why Univo
          </motion.p>

          <motion.h2
            id="why-univo-heading"
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
            Why choose Univo
          </motion.h2>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6"
          once
        >
          {WHY_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={feature.id}
                className="h-full"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -5,
                        scale: 1.015,
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
                    "group/why relative flex h-full flex-col overflow-hidden p-6",
                  )}
                >
                  {/* Animated border glow sweep */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[var(--uds-duration-normal)] group-hover/why:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklab, var(--uds-color-accent) 18%, transparent), transparent 45%, color-mix(in oklab, var(--uds-color-accent) 10%, transparent))",
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[var(--uds-duration-normal)] group-hover/why:opacity-100"
                    style={{
                      boxShadow:
                        "0 0 40px color-mix(in oklab, var(--uds-color-accent) 20%, transparent)",
                    }}
                  />

                  <motion.span
                    className={cn(cardIconWrapClassName, "relative size-11")}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { rotate: [0, -4, 0, 4, 0] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : {
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: (feature.id.length % 5) * 0.35,
                          }
                    }
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </motion.span>

                  <h3 className={cn("relative mt-5 text-lg", cardTitleClassName)}>
                    {feature.title}
                  </h3>
                  <p className={cn("relative mt-2", cardDescriptionClassName)}>
                    {feature.description}
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
