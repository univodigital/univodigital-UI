"use client";

import { motion, type Variants } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

import { getTransition, getViewport } from "../config";
import { reducedMotionVariant } from "../variants";
import type { MotionWrapperBaseProps } from "./types";

type DirectionalFadeProps = MotionWrapperBaseProps & {
  variants: Variants;
  /**
   * When true, inherits timing from a parent StaggerContainer
   * (no independent whileInView).
   */
  staggerItem?: boolean;
};

/**
 * Shared scroll-triggered fade wrapper used by FadeUp / FadeLeft / FadeRight.
 */
export function DirectionalFade({
  children,
  className,
  delay = 0,
  duration = "normal",
  once = true,
  animateOnMount = false,
  viewport,
  variants,
  staggerItem = false,
  ...props
}: DirectionalFadeProps) {
  const prefersReducedMotion = useReducedMotion();
  const resolvedVariants = prefersReducedMotion
    ? reducedMotionVariant
    : variants;

  if (staggerItem) {
    return (
      <motion.div
        className={className}
        variants={resolvedVariants}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : getTransition(duration, delay)
        }
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={resolvedVariants}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : getTransition(duration, delay)
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
