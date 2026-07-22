"use client";

import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FeatureIconProps = {
  icon: LucideIcon;
  className?: string;
};

/**
 * Icon mark — animates with parent `.group/feature` hover/focus.
 */
export function FeatureIcon({ icon: Icon, className }: FeatureIconProps) {
  return (
    <span
      className={cn(
        "inline-flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent",
        "transition-[transform,background-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
        "group-hover/feature:scale-105 group-hover/feature:bg-accent/15 group-hover/feature:-rotate-3",
        "group-focus-visible/feature:scale-105 group-focus-visible/feature:bg-accent/15 group-focus-visible/feature:-rotate-3",
        "motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <Icon
        className="size-5 transition-transform duration-[var(--uds-duration-fast)] ease-[var(--uds-ease-standard)] group-hover/feature:scale-110 group-focus-visible/feature:scale-110 motion-reduce:transform-none"
        strokeWidth={1.75}
        aria-hidden
      />
    </span>
  );
}
