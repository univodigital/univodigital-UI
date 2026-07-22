import type { ID, ISODateString } from "./common";

export type ServiceSlug =
  | "branding"
  | "website-development"
  | "social-media-marketing"
  | "performance-marketing";

export type Service = {
  id: ID;
  slug: ServiceSlug;
  title: string;
  summary: string;
  description: string;
  features: string[];
  icon?: string;
  order: number;
  isFeatured: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
