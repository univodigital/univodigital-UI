import type { Metadata } from "next";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export type MetadataFactory = (seo: PageSeo) => Metadata;

export type JsonLdType =
  | "Organization"
  | "WebSite"
  | "WebPage"
  | "Service"
  | "FAQPage"
  | "BreadcrumbList"
  | "ContactPage";
