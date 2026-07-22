import { ROUTES } from "@/constants/routes";
import type { PortfolioCategory } from "@/types";

export type PortfolioPreviewItem = {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  category: Exclude<PortfolioCategory, "all">;
  categoryLabel: string;
  year: number;
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
};

export const PORTFOLIO_PREVIEW_ITEMS: PortfolioPreviewItem[] = [
  {
    id: "1",
    slug: "northline-rebrand",
    title: "Northline Rebrand",
    client: "Northline",
    summary:
      "A full identity system and digital presence for a modern logistics brand.",
    category: "branding",
    categoryLabel: "Branding",
    year: 2025,
    imageSrc: "/images/portfolio/northline.svg",
    imageAlt: "Northline brand identity preview",
    featured: true,
  },
  {
    id: "2",
    slug: "vespera-platform",
    title: "Vespera Platform",
    client: "Vespera",
    summary:
      "A high-converting marketing site for a B2B product launch.",
    category: "web",
    categoryLabel: "Web",
    year: 2025,
    imageSrc: "/images/portfolio/vespera.svg",
    imageAlt: "Vespera website preview",
  },
  {
    id: "3",
    slug: "cobalt-social",
    title: "Cobalt Social System",
    client: "Cobalt Lab",
    summary:
      "Content frameworks and creative direction across social channels.",
    category: "social",
    categoryLabel: "Social",
    year: 2024,
    imageSrc: "/images/portfolio/cobalt.svg",
    imageAlt: "Cobalt social content preview",
  },
  {
    id: "4",
    slug: "atelier-growth",
    title: "Atelier Growth Engine",
    client: "Atelier Nine",
    summary:
      "Paid acquisition and landing systems focused on efficient scale.",
    category: "performance",
    categoryLabel: "Performance",
    year: 2024,
    imageSrc: "/images/portfolio/atelier.svg",
    imageAlt: "Atelier performance marketing preview",
  },
];

export function getPortfolioHref(slug: string) {
  return ROUTES.portfolio.detail(slug);
}
