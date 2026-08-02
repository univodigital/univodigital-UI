"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type AboutHeroBackgroundProps = {
  className?: string;
  /** Spotlight position as percentages (0–100) */
  spotlightX?: number;
  spotlightY?: number;
};

/**
 * About hero atmosphere — grid, glow, particles.
 * Mouse spotlight is driven by the parent section.
 */
export function AboutHeroBackground({
  className,
  spotlightX = 50,
  spotlightY = 40,
}: AboutHeroBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-background" />

      <div
        className="absolute -top-40 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 32%, transparent), transparent 68%)",
        }}
      />

      <motion.div
        className="absolute top-[30%] -right-20 h-[26rem] w-[26rem] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 24%, transparent), transparent 70%)",
        }}
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -20, 0], x: [0, -14, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div
        className="absolute bottom-[-10%] left-[-8%] h-[20rem] w-[20rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 18%, transparent), transparent 70%)",
        }}
      />

      {!prefersReducedMotion ? (
        <div
          className="absolute inset-0 opacity-80 transition-[background] duration-300 ease-out"
          style={{
            background: `radial-gradient(28rem circle at ${spotlightX}% ${spotlightY}%, color-mix(in oklab, var(--uds-color-accent) 22%, transparent), transparent 70%)`,
          }}
        />
      ) : null}

      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--uds-color-border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--uds-color-border) 1px, transparent 1px)
          `,
          backgroundSize: "4rem 4rem",
          maskImage:
            "radial-gradient(ellipse 85% 65% at 50% 35%, black 15%, transparent 75%)",
        }}
      />

      {!prefersReducedMotion
        ? PARTICLES.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-accent"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                opacity: particle.opacity,
                boxShadow:
                  "0 0 12px color-mix(in oklab, var(--uds-color-accent) 55%, transparent)",
              }}
              animate={{
                y: [0, particle.drift, 0],
                opacity: [
                  particle.opacity * 0.5,
                  particle.opacity,
                  particle.opacity * 0.5,
                ],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))
        : null}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, color-mix(in oklab, var(--uds-color-background) 80%, transparent) 100%)",
        }}
      />

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

      {!prefersReducedMotion ? (
        <motion.div
          className="absolute top-0 left-0 h-px w-1/3 opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--uds-color-accent), transparent)",
          }}
          animate={{ x: ["-20%", "130%"] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: easing.linear,
            repeatDelay: 2,
          }}
        />
      ) : null}
    </div>
  );
}

const PARTICLES = [
  { id: 1, left: "12%", top: "22%", size: 3, opacity: 0.55, drift: -18, duration: 7, delay: 0 },
  { id: 2, left: "22%", top: "58%", size: 2, opacity: 0.4, drift: -12, duration: 9, delay: 1.2 },
  { id: 3, left: "48%", top: "18%", size: 2.5, opacity: 0.5, drift: -22, duration: 8, delay: 0.4 },
  { id: 4, left: "68%", top: "42%", size: 3, opacity: 0.45, drift: -16, duration: 10, delay: 2 },
  { id: 5, left: "78%", top: "28%", size: 2, opacity: 0.35, drift: -14, duration: 7.5, delay: 0.8 },
  { id: 6, left: "86%", top: "62%", size: 2.5, opacity: 0.5, drift: -20, duration: 11, delay: 1.6 },
  { id: 7, left: "35%", top: "72%", size: 2, opacity: 0.3, drift: -10, duration: 8.5, delay: 2.4 },
  { id: 8, left: "58%", top: "78%", size: 3, opacity: 0.4, drift: -15, duration: 9.5, delay: 0.6 },
] as const;
