import type { Transition, UseInViewOptions } from "framer-motion";

import { duration, easing } from "@/lib/design-system/motion";

export type MotionDuration = keyof typeof duration;

export type ViewportConfig = {
  /** Once per section — Motion System default */
  once?: boolean;
  amount?: UseInViewOptions["amount"];
  margin?: UseInViewOptions["margin"];
};

export const defaultViewport: Required<
  Pick<ViewportConfig, "once" | "amount">
> = {
  once: true,
  amount: 0.2,
};

export function getDuration(token: MotionDuration = "normal"): number {
  return duration[token];
}

export function getTransition(
  token: MotionDuration = "normal",
  delay = 0,
): Transition {
  return {
    duration: getDuration(token),
    ease: token === "slow" ? easing.emphasized : easing.standard,
    delay,
  };
}

export function getViewport(config: ViewportConfig = {}): {
  once: boolean;
  amount: UseInViewOptions["amount"];
  margin?: UseInViewOptions["margin"];
} {
  return {
    once: config.once ?? defaultViewport.once,
    amount: config.amount ?? defaultViewport.amount,
    ...(config.margin ? { margin: config.margin } : {}),
  };
}
