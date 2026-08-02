"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import type { CompanyLogo } from "./data";

type CompanyLogosProps = {
  companies: CompanyLogo[];
  className?: string;
};

/**
 * Client company logo placeholders with hover emphasis.
 */
export function CompanyLogos({ companies, className }: CompanyLogosProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-center text-caption font-medium tracking-wide text-text-secondary uppercase">
        Trusted by teams like
      </p>
      <motion.ul
        className="mx-auto grid max-w-md grid-cols-2 gap-3 sm:max-w-lg"
        aria-label="Client companies"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : motionTokens.stagger,
            },
          },
        }}
      >
        {companies.map((company) => (
          <motion.li
            key={company.id}
            variants={{
              hidden: prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 10 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: duration.normal,
                  ease: easing.standard,
                },
              },
            }}
          >
            <div
              className={cn(
                "group/logo flex h-14 items-center justify-center rounded-lg border border-border/80 bg-surface/70 px-3",
                "transition-[border-color,background-color,transform,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:-translate-y-0.5 hover:border-accent/30 hover:bg-card hover:shadow-sm",
                "motion-reduce:transform-none",
              )}
            >
              <span className="truncate text-caption font-semibold tracking-tight text-text-secondary transition-colors duration-[var(--uds-duration-fast)] group-hover/logo:text-text-primary">
                {company.name}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
