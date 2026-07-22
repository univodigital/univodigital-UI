"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

const accordionVariants = cva("flex w-full flex-col", {
  variants: {
    variant: {
      default: "",
      bordered: "rounded-xl border border-border px-4",
      separated: "gap-2",
      ghost: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const accordionItemVariants = cva("", {
  variants: {
    variant: {
      default: "not-last:border-b border-border",
      bordered: "not-last:border-b border-border",
      separated: "rounded-xl border border-border px-4",
      ghost: "not-last:border-b border-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AccordionVariant = NonNullable<
  VariantProps<typeof accordionVariants>["variant"]
>;

const AccordionVariantContext = React.createContext<AccordionVariant>("default");

function Accordion({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root> &
  VariantProps<typeof accordionVariants>) {
  return (
    <AccordionVariantContext.Provider value={variant ?? "default"}>
      <AccordionPrimitive.Root
        data-slot="accordion"
        data-variant={variant}
        className={cn(accordionVariants({ variant }), className)}
        {...props}
      />
    </AccordionVariantContext.Provider>
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  const variant = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between rounded-lg border border-transparent py-3 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden text-sm text-text-secondary data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div className={cn("h-(--radix-accordion-content-height) pt-0 pb-3", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  accordionVariants,
};
