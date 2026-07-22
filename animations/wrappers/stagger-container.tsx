"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion as motionTokens } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { getViewport } from "../config";
import { reducedMotionVariant } from "../variants";
import type { MotionWrapperBaseProps } from "./types";

type StaggerContainerProps = Omit<
  MotionWrapperBaseProps,
  "staggerItem" | "duration"
> & {
  /** Override default stagger interval (seconds) */
  staggerDelay?: number;
  /** Delay before first child animates */
  delayChildren?: number;
};

/**
 * Staggers child motion variants — once per section (Motion System).
 * Wrap FadeUp / ScaleIn children (or any element using hidden/visible variants).
 */
export function StaggerContainer({
  children,
  className,
  delay = 0,
  once = true,
  animateOnMount = false,
  viewport,
  staggerDelay,
  delayChildren,
  ...props
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={
        prefersReducedMotion
          ? reducedMotionVariant
          : {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: staggerDelay ?? motionTokens.stagger,
                  delayChildren: delayChildren ?? delay,
                },
              },
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
