"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing, motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

const CLIENT_PLACEHOLDERS = [
  "Northline",
  "Vespera",
  "Cobalt Lab",
  "Atelier Nine",
  "Kinetic Co",
  "Plainform",
] as const;

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
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
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
            className="flex h-14 items-center justify-center rounded-lg border border-border/80 bg-surface/60 px-3"
          >
            <span className="truncate text-caption font-semibold tracking-tight text-text-secondary/80">
              {name}
            </span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
