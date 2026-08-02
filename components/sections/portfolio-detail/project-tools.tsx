"use client";

import { motion } from "framer-motion";
import {
  BarChart3Icon,
  CodeIcon,
  ImageIcon,
  LayersIcon,
  LayoutGridIcon,
  PaletteIcon,
  PenToolIcon,
  Share2Icon,
  ShoppingBagIcon,
  type LucideIcon,
} from "lucide-react";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { StaggerContainer } from "@/animations";
import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

import { ProjectSection } from "./project-section";

const TOOL_ICONS: Record<string, LucideIcon> = {
  Figma: LayersIcon,
  "Adobe Photoshop": ImageIcon,
  "Adobe Illustrator": PenToolIcon,
  Canva: LayoutGridIcon,
  "Meta Business Suite": Share2Icon,
  "Next.js": CodeIcon,
  "Tailwind CSS": PaletteIcon,
  Shopify: ShoppingBagIcon,
};

type ProjectToolsProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Technologies / tools — icon cards grid.
 */
export function ProjectTools({ project, className }: ProjectToolsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!project.tools?.length) return null;

  return (
    <ProjectSection
      id="tools"
      eyebrow="Stack"
      title="Technologies / Tools"
      tone="surface"
      className={className}
    >
      <StaggerContainer
        className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
        once
      >
        {project.tools.map((tool) => {
          const Icon = TOOL_ICONS[tool] ?? BarChart3Icon;

          return (
            <motion.li
              key={tool}
              className={cn(
                "flex list-none items-center gap-4 rounded-xl border border-surface-light-border bg-surface-light p-4 text-surface-light-foreground shadow-xs",
                "transition-[border-color,box-shadow,transform] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                "hover:-translate-y-0.5 hover:border-accent/25 hover:shadow-card-hover",
                "motion-reduce:transform-none",
              )}
              variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
            >
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-accent/10 text-accent"
                aria-hidden
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium sm:text-base">
                {tool}
              </span>
            </motion.li>
          );
        })}
      </StaggerContainer>
    </ProjectSection>
  );
}
