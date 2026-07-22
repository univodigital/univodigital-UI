"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const checkboxVariants = cva(
  "peer relative flex shrink-0 items-center justify-center border border-input transition-colors outline-none after:absolute focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:bg-input/30",
  {
    variants: {
      size: {
        sm: "size-3.5 rounded-[3px] after:-inset-x-2 after:-inset-y-1.5 [&>[data-slot=checkbox-indicator]>svg]:size-2.5",
        default:
          "size-4 rounded-[4px] after:-inset-x-3 after:-inset-y-2 [&>[data-slot=checkbox-indicator]>svg]:size-3.5",
        lg: "size-5 rounded-md after:-inset-x-3 after:-inset-y-2 [&>[data-slot=checkbox-indicator]>svg]:size-4",
      },
      variant: {
        default: "",
        danger:
          "data-checked:border-danger data-checked:bg-danger data-checked:text-danger-foreground",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

function Checkbox({
  className,
  size = "default",
  variant = "default",
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> &
  VariantProps<typeof checkboxVariants>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      data-size={size}
      data-variant={variant}
      className={cn(checkboxVariants({ size, variant }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox, checkboxVariants };
