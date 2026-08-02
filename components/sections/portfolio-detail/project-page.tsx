"use client";

import type { PortfolioProject } from "@/data/portfolio-projects";
import { cn } from "@/lib/utils";

import { ProjectClient } from "./project-client";
import {
  ProjectApproach,
  ProjectDelivered,
  ProjectOverview,
  ProjectResults,
} from "./project-content";
import { ProjectDescription } from "./project-description";
import { ProjectGallery } from "./project-gallery";
import { ProjectHero } from "./project-hero";
import { ProjectNext } from "./project-next";
import { ProjectTestimonial } from "./project-testimonial";
import { ProjectTools } from "./project-tools";

type ProjectPageProps = {
  project: PortfolioProject;
  nextProject?: PortfolioProject;
  className?: string;
};

/**
 * Portfolio project page — composes all case study sections from project data.
 */
export function ProjectPage({
  project,
  nextProject,
  className,
}: ProjectPageProps) {
  return (
    <div className={cn(className)}>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectDelivered project={project} />
      <ProjectDescription project={project} />
      <ProjectGallery project={project} />
      <ProjectApproach project={project} />
      <ProjectResults project={project} />
      <ProjectClient project={project} />
      <ProjectTools project={project} />
      <ProjectTestimonial project={project} />
      {nextProject ? <ProjectNext nextProject={nextProject} /> : null}
    </div>
  );
}
