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
    slug: "soil2spoon",
    title: "Soil2Spoon",
    client: "Soil2Spoon",
    summary:
      "An e-commerce experience for authentic Indian spices, pastes, and pickles — farm-fresh branding with a clean, conversion-focused storefront.",
    category: "web",
    categoryLabel: "Web",
    year: 2026,
    imageSrc: "/images/portfolio/soil2spoon.jpg",
    imageAlt: "Soil2Spoon e-commerce homepage preview",
    featured: true,
  },
];

export function getPortfolioHref(slug: string) {
  return ROUTES.portfolio.detail(slug);
}
