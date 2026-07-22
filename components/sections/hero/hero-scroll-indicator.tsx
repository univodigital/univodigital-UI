"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type HeroScrollIndicatorProps = {
  href?: string;
  className?: string;
};

/**
 * Scroll cue for the hero — respects reduced motion.
 */
export function HeroScrollIndicator({
  href = "#after-hero",
  className,
}: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      aria-label="Scroll to next section"
      className={cn(
        "inline-flex flex-col items-center gap-2 text-caption text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 1.1,
        duration: duration.normal,
        ease: easing.standard,
      }}
    >
      <span>Scroll</span>
      <motion.span
        aria-hidden
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, 6, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <ChevronDownIcon className="size-4" />
      </motion.span>
    </motion.a>
  );
}
