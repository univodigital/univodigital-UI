"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { PortfolioPreviewItem } from "./data";
import { getPortfolioHref } from "./data";
import { PortfolioImage } from "./portfolio-image";

type PortfolioCardProps = {
  project: PortfolioPreviewItem;
  className?: string;
  /** Span full width on large screens for featured lead project */
  featuredLayout?: boolean;
  priority?: boolean;
};

/**
 * Featured project card — image zoom, category badge, hover lift.
 */
export function PortfolioCard({
  project,
  className,
  featuredLayout = false,
  priority = false,
}: PortfolioCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const href = getPortfolioHref(project.slug);

  return (
    <motion.article
      className={cn(
        "h-full",
        featuredLayout && "lg:col-span-2",
        className,
      )}
      variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: duration.normal,
                ease: easing.standard,
              },
            }
      }
    >
      <Card
        variant="portfolio"
        interactive
        className={cn(
          "group/project h-full overflow-hidden p-0 ring-1 ring-border/70",
          "transition-[box-shadow,ring-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
          "hover:shadow-card-hover hover:ring-accent/30",
          "focus-within:ring-3 focus-within:ring-ring/50",
        )}
      >
        <Link
          href={href}
          className={cn(
            "flex h-full outline-none",
            featuredLayout ? "flex-col lg:flex-row" : "flex-col",
          )}
          aria-label={`View case study: ${project.title}`}
        >
          <PortfolioImage
            src={project.imageSrc}
            alt={project.imageAlt}
            categoryLabel={project.categoryLabel}
            priority={priority}
            className={cn(
              featuredLayout && "lg:aspect-auto lg:min-h-[22rem] lg:w-1/2",
            )}
          />

          <div
            className={cn(
              "flex flex-1 flex-col",
              featuredLayout && "lg:justify-center lg:px-2",
            )}
          >
            <CardHeader className="gap-2 px-5 pt-5 pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <p className="text-caption text-text-secondary">
                    {project.client}
                    <span className="mx-2 text-border-strong" aria-hidden>
                      ·
                    </span>
                    {project.year}
                  </p>
                  <CardTitle className="text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                    {project.title}
                  </CardTitle>
                </div>
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary",
                    "transition-[transform,background-color,color,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                    "group-hover/project:border-accent/40 group-hover/project:bg-accent group-hover/project:text-accent-foreground",
                    "group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5",
                    "motion-reduce:transform-none",
                  )}
                  aria-hidden
                >
                  <ArrowUpRightIcon className="size-4" />
                </span>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col px-5 pt-3 pb-5">
              <CardDescription className="text-body text-text-secondary">
                {project.summary}
              </CardDescription>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                View case study
                <ArrowUpRightIcon
                  className="size-3.5 transition-transform duration-[var(--uds-duration-fast)] group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5 motion-reduce:transform-none"
                  aria-hidden
                />
              </span>
            </CardContent>
          </div>
        </Link>
      </Card>
    </motion.article>
  );
}
