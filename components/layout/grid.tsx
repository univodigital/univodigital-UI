import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import { getGapClass } from "./spacing";
import type { GapToken, PolymorphicProps } from "./types";

const gridVariants = cva("w-full", {
  variants: {
    /** Use the 12-column design-system grid */
    system: {
      true: "grid-system",
      false: "grid",
    },
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
      12: "grid-cols-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    },
  },
  defaultVariants: {
    system: true,
    align: "stretch",
  },
});

type GridOwnProps = Omit<VariantProps<typeof gridVariants>, "system"> & {
  /** Enable 12-column UDS grid (default). Set false for custom cols. */
  system?: boolean;
  /**
   * Responsive column presets for non-system grids.
   * Mobile → tablet → laptop.
   */
  responsiveCols?: {
    base?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4 | 6;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
  };
  gap?: GapToken;
  /** Override gap with sm/lg grid gutters when using system grid */
  gutter?: "sm" | "md" | "lg";
};

export type GridProps<T extends ElementType = "div"> = PolymorphicProps<T> &
  GridOwnProps;

const responsiveColsMap = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  6: "grid-cols-6",
  12: "grid-cols-12",
} as const;

const mdColsMap = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
} as const;

const lgColsMap = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  12: "lg:grid-cols-12",
} as const;

const gutterClassMap = {
  sm: "grid-system-sm",
  md: "",
  lg: "grid-system-lg",
} as const;

/**
 * Responsive CSS Grid.
 * Default: 12-column system — use Tailwind col-span-* on children.
 */
export function Grid<T extends ElementType = "div">({
  as,
  system = true,
  cols,
  responsiveCols,
  gap = "gutter",
  gutter = "md",
  align = "stretch",
  className,
  children,
  ...props
}: GridProps<T>) {
  const Comp = as ?? "div";

  const responsiveClasses = system
    ? null
    : [
        responsiveCols?.base
          ? responsiveColsMap[responsiveCols.base]
          : cols
            ? undefined
            : "grid-cols-1",
        responsiveCols?.md ? mdColsMap[responsiveCols.md] : null,
        responsiveCols?.lg ? lgColsMap[responsiveCols.lg] : null,
      ];

  return (
    <Comp
      className={cn(
        gridVariants({
          system,
          cols: system ? undefined : cols,
          align,
        }),
        system && gutterClassMap[gutter],
        !system && responsiveClasses,
        (!system || gap !== "gutter") && getGapClass(gap),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
