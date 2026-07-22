import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-card text-card-foreground transition-[box-shadow,transform,background-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
  {
    variants: {
      variant: {
        default: "bg-card ring-1 ring-foreground/10",
        surface: "bg-surface ring-1 ring-border",
        outline: "bg-transparent ring-1 ring-border",
        elevated: "bg-card shadow-card ring-1 ring-foreground/5",
        /** Design system card types */
        service:
          "bg-surface ring-1 ring-border hover:shadow-card-hover hover:-translate-y-0.5",
        portfolio:
          "bg-card p-0 ring-1 ring-foreground/10 hover:shadow-card-hover",
        testimonial: "bg-surface ring-1 ring-border shadow-sm",
        ghost: "bg-transparent shadow-none ring-0",
      },
      size: {
        default: "gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(4)]",
        sm: "gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(3)]",
        lg: "gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(6)]",
      },
      interactive: {
        true: "cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      interactive: false,
    },
  },
);

function Card({
  className,
  variant = "default",
  size = "default",
  interactive = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      data-variant={variant}
      data-size={size}
      className={cn(
        cardVariants({ variant, size, interactive }),
        "has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-base leading-snug font-medium group-data-[size=sm]/card:text-sm",
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className,
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
};
