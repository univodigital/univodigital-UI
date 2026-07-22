"use client";

import { fadeUp } from "../variants";
import { DirectionalFade } from "./directional-fade";
import type { MotionWrapperBaseProps } from "./types";

/**
 * Fade + translateY — primary scroll reveal (Motion System).
 */
export function FadeUp(props: MotionWrapperBaseProps) {
  return <DirectionalFade variants={fadeUp} {...props} />;
}
