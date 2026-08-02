"use client";

import { motion } from "framer-motion";

import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";

import { ProjectSection } from "./project-section";

type ProjectDescriptionProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Project description — deeper case study narrative (optional per project).
 */
export function ProjectDescription({
  project,
  className,
}: ProjectDescriptionProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!project.description) return null;

  const paragraphs = project.description.split("\n\n");

  return (
    <ProjectSection
      id="description"
      eyebrow="The work"
      title={project.descriptionHeading ?? "Project description"}
      className={className}
    >
      <div className="max-w-3xl space-y-5">
        {paragraphs.map((paragraph) => (
          <motion.p
            key={paragraph.slice(0, 40)}
            className="text-body-lg text-pretty text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
            }}
          >
            {paragraph}
          </motion.p>
        ))}
      </div>
    </ProjectSection>
  );
}
