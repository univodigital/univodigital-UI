"use client";

import { AboutHeroBackground } from "@/components/sections/about/about-hero-background";

type ServiceHeroBackgroundProps = {
  spotlightX: number;
  spotlightY: number;
};

/**
 * Service hero atmosphere — reuses About hero spotlight system.
 */
export function ServiceHeroBackground({
  spotlightX,
  spotlightY,
}: ServiceHeroBackgroundProps) {
  return (
    <AboutHeroBackground spotlightX={spotlightX} spotlightY={spotlightY} />
  );
}
