"use client";

import { motion } from "framer-motion";

import { getFeaturedPortfolioProjects } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing, motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import { cardMetaClassName, cardSurfaceClassName } from "@/components/ui/card";

const CLIENT_PLACEHOLDERS = getFeaturedPortfolioProjects().map(
  (project) => project.client,
);

type HeroLogosProps = {
  className?: string;
};

/**
 * Client logo placeholders — replace with real marks later.
 */
export function HeroLogos({ className }: HeroLogosProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-caption font-medium tracking-wide text-text-secondary uppercase">
        Trusted by ambitious teams
      </p>
      <motion.ul
        className="mx-auto grid max-w-md grid-cols-2 gap-3 sm:max-w-lg"
        aria-label="Client logos"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : motionTokens.stagger,
            },
          },
        }}
      >
        {CLIENT_PLACEHOLDERS.map((name) => (
          <motion.li
            key={name}
            variants={{
              hidden: prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration.normal,
                  ease: easing.standard,
                },
              },
            }}
            className={cn(cardSurfaceClassName("logoTile"), "flex h-14 items-center justify-center px-3")}
          >
            <span className={cn("truncate font-semibold tracking-tight", cardMetaClassName)}>
              {name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
