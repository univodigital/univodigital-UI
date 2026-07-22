"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type HeroBackgroundProps = {
  className?: string;
};

/**
 * Ambient hero atmosphere — soft gradients + grid (design tokens only).
 */
export function HeroBackground({ className }: HeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Base surface */}
      <div className="absolute inset-0 bg-background" />

      {/* Soft accent wash */}
      <div
        className="absolute -top-32 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 28%, transparent), transparent 70%)",
        }}
      />

      {/* Secondary depth orb */}
      <motion.div
        className="absolute top-[35%] -right-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-primary) 18%, transparent), transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -18, 0], x: [0, -10, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* Left ambient */}
      <div
        className="absolute bottom-0 left-[-10%] h-[22rem] w-[22rem] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 20%, transparent), transparent 70%)",
        }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--uds-color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--uds-color-border) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 75%)",
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, color-mix(in oklab, var(--uds-color-background) 75%, transparent) 100%)",
        }}
      />

      {/* Bottom fade into page */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />

      {/* Subtle moving highlight line */}
      {!prefersReducedMotion ? (
        <motion.div
          className="absolute top-0 left-0 h-px w-1/3 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--uds-color-accent), transparent)",
          }}
          animate={{ x: ["-20%", "120%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: easing.linear,
            repeatDelay: 2,
          }}
        />
      ) : null}
    </div>
  );
}
