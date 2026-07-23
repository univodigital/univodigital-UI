import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type IllustrationProps = {
  className?: string;
};

/**
 * Branding — browser frame + bezier path + designer cursor (reference-inspired).
 */
export function BrandingIllustration({ className }: IllustrationProps) {
  return (
    <div
      className={cn("relative mx-auto aspect-[16/10] w-full max-w-md", className)}
      aria-hidden
    >
      {/* Browser chrome */}
      <div className="absolute inset-x-[8%] top-[8%] bottom-[18%] overflow-hidden rounded-xl border border-border bg-card shadow-md">
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/80 px-3 py-2">
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="size-2 rounded-full bg-border-strong" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-border/80" />
        </div>
        <div className="relative h-[calc(100%-2rem)] bg-surface p-3">
          <div className="relative h-full overflow-hidden rounded-lg bg-gradient-to-br from-accent/15 via-muted to-primary/10">
            {/* Selection marquee */}
            <div className="absolute top-[18%] left-[12%] h-[48%] w-[42%] rounded-md border border-dashed border-accent/70 bg-accent/5" />
            {/* Image placeholder blocks */}
            <div className="absolute top-[22%] left-[16%] size-8 rounded bg-accent/25" />
            <div className="absolute right-[18%] bottom-[22%] h-10 w-16 rounded-md bg-primary/15" />
          </div>
        </div>
      </div>

      {/* Floating brand mark */}
      <div className="absolute top-[22%] right-[4%] flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor">
          <path d="M12 2 3.5 6.5v11L12 22l8.5-4.5v-11L12 2Zm0 2.2 6.3 3.35v1.9L12 13.2 5.7 9.45v-1.9L12 4.2Zm-6.3 6.4 5.5 3.1v5.55l-5.5-2.9V10.6Zm7.1 8.65V13.7l5.5-3.1v5.75l-5.5 2.9Z" />
        </svg>
      </div>

      {/* Bezier path + designer cursor */}
      <svg
        className="pointer-events-none absolute inset-x-[6%] bottom-[2%] h-[28%] w-[88%]"
        viewBox="0 0 320 70"
        fill="none"
      >
        <path
          d="M20 48 C80 8, 140 8, 180 36 S260 62, 300 28"
          stroke="var(--uds-color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="48" r="4" fill="var(--uds-color-accent)" />
        <circle cx="180" cy="36" r="4" fill="var(--uds-color-accent)" />
        <circle cx="300" cy="28" r="4" fill="var(--uds-color-accent)" />
      </svg>
      <div className="absolute bottom-[6%] left-[42%] flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-md">
        <span className="size-1.5 rounded-full bg-accent" />
        Univo studio
      </div>
    </div>
  );
}

/**
 * Development — tool strip + selected stack logos.
 */
export function DevelopmentIllustration({ className }: IllustrationProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-[16/10] w-full max-w-md flex-col items-center justify-center gap-3",
        className,
      )}
      aria-hidden
    >
      <ToolStrip>
        <ToolGlyph kind="code" />
        <ToolGlyph kind="plus" />
        <ToolGlyph kind="grid" />
        <ToolGlyph kind="menu" />
        <ToolGlyph kind="braces" />
        <ToolGlyph kind="gear" />
      </ToolStrip>

      <div className="relative rounded-xl border-2 border-accent/50 bg-accent/5 px-6 py-5 shadow-sm">
        <span className="absolute -top-1 -left-1 size-2.5 rounded-sm border-2 border-accent bg-card" />
        <span className="absolute -top-1 -right-1 size-2.5 rounded-sm border-2 border-accent bg-card" />
        <span className="absolute -bottom-1 -left-1 size-2.5 rounded-sm border-2 border-accent bg-card" />
        <span className="absolute -right-1 -bottom-1 size-2.5 rounded-sm border-2 border-accent bg-card" />

        <div className="flex items-center gap-5">
          <StackMark label="Next" tone="accent" />
          <StackMark label="React" tone="primary" />
          <StackMark label="CMS" tone="muted" />
        </div>
      </div>

      <ToolStrip>
        <ToolGlyph kind="bolt" />
        <ToolGlyph kind="play" />
        <ToolGlyph kind="target" />
        <ToolGlyph kind="diamond" />
        <ToolGlyph kind="menu" />
        <ToolGlyph kind="more" />
      </ToolStrip>
    </div>
  );
}

function ToolStrip({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/60 px-3 py-2 shadow-xs">
      {children}
    </div>
  );
}

function ToolGlyph({
  kind,
}: {
  kind:
    | "code"
    | "plus"
    | "grid"
    | "menu"
    | "braces"
    | "gear"
    | "bolt"
    | "play"
    | "target"
    | "diamond"
    | "more";
}) {
  return (
    <span className="flex size-7 items-center justify-center rounded-md text-text-secondary">
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none">
        {kind === "code" ? (
          <path
            d="M6 4 2 8l4 4M10 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "plus" ? (
          <path
            d="M8 3v10M3 8h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ) : null}
        {kind === "grid" ? (
          <>
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
          </>
        ) : null}
        {kind === "menu" ? (
          <path
            d="M3 5h10M3 8h10M3 11h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ) : null}
        {kind === "braces" ? (
          <path
            d="M6 3c-1.5 0-2 1-2 2v1.5C4 7.5 3 8 3 8s1 .5 1 1.5V11c0 1 .5 2 2 2M10 3c1.5 0 2 1 2 2v1.5c0 1 1 1.5 1 1.5s-1 .5-1 1.5V11c0 1-.5 2-2 2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        ) : null}
        {kind === "gear" ? (
          <path
            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0-3 .6 1.6 1.7-.2.9 1.4-1.2 1.2.5 1.6-1.6.6-.6 1.6-1.6-.5-1.2 1.2-1.4-.9.2-1.7L3 8l1.6-.6-.2-1.7 1.4-.9L7 3.6l1.2-1.2.8.1Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "bolt" ? (
          <path
            d="M9 2 4 9h4l-1 5 5-7H8l1-5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "play" ? (
          <path
            d="M5 3.5v9l8-4.5-8-4.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "target" ? (
          <>
            <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="8" cy="8" r="2" fill="currentColor" />
          </>
        ) : null}
        {kind === "diamond" ? (
          <path
            d="M8 2.5 13.5 8 8 13.5 2.5 8 8 2.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        ) : null}
        {kind === "more" ? (
          <>
            <circle cx="3.5" cy="8" r="1.2" fill="currentColor" />
            <circle cx="8" cy="8" r="1.2" fill="currentColor" />
            <circle cx="12.5" cy="8" r="1.2" fill="currentColor" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

function StackMark({
  label,
  tone,
}: {
  label: string;
  tone: "accent" | "primary" | "muted";
}) {
  const tones = {
    accent: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
    muted: "bg-muted text-text-primary ring-1 ring-border",
  } as const;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl text-xs font-bold tracking-tight shadow-sm",
          tones[tone],
        )}
      >
        {label.slice(0, 2)}
      </div>
      <span className="text-[10px] font-medium text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * Social — engagement dashboard with reach / growth gauges.
 */
export function SocialIllustration({ className }: IllustrationProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[16/10] w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-md",
        className,
      )}
      aria-hidden
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-semibold tracking-wide text-text-primary uppercase">
          This week
        </span>
        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          On track
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Gauge value={94} label="Saves" />
        <Gauge value={87} label="Shares" />
        <Gauge value={99} label="Tone match" />
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between text-[10px] font-medium text-text-secondary">
          <span>Audience lift</span>
          <span className="text-success">+18%</span>
        </div>
        <div className="flex h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="w-[72%] rounded-full bg-gradient-to-r from-accent to-success" />
        </div>
      </div>
    </div>
  );
}

function Gauge({ value, label }: { value: number; label: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 72 72" className="size-16">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="var(--uds-color-muted)"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="var(--uds-color-success)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 36 36)"
        />
        <text
          x="36"
          y="40"
          textAnchor="middle"
          fill="var(--uds-color-text-primary)"
          style={{ fontSize: 12, fontWeight: 700 }}
        >
          {value}%
        </text>
      </svg>
      <span className="text-[10px] font-medium text-text-secondary">{label}</span>
    </div>
  );
}

/**
 * Performance — stacked monitoring rows with one highlighted item.
 */
export function PerformanceIllustration({ className }: IllustrationProps) {
  const rows = [
    { label: "Search health review", active: false },
    { label: "Ad spend reallocation", active: false },
    { label: "Funnel checkpoint this week", active: true },
    { label: "Landing page experiment", active: false },
    { label: "Monthly growth readout", active: false },
  ] as const;

  return (
    <div
      className={cn(
        "relative mx-auto flex aspect-[16/10] w-full max-w-sm flex-col justify-center gap-2",
        className,
      )}
      aria-hidden
    >
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-opacity",
            row.active
              ? "bg-muted shadow-sm ring-1 ring-border"
              : "bg-transparent opacity-45",
            index === 0 || index === rows.length - 1 ? "scale-[0.96]" : "",
          )}
        >
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg",
              row.active
                ? "bg-success/15 text-success"
                : "bg-muted text-text-secondary",
            )}
          >
            {row.active ? (
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 21h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <span className="size-2 rounded-full bg-current opacity-40" />
            )}
          </span>
          <span
            className={cn(
              "text-sm",
              row.active
                ? "font-semibold text-text-primary"
                : "font-medium text-text-secondary",
            )}
          >
            {row.label}
          </span>
        </div>
      ))}
    </div>
  );
}
