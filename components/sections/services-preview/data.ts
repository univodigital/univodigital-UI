import type { LucideIcon } from "lucide-react";
import {
  GlobeIcon,
  MegaphoneIcon,
  PaletteIcon,
  RocketIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import type { ServiceSlug } from "@/types";

export type ServicePreviewItem = {
  id: string;
  slug: ServiceSlug;
  title: string;
  summary: string;
  href: string;
  icon: LucideIcon;
  /** Optional cover image path under /public */
  imageSrc?: string;
  imageAlt: string;
  accent: "branding" | "web" | "social" | "performance";
};

export const SERVICE_PREVIEW_ITEMS: ServicePreviewItem[] = [
  {
    id: "branding",
    slug: "branding",
    title: "Branding",
    summary:
      "Identity systems, verbal strategy, and visual language that make your brand unmistakable.",
    href: ROUTES.services.branding,
    icon: PaletteIcon,
    imageSrc: "/images/services/branding.svg",
    imageAlt: "Abstract branding visual",
    accent: "branding",
  },
  {
    id: "website",
    slug: "website-development",
    title: "Website Development",
    summary:
      "High-performance marketing sites and product experiences built for clarity and conversion.",
    href: ROUTES.services.websiteDevelopment,
    icon: GlobeIcon,
    imageSrc: "/images/services/website.svg",
    imageAlt: "Abstract website development visual",
    accent: "web",
  },
  {
    id: "social",
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    summary:
      "Content systems and channel strategy that grow audience trust and keep your brand present.",
    href: ROUTES.services.socialMediaMarketing,
    icon: MegaphoneIcon,
    imageSrc: "/images/services/social.svg",
    imageAlt: "Abstract social media visual",
    accent: "social",
  },
  {
    id: "performance",
    slug: "performance-marketing",
    title: "Performance Marketing",
    summary:
      "Paid acquisition and measurement frameworks focused on efficient growth and clear ROI.",
    href: ROUTES.services.performanceMarketing,
    icon: RocketIcon,
    imageSrc: "/images/services/performance.svg",
    imageAlt: "Abstract performance marketing visual",
    accent: "performance",
  },
];
