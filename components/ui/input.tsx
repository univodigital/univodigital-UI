import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-input border bg-transparent text-base transition-colors outline-none file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-3 aria-invalid:ring-danger/20 md:text-sm dark:bg-input/30",
  {
    variants: {
      variant: {
        default: "border-input",
        filled: "border-transparent bg-muted dark:bg-muted/60",
        ghost: "border-transparent bg-transparent shadow-none",
      },
      inputSize: {
        sm: "h-8 px-2.5 text-sm",
        default: "h-10 px-3",
        lg: "h-11 px-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default",
    },
  },
);

function Input({
  className,
  type,
  variant = "default",
  inputSize = "default",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      data-size={inputSize}
      className={cn(inputVariants({ variant, inputSize }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
