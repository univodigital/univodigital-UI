import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const dividerVariants = cva("shrink-0 border-border", {
  variants: {
    orientation: {
      horizontal: "block w-full border-t",
      vertical: "inline-block self-stretch border-l",
    },
    weight: {
      hairline: "border-[0.5px]",
      thin: "border",
      thick: "border-2",
    },
    tone: {
      default: "border-border",
      strong: "border-border-strong",
      muted: "border-muted",
    },
    /** Full-bleed on mobile, constrained feel via spacing margins when soft */
    soft: {
      true: "opacity-70",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    weight: "thin",
    tone: "default",
    soft: false,
  },
});

export type DividerProps = HTMLAttributes<HTMLHRElement> &
  VariantProps<typeof dividerVariants> & {
    /** Accessible label when the divider conveys meaning */
    label?: string;
  };

/**
 * Horizontal or vertical rule using design-system border tokens.
 */
export function Divider({
  orientation = "horizontal",
  weight = "thin",
  tone = "default",
  soft = false,
  label,
  className,
  ...props
}: DividerProps) {
  const decorative = !label;

  return (
    <hr
      aria-orientation={orientation ?? "horizontal"}
      aria-hidden={decorative ? true : undefined}
      aria-label={label}
      className={cn(
        dividerVariants({ orientation, weight, tone, soft }),
        orientation === "vertical" && "min-h-uds-4 h-auto",
        className,
      )}
      {...props}
    />
  );
}
