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

import type { ServicePreviewItem } from "./data";
import { ServiceImage } from "./service-image";

type ServiceCardProps = {
  service: ServicePreviewItem;
  className?: string;
};

/**
 * Interactive service preview card — image zoom + lift on hover.
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      className={cn("h-full", className)}
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
        size="default"
        interactive
        className={cn(
          "group/service h-full overflow-hidden p-0 ring-1 ring-border/70",
          "transition-[box-shadow,ring-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
          "hover:shadow-card-hover hover:ring-accent/30",
          "focus-within:ring-3 focus-within:ring-ring/50",
        )}
      >
        <Link
          href={service.href}
          className="flex h-full flex-col outline-none"
          aria-label={`Explore ${service.title}`}
        >
          <ServiceImage
            src={service.imageSrc}
            alt={service.imageAlt}
            icon={service.icon}
          />

          <CardHeader className="gap-2 px-5 pt-5 pb-0">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-lg font-semibold tracking-tight text-text-primary md:text-xl">
                {service.title}
              </CardTitle>
              <span
                className={cn(
                  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary",
                  "transition-[transform,background-color,color,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                  "group-hover/service:border-accent/40 group-hover/service:bg-accent group-hover/service:text-accent-foreground",
                  "group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5",
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
              {service.summary}
            </CardDescription>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Learn more
              <ArrowUpRightIcon
                className="size-3.5 transition-transform duration-[var(--uds-duration-fast)] group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden
              />
            </span>
          </CardContent>
        </Link>
      </Card>
    </motion.article>
  );
}
