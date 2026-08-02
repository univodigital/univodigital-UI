"use client";

import { motion } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import {
  cardDescriptionClassName,
  cardMetaClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";

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
        cardSurfaceClassName("solid"),
        "flex h-full flex-col overflow-hidden p-6 md:p-8",
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
        <h3 className={cn("text-xl md:text-2xl", cardTitleClassName)}>
          {service.title}
        </h3>
        <p className={cn("mt-3 max-w-prose", cardDescriptionClassName)}>
          {service.description}
        </p>

        <ul
          className="mt-5 flex flex-wrap gap-2"
          aria-label={`${service.title} capabilities`}
        >
          {service.tags.map((tag) => (
            <li
              key={tag}
              className={cn(
                "rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium",
                cardMetaClassName,
              )}
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
