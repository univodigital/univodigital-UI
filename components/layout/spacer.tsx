import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import type { SpaceScale } from "./types";

type SpacerProps = HTMLAttributes<HTMLDivElement> & {
  /** 8pt spacing token */
  size?: SpaceScale;
  /**
   * Axis to expand along.
   * `responsive` = vertical on mobile, horizontal from tablet up.
   */
  axis?: "vertical" | "horizontal" | "both" | "responsive";
};

const verticalMap: Record<SpaceScale, string> = {
  0: "h-uds-0",
  0.5: "h-uds-0-5",
  1: "h-uds-1",
  2: "h-uds-2",
  3: "h-uds-3",
  4: "h-uds-4",
  5: "h-uds-5",
  6: "h-uds-6",
  7: "h-uds-7",
  8: "h-uds-8",
  9: "h-uds-9",
  10: "h-uds-10",
  12: "h-uds-12",
  14: "h-uds-14",
  16: "h-uds-16",
  20: "h-uds-20",
  24: "h-uds-24",
  28: "h-uds-28",
  32: "h-uds-32",
  40: "h-uds-40",
  48: "h-uds-48",
};

const horizontalMap: Record<SpaceScale, string> = {
  0: "w-uds-0",
  0.5: "w-uds-0-5",
  1: "w-uds-1",
  2: "w-uds-2",
  3: "w-uds-3",
  4: "w-uds-4",
  5: "w-uds-5",
  6: "w-uds-6",
  7: "w-uds-7",
  8: "w-uds-8",
  9: "w-uds-9",
  10: "w-uds-10",
  12: "w-uds-12",
  14: "w-uds-14",
  16: "w-uds-16",
  20: "w-uds-20",
  24: "w-uds-24",
  28: "w-uds-28",
  32: "w-uds-32",
  40: "w-uds-40",
  48: "w-uds-48",
};

const bothMap: Record<SpaceScale, string> = {
  0: "size-uds-0",
  0.5: "size-uds-0-5",
  1: "size-uds-1",
  2: "size-uds-2",
  3: "size-uds-3",
  4: "size-uds-4",
  5: "size-uds-5",
  6: "size-uds-6",
  7: "size-uds-7",
  8: "size-uds-8",
  9: "size-uds-9",
  10: "size-uds-10",
  12: "size-uds-12",
  14: "size-uds-14",
  16: "size-uds-16",
  20: "size-uds-20",
  24: "size-uds-24",
  28: "size-uds-28",
  32: "size-uds-32",
  40: "size-uds-40",
  48: "size-uds-48",
};

const responsiveHorizontalMap: Record<SpaceScale, string> = {
  0: "md:w-uds-0",
  0.5: "md:w-uds-0-5",
  1: "md:w-uds-1",
  2: "md:w-uds-2",
  3: "md:w-uds-3",
  4: "md:w-uds-4",
  5: "md:w-uds-5",
  6: "md:w-uds-6",
  7: "md:w-uds-7",
  8: "md:w-uds-8",
  9: "md:w-uds-9",
  10: "md:w-uds-10",
  12: "md:w-uds-12",
  14: "md:w-uds-14",
  16: "md:w-uds-16",
  20: "md:w-uds-20",
  24: "md:w-uds-24",
  28: "md:w-uds-28",
  32: "md:w-uds-32",
  40: "md:w-uds-40",
  48: "md:w-uds-48",
};

/**
 * Invisible spacing primitive. Prefer over ad-hoc margin utilities
 * when composing layout rhythm from the 8pt scale.
 */
export function Spacer({
  size = 4,
  axis = "vertical",
  className,
  ...props
}: SpacerProps) {
  const axisClass =
    axis === "vertical"
      ? cn("block w-full", verticalMap[size])
      : axis === "horizontal"
        ? cn("inline-block shrink-0 self-stretch", horizontalMap[size])
        : axis === "both"
          ? cn("block shrink-0", bothMap[size])
          : cn(
              "block w-full shrink-0 md:w-auto md:h-auto",
              verticalMap[size],
              "md:h-0",
              responsiveHorizontalMap[size],
            );

  return (
    <div
      aria-hidden="true"
      className={cn(axisClass, className)}
      {...props}
    />
  );
}
