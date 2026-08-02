"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useCallback, useState, type MouseEvent } from "react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { AboutHeroBackground } from "./about-hero-background";

type AboutHeroProps = {
  className?: string;
};

/**
 * About hero — split composition, no photography.
 */
export function AboutHero({ className }: AboutHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 50, y: 40 });

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
      aria-labelledby="about-hero-heading"
      onMouseMove={onMouseMove}
      className={cn(
        "relative isolate flex min-h-[min(100dvh,56rem)] flex-col justify-center overflow-hidden",
        className,
      )}
    >
      <AboutHeroBackground
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
            <motion.h1
              id="about-hero-heading"
              className="font-heading text-h1 text-balance tracking-tight text-text-primary"
              variants={itemVariants(prefersReducedMotion)}
            >
              <span className="block">About</span>
              <span className="mt-1 block bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
                Univo Digital
              </span>
            </motion.h1>
          </div>

          <div className="flex flex-col items-start lg:pt-6">
            <motion.p
              className="max-w-md text-body-lg text-pretty text-text-secondary"
              variants={itemVariants(prefersReducedMotion)}
            >
              We help ambitious businesses build stronger brands, generate
              quality leads, and achieve sustainable growth.
            </motion.p>

            <motion.div
              className="mt-8"
              variants={itemVariants(prefersReducedMotion)}
            >
              <Button asChild size="lg" className="min-w-48">
                <Link href={ROUTES.contact}>
                  Let&apos;s Work Together
                  <ArrowRightIcon data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

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
