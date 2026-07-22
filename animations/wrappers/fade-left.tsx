"use client";

import { fadeLeft } from "../variants";
import { DirectionalFade } from "./directional-fade";
import type { MotionWrapperBaseProps } from "./types";

/**
 * Fade + translateX from the left.
 */
export function FadeLeft(props: MotionWrapperBaseProps) {
  return <DirectionalFade variants={fadeLeft} {...props} />;
}
