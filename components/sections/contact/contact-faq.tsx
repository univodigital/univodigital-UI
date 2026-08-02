"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { FaqAccordion } from "@/components/sections/faq/faq-accordion";
import { CONTACT_FAQ_ITEMS } from "@/data/contact";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactFaqProps = {
  className?: string;
};

export function ContactFaq({ className }: ContactFaqProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-faq"
      spacing="lg"
      tone="default"
      aria-labelledby="contact-faq-heading"
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
            id="contact-faq-heading"
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
            Questions before you reach out
          </motion.h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl lg:mt-12">
          <FaqAccordion items={CONTACT_FAQ_ITEMS} />
        </div>
      </Container>
    </Section>
  );
}
