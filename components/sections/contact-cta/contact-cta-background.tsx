"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ContactCtaBackgroundProps = {
  className?: string;
};

/**
 * Premium CTA atmosphere — deep primary field, accent wash, geometric grid.
 */
export function ContactCtaBackground({ className }: ContactCtaBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      {/* Deep primary field */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--uds-color-primary)" }}
      />

      {/* Accent radial wash — center energy */}
      <div
        className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 45%, transparent), transparent 68%)",
        }}
      />

      {/* Soft secondary orb */}
      <motion.div
        className="absolute -top-24 right-[-8%] h-[22rem] w-[22rem] rounded-full opacity-35 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 30%, transparent), transparent 70%)",
        }}
        animate={
          prefersReducedMotion ? undefined : { y: [0, 16, 0], x: [0, -12, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 16, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-primary-foreground) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "1.5rem 1.5rem",
          maskImage:
            "radial-gradient(ellipse 70% 65% at 50% 50%, black 15%, transparent 75%)",
        }}
      />

      {/* Fine diagonal hatch for texture */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -32deg,
            transparent,
            transparent 11px,
            color-mix(in oklab, var(--uds-color-primary-foreground) 40%, transparent) 11px,
            color-mix(in oklab, var(--uds-color-primary-foreground) 40%, transparent) 12px
          )`,
        }}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, color-mix(in oklab, var(--uds-color-primary) 85%, black) 100%)",
        }}
      />

      {/* Subtle sweeping highlight */}
      {!prefersReducedMotion ? (
        <motion.div
          className="absolute top-0 left-0 h-px w-2/5 opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--uds-color-accent), transparent)",
          }}
          animate={{ x: ["-30%", "160%"] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: easing.linear,
            repeatDelay: 2.5,
          }}
        />
      ) : null}
    </div>
  );
}
