"use client";

import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import {
  getViewport,
  type MotionDuration,
  type ViewportConfig,
} from "../config";

type CounterProps = {
  /** Target number to count to */
  to: number;
  from?: number;
  /** Decimal places */
  decimals?: number;
  /** Prefix e.g. "$" */
  prefix?: string;
  /** Suffix e.g. "+" / "%" */
  suffix?: string;
  className?: string;
  duration?: MotionDuration;
  once?: boolean;
  viewport?: ViewportConfig;
  /** Format with locale separators */
  locale?: string;
};

/**
 * Animated number counter — triggers once when in view.
 */
export function Counter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  duration: durationToken = "slow",
  once = true,
  viewport,
  locale = "en-US",
}: CounterProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, getViewport({ once, ...viewport }));
  const motionValue = useMotionValue(from);

  const display = useTransform(motionValue, (latest) => {
    const value = Number(latest.toFixed(decimals));
    const formatted = value.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      motionValue.set(to);
      return;
    }

    if (!isInView) return;

    const controls = animate(motionValue, to, {
      duration: duration[durationToken],
      ease: easing.standard,
    });

    return () => controls.stop();
  }, [durationToken, isInView, motionValue, prefersReducedMotion, to]);

  if (prefersReducedMotion) {
    const formatted = to.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return (
      <span ref={ref} className={cn("tabular-nums", className)}>
        {prefix}
        {formatted}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
