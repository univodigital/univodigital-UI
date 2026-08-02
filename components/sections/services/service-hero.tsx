"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useState, type MouseEvent } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ServiceHeroBackground } from "./service-hero-background";
import { ServiceHeroVisual } from "./service-hero-visual";

type ServiceHeroProps = {
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
 * Service hero — split layout with animated illustration and dual CTAs.
 */
export function ServiceHero({ service, className }: ServiceHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });
  const { hero, visualType, slug } = service;

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setSpotlight({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    },
    [prefersReducedMotion],
  );

  return (
    <section
      aria-labelledby={`${slug}-hero-heading`}
      onMouseMove={onMouseMove}
      className={cn(
        "relative isolate flex min-h-[min(100dvh,56rem)] flex-col justify-center overflow-hidden",
        className,
      )}
    >
      <ServiceHeroBackground
        spotlightX={spotlight.x}
        spotlightY={spotlight.y}
      />

      <Container
        size="max"
        className="relative z-10 flex flex-1 flex-col justify-center py-24 md:py-28 lg:py-32"
      >
        <motion.div
          className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20"
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
          <div>
            <motion.p
              className="text-caption font-medium tracking-wide text-accent uppercase"
              variants={itemVariants(prefersReducedMotion)}
            >
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              id={`${slug}-hero-heading`}
              className="font-heading mt-3 text-h1 text-balance tracking-tight text-text-primary"
              variants={itemVariants(prefersReducedMotion)}
            >
              <span className="block">{hero.headline}</span>
              <span className="mt-1 block bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
                {hero.headlineAccent}
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-body-lg text-pretty text-text-secondary"
              variants={itemVariants(prefersReducedMotion)}
            >
              {hero.description}
            </motion.p>

            <motion.div
              className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center"
              variants={itemVariants(prefersReducedMotion)}
            >
              <Button asChild size="lg" variant="accent" className="min-w-48">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-44">
                <Link href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants(prefersReducedMotion)}>
            <ServiceHeroVisual type={visualType} />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
