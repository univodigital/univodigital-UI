"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

export type ProjectSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  tone?: "default" | "surface" | "muted";
  className?: string;
};

/**
 * Shared portfolio section wrapper — eyebrow, heading, and content slot.
 */
export function ProjectSection({
  id,
  eyebrow,
  title,
  children,
  tone = "default",
  className,
}: ProjectSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section
      id={id}
      spacing="lg"
      tone={tone}
      aria-labelledby={`${id}-heading`}
      className={cn("relative overflow-hidden", className)}
    >
      {tone === "default" ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 85% 40%, color-mix(in oklab, var(--uds-color-accent) 10%, transparent), transparent 70%)",
          }}
        />
      ) : null}

      <Container size="max">
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
          {eyebrow}
        </motion.p>

        <motion.h2
          id={`${id}-heading`}
          className="font-heading mt-3 max-w-2xl text-h2 text-balance text-text-primary"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: prefersReducedMotion ? 0 : duration.slow,
            ease: easing.emphasized,
            delay: prefersReducedMotion ? 0 : 0.05,
          }}
        >
          {title}
        </motion.h2>

        <div className="mt-8 lg:mt-10">{children}</div>
      </Container>
    </Section>
  );
}
