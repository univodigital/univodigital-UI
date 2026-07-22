"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { cardLift, imageZoom, scaleHover } from "../transitions";

type HoverMode = "scale" | "lift" | "zoom" | "none";

type HoverWrapperProps = {
  children: ReactNode;
  className?: string;
  /**
   * scale → buttons (1.02)
   * lift → cards (translateY + shadow)
   * zoom → images (1.05)
   */
  mode?: HoverMode;
  disabled?: boolean;
};

/**
 * Hover interaction wrapper — Motion System hover rules.
 */
export function HoverWrapper({
  children,
  className,
  mode = "scale",
  disabled = false,
}: HoverWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const enable = !disabled && !prefersReducedMotion && mode !== "none";

  const hoverAnimation =
    mode === "scale"
      ? {
          scale: scaleHover.hover.scale,
          transition: scaleHover.hover.transition,
        }
      : mode === "lift"
        ? {
            y: cardLift.hover.y,
            boxShadow: cardLift.hover.boxShadow,
            transition: cardLift.hover.transition,
          }
        : mode === "zoom"
          ? {
              scale: imageZoom.hover.scale,
              transition: imageZoom.hover.transition,
            }
          : undefined;

  const tapAnimation =
    mode === "scale" && enable
      ? {
          scale: scaleHover.tap.scale,
          transition: scaleHover.tap.transition,
        }
      : undefined;

  return (
    <motion.div
      className={cn(enable && mode === "zoom" && "overflow-hidden", className)}
      whileHover={enable ? hoverAnimation : undefined}
      whileTap={enable ? tapAnimation : undefined}
    >
      {children}
    </motion.div>
  );
}
