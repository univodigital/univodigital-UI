"use client";

import { motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { StaggerContainer } from "@/animations";
import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ROUTES } from "@/constants/routes";
import { getPortfolioHref } from "@/data/portfolio-projects";
import type { ServicePageData } from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { duration, easing } from "@/lib/design-system/motion";
import { getBrandLogoPresentation } from "@/lib/portfolio-image";
import { cn } from "@/lib/utils";
import {
  cardMetaClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";

type ProjectShowcaseProps = {
  service: ServicePageData;
  className?: string;
};

/**
 * Featured Projects — large preview cards with hover interactions.
 */
export function ProjectShowcase({ service, className }: ProjectShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const { projects, slug } = service;

  return (
    <Section
      id={`${slug}-projects`}
      spacing="lg"
      tone="default"
      aria-labelledby={`${slug}-projects-heading`}
      className={cn("relative overflow-hidden", className)}
    >
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
            {projects.eyebrow}
          </motion.p>

          <motion.h2
            id={`${slug}-projects-heading`}
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
            {projects.heading}
          </motion.h2>
        </div>

        <StaggerContainer
          className={cn(
            "mt-12 grid gap-6 lg:mt-16",
            projects.items.length > 1
              ? "sm:grid-cols-2"
              : "mx-auto max-w-2xl",
          )}
          once
        >
          {projects.items.map((project, index) => {
            const href = project.slug
              ? getPortfolioHref(project.slug)
              : ROUTES.contact;
            const isPlaceholder = project.isPlaceholder;
            const logoPresentation = getBrandLogoPresentation(project.imageSrc);

            return (
              <motion.article
                key={project.id}
                className="h-full"
                variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -4,
                        transition: {
                          duration: duration.normal,
                          ease: easing.standard,
                        },
                      }
                }
              >
                <Link
                  href={href}
                  className={cn(
                    cardSurfaceClassName("solid"),
                    "group/project flex h-full flex-col overflow-hidden p-0 outline-none",
                    "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset",
                  )}
                  aria-label={
                    isPlaceholder
                      ? `${project.title} — contact us to learn more`
                      : `View case study: ${project.title}`
                  }
                >
                  <div className="relative overflow-hidden">
                    <div
                      className={cn(
                        "relative aspect-[16/10] w-full",
                        logoPresentation.surfaceClassName,
                      )}
                    >
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px"
                        className={cn(
                          "transition-transform duration-[var(--uds-duration-slow)] ease-[var(--uds-ease-standard)] motion-reduce:transition-none group-hover/project:scale-[1.03]",
                          logoPresentation.imageClassName,
                        )}
                      />
                      {isPlaceholder ? (
                        <span className="absolute top-4 right-4 rounded-full bg-muted px-3 py-1 text-xs font-medium text-card-muted-foreground backdrop-blur-sm">
                          Coming soon
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className={cn("text-lg sm:text-xl", cardTitleClassName)}>
                          {project.client}
                        </h3>
                        <p className={cn("mt-1 text-sm", cardMetaClassName)}>
                          {project.categoryLabel}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-card-muted-foreground",
                          "transition-[transform,background-color,color,border-color] duration-[var(--uds-duration-normal)] ease-[var(--uds-ease-standard)]",
                          "group-hover/project:border-accent/40 group-hover/project:bg-accent group-hover/project:text-accent-foreground",
                          "group-hover/project:translate-x-0.5 group-hover/project:-translate-y-0.5",
                          "motion-reduce:transform-none",
                        )}
                        aria-hidden
                      >
                        <ArrowUpRightIcon className="size-4" />
                      </span>
                    </div>

                    <p className="text-sm font-medium text-accent">
                      {isPlaceholder ? "Get in touch" : "View Case Study →"}
                    </p>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
