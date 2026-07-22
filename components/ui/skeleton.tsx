import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const skeletonVariants = cva("animate-pulse bg-muted", {
  variants: {
    variant: {
      text: "h-4 w-full rounded-md",
      title: "h-7 w-3/4 rounded-md",
      circular: "rounded-full",
      rectangular: "rounded-md",
      card: "h-40 w-full rounded-card",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  compoundVariants: [
    { variant: "circular", size: "sm", class: "size-8" },
    { variant: "circular", size: "default", class: "size-10" },
    { variant: "circular", size: "lg", class: "size-16" },
    { variant: "rectangular", size: "sm", class: "h-16 w-full" },
    { variant: "rectangular", size: "default", class: "h-24 w-full" },
    { variant: "rectangular", size: "lg", class: "h-40 w-full" },
  ],
  defaultVariants: {
    variant: "text",
    size: "default",
  },
});

function Skeleton({
  className,
  variant = "text",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>) {
  return (
    <div
      data-slot="skeleton"
      data-variant={variant}
      aria-hidden="true"
      className={cn(skeletonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Skeleton, skeletonVariants };
