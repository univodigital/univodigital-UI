import {
  getFeaturedPortfolioProjects,
  getPortfolioHref,
  type PortfolioProject,
} from "@/data/portfolio-projects";

export type PortfolioPreviewItem = Pick<
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
  | "featured"
>;

export const PORTFOLIO_PREVIEW_ITEMS: PortfolioPreviewItem[] =
  getFeaturedPortfolioProjects();

export { getPortfolioHref };
