"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { RevealText } from "@/animations";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing, motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { HeroBackground } from "./hero-background";
import { HeroLogos } from "./hero-logos";
import { HeroScrollIndicator } from "./hero-scroll-indicator";
import { HeroStats } from "./hero-stats";

type HeroProps = {
  className?: string;
};

/**
 * Home hero — premium digital agency first impression.
 * Brand → headline → support → CTAs → trust → stats → logos.
 */
export function Hero({ className }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className={cn(
        "relative isolate flex min-h-dvh flex-col justify-center overflow-hidden",
        className,
      )}
    >
      <HeroBackground />

      <Container
        size="max"
        className="relative z-10 flex flex-1 flex-col justify-center py-16 md:py-20 lg:py-24"
      >
        <motion.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger,
                delayChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
        >
          {/* Brand — hero-level signal */}
          <motion.p
            className="font-heading text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl md:text-4xl"
            variants={itemVariants(prefersReducedMotion)}
          >
            {SITE.name}
          </motion.p>

          {/* Headline */}
          <div className="mt-5 md:mt-6">
            <RevealText
              as="h1"
              id="hero-heading"
              text="Design that builds brands and drives growth."
              mode="words"
              animateOnMount
              className="font-heading text-h1 text-balance text-text-primary"
            />
          </div>

          {/* Support */}
          <motion.p
            className="mt-5 max-w-2xl text-body-lg text-pretty text-text-secondary md:mt-6"
            variants={itemVariants(prefersReducedMotion)}
          >
            We partner with ambitious companies on branding, websites, social,
            and performance marketing — crafted to look premium and convert.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
            variants={itemVariants(prefersReducedMotion)}
          >
            <Button asChild size="lg" className="sm:min-w-44">
              <Link href={ROUTES.contact}>Start a project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="sm:min-w-44">
              <Link href={ROUTES.portfolio.root}>View our work</Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.ul
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-caption text-text-secondary"
            aria-label="Trust indicators"
            variants={itemVariants(prefersReducedMotion)}
          >
            <li className="inline-flex items-center gap-2">
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Strategy to launch
            </li>
            <li className="inline-flex items-center gap-2">
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Design systems that scale
            </li>
            <li className="inline-flex items-center gap-2">
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden
              />
              Growth-focused delivery
            </li>
          </motion.ul>
        </motion.div>

        <div className="mx-auto mt-14 w-full max-w-5xl space-y-10 md:mt-16">
          <HeroStats />
          <HeroLogos />
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <HeroScrollIndicator />
        </div>
      </Container>
    </section>
  );
}

function itemVariants(prefersReducedMotion: boolean) {
  return {
    hidden: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}
