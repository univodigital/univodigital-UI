"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { BRAND } from "@/constants/site";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { STORY_STAGES } from "./data";

type AboutStoryInfographicProps = {
  className?: string;
};

/**
 * Vertical growth funnel — Idea → Strategy → Execution → Growth → logo.
 */
export function AboutStoryInfographic({
  className,
}: AboutStoryInfographicProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col items-center",
        className,
      )}
    >
      {STORY_STAGES.map((stage, index) => {
        const Icon = stage.icon;
        const delay = prefersReducedMotion ? 0 : 0.12 + index * 0.18;

        return (
          <div key={stage.id} className="flex w-full flex-col items-center">
            <motion.div
              className="group/stage relative flex w-full items-center gap-4 rounded-2xl border border-border/70 bg-surface/60 px-4 py-3.5 backdrop-blur-sm ring-1 ring-border/40"
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, x: 24, filter: "blur(6px)" }
              }
              animate={
                isInView
                  ? { opacity: 1, x: 0, filter: "blur(0px)" }
                  : undefined
              }
              transition={{
                duration: prefersReducedMotion ? 0 : duration.slow,
                ease: easing.emphasized,
                delay,
              }}
            >
              <span
                aria-hidden
                className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-[var(--uds-duration-normal)] group-hover/stage:opacity-100"
                style={{
                  boxShadow:
                    "0 0 0 1px color-mix(in oklab, var(--uds-color-accent) 35%, transparent), 0 0 28px color-mix(in oklab, var(--uds-color-accent) 18%, transparent)",
                }}
              />

              <span className="relative inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>

              <span className="relative font-heading text-base font-semibold tracking-tight text-text-primary md:text-lg">
                {stage.label}
              </span>
            </motion.div>

            {/* Animated connector */}
            <div
              aria-hidden
              className="relative my-1 flex h-10 w-px items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-border" />
              <motion.div
                className="absolute top-0 left-0 h-full w-px origin-top bg-accent"
                initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : undefined}
                transition={{
                  duration: prefersReducedMotion ? 0 : duration.slow,
                  ease: easing.emphasized,
                  delay: delay + 0.12,
                }}
              />
              {!prefersReducedMotion ? (
                <motion.span
                  className="absolute size-1.5 rounded-full bg-accent"
                  style={{
                    boxShadow:
                      "0 0 10px color-mix(in oklab, var(--uds-color-accent) 70%, transparent)",
                  }}
                  initial={{ top: "0%", opacity: 0 }}
                  animate={
                    isInView
                      ? { top: ["0%", "100%"], opacity: [0, 1, 0] }
                      : undefined
                  }
                  transition={{
                    duration: 1.4,
                    ease: easing.standard,
                    delay: delay + 0.2,
                    repeat: Infinity,
                    repeatDelay: 2.2,
                  }}
                />
              ) : null}
            </div>
          </div>
        );
      })}

      {/* Logo merge */}
      <motion.div
        className="relative mt-1 flex size-20 items-center justify-center rounded-2xl border border-accent/30 bg-surface/70 ring-1 ring-accent/20 backdrop-blur-sm"
        initial={
          prefersReducedMotion
            ? false
            : { opacity: 0, scale: 0.85, filter: "blur(8px)" }
        }
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: "blur(0px)" }
            : undefined
        }
        transition={{
          duration: prefersReducedMotion ? 0 : duration.slower,
          ease: easing.emphasized,
          delay: prefersReducedMotion ? 0 : 0.95,
        }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-2xl"
          style={{
            boxShadow:
              "0 0 40px color-mix(in oklab, var(--uds-color-accent) 35%, transparent)",
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.35, 0.75, 0.35] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <Image
          src={BRAND.icon}
          alt=""
          width={40}
          height={56}
          className="relative h-12 w-auto brightness-0 invert"
          aria-hidden
        />
      </motion.div>
    </div>
  );
}
