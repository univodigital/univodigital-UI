"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const errorStateVariants = cva(
  "flex w-full flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-danger/20 bg-danger/5",
        subtle: "bg-transparent",
        card: "rounded-card border border-danger/25 bg-card shadow-sm",
        banner:
          "flex-row items-start gap-3 rounded-lg border border-danger/20 bg-danger/5 p-4 text-left",
      },
      size: {
        sm: "gap-2 px-4 py-6",
        default: "gap-3 px-6 py-10",
        lg: "gap-4 px-8 py-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ErrorStateProps = React.ComponentProps<"div"> &
  VariantProps<typeof errorStateVariants> & {
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    error?: Error | string | null;
    retryLabel?: string;
    onRetry?: () => void;
  };

function ErrorState({
  className,
  variant = "default",
  size = "default",
  icon,
  title = "Something went wrong",
  description,
  error,
  retryLabel = "Try again",
  onRetry,
  children,
  ...props
}: ErrorStateProps) {
  const message =
    description ??
    (typeof error === "string"
      ? error
      : error?.message) ??
    "Please try again. If the problem continues, contact support.";

  const isBanner = variant === "banner";

  return (
    <div
      role="alert"
      data-slot="error-state"
      data-variant={variant}
      className={cn(
        errorStateVariants({
          variant,
          size: isBanner ? undefined : size,
        }),
        isBanner && "px-4 py-3",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger",
          isBanner ? "size-9" : "size-12",
        )}
      >
        {icon ?? (
          <AlertTriangleIcon
            className={isBanner ? "size-4" : "size-5"}
            aria-hidden
          />
        )}
      </div>
      <div className={cn("flex flex-col gap-1", isBanner && "min-w-0 flex-1")}>
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        <p className="text-sm text-text-secondary">{message}</p>
        {children}
      </div>
      {onRetry ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className={isBanner ? "shrink-0" : undefined}
        >
          <RefreshCwIcon />
          {retryLabel}
        </Button>
      ) : null}
    </div>
  );
}

export { ErrorState, errorStateVariants };
