import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

import { cn } from "@/lib/utils";

const loadingVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      spinner: "",
      dots: "gap-1",
      overlay:
        "fixed inset-0 z-[var(--uds-z-overlay)] bg-background/60 backdrop-blur-[2px]",
      inline: "gap-2 text-text-secondary",
    },
    size: {
      sm: "",
      default: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "spinner",
    size: "default",
  },
});

const spinnerSizeMap = {
  sm: "size-4",
  default: "size-6",
  lg: "size-8",
} as const;

const dotSizeMap = {
  sm: "size-1.5",
  default: "size-2",
  lg: "size-2.5",
} as const;

type LoadingProps = React.ComponentProps<"div"> &
  VariantProps<typeof loadingVariants> & {
    label?: string;
  };

function Loading({
  className,
  variant = "spinner",
  size = "default",
  label = "Loading",
  ...props
}: LoadingProps) {
  const resolvedSize = size ?? "default";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      data-slot="loading"
      data-variant={variant}
      className={cn(loadingVariants({ variant, size }), className)}
      {...props}
    >
      {variant === "dots" ? (
        <>
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={cn(
                "animate-pulse rounded-full bg-current",
                dotSizeMap[resolvedSize],
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </>
      ) : (
        <Loader2Icon
          className={cn(
            "animate-spin text-accent",
            spinnerSizeMap[resolvedSize],
            variant === "inline" && "text-current",
          )}
          aria-hidden
        />
      )}
      {variant === "inline" && label ? (
        <span className="text-caption">{label}</span>
      ) : null}
      <span className="sr-only">{label}</span>
    </div>
  );
}

export { Loading, loadingVariants };
