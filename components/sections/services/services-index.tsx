"use client";

import { motion } from "framer-motion";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { StaggerContainer } from "@/animations";
import { fadeUp, reducedMotionVariant } from "@/animations/variants";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import {
  cardDescriptionClassName,
  cardSurfaceClassName,
  cardTitleClassName,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";
import {
  getServiceHref,
  SERVICES,
  type ServicePageData,
} from "@/data/services";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  duration,
  easing,
  motion as motionTokens,
} from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { AboutHeroBackground } from "@/components/sections/about/about-hero-background";

type ServicesIndexHeroProps = {
  className?: string;
};

function itemVariants(prefersReducedMotion: boolean) {
  return {
    hidden: prefersReducedMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: duration.slow,
        ease: easing.emphasized,
      },
    },
  };
}

/**
 * Services index hero.
 */
export function ServicesIndexHero({ className }: ServicesIndexHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="services-index-heading"
      className={cn(
        "relative isolate flex min-h-[min(100dvh,44rem)] flex-col justify-center overflow-hidden",
        className,
      )}
    >
      <AboutHeroBackground spotlightX={50} spotlightY={40} />

      <Container
        size="max"
        className="relative z-10 flex flex-1 flex-col justify-center py-24 md:py-28"
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: prefersReducedMotion
                  ? 0
                  : motionTokens.stagger,
                delayChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
        >
          <motion.p
            className="text-caption font-medium tracking-wide text-accent uppercase"
            variants={itemVariants(prefersReducedMotion)}
          >
            Services
          </motion.p>

          <motion.h1
            id="services-index-heading"
            className="font-heading mt-3 text-h1 text-balance tracking-tight text-text-primary"
            variants={itemVariants(prefersReducedMotion)}
          >
            <span className="block">Building brands that</span>
            <span className="mt-1 block bg-gradient-to-r from-text-primary via-text-primary to-accent bg-clip-text text-transparent">
              stand out digitally
            </span>
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-xl text-body-lg text-pretty text-text-secondary"
            variants={itemVariants(prefersReducedMotion)}
          >
            From brand identity to performance campaigns — we help businesses
            grow with strategy, design, and execution that delivers measurable
            results.
          </motion.p>

          <motion.div
            className="mt-8"
            variants={itemVariants(prefersReducedMotion)}
          >
            <Button asChild size="lg" variant="accent" className="min-w-48">
              <Link href={ROUTES.contact}>
                Start Your Project
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

type ServiceIndexCardProps = {
  service: ServicePageData;
};

function ServiceIndexCard({ service }: ServiceIndexCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const href = getServiceHref(service.slug);

  return (
    <motion.article
      className="h-full"
      variants={prefersReducedMotion ? reducedMotionVariant : fadeUp}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -5,
              transition: { duration: duration.normal, ease: easing.standard },
            }
      }
    >
      <Link
        href={href}
        className={cn(
          cardSurfaceClassName("glass"),
          "group/service flex h-full flex-col p-6 outline-none sm:p-8",
          "focus-visible:ring-3 focus-visible:ring-ring/50",
        )}
        aria-label={`Learn more about ${service.title}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-caption font-medium tracking-wide text-accent uppercase">
              {service.title}
            </p>
            <h2 className={cn("mt-2 text-xl sm:text-2xl", cardTitleClassName)}>
              {service.tagline}
            </h2>
          </div>
          <span
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted text-card-muted-foreground",
              "transition-[transform,background-color,color,border-color] duration-[var(--uds-duration-normal)]",
              "group-hover/service:border-accent/40 group-hover/service:bg-accent group-hover/service:text-accent-foreground",
              "group-hover/service:translate-x-0.5 group-hover/service:-translate-y-0.5",
            )}
            aria-hidden
          >
            <ArrowUpRightIcon className="size-4" />
          </span>
        </div>

        <p className={cn("mt-4 flex-1", cardDescriptionClassName)}>
          {service.description}
        </p>

        <p className="mt-6 text-sm font-medium text-accent">
          Explore service →
        </p>
      </Link>
    </motion.article>
  );
}

type ServicesIndexGridProps = {
  className?: string;
};

/**
 * Services index grid — links to all service pages.
 */
export function ServicesIndexGrid({ className }: ServicesIndexGridProps) {
  return (
    <Section
      id="services-list"
      spacing="lg"
      tone="surface"
      aria-labelledby="services-list-heading"
      className={className}
    >
      <Container size="max">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="services-list-heading"
            className="sr-only"
          >
            Our services
          </h2>
        </div>

        <StaggerContainer
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
          once
        >
          {SERVICES.map((service) => (
            <ServiceIndexCard key={service.slug} service={service} />
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
