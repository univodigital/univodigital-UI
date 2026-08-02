"use client";

import { motion } from "framer-motion";

import type { PortfolioProject } from "@/data/portfolio-projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { ProjectCardGrid } from "./project-card-grid";
import { ProjectSection } from "./project-section";

type ProjectOverviewProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Project overview — intro copy block.
 */
export function ProjectOverview({ project, className }: ProjectOverviewProps) {
  const prefersReducedMotion = useReducedMotion();
  const paragraphs = project.overview.split("\n\n");

  return (
    <ProjectSection
      id="overview"
      eyebrow="Overview"
      title={project.overviewHeading ?? "Project overview"}
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

type ProjectDeliveredProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * What we delivered — service cards grid.
 */
export function ProjectDelivered({ project, className }: ProjectDeliveredProps) {
  return (
    <ProjectSection
      id="delivered"
      eyebrow="Deliverables"
      title={project.deliveredHeading ?? "What we delivered"}
      tone="surface"
      className={className}
    >
      <ul>
        <ProjectCardGrid items={project.delivered} />
      </ul>
    </ProjectSection>
  );
}

type ProjectApproachProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Our approach — strategy narrative (optional per project).
 */
export function ProjectApproach({ project, className }: ProjectApproachProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!project.approach && !project.approachBullets?.length) return null;

  const paragraphs = project.approach?.split("\n\n") ?? [];

  return (
    <ProjectSection
      id="approach"
      eyebrow="Strategy"
      title="Our Approach"
      className={className}
    >
      <div className="max-w-3xl space-y-6">
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

        {project.approachBullets?.length ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.slow,
              ease: easing.emphasized,
              delay: prefersReducedMotion ? 0 : 0.08,
            }}
          >
            <p className="text-body-lg text-text-secondary">
              The content strategy focused on:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {project.approachBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-base text-text-secondary"
                >
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </div>
    </ProjectSection>
  );
}

type ProjectResultsProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * Results — outcome cards grid.
 */
export function ProjectResults({ project, className }: ProjectResultsProps) {
  return (
    <ProjectSection
      id="results"
      eyebrow="Outcome"
      title={project.resultsHeading ?? "Result"}
      tone="surface"
      className={className}
    >
      <ul>
        <ProjectCardGrid items={project.results} />
      </ul>
    </ProjectSection>
  );
}

type ProjectContentProps = {
  project: PortfolioProject;
  className?: string;
};

/**
 * @deprecated Use individual section components via ProjectPage.
 */
export function ProjectContent({ project, className }: ProjectContentProps) {
  return (
    <div className={cn(className)}>
      <ProjectOverview project={project} />
      <ProjectDelivered project={project} />
      <ProjectResults project={project} />
    </div>
  );
}
