"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ServiceCtaBackgroundProps = {
  className?: string;
};

/**
 * Service CTA atmosphere — animated glow and particles.
 */
export function ServiceCtaBackground({ className }: ServiceCtaBackgroundProps) {
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
        className="absolute top-1/2 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 42%, transparent), transparent 68%)",
        }}
      />

      <motion.div
        className="absolute -top-20 right-[-6%] h-[22rem] w-[22rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 28%, transparent), transparent 70%)",
        }}
        animate={
          prefersReducedMotion ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 15, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-text-primary) 45%, transparent) 1px, transparent 1px)",
          backgroundSize: "1.5rem 1.5rem",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 50%, black 12%, transparent 75%)",
        }}
      />

      {!prefersReducedMotion
        ? CTA_PARTICLES.map((p) => (
            <motion.span
              key={p.id}
              className="absolute rounded-full bg-accent"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                boxShadow:
                  "0 0 10px color-mix(in oklab, var(--uds-color-accent) 55%, transparent)",
              }}
              animate={{
                y: [0, p.drift, 0],
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))
        : null}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, color-mix(in oklab, var(--uds-color-background) 85%, transparent) 100%)",
        }}
      />

      {!prefersReducedMotion ? (
        <motion.div
          className="absolute top-0 left-0 h-px w-2/5 opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--uds-color-accent), transparent)",
          }}
          animate={{ x: ["-30%", "160%"] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: easing.linear,
            repeatDelay: 2,
          }}
        />
      ) : null}
    </div>
  );
}

const CTA_PARTICLES = [
  { id: 1, left: "18%", top: "30%", size: 2.5, drift: -14, duration: 8, delay: 0 },
  { id: 2, left: "72%", top: "28%", size: 2, drift: -18, duration: 9, delay: 1 },
  { id: 3, left: "40%", top: "68%", size: 3, drift: -12, duration: 7, delay: 0.5 },
  { id: 4, left: "82%", top: "62%", size: 2, drift: -16, duration: 10, delay: 1.8 },
  { id: 5, left: "28%", top: "72%", size: 2.5, drift: -10, duration: 8.5, delay: 2.2 },
] as const;
