"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { getTransition, getViewport } from "../config";
import { cardLift } from "../transitions";
import { fadeUp, reducedMotionVariant } from "../variants";
import type { MotionWrapperBaseProps } from "./types";

type AnimatedCardProps = Omit<MotionWrapperBaseProps, "staggerItem"> & {
  /** Enable lift + shadow on hover (Motion System cards) */
  hoverLift?: boolean;
};

/**
 * Card entrance (fade + translateY) with optional hover lift / shadow.
 */
export function AnimatedCard({
  children,
  className,
  delay = 0,
  duration = "normal",
  once = true,
  animateOnMount = false,
  viewport,
  hoverLift = true,
  ...props
}: AnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", className)}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : getTransition(duration, delay)
      }
      whileHover={
        hoverLift && !prefersReducedMotion
          ? {
              y: cardLift.hover.y,
              boxShadow: cardLift.hover.boxShadow,
              transition: cardLift.hover.transition,
            }
          : undefined
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
