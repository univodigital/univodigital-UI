import type { ID, ISODateString } from "./common";

export type Testimonial = {
  id: ID;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
  isFeatured: boolean;
  order: number;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
