import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import { Container, type ContainerProps } from "./container";
import type { PolymorphicProps } from "./types";

export type ContentWrapperProps<T extends ElementType = "main"> =
  PolymorphicProps<T> & {
    /** Container width for the main content column */
    size?: NonNullable<ContainerProps["size"]>;
    /** Grow to fill remaining space in PageWrapper flex column */
    grow?: boolean;
    /** Skip the inner Container (full-bleed main) */
    flush?: boolean;
  };

/**
 * Primary content region inside PageWrapper.
 * Defaults to <main> for accessibility landmarking.
 */
export function ContentWrapper<T extends ElementType = "main">({
  as,
  size = "content",
  grow = true,
  flush = false,
  className,
  children,
  ...props
}: ContentWrapperProps<T>) {
  const Comp = as ?? "main";

  return (
    <Comp
      className={cn(
        "w-full",
        grow && "flex-1",
        className,
      )}
      {...props}
    >
      {flush ? (
        children
      ) : (
        <Container size={size}>{children}</Container>
      )}
    </Comp>
  );
}
