import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/** Keys from the 8pt spacing scale */
export type SpaceScale =
  | 0
  | 0.5
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 12
  | 14
  | 16
  | 20
  | 24
  | 28
  | 32
  | 40
  | 48;

export type SemanticSpace = "stack" | "stack-lg" | "gutter" | "gutter-lg";

export type GapToken = SpaceScale | SemanticSpace;

export type PolymorphicProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;
