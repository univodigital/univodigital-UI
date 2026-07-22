"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ContactCtaBackground } from "./contact-cta-background";

type ContactCtaProps = {
  className?: string;
};

function itemVariants(prefersReducedMotion: boolean) {
  return {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}

/**
 * Contact CTA — premium lead-gen band: headline, support, single action.
 */
export function ContactCta({ className }: ContactCtaProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="contact-cta"
      spacing="none"
      tone="default"
      aria-labelledby="contact-cta-heading"
      className={cn("relative isolate overflow-hidden", className)}
    >
      <ContactCtaBackground />

      <Container
        size="max"
        className="relative z-10 py-20 md:py-24 lg:py-28"
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
          <motion.p
            className="text-caption font-medium tracking-wide text-[color-mix(in_oklab,var(--uds-color-accent)_85%,white)] uppercase"
            variants={itemVariants(prefersReducedMotion)}
          >
            Next step
          </motion.p>

          <motion.h2
            id="contact-cta-heading"
            className="font-heading mt-4 text-h2 text-balance text-primary-foreground md:text-[clamp(2.25rem,4vw,3.25rem)]"
            variants={itemVariants(prefersReducedMotion)}
          >
            Let&apos;s build what grows next.
          </motion.h2>

          <motion.p
            className="mt-5 max-w-xl text-body-lg text-pretty text-primary-foreground/75"
            variants={itemVariants(prefersReducedMotion)}
          >
            Share your goals. We&apos;ll map branding, product, and growth into
            a clear plan — then move with precision.
          </motion.p>

          <motion.div
            className="mt-9 w-full sm:mt-10 sm:w-auto"
            variants={itemVariants(prefersReducedMotion)}
          >
            <Button
              asChild
              size="lg"
              variant="accent"
              className={cn(
                "h-12 w-full min-w-52 px-8 text-base shadow-md sm:w-auto",
                "transition-[transform,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:-translate-y-0.5 hover:shadow-lg",
              )}
            >
              <Link href={ROUTES.contact}>
                Book a consultation
                <ArrowRightIcon
                  data-icon="inline-end"
                  className="transition-transform duration-[var(--uds-duration-fast)] group-hover/button:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
