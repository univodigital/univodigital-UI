import { duration, easing, motion } from "@/lib/design-system/motion";

/**
 * Hover / interaction animation presets (motion system).
 */

export const scaleHover = {
  rest: { scale: 1 },
  hover: {
    scale: motion.scaleHover,
    transition: {
      duration: duration.fast,
      ease: easing.standard,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: duration.fast,
      ease: easing.standard,
    },
  },
} as const;

export const cardLift = {
  rest: {
    y: 0,
    boxShadow: "var(--uds-shadow-card)",
  },
  hover: {
    y: motion.lift,
    boxShadow: "var(--uds-shadow-card-hover)",
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

export const imageZoom = {
  rest: { scale: 1 },
  hover: {
    scale: motion.zoom,
    transition: {
      duration: duration.slow,
      ease: easing.standard,
    },
  },
} as const;

export const transitionPresets = {
  fast: {
    duration: duration.fast,
    ease: easing.standard,
  },
  normal: {
    duration: duration.normal,
    ease: easing.standard,
  },
  slow: {
    duration: duration.slow,
    ease: easing.emphasized,
  },
  colors: "var(--uds-transition-colors)",
  transform: "var(--uds-transition-transform)",
  shadow: "var(--uds-transition-shadow)",
  all: "var(--uds-transition-all)",
} as const;
