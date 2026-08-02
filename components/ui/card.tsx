import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Shared card surface styles — opaque backgrounds with theme-aware text.
 * On forced-dark pages (.dark), --card resolves to always-light surfaces
 * with dark copy via --card-foreground / --card-muted-foreground.
 */
const cardSurfaceVariants = cva(
  "text-card-foreground transition-[border-color,box-shadow,ring-color,background-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
  {
    variants: {
      surface: {
        glass:
          "rounded-2xl border border-border/80 bg-card shadow-xs ring-1 ring-border/50 backdrop-blur-md hover:border-accent/40 hover:shadow-card-hover hover:ring-accent/25",
        glassElevated:
          "rounded-2xl border border-border/70 bg-card shadow-xs ring-1 ring-border/50 backdrop-blur-md hover:border-accent/45 hover:ring-accent/30",
        solid:
          "rounded-2xl border border-border bg-card shadow-xs ring-1 ring-border/60 hover:border-accent/25 hover:shadow-card-hover",
        surfaceLight:
          "rounded-xl border border-surface-light-border bg-surface-light text-surface-light-foreground shadow-sm ring-1 ring-surface-light-border/70 hover:border-accent/30 hover:shadow-card-hover",
        faq: "rounded-2xl border border-border/80 bg-card shadow-xs ring-1 ring-border/40 hover:ring-accent/20 data-[state=open]:shadow-sm data-[state=open]:ring-accent/25",
        media:
          "overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs ring-1 ring-border/50 backdrop-blur-md",
        logoTile:
          "rounded-lg border border-border/80 bg-card text-card-foreground shadow-xs hover:shadow-sm",
      },
    },
    defaultVariants: {
      surface: "solid",
    },
  },
);

const cardVariants = cva(
  "group/card flex flex-col overflow-hidden text-card-foreground transition-[box-shadow,transform,background-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
  {
    variants: {
      variant: {
        default: cn(cardSurfaceVariants({ surface: "solid" }), "rounded-card"),
        surface:
          "rounded-card border border-border/80 bg-card text-card-foreground ring-1 ring-border/60 hover:shadow-card-hover hover:ring-accent/25",
        outline: "rounded-card border border-border bg-transparent ring-0",
        elevated: cn(
          cardSurfaceVariants({ surface: "solid" }),
          "rounded-card shadow-card",
        ),
        service: cn(
          cardSurfaceVariants({ surface: "glass" }),
          "hover:-translate-y-0.5",
        ),
        portfolio: cn(cardSurfaceVariants({ surface: "solid" }), "p-0"),
        testimonial: cn(cardSurfaceVariants({ surface: "solid" }), "shadow-sm"),
        ghost: "rounded-card bg-transparent shadow-none ring-0",
        glass: cardSurfaceVariants({ surface: "glass" }),
        glassElevated: cardSurfaceVariants({ surface: "glassElevated" }),
        surfaceLight: cardSurfaceVariants({ surface: "surfaceLight" }),
      },
      size: {
        default:
          "gap-(--card-spacing) py-(--card-spacing) [--card-spacing:--spacing(4)]",
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

/** Card title — always pairs with the active --card surface. */
export const cardTitleClassName =
  "font-heading font-semibold tracking-tight text-card-foreground";

/** Card body / description. */
export const cardDescriptionClassName =
  "text-body text-pretty text-card-muted-foreground";

/** Card metadata — captions, dates, roles. */
export const cardMetaClassName =
  "text-caption text-card-muted-foreground";

/** Icon badge on standard cards. */
export const cardIconWrapClassName =
  "inline-flex items-center justify-center rounded-xl bg-accent/10 text-accent";

/** Title on explicit always-light surfaces (legacy alias — prefer card tokens). */
export const cardSurfaceLightTitleClassName = cardTitleClassName;

/** Body on explicit always-light surfaces (legacy alias — prefer card tokens). */
export const cardSurfaceLightDescriptionClassName = cardDescriptionClassName;

export function cardSurfaceClassName(
  surface: NonNullable<VariantProps<typeof cardSurfaceVariants>["surface"]> = "solid",
  className?: string,
) {
  return cn(cardSurfaceVariants({ surface }), className);
}

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
        cardTitleClassName,
        "text-base leading-snug group-data-[size=sm]/card:text-sm",
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
      className={cn(cardDescriptionClassName, "text-sm", className)}
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
        "flex items-center rounded-b-xl border-t border-border bg-muted/50 p-(--card-spacing) text-card-muted-foreground",
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
  cardSurfaceVariants,
};
