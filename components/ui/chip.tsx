"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border text-caption font-medium transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-transparent bg-muted text-text-primary",
        outline: "border-border bg-background text-text-primary",
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-accent/15 text-accent",
        success: "border-transparent bg-success/15 text-success",
        warning: "border-transparent bg-warning/20 text-warning-foreground",
        danger: "border-transparent bg-danger/15 text-danger",
      },
      size: {
        sm: "h-6 px-2 text-[0.6875rem]",
        default: "h-7 px-2.5",
        lg: "h-8 px-3 text-body",
      },
      interactive: {
        true: "cursor-pointer hover:opacity-90",
        false: "",
      },
      selected: {
        true: "ring-2 ring-ring/40",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
      selected: false,
    },
  },
);

type ChipProps = VariantProps<typeof chipVariants> & {
  className?: string;
  children?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Chip({
  className,
  variant = "default",
  size = "default",
  interactive,
  selected = false,
  onDismiss,
  dismissLabel = "Remove",
  disabled,
  children,
  onClick,
}: ChipProps) {
  const isInteractive = interactive ?? Boolean(onClick || onDismiss);
  const classes = cn(
    chipVariants({
      variant,
      size,
      interactive: isInteractive,
      selected,
    }),
    className,
  );

  const content = (
    <>
      <span className="truncate">{children}</span>
      {onDismiss ? (
        <span
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-label={dismissLabel}
          className="inline-flex size-4 shrink-0 items-center justify-center rounded-full hover:bg-foreground/10"
          onClick={(event) => {
            event.stopPropagation();
            if (!disabled) onDismiss();
          }}
          onKeyDown={(event) => {
            if (disabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              event.stopPropagation();
              onDismiss();
            }
          }}
        >
          <XIcon className="size-3" aria-hidden />
        </span>
      ) : null}
    </>
  );

  if (isInteractive) {
    return (
      <button
        type="button"
        data-slot="chip"
        data-variant={variant}
        data-selected={selected || undefined}
        disabled={disabled}
        onClick={onClick}
        className={classes}
      >
        {content}
      </button>
    );
  }

  return (
    <span
      data-slot="chip"
      data-variant={variant}
      data-selected={selected || undefined}
      className={classes}
    >
      {content}
    </span>
  );
}

export { Chip, chipVariants };
