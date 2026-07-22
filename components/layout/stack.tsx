import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import { getGapClass } from "./spacing";
import type { GapToken, PolymorphicProps } from "./types";

const stackVariants = cva("flex", {
  variants: {
    direction: {
      vertical: "flex-col",
      horizontal: "flex-row",
      /** Column on mobile, row from tablet up */
      responsive: "flex-col md:flex-row",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "vertical",
    align: "stretch",
    justify: "start",
    wrap: false,
  },
});

type StackOwnProps = VariantProps<typeof stackVariants> & {
  gap?: GapToken;
};

export type StackProps<T extends ElementType = "div"> = PolymorphicProps<T> &
  StackOwnProps;

/**
 * Flex stack for vertical / horizontal / responsive layouts.
 * Spacing uses the 8pt design-system scale.
 */
export function Stack<T extends ElementType = "div">({
  as,
  direction = "vertical",
  align = "stretch",
  justify = "start",
  wrap = false,
  gap = "stack",
  className,
  children,
  ...props
}: StackProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        stackVariants({ direction, align, justify, wrap }),
        getGapClass(gap),
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
