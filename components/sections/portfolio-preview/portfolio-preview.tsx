"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { PORTFOLIO_PREVIEW_ITEMS } from "./data";
import { PortfolioCarousel } from "./portfolio-carousel";

type PortfolioPreviewProps = {
  className?: string;
};

/**
 * Home Portfolio Preview — horizontal sliding featured work cards.
 * Track bleeds past the container so the next card peeks on the right.
 */
export function PortfolioPreview({ className }: PortfolioPreviewProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="portfolio-preview"
      spacing="lg"
      tone="default"
      aria-labelledby="portfolio-preview-heading"
      className={cn("relative overflow-x-clip", className)}
    >
      <Container size="max">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
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
              Portfolio
            </motion.p>

            <motion.h2
              id="portfolio-preview-heading"
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
              Featured work
            </motion.h2>
          </div>

          <motion.div
            className="shrink-0"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            <Button
              asChild
              variant="accent"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href={ROUTES.portfolio.root}>
                Our projects
                <ArrowUpRightIcon className="size-4" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        className="mt-10 md:mt-12 lg:mt-14"
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: prefersReducedMotion ? 0 : duration.slow,
          ease: easing.emphasized,
          delay: prefersReducedMotion ? 0 : 0.08,
        }}
      >
        <PortfolioCarousel projects={PORTFOLIO_PREVIEW_ITEMS} />
      </motion.div>
    </Section>
  );
}
