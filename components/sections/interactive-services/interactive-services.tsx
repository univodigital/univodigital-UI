"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { mediaQueries } from "@/lib/design-system";
import { duration, easing } from "@/lib/design-system/motion";
import { cn } from "@/lib/utils";

import { INTERACTIVE_SERVICES } from "./data";
import { InteractiveServiceCard } from "./interactive-service-card";

type InteractiveServicesProps = {
  className?: string;
};

/**
 * Interactive Services — Web Design, Web Development, SEO/GEO.
 * Desktop: hover/focus expands one card via flex-grow.
 * Mobile: stacked, all content always visible.
 */
export function InteractiveServices({ className }: InteractiveServicesProps) {
  const prefersReducedMotion = useReducedMotion();
  const isLaptopUp = useMediaQuery(mediaQueries.laptop);
  const interactive = isLaptopUp;

  const [activeIndex, setActiveIndex] = useState(0);

  const activate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const resetToFirst = useCallback(() => {
    setActiveIndex(0);
  }, []);

  return (
    <Section
      id="services"
      spacing="lg"
      tone="default"
      aria-labelledby="interactive-services-heading"
      className={cn("relative", className)}
    >
      <Container size="max">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
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
            Services
          </motion.p>

          <motion.h2
            id="interactive-services-heading"
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
            What we build with you
          </motion.h2>

          <motion.p
            className="mt-4 text-body-lg text-pretty text-text-secondary"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: prefersReducedMotion ? 0 : duration.normal,
              ease: easing.standard,
              delay: prefersReducedMotion ? 0 : 0.1,
            }}
          >
            Hover or focus a capability — the panel unfolds and the image slides
            into place as one continuous motion.
          </motion.p>
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-4 md:mt-12",
            interactive && "lg:mt-14 lg:flex-row lg:items-stretch lg:gap-3",
          )}
          onMouseLeave={() => {
            if (interactive) resetToFirst();
          }}
        >
          {INTERACTIVE_SERVICES.map((service, index) => (
            <InteractiveServiceCard
              key={service.id}
              service={service}
              index={index}
              active={!interactive || activeIndex === index}
              interactive={interactive}
              onActivate={activate}
              className={cn(!interactive && "w-full")}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
