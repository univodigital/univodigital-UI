"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

import { StaggerContainer } from "@/animations";
import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  cardDescriptionClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import { CONTACT_SERVICE_CHOICES } from "@/data/contact";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import type { ContactSubject } from "@/types";
import { cn } from "@/lib/utils";

type ContactServicesProps = {
  className?: string;
  selectedSubject?: ContactSubject;
  onSelectService?: (subject: ContactSubject) => void;
};

export function ContactServices({
  className,
  selectedSubject,
  onSelectService,
}: ContactServicesProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-services"
      spacing="lg"
      tone="surface"
      aria-labelledby="contact-services-heading"
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
            Services
          </motion.p>

          <motion.h2
            id="contact-services-heading"
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
            What can we help you with?
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
            Select a service to pre-fill the form — or explore what we offer
            before you reach out.
          </motion.p>
        </div>

        <StaggerContainer
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-6"
          once
        >
          {CONTACT_SERVICE_CHOICES.map((service) => {
            const isSelected = selectedSubject === service.subject;

            return (
              <motion.article
                key={service.id}
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
                <button
                  type="button"
                  onClick={() => onSelectService?.(service.subject)}
                  aria-pressed={isSelected}
                  className={cn(
                    cardSurfaceClassName("glass"),
                    "group/service relative flex h-full w-full flex-col p-6 text-left outline-none",
                    "transition-[border-color,ring-color] duration-[var(--uds-duration-normal)]",
                    isSelected &&
                      "border-accent/50 ring-2 ring-accent/30",
                    "focus-visible:ring-3 focus-visible:ring-ring/50",
                  )}
                >
                  {isSelected ? (
                    <span className="absolute top-4 right-4 inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <CheckIcon className="size-3.5" aria-hidden />
                    </span>
                  ) : null}

                  <h3 className={cn("text-lg", cardTitleClassName)}>
                    {service.title}
                  </h3>
                  <p className={cn("mt-2 flex-1", cardDescriptionClassName)}>
                    {service.description}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent">
                    {isSelected ? "Selected in form" : "Select for form →"}
                  </span>
                </button>
              </motion.article>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
