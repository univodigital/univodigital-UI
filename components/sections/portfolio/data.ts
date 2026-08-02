import {
  PORTFOLIO_PROJECTS,
  getPortfolioHref,
  type PortfolioProject,
} from "@/data/portfolio-projects";
import type { PortfolioCategory } from "@/types";

export type PortfolioListItem = Pick<
  PortfolioProject,
  | "id"
  | "slug"
  | "title"
  | "client"
  | "summary"
  | "category"
  | "categoryLabel"
  | "year"
  | "imageSrc"
  | "imageAlt"
  | "previewImageSrc"
>;

export type PortfolioFilterOption = {
  value: PortfolioCategory;
  label: string;
};

export const PORTFOLIO_LIST_ITEMS: PortfolioListItem[] = PORTFOLIO_PROJECTS.map(
  ({
    id,
    slug,
    title,
    client,
    summary,
    category,
    categoryLabel,
    year,
    imageSrc,
    imageAlt,
    previewImageSrc,
  }) => ({
    id,
    slug,
    title,
    client,
    summary,
    category,
    categoryLabel,
    year,
    imageSrc,
    imageAlt,
    previewImageSrc,
  }),
);

const CATEGORY_LABELS: Record<Exclude<PortfolioCategory, "all">, string> = {
  web: "Web",
  branding: "Branding",
  social: "Social Media",
  performance: "Performance",
};

/** Filter tabs derived from projects — always includes "All". */
export const PORTFOLIO_FILTER_OPTIONS: PortfolioFilterOption[] = [
  { value: "all", label: "All" },
  ...Array.from(
    new Set(PORTFOLIO_LIST_ITEMS.map((project) => project.category)),
  )
    .sort()
    .map((category) => ({
      value: category,
      label: CATEGORY_LABELS[category],
    })),
];

export { getPortfolioHref };
