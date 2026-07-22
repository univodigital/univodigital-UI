"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { InboxIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const emptyStateVariants = cva(
  "flex w-full flex-col items-center justify-center text-center",
  {
    variants: {
      variant: {
        default: "rounded-xl border border-dashed border-border bg-surface/50",
        subtle: "bg-transparent",
        card: "rounded-card border border-border bg-card shadow-sm",
      },
      size: {
        sm: "gap-2 px-4 py-8",
        default: "gap-3 px-6 py-12",
        lg: "gap-4 px-8 py-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type EmptyStateProps = React.ComponentProps<"div"> &
  VariantProps<typeof emptyStateVariants> & {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
  };

function EmptyState({
  className,
  variant = "default",
  size = "default",
  icon,
  title,
  description,
  actionLabel,
  onAction,
  children,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      data-variant={variant}
      className={cn(emptyStateVariants({ variant, size }), className)}
      {...props}
    >
      <div className="flex size-12 items-center justify-center rounded-full bg-muted text-text-secondary">
        {icon ?? <InboxIcon className="size-5" aria-hidden />}
      </div>
      <div className="flex max-w-md flex-col gap-1">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {description ? (
          <p className="text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
      {actionLabel && onAction ? (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
      {children}
    </div>
  );
}

export { EmptyState, emptyStateVariants };
