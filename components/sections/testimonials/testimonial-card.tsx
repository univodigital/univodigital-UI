"use client";

import { motion } from "framer-motion";
import { QuoteIcon, StarIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { TestimonialPreview } from "./data";

type TestimonialCardProps = {
  testimonial: TestimonialPreview;
  className?: string;
};

/**
 * Client testimonial card with hover lift.
 */
export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", className)}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              transition: {
                duration: duration.normal,
                ease: easing.standard,
              },
            }
      }
    >
      <Card
        variant="testimonial"
        size="lg"
        className={cn(
          "group/testimonial relative h-full overflow-hidden",
          "transition-[box-shadow,ring-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
          "hover:shadow-card-hover hover:ring-accent/25",
        )}
      >
        <CardHeader className="relative gap-4">
          <QuoteIcon
            className="size-8 text-accent/40 transition-colors duration-[var(--uds-duration-normal)] group-hover/testimonial:text-accent/70"
            aria-hidden
          />
          <div
            className="flex items-center gap-0.5"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon
                key={index}
                className={cn(
                  "size-3.5",
                  index < testimonial.rating
                    ? "fill-accent text-accent"
                    : "text-border",
                )}
                aria-hidden
              />
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="text-body-lg leading-relaxed text-card-foreground">
            “{testimonial.quote}”
          </CardDescription>
        </CardContent>

        <CardFooter className="mt-auto flex items-center gap-3 border-t-0 bg-transparent">
          <span
            className={cn(
              "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-caption font-semibold text-accent",
              "transition-transform duration-[var(--uds-duration-normal)] group-hover/testimonial:scale-105 motion-reduce:transform-none",
            )}
            aria-hidden
          >
            {testimonial.initials}
          </span>
          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-semibold text-card-foreground">
              {testimonial.name}
            </p>
            <p className="truncate text-caption text-card-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
