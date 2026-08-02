"use client";

import { motion } from "framer-motion";

import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { StaggerContainer } from "@/animations";
import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";
import {
  cardSurfaceClassName,
  cardSurfaceLightTitleClassName,
} from "@/components/ui/card";

import { ProjectSection } from "./project-section";

type ProjectClientProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Client details — industry and service focus (optional per project).
 */
export function ProjectClient({ project, className }: ProjectClientProps) {
  const prefersReducedMotion = useReducedMotion();
  const clientInfo = project.clientInfo;

  if (!clientInfo) return null;

  return (
    <ProjectSection
      id="client"
      eyebrow="Client"
      title={project.client}
      tone="surface"
      className={className}
    >
      <StaggerContainer
        className="grid gap-4 sm:grid-cols-2 lg:max-w-2xl"
        once
      >
        <motion.div
          className={cn(cardSurfaceClassName("surfaceLight"), "p-5")}
          variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
        >
          <p className="text-caption font-medium tracking-wide text-accent uppercase">
            Industry
          </p>
          <p className={cn("mt-2 text-base", cardSurfaceLightTitleClassName)}>
            {clientInfo.industry}
          </p>
        </motion.div>

        <motion.div
          className={cn(cardSurfaceClassName("surfaceLight"), "p-5")}
          variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
        >
          <p className="text-caption font-medium tracking-wide text-accent uppercase">
            Services
          </p>
          <ul className="mt-2 space-y-1">
            {clientInfo.services.map((service) => (
              <li key={service} className={cn("text-base", cardSurfaceLightTitleClassName)}>
                {service}
              </li>
            ))}
          </ul>
        </motion.div>
      </StaggerContainer>
    </ProjectSection>
  );
}
