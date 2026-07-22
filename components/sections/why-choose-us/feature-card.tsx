"use client";

import { motion } from "framer-motion";

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

import type { WhyChooseFeature } from "./features";
import { FeatureIcon } from "./feature-icon";

type FeatureCardProps = {
  feature: WhyChooseFeature;
  className?: string;
};

/**
 * Interactive feature card — lift + shadow on hover (Motion System).
 */
export function FeatureCard({ feature, className }: FeatureCardProps) {
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
        variant="surface"
        size="lg"
        interactive
        tabIndex={0}
        className={cn(
          "group/feature h-full border-border/80 bg-surface/80 shadow-none ring-1 ring-border/60",
          "transition-[box-shadow,background-color,ring-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
          "hover:bg-card hover:shadow-card-hover hover:ring-accent/25",
          "focus-visible:ring-3 focus-visible:ring-ring/50",
        )}
      >
        <CardHeader className="gap-4">
          <FeatureIcon icon={feature.icon} />
          <CardTitle className="text-lg font-semibold tracking-tight text-text-primary md:text-xl">
            {feature.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-body text-text-secondary">
            {feature.description}
          </CardDescription>
          <div
            aria-hidden
            className="mt-6 h-px w-10 origin-left bg-accent/50 transition-transform duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)] group-hover/feature:scale-x-[1.8] group-focus-visible/feature:scale-x-[1.8]"
          />
        </CardContent>
      </Card>
    </motion.article>
  );
}
