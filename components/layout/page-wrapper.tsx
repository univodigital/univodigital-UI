import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import type { PolymorphicProps } from "./types";

export type PageWrapperProps<T extends ElementType = "div"> =
  PolymorphicProps<T> & {
    /** Stretch to viewport height for sticky footer layouts */
    fullHeight?: boolean;
  };

/**
 * Top-level page shell. Use once per route around header / main / footer.
 * Responsive width: always full bleed; constrain content with ContentWrapper.
 */
export function PageWrapper<T extends ElementType = "div">({
  as,
  fullHeight = true,
  className,
  children,
  ...props
}: PageWrapperProps<T>) {
  const Comp = as ?? "div";

  return (
    <Comp
      className={cn(
        "flex w-full flex-col bg-background text-text-primary",
        fullHeight && "min-h-dvh",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
