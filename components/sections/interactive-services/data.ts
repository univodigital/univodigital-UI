import { ROUTES } from "@/constants/routes";
import type { ServiceSlug } from "@/types";

export type ServicePanelTone = "orange" | "black" | "purple";

export type InteractiveService = {
  id: string;
  slug: ServiceSlug;
  title: string;
  subtitle?: string;
  description: string;
  bullets: readonly string[];
  href: string;
  ctaLabel: string;
  imageSrc: string;
  imageAlt: string;
  panel: ServicePanelTone;
};

/**
 * Panel colors from the interaction reference.
 * Web Design → Orange | Web Development → Black | SEO/GEO → Purple
 */
export const SERVICE_PANEL_STYLES: Record<
  ServicePanelTone,
  {
    background: string;
    foreground: string;
    muted: string;
    cta: string;
    ctaFg: string;
    checkBg: string;
    checkFg: string;
    frame: string;
  }
> = {
  orange: {
    background: "#FF6033",
    foreground: "#FFFFFF",
    muted: "rgb(255 255 255 / 90%)",
    cta: "#FFFFFF",
    ctaFg: "#111111",
    checkBg: "#FFFFFF",
    checkFg: "#FF6033",
    frame: "#0A0A0A",
  },
  black: {
    background: "#0B0D12",
    foreground: "#F5F7FA",
    muted: "rgb(245 247 250 / 82%)",
    cta: "#FFFFFF",
    ctaFg: "#0B0D12",
    checkBg: "#FFFFFF",
    checkFg: "#0B0D12",
    frame: "#050505",
  },
  purple: {
    background: "#6B3FA0",
    foreground: "#F7F2FF",
    muted: "rgb(247 242 255 / 88%)",
    cta: "#FFFFFF",
    ctaFg: "#3B1F63",
    checkBg: "#FFFFFF",
    checkFg: "#6B3FA0",
    frame: "#140A1F",
  },
};

/** Collapsed-state soft fog over photography. */
export function panelWash(color: string): string {
  return `linear-gradient(180deg, ${color} 0%, ${color} 36%, ${color}cc 52%, ${color}66 70%, transparent 100%)`;
}

export const INTERACTIVE_SERVICES: readonly InteractiveService[] = [
  {
    id: "web-design",
    slug: "branding",
    title: "Web Design",
    subtitle: "(UI/UX)",
    description:
      "Craft high-converting user experiences that reflect your brand and drive results.",
    bullets: ["UI Design", "UX Strategy"],
    href: ROUTES.services.branding,
    ctaLabel: "Learn More",
    imageSrc: "/images/services/web-design-photo.jpg",
    imageAlt: "Design workspace with monitors showing UI mockups",
    panel: "orange",
  },
  {
    id: "web-development",
    slug: "website-development",
    title: "Web Development",
    description:
      "High-performance builds engineered for speed, SEO foundations, and long-term scalability.",
    bullets: ["Next.js architecture", "Design system implementation"],
    href: ROUTES.services.websiteDevelopment,
    ctaLabel: "Learn More",
    imageSrc: "/images/services/web-development-photo.jpg",
    imageAlt: "Developer working at a desktop with design on screen",
    panel: "black",
  },
  {
    id: "seo-geo",
    slug: "performance-marketing",
    title: "SEO, GEO & Management",
    description:
      "Search, generative visibility, and ongoing management that keep your brand discoverable.",
    bullets: ["Technical & content SEO", "GEO / AI search readiness"],
    href: ROUTES.services.performanceMarketing,
    ctaLabel: "Learn More",
    imageSrc: "/images/services/seo-geo-photo.jpg",
    imageAlt: "Analytics reports and dashboard on a laptop",
    panel: "purple",
  },
] as const;
