"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { StaggerContainer } from "@/animations";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import type { PortfolioCategory } from "@/types";

import {
  PORTFOLIO_FILTER_OPTIONS,
  PORTFOLIO_LIST_ITEMS,
} from "./data";
import { PortfolioGridCard } from "./portfolio-grid-card";

type PortfolioGridProps = {
  className?: string;
};

/**
 * Portfolio listing grid with category filter tabs.
 */
export function PortfolioGrid({ className }: PortfolioGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return PORTFOLIO_LIST_ITEMS;
    return PORTFOLIO_LIST_ITEMS.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <Section
      id="portfolio-grid"
      spacing="lg"
      tone="default"
      aria-labelledby="portfolio-grid-heading"
      className={cn("relative", className)}
    >
      <Container size="max">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <motion.h2
              id="portfolio-grid-heading"
              className="font-heading text-h2 text-balance text-text-primary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.slow,
                ease: easing.emphasized,
              }}
            >
              All projects
            </motion.h2>
            <motion.p
              className="mt-3 text-body text-pretty text-text-secondary"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: prefersReducedMotion ? 0 : duration.normal,
                ease: easing.standard,
                delay: prefersReducedMotion ? 0 : 0.05,
              }}
            >
              Brand identities, websites, and campaigns — built with clarity and
              purpose.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter projects by category"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            {PORTFOLIO_FILTER_OPTIONS.map((option) => {
              const isActive = activeCategory === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(option.value)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
                    isActive
                      ? "border-accent/40 bg-accent text-accent-foreground shadow-xs"
                      : "border-border bg-surface text-text-secondary hover:border-accent/25 hover:text-text-primary",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </motion.div>
        </div>

        <StaggerContainer
          key={activeCategory}
          className="mt-10 grid gap-6 sm:mt-12 sm:gap-8 md:grid-cols-2 lg:mt-14"
          once
        >
          {filteredProjects.map((project, index) => (
            <PortfolioGridCard
              key={project.id}
              project={project}
              priority={index < 2}
            />
          ))}
        </StaggerContainer>

        {filteredProjects.length === 0 ? (
          <p className="mt-10 text-center text-text-secondary">
            No projects in this category yet.
          </p>
        ) : null}
      </Container>
    </Section>
  );
}
