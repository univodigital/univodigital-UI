import {
  duration,
  easing,
  motion,
} from "@/lib/design-system/motion";

/**
 * Framer Motion variants — aligned to Motion System.
 * Scroll: fade + translateY · once per section · stagger children
 */

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: motion.fadeDistance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

export const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -motion.fadeDistance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

export const fadeRight = {
  hidden: {
    opacity: 0,
    x: motion.fadeDistance,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.emphasized,
    },
  },
} as const;

export const reveal = {
  hidden: {
    opacity: 0,
    y: motion.fadeDistance,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.emphasized,
    },
  },
} as const;

export const imageReveal = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    clipPath: "inset(8% 8% 8% 8%)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: duration.slow,
      ease: easing.emphasized,
    },
  },
} as const;

export const textChar = {
  hidden: {
    opacity: 0,
    y: "0.4em",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.standard,
    },
  },
} as const;

/**
 * Stagger children once per section (motion system).
 */
export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motion.stagger,
    },
  },
} as const;

export const staggerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motion.stagger / 2,
    },
  },
} as const;

/**
 * Hero page-load stagger + CTA reveal.
 */
export const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motion.stagger,
      delayChildren: 0.1,
    },
  },
} as const;

export const heroItem = {
  hidden: {
    opacity: 0,
    y: motion.fadeDistance,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.emphasized,
    },
  },
} as const;

/** Instant variants when prefers-reduced-motion is on */
export const reducedMotionVariant = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
} as const;
