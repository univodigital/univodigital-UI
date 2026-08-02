"use client";

import { motion } from "framer-motion";

import { Counter } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ABOUT_STATS } from "./data";

type AboutNumbersProps = {
  className?: string;
};

/**
 * Numbers — large animated counters.
 */
export function AboutNumbers({ className }: AboutNumbersProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id="numbers"
      spacing="lg"
      tone="default"
      aria-labelledby="numbers-heading"
      className={cn("relative overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% 50%, color-mix(in oklab, var(--uds-color-accent) 12%, transparent), transparent 70%)",
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
            Impact
          </motion.p>

          <motion.h2
            id="numbers-heading"
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
            By the numbers
          </motion.h2>
        </div>

        <motion.ul
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-8 sm:gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-6"
          aria-label="Agency statistics"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger,
              },
            },
          }}
        >
          {ABOUT_STATS.map((stat) => (
            <motion.li
              key={stat.id}
              className="flex flex-col items-center text-center"
              variants={{
                hidden: prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 20, filter: "blur(6px)" },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: duration.slow,
                    ease: easing.emphasized,
                  },
                },
              }}
            >
              <Counter
                to={stat.value}
                suffix={stat.suffix}
                className="font-heading text-[clamp(2.75rem,6vw,4.5rem)] leading-none font-semibold tracking-tight text-accent tabular-nums"
                duration="slower"
              />
              <span className="mt-3 text-caption font-medium tracking-wide text-text-secondary uppercase">
                {stat.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
