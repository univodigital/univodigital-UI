"use client";

import { motion } from "framer-motion";
import { CheckIcon } from "lucide-react";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { StaggerContainer } from "@/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  cardSurfaceClassName,
  cardSurfaceLightTitleClassName,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProjectCardGridProps = {
  items: string[];
  className?: string;
};

/**
 * Deliverables / results grid — elevated cards with check icons.
 */
export function ProjectCardGrid({ items, className }: ProjectCardGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <StaggerContainer
      className={cn(
        "grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5",
        className,
      )}
      once
    >
      {items.map((item) => (
        <motion.li
          key={item}
          className={cn(
            cardSurfaceClassName("surfaceLight"),
            "flex list-none items-start gap-3 p-4",
            "transition-[border-color,box-shadow,transform] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
            "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover",
            "motion-reduce:transform-none",
          )}
          variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
        >
          <span
            className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/15 text-accent"
            aria-hidden
          >
            <CheckIcon className="size-3" strokeWidth={2.5} />
          </span>
          <span className={cn("text-sm font-medium text-pretty sm:text-base", cardSurfaceLightTitleClassName)}>
            {item}
          </span>
        </motion.li>
      ))}
    </StaggerContainer>
  );
}
