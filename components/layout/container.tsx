import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import type { PolymorphicProps } from "./types";

const containerVariants = cva("w-full mx-auto", {
  variants: {
    size: {
      /** 1280px max — primary site shell */
      max: "container-max",
      /** 1200px — content width */
      content: "container-content",
      /** 768px — narrow reading / forms */
      narrow: "container-narrow",
      /** 1440px — wide marketing layouts */
      wide: "container-wide",
      /** Full bleed, still respects horizontal gutters */
      full: "w-full px-[var(--uds-grid-margin)] lg:px-[var(--uds-grid-margin-lg)]",
    },
  },
  defaultVariants: {
    size: "content",
  },
});

type ContainerOwnProps = VariantProps<typeof containerVariants>;

export type ContainerProps<T extends ElementType = "div"> =
  PolymorphicProps<T> & ContainerOwnProps;

/**
 * Constrains content to design-system container widths.
 * Responsive horizontal gutters via container-* utilities.
 */
export function Container<T extends ElementType = "div">({
  as,
  size = "content",
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(containerVariants({ size }), className)}
      {...props}
    >
      {children}
    </Comp>
  );
}
