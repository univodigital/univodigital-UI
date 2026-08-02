"use client";

import { motion } from "framer-motion";

import type { ServiceVisualType } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import { cardSurfaceClassName } from "@/components/ui/card";

type ServiceHeroVisualProps = {
  type: ServiceVisualType;
  className?: string;
};

/**
 * Animated service illustrations — unique visual per service type.
 */
export function ServiceHeroVisual({ type, className }: ServiceHeroVisualProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex aspect-square w-full max-w-lg items-center justify-center lg:max-w-none",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-4 rounded-3xl opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--uds-color-accent) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {type === "branding" ? (
          <BrandingVisual prefersReducedMotion={prefersReducedMotion} />
        ) : null}
        {type === "website" ? (
          <WebsiteVisual prefersReducedMotion={prefersReducedMotion} />
        ) : null}
        {type === "social" ? (
          <SocialVisual prefersReducedMotion={prefersReducedMotion} />
        ) : null}
        {type === "performance" ? (
          <PerformanceVisual prefersReducedMotion={prefersReducedMotion} />
        ) : null}
      </div>
    </div>
  );
}

type VisualProps = {
  prefersReducedMotion: boolean;
};

function BrandingVisual({ prefersReducedMotion }: VisualProps) {
  return (
    <div className={cn(cardSurfaceClassName("glass"), "relative aspect-square p-8 shadow-lg")}>
      <motion.div
        className="absolute top-8 right-8 size-16 rounded-2xl bg-accent/20 ring-1 ring-accent/30"
        animate={
          prefersReducedMotion ? undefined : { rotate: [0, 6, 0, -6, 0], y: [0, -6, 0] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-12 left-8 size-12 rounded-full bg-accent/15 ring-1 ring-accent/25"
        animate={
          prefersReducedMotion ? undefined : { scale: [1, 1.08, 1], y: [0, 4, 0] }
        }
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <motion.div
          className="size-24 rounded-full border-2 border-dashed border-accent/40"
          animate={prefersReducedMotion ? undefined : { rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div className="flex gap-3">
          {["#0048F8", "#001028", "#6B7280"].map((color, i) => (
            <motion.div
              key={color}
              className="size-8 rounded-lg ring-1 ring-border/50"
              style={{ backgroundColor: color }}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -4, 0], scale: [1, 1.05, 1] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        <div className="w-3/4 space-y-2">
          <div className="h-2 rounded-full bg-accent/30" />
          <div className="h-2 w-2/3 rounded-full bg-border" />
          <div className="h-2 w-1/2 rounded-full bg-border/60" />
        </div>
      </div>
    </div>
  );
}

function WebsiteVisual({ prefersReducedMotion }: VisualProps) {
  return (
    <div className={cn(cardSurfaceClassName("glass"), "relative overflow-hidden shadow-lg")}>
      <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-yellow-400/80" />
        <span className="size-2.5 rounded-full bg-green-400/80" />
        <div className="ml-2 h-5 flex-1 rounded-md bg-border/40" />
      </div>
      <div className="grid grid-cols-12 gap-3 p-4">
        <motion.div
          className="col-span-3 space-y-2 rounded-lg border border-dashed border-accent/30 bg-accent/5 p-3"
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-2 rounded bg-accent/25" />
          <div className="h-2 w-3/4 rounded bg-border/60" />
          <div className="h-2 w-1/2 rounded bg-border/40" />
        </motion.div>
        <div className="col-span-9 space-y-3">
          <motion.div
            className="h-16 rounded-lg border border-border/50 bg-muted/20"
            animate={
              prefersReducedMotion ? undefined : { scale: [1, 1.01, 1] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn(cardSurfaceClassName("solid"), "aspect-[4/3] rounded-lg p-0 shadow-none ring-0")}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -3, 0], opacity: [0.7, 1, 0.7] }
                }
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialVisual({ prefersReducedMotion }: VisualProps) {
  const cards = [
    { rotate: -6, x: -20, y: 0, delay: 0 },
    { rotate: 3, x: 0, y: -10, delay: 0.3 },
    { rotate: 8, x: 24, y: 4, delay: 0.6 },
  ];

  return (
    <div className="relative aspect-square">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={cn(cardSurfaceClassName("glass"), "absolute top-1/2 left-1/2 w-44 -translate-x-1/2 -translate-y-1/2 p-4 shadow-lg")}
          style={{ rotate: card.rotate, x: card.x, y: card.y }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: [card.y, card.y - 8, card.y],
                  rotate: [card.rotate, card.rotate + 2, card.rotate],
                }
          }
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: card.delay,
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="size-6 rounded-full bg-accent/20" />
            <div className="h-2 flex-1 rounded bg-border/50" />
          </div>
          <div className="aspect-square rounded-lg bg-gradient-to-br from-accent/15 to-muted/30" />
          <div className="mt-3 flex gap-3">
            <div className="h-2 w-6 rounded bg-border/40" />
            <div className="h-2 w-6 rounded bg-border/40" />
            <div className="h-2 w-6 rounded bg-border/40" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PerformanceVisual({ prefersReducedMotion }: VisualProps) {
  const bars = [40, 65, 45, 80, 55, 90, 70];

  return (
    <div className={cn(cardSurfaceClassName("glass"), "p-6 shadow-lg")}>
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-2 w-20 rounded bg-accent/30" />
          <div className="h-2 w-12 rounded bg-border/40" />
        </div>
        <motion.div
          className="rounded-lg bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent"
          animate={
            prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          +24.8%
        </motion.div>
      </div>
      <div className="flex h-36 items-end justify-between gap-2">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t-md bg-accent/25"
            initial={{ height: prefersReducedMotion ? `${height}%` : "0%" }}
            animate={{ height: `${height}%` }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : i * 0.08,
            }}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {["Leads", "ROAS", "CPC"].map((label, i) => (
          <div
            key={label}
            className="rounded-lg border border-border/40 bg-muted/20 p-2 text-center"
          >
            <motion.div
              className="font-heading text-sm font-semibold text-text-primary"
              animate={
                prefersReducedMotion ? undefined : { opacity: [0.6, 1, 0.6] }
              }
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              {i === 0 ? "847" : i === 1 ? "4.2x" : "₹12"}
            </motion.div>
            <p className="mt-0.5 text-[10px] text-text-secondary">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
