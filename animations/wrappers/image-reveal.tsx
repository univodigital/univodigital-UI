"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { getTransition, getViewport } from "../config";
import { imageZoom } from "../transitions";
import { imageReveal, reducedMotionVariant } from "../variants";
import type { MotionWrapperBaseProps } from "./types";

type ImageRevealProps = MotionWrapperBaseProps & {
  /** Zoom image slightly on hover (Motion System) */
  zoomOnHover?: boolean;
};

/**
 * Image entrance reveal — clip + scale, optional hover zoom.
 */
export function ImageReveal({
  children,
  className,
  delay = 0,
  duration = "slow",
  once = true,
  animateOnMount = false,
  viewport,
  zoomOnHover = true,
  staggerItem = false,
  ...props
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const inner = (
    <motion.div
      className="h-full w-full"
      whileHover={
        zoomOnHover && !prefersReducedMotion
          ? {
              scale: imageZoom.hover.scale,
              transition: imageZoom.hover.transition,
            }
          : undefined
      }
    >
      {children}
    </motion.div>
  );

  if (staggerItem) {
    return (
      <motion.div
        className={cn("overflow-hidden", className)}
        variants={prefersReducedMotion ? reducedMotionVariant : imageReveal}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : getTransition(duration, delay)
        }
        {...props}
      >
        {inner}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={prefersReducedMotion ? reducedMotionVariant : imageReveal}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : getTransition(duration, delay)
      }
      {...props}
    >
      {inner}
    </motion.div>
  );
}
