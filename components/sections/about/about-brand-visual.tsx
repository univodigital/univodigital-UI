"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type AboutBrandVisualProps = {
  className?: string;
};

type Node = { id: number; x: number; y: number; logoX: number; logoY: number };

/** Univo icon geometry — viewBox 0 0 100 100 (centered inside frame). */
const ICON = {
  dot: { cx: 38, cy: 25.7, r: 2.4 },
  /** Main i–u–n mark (stroke drawn with round caps in render). */
  mainPath:
    "M 36 31.5 V 51 C 36 56.9 48 56.9 48 51 V 33.5 C 48 25.4 64 25.4 64 33.5 V 51",
  /** Bottom-right accent arc. */
  accentPath: "M 43.3 60.7 C 43.3 72 67.5 72 67.5 60.9",
} as const;

/**
 * Deterministic pseudo-random for SSR-stable scatter positions.
 */
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function sampleArc(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  startAngle: number,
  endAngle: number,
  count: number,
) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const angle = startAngle + (endAngle - startAngle) * t;
    return { x: cx + Math.cos(angle) * rx, y: cy + Math.sin(angle) * ry };
  });
}

function sampleLine(x1: number, y1: number, x2: number, y2: number, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    return { x: x1 + (x2 - x1) * t, y: y1 + (y2 - y1) * t };
  });
}

/**
 * Target points tracing the Univo icon — dot, main mark, and accent arc.
 */
function buildIconTargets(): { x: number; y: number }[] {
  const { dot } = ICON;
  const targets: { x: number; y: number }[] = [];

  // Dot ring
  targets.push(
    ...sampleArc(dot.cx, dot.cy, dot.r, dot.r, 0, Math.PI * 2, 8),
  );

  // Left stem
  targets.push(...sampleLine(36, 31.5, 36, 51, 10));

  // Bottom U curve
  targets.push(...sampleArc(42, 51, 5.9, 5.9, Math.PI, 0, 14));

  // Middle stem (up)
  targets.push(...sampleLine(48, 51, 48, 33.5, 8));

  // Top n curve
  targets.push(...sampleArc(56, 33.5, 8.1, 8.1, 0, Math.PI, 14));

  // Right stem (down)
  targets.push(...sampleLine(64, 33.5, 64, 51, 6));

  // Bottom accent arc
  targets.push(...sampleArc(55.4, 66.35, 12.1, 5.65, Math.PI, 0, 8));

  return targets;
}

function buildNodes(count: number): Node[] {
  const targets = buildIconTargets();

  return Array.from({ length: count }, (_, i) => {
    const target = targets[i % targets.length];
    const jitter = (seeded(i + 3) - 0.5) * 1.2;

    return {
      id: i,
      x: seeded(i + 1) * 100,
      y: seeded(i + 41) * 100,
      logoX: target.x + jitter,
      logoY: target.y + jitter,
    };
  });
}

function nearestEdges(nodes: Node[], maxDist: number) {
  const edges: { a: number; b: number }[] = [];

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const dx = nodes[i].logoX - nodes[j].logoX;
      const dy = nodes[i].logoY - nodes[j].logoY;
      if (Math.hypot(dx, dy) < maxDist) {
        edges.push({ a: i, b: j });
      }
    }
  }

  return edges;
}

/**
 * Full-bleed brand moment — particles form the Univo icon inside a glowing frame.
 */
export function AboutBrandVisual({ className }: AboutBrandVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  const nodes = useMemo(() => buildNodes(68), []);
  const edges = useMemo(() => nearestEdges(nodes, 12), [nodes]);

  const loopTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        duration: 8,
        times: [0, 0.35, 0.65, 1] as number[],
        ease: "easeInOut" as const,
        repeat: Infinity,
        repeatDelay: 0.8,
      };

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden py-24 md:py-32 lg:py-40",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 60% at 50% 50%, color-mix(in oklab, var(--uds-color-accent) 14%, transparent), transparent 68%)",
        }}
      />

      <div className="relative mx-auto aspect-[16/9] w-full max-w-5xl px-4 sm:px-6">
        <svg viewBox="0 0 100 100" className="h-full w-full" role="presentation">
          <defs>
            <filter id="univo-frame-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="univo-frame-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--uds-color-surface) 90%, black)" />
              <stop offset="100%" stopColor="color-mix(in oklab, var(--uds-color-background) 95%, black)" />
            </linearGradient>
          </defs>

          {/* Bottom accent line */}
          <motion.line
            x1={8}
            y1={92}
            x2={92}
            y2={92}
            stroke="var(--uds-color-accent)"
            strokeWidth={0.35}
            initial={{ opacity: 0, pathLength: 0 }}
            animate={
              isInView
                ? { opacity: 0.85, pathLength: 1 }
                : { opacity: 0, pathLength: 0 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 1.2, ease: "easeOut", delay: 0.2 }
            }
          />

          {/* Icon frame — rounded square with glow */}
          <motion.rect
            x={22}
            y={12}
            width={56}
            height={68}
            rx={8}
            fill="url(#univo-frame-fill)"
            stroke="var(--uds-color-accent)"
            strokeWidth={0.45}
            filter="url(#univo-frame-glow)"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.96 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeOut" }
            }
            style={{ transformOrigin: "50px 46px" }}
          />

          {/* Icon mark — draws in as particles converge */}
          <g transform="translate(0, 2)">
            <motion.circle
              cx={ICON.dot.cx}
              cy={ICON.dot.cy}
              r={ICON.dot.r}
              fill="var(--uds-color-text-primary)"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? prefersReducedMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: [0, 1, 1, 0], scale: [0.5, 1, 1, 0.5] }
                  : { opacity: 0, scale: 0 }
              }
              transition={loopTransition}
            />

            <motion.path
              d={ICON.mainPath}
              fill="none"
              stroke="var(--uds-color-text-primary)"
              strokeWidth={4.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? prefersReducedMotion
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={loopTransition}
            />

            <motion.path
              d={ICON.accentPath}
              fill="none"
              stroke="var(--uds-color-accent)"
              strokeWidth={4.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                isInView
                  ? prefersReducedMotion
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { ...loopTransition, delay: 0.15 }
              }
            />
          </g>

          {/* Particle connections */}
          {edges.map((edge) => {
            const a = nodes[edge.a];
            const b = nodes[edge.b];

            return (
              <motion.line
                key={`${edge.a}-${edge.b}`}
                stroke="var(--uds-color-accent)"
                strokeWidth={0.12}
                initial={
                  prefersReducedMotion
                    ? {
                        x1: a.logoX,
                        y1: a.logoY,
                        x2: b.logoX,
                        y2: b.logoY,
                        opacity: 0.3,
                      }
                    : { x1: a.x, y1: a.y, x2: b.x, y2: b.y, opacity: 0 }
                }
                animate={
                  isInView && !prefersReducedMotion
                    ? {
                        x1: [a.x, a.logoX, a.logoX, a.x],
                        y1: [a.y, a.logoY, a.logoY, a.y],
                        x2: [b.x, b.logoX, b.logoX, b.x],
                        y2: [b.y, b.logoY, b.logoY, b.y],
                        opacity: [0, 0.4, 0.4, 0],
                      }
                    : isInView
                      ? {
                          x1: a.logoX,
                          y1: a.logoY,
                          x2: b.logoX,
                          y2: b.logoY,
                          opacity: 0.3,
                        }
                      : undefined
                }
                transition={loopTransition}
              />
            );
          })}

          {/* Particles */}
          {nodes.map((node, index) => (
            <motion.circle
              key={node.id}
              r={0.5}
              fill="var(--uds-color-accent)"
              initial={
                prefersReducedMotion
                  ? { cx: node.logoX, cy: node.logoY, opacity: 0.75 }
                  : { cx: node.x, cy: node.y, opacity: 0.2 }
              }
              animate={
                isInView && !prefersReducedMotion
                  ? {
                      cx: [node.x, node.logoX, node.logoX, node.x],
                      cy: [node.y, node.logoY, node.logoY, node.y],
                      opacity: [0.15, 0.9, 0.9, 0.15],
                    }
                  : isInView
                    ? { cx: node.logoX, cy: node.logoY, opacity: 0.8 }
                    : undefined
              }
              transition={{
                ...loopTransition,
                delay: prefersReducedMotion ? 0 : (index % 12) * 0.02,
              }}
              style={{
                filter:
                  "drop-shadow(0 0 2px color-mix(in oklab, var(--uds-color-accent) 80%, transparent))",
              }}
            />
          ))}
        </svg>
      </div>
    </section>
  );
}
