import type { ID, ISODateString } from "./common";

export type Faq = {
  id: ID;
  question: string;
  answer: string;
  category?: string;
  order: number;
  isPublished: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
};
