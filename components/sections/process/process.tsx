"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

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

import { PROCESS_STEPS } from "./data";
import { ProcessConnector } from "./process-connector";
import { ProcessStepCard } from "./process-step";

type ProcessProps = {
  className?: string;
};

/**
 * Process — four-step timeline with animated connectors and scroll reveal.
 */
export function Process({ className }: ProcessProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="process"
      spacing="lg"
      tone="surface"
      aria-labelledby="process-heading"
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
            id="process-heading"
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
            A clear path from idea to impact
          </motion.h2>

          <motion.p
            className="mt-4 text-body-lg text-pretty text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            Four focused stages — so every engagement stays aligned, paced, and
            built for results.
          </motion.p>
        </div>

        {/* Desktop horizontal timeline */}
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
                  : motionTokens.stagger * 1.5,
              },
            },
          }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <Fragment key={step.id}>
              <motion.div
                className="flex min-w-0 flex-1 flex-col items-center"
                variants={
                  prefersReducedMotion ? reducedMotionVariant : fadeUp
                }
              >
                <ProcessStepCard step={step} index={index} />
              </motion.div>
              {index < PROCESS_STEPS.length - 1 ? (
                <ProcessConnector
                  orientation="horizontal"
                  className="mt-8 max-w-24 xl:max-w-32"
                  delay={0.2 + index * 0.14}
                />
              ) : null}
            </Fragment>
          ))}
        </motion.div>

        {/* Mobile / tablet vertical timeline */}
        <motion.ol
          className="relative mx-auto mt-12 flex max-w-md flex-col lg:hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger * 1.25,
              },
            },
          }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.id} className="flex flex-col items-center">
              <motion.div
                className="w-full"
                variants={
                  prefersReducedMotion ? reducedMotionVariant : fadeUp
                }
              >
                <ProcessStepCard step={step} index={index} />
              </motion.div>
              {index < PROCESS_STEPS.length - 1 ? (
                <ProcessConnector
                  orientation="vertical"
                  delay={0.12 + index * 0.1}
                />
              ) : null}
            </li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}
