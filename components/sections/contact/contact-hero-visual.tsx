"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactHeroVisualProps = {
  className?: string;
};

/**
 * Abstract contact hero illustration — floating shapes in brand language.
 */
export function ContactHeroVisual({ className }: ContactHeroVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-md lg:max-w-none",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-6 rounded-[2rem] opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex h-full items-center justify-center rounded-[2rem] border border-border/60 bg-card p-8 shadow-lg ring-1 ring-border/40">
        <motion.div
          className="absolute top-10 right-10 size-20 rounded-2xl bg-accent/15 ring-1 ring-accent/25"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -10, 0], rotate: [0, 4, 0] }
          }
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-14 left-8 size-14 rounded-full bg-accent/10 ring-1 ring-accent/20"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, 8, 0], scale: [1, 1.06, 1] }
          }
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />

        <div className="relative flex flex-col items-center gap-6">
          <motion.div
            className="size-28 rounded-full border-2 border-dashed border-accent/35"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          />

          <div className="flex gap-3">
            {[0.35, 0.55, 0.75].map((opacity, index) => (
              <motion.span
                key={opacity}
                className="size-3 rounded-full bg-accent"
                style={{ opacity }}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0], opacity: [opacity, opacity + 0.2, opacity] }
                }
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.25,
                }}
              />
            ))}
          </div>

          <motion.div
            className="h-px w-32 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
            animate={
              prefersReducedMotion
                ? undefined
                : { scaleX: [0.7, 1, 0.7], opacity: [0.5, 1, 0.5] }
            }
            transition={{
              duration: duration.slow,
              repeat: Infinity,
              ease: easing.standard,
            }}
          />

          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, index) => (
              <motion.span
                key={index}
                className="size-2 rounded-sm bg-border"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        backgroundColor: [
                          "color-mix(in oklab, var(--uds-color-border) 100%, transparent)",
                          "color-mix(in oklab, var(--uds-color-accent) 45%, transparent)",
                          "color-mix(in oklab, var(--uds-color-border) 100%, transparent)",
                        ],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.12,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="absolute inset-x-8 bottom-8 h-16 rounded-xl border border-border/50 bg-muted/60"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -4, 0] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <div className="flex h-full items-center gap-2 px-4">
            <span className="size-2 rounded-full bg-accent" />
            <span className="h-1.5 flex-1 rounded-full bg-border" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
