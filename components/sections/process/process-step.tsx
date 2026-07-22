"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { ProcessStep } from "./data";

type ProcessStepCardProps = {
  step: ProcessStep;
  className?: string;
  index: number;
};

/**
 * Single process step — number, icon, copy.
 */
export function ProcessStepCard({
  step,
  className,
}: ProcessStepCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = step.icon;
  const stepLabel = String(step.step).padStart(2, "0");

  return (
    <article
      className={cn(
        "group/step relative flex flex-col items-center text-center",
        className,
      )}
    >
      <div className="relative mb-5">
        <div
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent/15 opacity-0 blur-xl transition-opacity duration-[var(--uds-duration-normal)] group-hover/step:opacity-100"
        />

        <motion.div
          className={cn(
            "relative flex size-16 items-center justify-center rounded-full border border-border bg-card shadow-sm",
            "ring-1 ring-border/60 transition-[border-color,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
            "group-hover/step:border-accent/40 group-hover/step:shadow-card group-hover/step:ring-accent/20",
          )}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  scale: 1.04,
                  transition: {
                    duration: duration.fast,
                    ease: easing.standard,
                  },
                }
          }
        >
          <Icon
            className="size-6 text-accent transition-transform duration-[var(--uds-duration-normal)] group-hover/step:scale-110 motion-reduce:transform-none"
            strokeWidth={1.75}
            aria-hidden
          />
          <span className="absolute -top-2 -right-2 inline-flex size-7 items-center justify-center rounded-full bg-primary text-[0.6875rem] font-semibold text-primary-foreground">
            {stepLabel}
          </span>
        </motion.div>
      </div>

      <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary md:text-xl">
        {step.title}
      </h3>
      <p className="mt-2 max-w-[16rem] text-sm text-pretty text-text-secondary md:text-body">
        {step.description}
      </p>
    </article>
  );
}
