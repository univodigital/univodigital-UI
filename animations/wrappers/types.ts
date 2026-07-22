"use client";

import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import type { MotionDuration, ViewportConfig } from "../config";

export type MotionWrapperBaseProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before animation starts */
  delay?: number;
  /** Motion System timing token */
  duration?: MotionDuration;
  /** Play once when entering viewport (Motion System default: true) */
  once?: boolean;
  /** Disable scroll trigger — animate on mount */
  animateOnMount?: boolean;
  /** Viewport intersection options */
  viewport?: ViewportConfig;
  /**
   * Use as a child of StaggerContainer —
   * inherits parent timing (no independent whileInView).
   */
  staggerItem?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "animate" | "initial" | "variants">;
