"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import type { PortfolioListItem } from "./data";
import { getPortfolioHref } from "./data";

type PortfolioGridCardProps = {
  project: PortfolioListItem;
  className?: string;
  priority?: boolean;
};

/**
 * Portfolio grid card — full-width project tile for the listing page.
 */
export function PortfolioGridCard({
  project,
  className,
  priority = false,
}: PortfolioGridCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const href = getPortfolioHref(project.slug);
  const previewSrc = project.previewImageSrc ?? project.imageSrc;

  return (
    <motion.article
      className={cn(
        "group/project flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs",
        "transition-[box-shadow,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
        "hover:border-accent/25 hover:shadow-card-hover",
        className,
      )}
      variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="relative overflow-hidden">
          <div className="relative aspect-[16/10] w-full bg-muted">
            <Image
              src={previewSrc}
              alt={project.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
              className={cn(
                "object-top transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/project:scale-[1.03]",
                previewSrc.includes("logo")
                  ? "object-contain p-8"
                  : "object-cover",
              )}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary sm:text-xl">
                {project.client}
                <span className="font-normal text-text-secondary">
                  {" "}
                  | {project.year}
                </span>
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {project.categoryLabel}
              </p>
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

          <p className="line-clamp-2 text-sm text-pretty text-text-secondary sm:text-base">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
