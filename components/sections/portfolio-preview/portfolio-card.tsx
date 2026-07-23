"use client";

import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import type { PortfolioPreviewItem } from "./data";
import { getPortfolioHref } from "./data";

type PortfolioCardProps = {
  project: PortfolioPreviewItem;
  className?: string;
  priority?: boolean;
};

/**
 * Carousel slide card — title + category header, preview image below.
 */
export function PortfolioCard({
  project,
  className,
  priority = false,
}: PortfolioCardProps) {
  const href = getPortfolioHref(project.slug);

  return (
    <article
      data-portfolio-slide
      className={cn(
        "group/project flex h-full w-[min(85vw,22rem)] shrink-0 snap-start flex-col",
        "overflow-hidden rounded-2xl border border-border bg-card shadow-xs",
        "transition-[box-shadow,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
        "hover:border-accent/25 hover:shadow-card-hover",
        "sm:w-[min(70vw,24rem)] lg:w-[26rem]",
        className,
      )}
    >
      <Link
        href={href}
        className="flex h-full flex-col outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
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

        <div className="relative mx-5 mb-5 flex-1 overflow-hidden rounded-xl bg-muted sm:mx-6 sm:mb-6">
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/4]">
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              priority={priority}
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 70vw, 416px"
              className="object-cover object-top transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/project:scale-[1.03]"
            />
          </div>
        </div>
      </Link>
    </article>
  );
}
