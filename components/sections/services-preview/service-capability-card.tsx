"use client";

import { motion } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { ServiceCapability } from "./data";
import {
  BrandingIllustration,
  DevelopmentIllustration,
  PerformanceIllustration,
  SocialIllustration,
} from "./illustrations";

type ServiceCapabilityCardProps = {
  service: ServiceCapability;
  className?: string;
};

const ILLUSTRATIONS = {
  branding: BrandingIllustration,
  "website-development": DevelopmentIllustration,
  "social-media": SocialIllustration,
  performance: PerformanceIllustration,
} as const;

/**
 * Display-only capability card — title, description, tags, illustration.
 * Not a navigation link.
 */
export function ServiceCapabilityCard({
  service,
  className,
}: ServiceCapabilityCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const Illustration = ILLUSTRATIONS[service.id];

  return (
    <motion.article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card",
        "p-6 shadow-xs md:p-8",
        className,
      )}
      variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -2,
              transition: {
                duration: duration.normal,
                ease: easing.standard,
              },
            }
      }
    >
      <div className="flex flex-1 flex-col">
        <h3 className="font-heading text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
          {service.title}
        </h3>
        <p className="mt-3 max-w-prose text-body text-pretty text-text-secondary">
          {service.description}
        </p>

        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={`${service.title} capabilities`}
        >
          {service.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border bg-muted/70 px-3 py-1 text-xs font-medium text-text-secondary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 border-t border-border/70 pt-6">
        <Illustration />
      </div>
    </motion.article>
  );
}
