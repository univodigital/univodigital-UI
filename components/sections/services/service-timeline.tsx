"use client";

import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  cardDescriptionClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

type ServiceTimelineProps = {
  service: ServicePageData;
  className?: string;
};

type ConnectorProps = {
  delay?: number;
};

function TimelineConnector({ delay = 0 }: ConnectorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto my-1 h-12 w-px overflow-hidden"
    >
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute top-0 left-0 h-full w-px origin-top bg-accent"
        initial={prefersReducedMotion ? { scaleY: 1 } : { scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : undefined}
        transition={{
          duration: prefersReducedMotion ? 0 : duration.slow,
          ease: easing.emphasized,
          delay: prefersReducedMotion ? 0 : delay,
        }}
      />
      {!prefersReducedMotion ? (
        <motion.span
          className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent"
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
 * Our Process — premium vertical timeline with animated connectors.
 */
export function ServiceTimeline({ service, className }: ServiceTimelineProps) {
  const prefersReducedMotion = useReducedMotion();
  const { process, slug } = service;

  return (
    <Section
      id={`${slug}-process`}
      spacing="lg"
      tone="default"
      aria-labelledby={`${slug}-process-heading`}
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 0%, color-mix(in oklab, var(--uds-color-accent) 8%, transparent), transparent 70%)",
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
            {process.eyebrow}
          </motion.p>

          <motion.h2
            id={`${slug}-process-heading`}
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
            {process.heading}
          </motion.h2>
        </div>

        <motion.ol
          className="relative mx-auto mt-14 max-w-lg lg:mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger * 1.1,
              },
            },
          }}
        >
          {process.steps.map((step, index) => (
            <Fragment key={step.id}>
              <motion.li
                className="relative"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
              >
                <div
                  className={cn(
                    cardSurfaceClassName("glass"),
                    "group/step relative p-6",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-heading text-2xl font-bold tracking-tight text-accent">
                      {step.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className={cn("text-lg md:text-xl", cardTitleClassName)}>
                        {step.title}
                      </h3>
                      <p className={cn("mt-2", cardDescriptionClassName)}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
              {index < process.steps.length - 1 ? (
                <TimelineConnector delay={0.12 + index * 0.1} />
              ) : null}
            </Fragment>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}
