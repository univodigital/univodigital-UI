"use client";

import { motion } from "framer-motion";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { HeroScrollIndicator } from "@/components/sections/hero/hero-scroll-indicator";
import { ROUTES } from "@/constants/routes";
import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ProjectHeroProps = {
  project: PortfolioProject;
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
 * Project detail hero — large title, meta, tagline, and featured image.
 */
export function ProjectHero({ project, className }: ProjectHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="project-hero-heading"
      className={cn(
        "relative isolate flex min-h-[min(100dvh,52rem)] flex-col justify-center overflow-hidden pt-24 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 15% 20%, color-mix(in oklab, var(--uds-color-accent) 12%, transparent), transparent 70%), radial-gradient(ellipse 50% 45% at 85% 75%, color-mix(in oklab, var(--uds-color-accent) 8%, transparent), transparent 70%)",
        }}
      />

      <Container size="max" className="relative z-10 flex flex-1 flex-col">
        <motion.div
          className="flex flex-1 flex-col"
          initial="hidden"
          animate="visible"
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
          <motion.div variants={itemVariants(prefersReducedMotion)}>
            <Link
              href={ROUTES.portfolio.root}
              className={cn(
                "inline-flex items-center gap-2 text-sm text-text-secondary",
                "transition-colors duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:text-text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
              )}
            >
              <ArrowLeftIcon className="size-4" aria-hidden />
              Back to portfolio
            </Link>
          </motion.div>

          <div className="mt-10 max-w-4xl">
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={itemVariants(prefersReducedMotion)}
            >
              <Badge variant="accent">{project.categoryLabel}</Badge>
              <span className="text-sm text-text-secondary">{project.year}</span>
            </motion.div>

            <motion.h1
              id="project-hero-heading"
              className="font-heading mt-5 text-[clamp(2.75rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-balance text-text-primary"
              variants={itemVariants(prefersReducedMotion)}
            >
              {project.title}
            </motion.h1>

            <motion.p
              className="mt-5 max-w-2xl text-body-lg text-pretty text-text-primary/90 md:text-xl"
              variants={itemVariants(prefersReducedMotion)}
            >
              {project.subtitle}
            </motion.p>

            {project.heroDescription ? (
              <motion.p
                className="mt-4 max-w-2xl text-body-lg text-pretty text-text-secondary"
                variants={itemVariants(prefersReducedMotion)}
              >
                {project.heroDescription}
              </motion.p>
            ) : null}
          </div>

          <motion.div
            className="relative mt-10 overflow-hidden rounded-2xl border border-border/80 bg-card/40 shadow-xs backdrop-blur-sm md:mt-12"
            variants={itemVariants(prefersReducedMotion)}
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
              <Image
                src={project.imageSrc}
                alt={project.imageAlt}
                fill
                priority
                sizes="100vw"
                className={cn(
                  "object-top",
                  project.heroImageFit === "contain"
                    ? "object-contain p-2 sm:p-4"
                    : "object-cover",
                )}
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-10 flex justify-center md:mt-12">
          <HeroScrollIndicator href="#overview" />
        </div>
      </Container>
    </section>
  );
}
