"use client";

import { motion } from "framer-motion";

import { Counter } from "@/animations";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing, motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Brand partners" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 8, suffix: "+", label: "Years of craft" },
] as const;

type HeroStatsProps = {
  className?: string;
};

/**
 * Animated hero statistics — Counter once in view.
 */
export function HeroStats({ className }: HeroStatsProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.ul
      className={cn(
        "grid grid-cols-2 gap-6 border-t border-border/80 pt-8 sm:grid-cols-4 sm:gap-8",
        className,
      )}
      aria-label="Agency statistics"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : motionTokens.stagger,
          },
        },
      }}
    >
      {STATS.map((stat) => (
        <motion.li
          key={stat.label}
          className="flex flex-col gap-1"
          variants={{
            hidden: prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: duration.normal,
                ease: easing.standard,
              },
            },
          }}
        >
          <Counter
            to={stat.value}
            suffix={stat.suffix}
            className="font-heading text-h4 tabular-nums text-text-primary md:text-h3"
            duration="slow"
          />
          <span className="text-caption text-text-secondary">{stat.label}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
