import type { GapToken } from "./types";

/** Maps design-system spacing tokens to Tailwind gap utilities */
export const gapClassMap: Record<GapToken, string> = {
  0: "gap-uds-0",
  0.5: "gap-uds-0-5",
  1: "gap-uds-1",
  2: "gap-uds-2",
  3: "gap-uds-3",
  4: "gap-uds-4",
  5: "gap-uds-5",
  6: "gap-uds-6",
  7: "gap-uds-7",
  8: "gap-uds-8",
  9: "gap-uds-9",
  10: "gap-uds-10",
  12: "gap-uds-12",
  14: "gap-uds-14",
  16: "gap-uds-16",
  20: "gap-uds-20",
  24: "gap-uds-24",
  28: "gap-uds-28",
  32: "gap-uds-32",
  40: "gap-uds-40",
  48: "gap-uds-48",
  stack: "gap-stack",
  "stack-lg": "gap-stack-lg",
  gutter: "gap-gutter",
  "gutter-lg": "gap-gutter-lg",
};

export function getGapClass(gap: GapToken = 4): string {
  return gapClassMap[gap];
}
