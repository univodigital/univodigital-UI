"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { FAQ_ITEMS } from "./data";
import { FaqAccordion } from "./faq-accordion";

type FaqProps = {
  className?: string;
};

/**
 * FAQ — accessible accordion with smooth open/close and scroll reveal.
 */
export function Faq({ className }: FaqProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="faq"
      spacing="lg"
      tone="surface"
      aria-labelledby="faq-heading"
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
            FAQ
          </motion.p>

          <motion.h2
            id="faq-heading"
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
            Questions, answered clearly
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
            Everything you need to know about working with Univo Digital —
            services, timelines, process, and how we kick off.
          </motion.p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  );
}
