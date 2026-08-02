"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, CalendarIcon } from "lucide-react";
import { useCallback, useState, type MouseEvent } from "react";

import { AboutHeroBackground } from "@/components/sections/about/about-hero-background";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ContactHeroVisual } from "./contact-hero-visual";

type ContactHeroProps = {
  className?: string;
  onStartProject?: () => void;
  onScheduleConsultation?: () => void;
};

export function ContactHero({
  className,
  onStartProject,
  onScheduleConsultation,
}: ContactHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const [spotlight, setSpotlight] = useState({ x: 55, y: 42 });

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
      aria-labelledby="contact-hero-heading"
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
            <motion.p
              className="text-caption font-medium tracking-wide text-accent uppercase"
              variants={itemVariants(prefersReducedMotion)}
            >
              Contact
            </motion.p>

            <motion.h1
              id="contact-hero-heading"
              className="font-heading mt-3 text-h1 text-balance tracking-tight text-text-primary"
              variants={itemVariants(prefersReducedMotion)}
            >
              <span className="block">Let&apos;s Build Something</span>
              <span className="mt-1 block bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
                Exceptional Together.
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-body-lg text-pretty text-text-secondary"
              variants={itemVariants(prefersReducedMotion)}
            >
              Whether you&apos;re launching a new brand, building a website, or
              scaling your digital presence, we&apos;re here to turn your ideas
              into impactful digital experiences.
            </motion.p>

            <motion.div
              className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              variants={itemVariants(prefersReducedMotion)}
            >
              <Button
                type="button"
                size="lg"
                variant="accent"
                className="min-w-48"
                onClick={onStartProject}
              >
                Start Your Project
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="min-w-52"
                onClick={onScheduleConsultation}
              >
                <CalendarIcon data-icon="inline-start" aria-hidden />
                Schedule a Free Consultation
              </Button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants(prefersReducedMotion)}>
            <ContactHeroVisual />
          </motion.div>
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
        duration: prefersReducedMotion ? 0 : duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}
