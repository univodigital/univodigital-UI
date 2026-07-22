"use client";

import { scaleIn } from "../variants";
import { DirectionalFade } from "./directional-fade";
import type { MotionWrapperBaseProps } from "./types";

/**
 * Scale + fade entrance (CTA / media reveals).
 */
export function ScaleIn(props: MotionWrapperBaseProps) {
  return <DirectionalFade variants={scaleIn} {...props} />;
}
