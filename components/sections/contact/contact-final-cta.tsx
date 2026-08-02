"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AboutCtaBackground } from "@/components/sections/about/about-cta-background";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactFinalCtaProps = {
  className?: string;
  onBookConsultation?: () => void;
};

function itemVariants(prefersReducedMotion: boolean) {
  return {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: prefersReducedMotion ? 0 : duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}

export function ContactFinalCta({
  className,
  onBookConsultation,
}: ContactFinalCtaProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-final-cta"
      spacing="none"
      tone="default"
      aria-labelledby="contact-final-cta-heading"
      className={cn("relative isolate overflow-hidden", className)}
    >
      <AboutCtaBackground />

      <Container
        size="max"
        className="relative z-10 py-24 md:py-28 lg:py-32"
      >
        <motion.div
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger,
                delayChildren: prefersReducedMotion ? 0 : 0.06,
              },
            },
          }}
        >
          <motion.h2
            id="contact-final-cta-heading"
            className="font-heading text-h2 text-balance text-text-primary md:text-[clamp(2.25rem,4vw,3.5rem)]"
            variants={itemVariants(prefersReducedMotion)}
          >
            Ready to Build Your Next Digital Success Story?
          </motion.h2>

          <motion.p
            className="mt-5 max-w-2xl text-body-lg text-pretty text-text-secondary"
            variants={itemVariants(prefersReducedMotion)}
          >
            Every successful brand starts with a conversation. Let&apos;s discuss
            your goals and create something meaningful together.
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
            variants={itemVariants(prefersReducedMotion)}
          >
            <Button
              type="button"
              size="lg"
              variant="accent"
              className={cn(
                "h-12 min-w-52 px-8 text-base shadow-md",
                "transition-[transform,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:-translate-y-0.5 hover:shadow-lg",
              )}
              onClick={onBookConsultation}
            >
              Book a Consultation
              <ArrowRightIcon data-icon="inline-end" aria-hidden />
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-44">
              <Link href={ROUTES.portfolio.root}>View Our Work</Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
