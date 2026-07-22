"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { TestimonialPreview } from "./data";
import { TestimonialCard } from "./testimonial-card";

type TestimonialCarouselProps = {
  items: TestimonialPreview[];
  className?: string;
};

/**
 * Accessible testimonials carousel with swipe, keyboard, and dots.
 */
export function TestimonialCarousel({
  items,
  className,
}: TestimonialCarouselProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const count = items.length;

  function goTo(next: number, dir: number) {
    setDirection(dir);
    setIndex(((next % count) + count) % count);
  }

  function next() {
    goTo(index + 1, 1);
  }

  function prev() {
    goTo(index - 1, -1);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDirection(1);
        setIndex((current) => (current + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDirection(-1);
        setIndex((current) => (current - 1 + count) % count);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  function onDragEnd(_: unknown, info: PanInfo) {
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    if (info.offset.x > threshold) prev();
  }

  const active = items[index];

  const variants = {
    enter: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : { x: dir > 0 ? 56 : -56, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: (dir: number) =>
      prefersReducedMotion
        ? { opacity: 0 }
        : { x: dir > 0 ? -56 : 56, opacity: 0 },
  };

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
    >
      <div className="relative mx-auto max-w-3xl overflow-hidden px-2 sm:px-4">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          {active ? (
            <motion.div
              key={active.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: prefersReducedMotion ? 0 : duration.normal,
                ease: easing.emphasized,
              }}
              drag={prefersReducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={onDragEnd}
              className="cursor-grab active:cursor-grabbing"
            >
              <TestimonialCard testimonial={active} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Previous testimonial"
          onClick={prev}
        >
          <ChevronLeftIcon />
        </Button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
          {items.map((item, itemIndex) => {
            const selected = itemIndex === index;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`Show testimonial ${itemIndex + 1} of ${count}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  selected
                    ? "w-7 bg-accent"
                    : "w-2 bg-border hover:bg-text-secondary/40",
                )}
                onClick={() =>
                  goTo(itemIndex, itemIndex > index ? 1 : -1)
                }
              />
            );
          })}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Next testimonial"
          onClick={next}
        >
          <ChevronRightIcon />
        </Button>
      </div>

      <p className="sr-only" aria-live="polite">
        Testimonial {index + 1} of {count}: {active?.name}
      </p>
    </div>
  );
}
