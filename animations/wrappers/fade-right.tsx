"use client";

import { fadeRight } from "../variants";
import { DirectionalFade } from "./directional-fade";
import type { MotionWrapperBaseProps } from "./types";

/**
 * Fade + translateX from the right.
 */
export function FadeRight(props: MotionWrapperBaseProps) {
  return <DirectionalFade variants={fadeRight} {...props} />;
}
