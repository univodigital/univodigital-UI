import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

import { Container, type ContainerProps } from "./container";
import type { PolymorphicProps } from "./types";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "section-space-sm",
      md: "section-space",
      lg: "section-space-lg",
    },
    tone: {
      default: "bg-transparent",
      surface: "bg-surface",
      muted: "bg-muted",
    },
  },
  defaultVariants: {
    spacing: "md",
    tone: "default",
  },
});

type SectionOwnProps = VariantProps<typeof sectionVariants> & {
  /** When set, wraps children in Container */
  container?: boolean | NonNullable<ContainerProps["size"]>;
  containerClassName?: string;
};

export type SectionProps<T extends ElementType = "section"> =
  PolymorphicProps<T> & SectionOwnProps;

/**
 * Vertical page section with design-system spacing rhythm.
 * Optionally nests a Container for content width.
 */
export function Section<T extends ElementType = "section">({
  as,
  spacing = "md",
  tone = "default",
  container = false,
  containerClassName,
  className,
  children,
  ...props
}: SectionProps<T>) {
  const Comp = as ?? "section";
  const content =
    container === false ? (
      children
    ) : (
      <Container
        size={container === true ? "content" : container}
        className={containerClassName}
      >
        {children}
      </Container>
    );

  return (
    <Comp
      className={cn(sectionVariants({ spacing, tone }), className)}
      {...props}
    >
      {content}
    </Comp>
  );
}
