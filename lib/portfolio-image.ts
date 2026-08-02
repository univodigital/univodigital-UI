import { cn } from "@/lib/utils";

/**
 * True for portfolio brand logos stored as PNG (or SVG) under a logo path.
 */
export function isBrandLogoImage(src: string): boolean {
  const path = src.split("?")[0]?.toLowerCase() ?? "";

  return (
    path.includes("logo") &&
    (path.endsWith(".png") || path.endsWith(".svg"))
  );
}

/** Themed surface for transparent or dark logo assets. */
export const brandLogoSurfaceClassName =
  "bg-card bg-gradient-to-br from-accent/[0.08] via-card to-secondary ring-1 ring-inset ring-border/50";

/** Image fit for brand logos inside themed surfaces. */
export const brandLogoImageClassName = "object-contain p-6 sm:p-8";

export function getBrandLogoPresentation(src: string) {
  const isLogo = isBrandLogoImage(src);

  return {
    isLogo,
    surfaceClassName: isLogo ? brandLogoSurfaceClassName : "bg-muted",
    imageClassName: cn(
      isLogo ? brandLogoImageClassName : "object-cover object-top",
    ),
  };
}
