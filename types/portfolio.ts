import type { ID, ISODateString } from "./common";
import type { ServiceSlug } from "./service";

export type PortfolioCategory =
  | "branding"
  | "web"
  | "social"
  | "performance"
  | "all";

export type PortfolioItem = {
  id: ID;
  slug: string;
  title: string;
  client: string;
  summary: string;
  description: string;
  category: Exclude<PortfolioCategory, "all">;
  services: ServiceSlug[];
  coverImage: string;
  gallery: string[];
  tags: string[];
  year?: number;
  isFeatured: boolean;
  order: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};

export type PortfolioFilters = {
  category?: PortfolioCategory;
  featured?: boolean;
  search?: string;
};
