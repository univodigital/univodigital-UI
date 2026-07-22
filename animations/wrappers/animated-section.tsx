"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { getTransition, getViewport } from "../config";
import { fadeUp, reducedMotionVariant, staggerChildren } from "../variants";
import type { MotionWrapperBaseProps } from "./types";

type AnimatedSectionProps = Omit<MotionWrapperBaseProps, "staggerItem"> & {
  /** Stagger direct motion children */
  stagger?: boolean;
  as?: "section" | "div" | "article" | "aside";
};

const motionTags = {
  section: motion.section,
  div: motion.div,
  article: motion.article,
  aside: motion.aside,
} as const;

/**
 * Section scroll reveal — fade + translateY, once per section.
 * Optionally staggers child motion components.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = "normal",
  once = true,
  animateOnMount = false,
  viewport,
  stagger = false,
  as = "section",
  ...props
}: AnimatedSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const Comp = motionTags[as];

  return (
    <Comp
      className={cn("w-full", className)}
      initial="hidden"
      animate={animateOnMount ? "visible" : undefined}
      whileInView={animateOnMount ? undefined : "visible"}
      viewport={getViewport({ once, ...viewport })}
      variants={
        prefersReducedMotion
          ? reducedMotionVariant
          : stagger
            ? {
                hidden: {},
                visible: {
                  transition: {
                    ...staggerChildren.visible.transition,
                    delayChildren: delay,
                  },
                },
              }
            : fadeUp
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : getTransition(duration, delay)
      }
      {...props}
    >
      {children}
    </Comp>
  );
}
