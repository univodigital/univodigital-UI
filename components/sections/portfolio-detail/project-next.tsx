"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  getPortfolioHref,
  type PortfolioProject,
} from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import {
  cardSurfaceClassName,
  cardSurfaceLightDescriptionClassName,
  cardSurfaceLightTitleClassName,
} from "@/components/ui/card";

type ProjectNextProps = {
  nextProject: PortfolioProject;
  className?: string;
};

/**
 * Next project navigation — preview card linking to the following case study.
 */
export function ProjectNext({ nextProject, className }: ProjectNextProps) {
  const prefersReducedMotion = useReducedMotion();
  const href = getPortfolioHref(nextProject.slug);

  return (
    <Section
      id="next-project"
      spacing="lg"
      tone="surface"
      aria-labelledby="next-project-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <Container size="max">
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
          Keep exploring
        </motion.p>

        <motion.h2
          id="next-project-heading"
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
          Next project
        </motion.h2>

        <motion.div
          className="mt-8 lg:mt-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.slow,
            ease: easing.emphasized,
            delay: prefersReducedMotion ? 0 : 0.08,
          }}
        >
          <Link
            href={href}
            className={cn(
              cardSurfaceClassName("surfaceLight"),
              "group/next flex flex-col overflow-hidden outline-none",
              "transition-[border-color,box-shadow,transform] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
              "hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-card-hover",
              "focus-visible:ring-3 focus-visible:ring-ring/50",
              "motion-reduce:transform-none sm:flex-row",
            )}
            aria-label={`View next project: ${nextProject.title}`}
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-auto sm:h-auto sm:w-2/5 sm:min-h-[14rem]">
              <Image
                src={nextProject.imageSrc}
                alt={nextProject.imageAlt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/next:scale-[1.03]"
              />
            </div>

            <div className="flex flex-1 items-center justify-between gap-4 p-6 sm:p-8">
              <div className="min-w-0">
                <p className={cn("text-caption", cardSurfaceLightDescriptionClassName)}>
                  {nextProject.categoryLabel} · {nextProject.year}
                </p>
                <p className={cn("mt-2 text-2xl sm:text-3xl", cardSurfaceLightTitleClassName)}>
                  {nextProject.title}
                </p>
                <p className={cn("mt-2 line-clamp-2 text-sm sm:text-base", cardSurfaceLightDescriptionClassName)}>
                  {nextProject.subtitle}
                </p>
              </div>

              <span
                className={cn(
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-card-muted-foreground",
                  "transition-[transform,background-color,color,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                  "group-hover/next:border-accent/40 group-hover/next:bg-accent group-hover/next:text-accent-foreground",
                  "group-hover/next:translate-x-0.5 group-hover/next:-translate-y-0.5",
                  "motion-reduce:transform-none",
                )}
                aria-hidden
              >
                <ArrowUpRightIcon className="size-4" />
              </span>
            </div>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
