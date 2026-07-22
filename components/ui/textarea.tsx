import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex field-sizing-content w-full rounded-input border bg-transparent text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 md:text-sm dark:bg-input/30",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted dark:bg-muted/60",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      textareaSize: {
        sm: "min-h-16 px-2.5 py-2 text-sm",
        default: "min-h-24 px-3 py-2.5",
        lg: "min-h-32 px-3.5 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      textareaSize: "default",
    },
  },
);

function Textarea({
  className,
  variant = "default",
  textareaSize = "default",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      data-size={textareaSize}
      className={cn(textareaVariants({ variant, textareaSize }), className)}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
