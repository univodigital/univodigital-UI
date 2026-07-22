"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ProcessConnectorProps = {
  /** Horizontal on desktop, vertical on mobile */
  orientation?: "horizontal" | "vertical";
  className?: string;
  delay?: number;
};

/**
 * Animated timeline connector — draws in on scroll.
 */
export function ProcessConnector({
  orientation = "horizontal",
  className,
  delay = 0,
}: ProcessConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.6 });

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative overflow-hidden",
        isHorizontal
          ? "hidden h-px flex-1 self-center lg:block"
          : "mx-auto my-1 h-10 w-px lg:hidden",
        className,
      )}
    >
      {/* Track */}
      <div
        className={cn(
          "absolute inset-0 bg-border",
          isHorizontal ? "h-px w-full" : "h-full w-px",
        )}
      />

      {/* Animated fill */}
      <motion.div
        className={cn(
          "absolute bg-accent",
          isHorizontal ? "top-0 left-0 h-px w-full origin-left" : "top-0 left-0 h-full w-px origin-top",
        )}
        initial={
          prefersReducedMotion
            ? { scaleX: 1, scaleY: 1 }
            : isHorizontal
              ? { scaleX: 0 }
              : { scaleY: 0 }
        }
        animate={
          isInView
            ? isHorizontal
              ? { scaleX: 1 }
              : { scaleY: 1 }
            : undefined
        }
        transition={{
          duration: prefersReducedMotion ? 0 : duration.slow,
          ease: easing.emphasized,
          delay: prefersReducedMotion ? 0 : delay,
        }}
      />

      {/* Soft pulse node at end */}
      {!prefersReducedMotion ? (
        <motion.span
          className={cn(
            "absolute size-1.5 rounded-full bg-accent",
            isHorizontal
              ? "top-1/2 right-0 -translate-y-1/2"
              : "bottom-0 left-1/2 -translate-x-1/2",
          )}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? { opacity: [0, 1, 0.6], scale: [0.5, 1.2, 1] }
              : undefined
          }
          transition={{
            duration: duration.slow,
            ease: easing.standard,
            delay: delay + duration.slow * 0.6,
          }}
        />
      ) : null}
    </div>
  );
}
