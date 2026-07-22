"use client";

import { motion } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { FaqItem } from "./data";

type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

/**
 * Accessible FAQ accordion with staggered scroll reveal.
 */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("w-full", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReducedMotion
              ? 0
              : motionTokens.stagger,
          },
        },
      }}
    >
      <Accordion
        type="single"
        collapsible
        variant="separated"
        className="w-full"
        defaultValue={items[0]?.id}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
            }}
          >
            <AccordionItem
              value={item.id}
              className={cn(
                "border-border/80 bg-card/80 shadow-xs ring-1 ring-border/40",
                "transition-[box-shadow,ring-color,background-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:bg-card hover:ring-accent/20",
                "data-[state=open]:bg-card data-[state=open]:ring-accent/25 data-[state=open]:shadow-sm",
              )}
            >
              <AccordionTrigger
                className={cn(
                  "px-4 py-4 text-base font-semibold text-text-primary hover:no-underline md:px-5 md:text-lg",
                  "[&_[data-slot=accordion-trigger-icon]]:text-text-secondary",
                  "[&_[data-slot=accordion-trigger-icon]]:transition-transform",
                  "[&_[data-slot=accordion-trigger-icon]]:duration-[var(--uds-duration-normal)]",
                )}
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-body text-pretty text-text-secondary md:px-5 md:pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
