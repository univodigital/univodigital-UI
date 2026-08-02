"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ServiceCtaBackground } from "./service-cta-background";

type ServiceCtaProps = {
  service: ServicePageData;
  className?: string;
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
        duration: duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}

/**
 * Final service CTA — dual buttons with animated background.
 */
export function ServiceCta({ service, className }: ServiceCtaProps) {
  const prefersReducedMotion = useReducedMotion();
  const { cta, slug } = service;

  return (
    <Section
      id={`${slug}-cta`}
      spacing="none"
      tone="default"
      aria-labelledby={`${slug}-cta-heading`}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <ServiceCtaBackground />

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
            id={`${slug}-cta-heading`}
            className="font-heading text-h2 text-balance text-text-primary md:text-[clamp(2.25rem,4vw,3.5rem)]"
            variants={itemVariants(prefersReducedMotion)}
          >
            {cta.headline}
          </motion.h2>

          <motion.p
            className="mt-5 max-w-xl text-body-lg text-pretty text-text-secondary"
            variants={itemVariants(prefersReducedMotion)}
          >
            {cta.description}
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
            variants={itemVariants(prefersReducedMotion)}
          >
            <Button
              asChild
              size="lg"
              variant="accent"
              className={cn(
                "h-12 min-w-52 px-8 text-base shadow-md",
                "transition-[transform,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:-translate-y-0.5 hover:shadow-lg",
              )}
            >
              <Link href={cta.primaryCta.href}>
                {cta.primaryCta.label}
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-52">
              <Link href={cta.secondaryCta.href}>
                {cta.secondaryCta.label}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
