"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/sections/faq/faq-accordion";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ServiceFaqProps = {
  service: ServicePageData;
  className?: string;
};

/**
 * Service FAQ — interactive accordion with service-specific questions.
 */
export function ServiceFaq({ service, className }: ServiceFaqProps) {
  const prefersReducedMotion = useReducedMotion();
  const { faq, slug } = service;

  const accordionItems = faq.items.map((item) => ({
    id: item.id,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <Section
      id={`${slug}-faq`}
      spacing="lg"
      tone="default"
      aria-labelledby={`${slug}-faq-heading`}
      className={cn("relative", className)}
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
            {faq.eyebrow}
          </motion.p>

          <motion.h2
            id={`${slug}-faq-heading`}
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
            {faq.heading}
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
            {faq.description}
          </motion.p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
          <FaqAccordion items={accordionItems} />
        </div>
      </Container>
    </Section>
  );
}
