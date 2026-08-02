"use client";

import { Fragment } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ABOUT_PROCESS } from "./data";

type AboutProcessProps = {
  className?: string;
};

type ConnectorProps = {
  orientation: "horizontal" | "vertical";
  delay?: number;
};

function ProcessLine({ orientation, delay = 0 }: ConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "relative overflow-hidden",
        isHorizontal
          ? "hidden h-px flex-1 self-center lg:block"
          : "mx-auto my-1 h-10 w-px",
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-border",
          isHorizontal ? "h-px w-full" : "h-full w-px",
        )}
      />
      <motion.div
        className={cn(
          "absolute bg-accent",
          isHorizontal
            ? "top-0 left-0 h-px w-full origin-left"
            : "top-0 left-0 h-full w-px origin-top",
        )}
        initial={
          prefersReducedMotion
            ? { scaleX: 1, scaleY: 1 }
            : isHorizontal
              ? { scaleX: 0 }
              : { scaleY: 0 }
        }
        animate={
          isInView
            ? isHorizontal
              ? { scaleX: 1 }
              : { scaleY: 1 }
            : undefined
        }
        transition={{
          duration: prefersReducedMotion ? 0 : duration.slow,
          ease: easing.emphasized,
          delay: prefersReducedMotion ? 0 : delay,
        }}
      />
      {!prefersReducedMotion ? (
        <motion.span
          className={cn(
            "absolute size-1.5 rounded-full bg-accent",
            isHorizontal
              ? "top-1/2 right-0 -translate-y-1/2"
              : "bottom-0 left-1/2 -translate-x-1/2",
          )}
          style={{
            boxShadow:
              "0 0 10px color-mix(in oklab, var(--uds-color-accent) 70%, transparent)",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isInView
              ? { opacity: [0, 1, 0.55], scale: [0.5, 1.25, 1] }
              : undefined
          }
          transition={{
            duration: duration.slow,
            ease: easing.standard,
            delay: delay + duration.slow * 0.55,
          }}
        />
      ) : null}
    </div>
  );
}

/**
 * Our Process — horizontal infographic / vertical on mobile.
 */
export function AboutProcess({ className }: AboutProcessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="our-process"
      spacing="lg"
      tone="default"
      aria-labelledby="our-process-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 8%, transparent), transparent 70%)",
        }}
      />

      <Container size="max">
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            className="text-caption font-medium tracking-wide text-accent uppercase"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
            }}
          >
            Process
          </motion.p>

          <motion.h2
            id="our-process-heading"
            className="font-heading mt-3 text-h2 text-balance text-text-primary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : 0.05,
            }}
          >
            How we work
          </motion.h2>
        </div>

        {/* Desktop horizontal */}
        <motion.div
          className="mt-14 hidden items-start lg:mt-20 lg:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger * 1.35,
              },
            },
          }}
        >
          {ABOUT_PROCESS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Fragment key={step.id}>
                <motion.div
                  className="flex min-w-0 flex-1 flex-col items-center text-center"
                  variants={
                    prefersReducedMotion ? reducedMotionVariant : fadeUp
                  }
                >
                  <div className="group/step relative mb-5">
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-accent/15 opacity-0 blur-xl transition-opacity duration-[var(--uds-duration-normal)] group-hover/step:opacity-100"
                    />
                    <motion.div
                      className={cn(
                        "relative flex size-14 items-center justify-center rounded-full border border-border bg-card/80 shadow-sm backdrop-blur-sm",
                        "ring-1 ring-border/60 transition-[border-color,box-shadow] duration-[var(--uds-duration-normal)]",
                        "group-hover/step:border-accent/40 group-hover/step:ring-accent/25",
                      )}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : {
                              scale: 1.05,
                              transition: {
                                duration: duration.fast,
                                ease: easing.standard,
                              },
                            }
                      }
                    >
                      <Icon
                        className="size-5 text-accent"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </motion.div>
                  </div>
                  <h3 className="font-heading text-base font-semibold tracking-tight text-text-primary md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[11.5rem] text-sm text-pretty text-text-secondary">
                    {step.description}
                  </p>
                </motion.div>
                {index < ABOUT_PROCESS.length - 1 ? (
                  <ProcessLine
                    orientation="horizontal"
                    delay={0.18 + index * 0.12}
                  />
                ) : null}
              </Fragment>
            );
          })}
        </motion.div>

        {/* Mobile vertical */}
        <motion.ol
          className="relative mx-auto mt-12 flex max-w-sm flex-col lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger * 1.2,
              },
            },
          }}
        >
          {ABOUT_PROCESS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.id} className="flex flex-col items-center">
                <motion.div
                  className="flex w-full flex-col items-center text-center"
                  variants={
                    prefersReducedMotion ? reducedMotionVariant : fadeUp
                  }
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full border border-border bg-card/80 ring-1 ring-border/60 backdrop-blur-sm">
                    <Icon
                      className="size-5 text-accent"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[16rem] text-sm text-pretty text-text-secondary">
                    {step.description}
                  </p>
                </motion.div>
                {index < ABOUT_PROCESS.length - 1 ? (
                  <ProcessLine
                    orientation="vertical"
                    delay={0.1 + index * 0.08}
                  />
                ) : null}
              </li>
            );
          })}
        </motion.ol>
      </Container>
    </Section>
  );
}
