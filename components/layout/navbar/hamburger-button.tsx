"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type HamburgerButtonProps = {
  open: boolean;
  onToggle: () => void;
  controlsId: string;
  className?: string;
};

/**
 * Animated hamburger → X toggle for mobile navigation.
 */
export function HamburgerButton({
  open,
  onToggle,
  controlsId,
  className,
}: HamburgerButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: duration.fast, ease: easing.standard };

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex size-10 items-center justify-center rounded-md text-text-primary outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden",
        className,
      )}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      <span className="relative block size-5" aria-hidden="true">
        <motion.span
          className="absolute top-[3px] left-0 block h-0.5 w-5 origin-center rounded-full bg-current"
          animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={transition}
        />
        <motion.span
          className="absolute top-[9px] left-0 block h-0.5 w-5 rounded-full bg-current"
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          transition={transition}
        />
        <motion.span
          className="absolute top-[15px] left-0 block h-0.5 w-5 origin-center rounded-full bg-current"
          animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={transition}
        />
      </span>
    </button>
  );
}
