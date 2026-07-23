"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { KeyboardEvent } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import {
  panelWash,
  SERVICE_PANEL_STYLES,
  type InteractiveService,
} from "./data";

const MORPH = {
  duration: 0.7,
  ease: easing.standard,
} as const;

const FLEX_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const FLEX_MS = 700;

/** Inset of the expanded image frame (px) */
const FRAME_INSET = 20;
const FRAME_RADIUS = 28;

type InteractiveServiceCardProps = {
  service: InteractiveService;
  index: number;
  active: boolean;
  interactive: boolean;
  onActivate: (index: number) => void;
  className?: string;
};

/**
 * Service card interaction:
 * Collapsed — full-bleed photo + soft color fog from the top.
 * Expanded — solid color card + inset rounded image frame on the right.
 */
export function InteractiveServiceCard({
  service,
  index,
  active,
  interactive,
  onActivate,
  className,
}: InteractiveServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const expanded = !interactive || active;
  const motionOff = prefersReducedMotion;
  const panel = SERVICE_PANEL_STYLES[service.panel];
  const transition = motionOff
    ? { duration: 0 }
    : { duration: MORPH.duration, ease: MORPH.ease };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate(index);
    }
  };

  return (
    <article
      data-active={active ? "true" : "false"}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `${service.title} service${active ? ", expanded" : ", collapsed"}`
          : `${service.title} service`
      }
      onMouseEnter={() => {
        if (interactive) onActivate(index);
      }}
      onFocus={() => {
        if (interactive) onActivate(index);
      }}
      onKeyDown={handleKeyDown}
      className={cn(
        "group/service relative isolate min-h-[26rem] overflow-hidden rounded-[1.75rem] outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        interactive &&
          "lg:min-h-[32rem] lg:basis-0 lg:transition-[flex-grow,box-shadow] lg:duration-700",
        interactive && active && "z-[1] shadow-xl",
        interactive && !active && "shadow-md",
        !interactive && "flex flex-col shadow-lg",
        className,
      )}
      style={
        interactive
          ? {
              flexGrow: active ? 2.2 : 1,
              flexShrink: 1,
              transitionTimingFunction: FLEX_EASE,
              transitionDuration: `${FLEX_MS}ms`,
            }
          : undefined
      }
    >
      {!interactive ? (
        <MobileExpandedCard service={service} panel={panel} index={index} />
      ) : (
        <>
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: panel.background }}
            initial={false}
            animate={{ opacity: expanded ? 1 : 0 }}
            transition={transition}
            aria-hidden
          />

          <motion.div
            className="absolute z-[1] overflow-hidden"
            style={{ backgroundColor: panel.frame }}
            initial={false}
            animate={
              expanded
                ? {
                    top: FRAME_INSET,
                    right: FRAME_INSET,
                    bottom: FRAME_INSET,
                    left: "50%",
                    borderRadius: FRAME_RADIUS,
                  }
                : {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: "0%",
                    borderRadius: 0,
                  }
            }
            transition={transition}
            aria-hidden
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                motionOff
                  ? { scale: 1, x: 0 }
                  : expanded
                    ? { scale: 1.03, x: 24 }
                    : { scale: 1.06, x: 0 }
              }
              transition={transition}
            >
              <Image
                src={service.imageSrc}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/20"
              initial={false}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={transition}
            />
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-[62%]"
            style={{ background: panelWash(panel.background) }}
            initial={false}
            animate={{ opacity: expanded ? 0 : 1 }}
            transition={transition}
            aria-hidden
          >
            <div
              className="absolute inset-0 [mask-image:linear-gradient(180deg,black_28%,transparent_100%)]"
              style={{
                backdropFilter: motionOff ? undefined : "blur(12px)",
                WebkitBackdropFilter: motionOff ? undefined : "blur(12px)",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute z-10 flex flex-col"
            initial={false}
            animate={
              expanded
                ? {
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100%",
                    paddingTop: 32,
                    paddingBottom: 32,
                    paddingLeft: 32,
                    paddingRight: 24,
                  }
                : {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "46%",
                    paddingTop: 28,
                    paddingBottom: 16,
                    paddingLeft: 28,
                    paddingRight: 28,
                  }
            }
            transition={transition}
          >
            <h3 className="font-heading text-[1.65rem] leading-[1.12] font-semibold tracking-tight text-white xl:text-[2rem]">
              {service.title}
              {service.subtitle ? (
                <>
                  <br />
                  {service.subtitle}
                </>
              ) : null}
            </h3>

            <AnimatePresence initial={false}>
              {expanded ? (
                <motion.div
                  key={`${service.id}-details`}
                  className="mt-5 flex min-h-0 flex-1 flex-col"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.p
                    className="max-w-sm text-[0.95rem] leading-relaxed text-pretty text-white/90"
                    variants={revealVariants(motionOff, {
                      y: 20,
                      delayIn: 0.16,
                      delayOut: 0.1,
                    })}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {service.description}
                  </motion.p>

                  <ul
                    className="mt-6 flex flex-col gap-3"
                    aria-label="Highlights"
                  >
                    {service.bullets.map((bullet, bulletIndex) => (
                      <motion.li
                        key={bullet}
                        className="flex items-center gap-3 text-sm font-medium text-white"
                        variants={revealVariants(motionOff, {
                          y: 16,
                          delayIn: 0.24 + bulletIndex * 0.08,
                          delayOut:
                            (service.bullets.length - 1 - bulletIndex) * 0.04,
                        })}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <span
                          className="inline-flex size-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: panel.checkBg }}
                          aria-hidden
                        >
                          <CheckIcon
                            className="size-3 stroke-[3]"
                            style={{ color: panel.checkFg }}
                          />
                        </span>
                        <span>{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="mt-auto pt-8"
                    variants={revealVariants(motionOff, {
                      y: 20,
                      scale: 0.96,
                      delayIn: 0.42,
                      delayOut: 0,
                    })}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={service.href}
                      className={cn(
                        "inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-semibold",
                        "outline-none transition-[filter,transform] hover:brightness-105",
                        "focus-visible:ring-3 focus-visible:ring-white/50 active:translate-y-px",
                      )}
                      style={{
                        backgroundColor: panel.cta,
                        color: panel.ctaFg,
                      }}
                    >
                      {service.ctaLabel}
                      <ArrowUpRightIcon className="size-4" aria-hidden />
                    </Link>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </article>
  );
}

function MobileExpandedCard({
  service,
  panel,
  index,
}: {
  service: InteractiveService;
  panel: (typeof SERVICE_PANEL_STYLES)[keyof typeof SERVICE_PANEL_STYLES];
  index: number;
}) {
  return (
    <div
      className="flex flex-1 flex-col gap-5 p-6 md:p-8"
      style={{ backgroundColor: panel.background }}
    >
      <div>
        <h3 className="font-heading text-2xl leading-tight font-semibold tracking-tight text-white md:text-3xl">
          {service.title}
          {service.subtitle ? (
            <>
              <br />
              {service.subtitle}
            </>
          ) : null}
        </h3>
        <p className="mt-4 text-body text-pretty text-white/90">
          {service.description}
        </p>
        <ul className="mt-5 flex flex-col gap-3" aria-label="Highlights">
          {service.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-3 text-sm font-medium text-white"
            >
              <span
                className="inline-flex size-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: panel.checkBg }}
                aria-hidden
              >
                <CheckIcon
                  className="size-3 stroke-[3]"
                  style={{ color: panel.checkFg }}
                />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <Link
          href={service.href}
          className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full px-6 text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-white/50"
          style={{ backgroundColor: panel.cta, color: panel.ctaFg }}
        >
          {service.ctaLabel}
          <ArrowUpRightIcon className="size-4" aria-hidden />
        </Link>
      </div>

      <div
        className="relative mt-2 min-h-56 flex-1 overflow-hidden rounded-[1.5rem] ring-1 ring-inset ring-black/20 md:min-h-64"
        style={{ backgroundColor: panel.frame }}
      >
        <Image
          src={service.imageSrc}
          alt={service.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          priority={index === 0}
        />
      </div>
    </div>
  );
}

function revealVariants(
  motionOff: boolean,
  opts: {
    y: number;
    delayIn: number;
    delayOut: number;
    scale?: number;
  },
) {
  const scaleFrom = opts.scale ?? 1;
  return {
    hidden: motionOff
      ? { opacity: 0 }
      : { opacity: 0, y: opts.y, scale: scaleFrom },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: motionOff ? 0 : 0.35,
        delay: motionOff ? 0 : opts.delayIn,
        ease: easing.standard,
      },
    },
    exit: {
      opacity: 0,
      y: motionOff ? 0 : opts.y * 0.4,
      scale: motionOff ? 1 : Math.min(1, scaleFrom + 0.02),
      transition: {
        duration: motionOff ? 0 : 0.2,
        delay: motionOff ? 0 : opts.delayOut,
        ease: easing.exit,
      },
    },
  };
}
