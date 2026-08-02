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
import { CONTACT_OPTIONS } from "@/data/contact";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactOptionsProps = {
  className?: string;
};

export function ContactOptions({ className }: ContactOptionsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-options"
      spacing="lg"
      tone="surface"
      aria-labelledby="contact-options-heading"
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
            Get in touch
          </motion.p>

          <motion.h2
            id="contact-options-heading"
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
            We&apos;re here when you&apos;re ready
          </motion.h2>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6"
          once
        >
          {CONTACT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const content = (
              <>
                <span className={cn(cardIconWrapClassName, "size-12")}>
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className={cn("mt-5 text-lg", cardTitleClassName)}>
                  {option.title}
                </h3>
                <p className={cn("mt-2 font-medium", cardTitleClassName)}>
                  {option.value}
                </p>
                <p className={cn("mt-1", cardDescriptionClassName)}>
                  {option.detail}
                </p>
              </>
            );

            return (
              <motion.article
                key={option.id}
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
                {option.href ? (
                  <a
                    href={option.href}
                    className={cn(
                      cardSurfaceClassName("glass"),
                      "group/option flex h-full flex-col p-6 outline-none",
                      "focus-visible:ring-3 focus-visible:ring-ring/50",
                    )}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    className={cn(
                      cardSurfaceClassName("glass"),
                      "group/option flex h-full flex-col p-6",
                    )}
                  >
                    {content}
                  </div>
                )}
              </motion.article>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
