import { ROUTES } from "@/constants/routes";
import type { PortfolioCategory } from "@/types";

export type PortfolioGalleryItem = {
  src: string;
  alt: string;
  label?: string;
  layout?: "default" | "wide" | "tall";
};

export type PortfolioTestimonial = {
  quote: string;
  author: string;
};

/**
 * Single source of truth for portfolio projects.
 * Add a new entry here to populate the featured carousel and project detail page.
 */
export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  client: string;
  summary: string;
  category: Exclude<PortfolioCategory, "all">;
  categoryLabel: string;
  year: number;
  /** Short tagline shown in hero */
  subtitle: string;
  /** Extended hero description paragraph */
  heroDescription?: string;
  overview: string;
  overviewHeading?: string;
  /** Deeper project narrative — optional second copy block */
  description?: string;
  descriptionHeading?: string;
  approach?: string;
  approachBullets?: string[];
  delivered: string[];
  deliveredHeading?: string;
  results: string[];
  resultsHeading?: string;
  tools?: string[];
  services: string[];
  clientInfo?: {
    industry: string;
    services: string[];
  };
  imageSrc: string;
  imageAlt: string;
  /** Optional thumbnail for portfolio carousel (defaults to imageSrc) */
  previewImageSrc?: string;
  /** Hero image fit — use contain for screenshots */
  heroImageFit?: "cover" | "contain";
  gallery: PortfolioGalleryItem[];
  galleryHeading?: string;
  testimonial?: PortfolioTestimonial;
  featured: boolean;
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
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
    subtitle:
      "A farm-fresh e-commerce experience for authentic Indian spices, pastes, and pickles — built for discovery, trust, and conversion.",
    overview:
      "Soil2Spoon needed a digital storefront that felt as authentic as their products. We designed and developed a clean, conversion-focused e-commerce experience with farm-fresh branding, intuitive product discovery, and a checkout flow optimized for repeat purchases.",
    delivered: [
      "E-commerce UX & UI Design",
      "Custom Storefront Development",
      "Product Photography Direction",
      "Brand-Aligned Visual Design",
      "Mobile-First Responsive Layout",
      "Conversion-Focused Checkout Flow",
    ],
    results: [
      "Premium, trustworthy brand presence online",
      "Streamlined product discovery and purchase flow",
      "Mobile-optimized shopping experience",
      "Scalable foundation for catalog growth",
    ],
    tools: ["Figma", "Next.js", "Tailwind CSS", "Shopify"],
    services: [
      "Web Design",
      "E-commerce Development",
      "Brand Visual Design",
      "UX Strategy",
    ],
    imageSrc: "/images/portfolio/soil2spoon.jpg",
    imageAlt: "Soil2Spoon e-commerce homepage preview",
    gallery: [
      {
        src: "/images/portfolio/soil2spoon.jpg",
        alt: "Soil2Spoon e-commerce homepage preview",
      },
      {
        src: "/images/portfolio/soil2spoon.jpg",
        alt: "Soil2Spoon product catalog view",
      },
      {
        src: "/images/portfolio/soil2spoon.jpg",
        alt: "Soil2Spoon mobile storefront preview",
      },
    ],
    featured: true,
  },
  {
    id: "2",
    slug: "taglio",
    title: "Taglio",
    client: "Taglio",
    summary:
      "Premium branding and social media for an artisan café — building a consistent digital identity through creative direction, Instagram design, and marketing creatives.",
    category: "branding",
    categoryLabel: "Branding & Social Media",
    year: 2026,
    subtitle:
      "Building a Premium Coffee Brand Through Creative Storytelling.",
    overview:
      "Taglio is a premium artisan café serving wood-fired pizzas and specialty coffee.\n\nUnivo Digital partnered with Taglio to build a strong digital presence through branding, creative direction, and social media marketing.\n\nOur goal was to create a premium visual identity that reflects the café's personality while maintaining consistency across every digital touchpoint.\n\nRather than simply designing posts, we built a recognizable online brand through creative storytelling, premium visuals, and engaging marketing content.",
    overviewHeading: "Overview",
    description:
      "The focus of this project was to establish Taglio as a premium café brand on social media.\n\nWe designed Instagram creatives, promotional campaigns, marketing visuals, and brand assets that communicate quality, elegance, and authenticity.\n\nEvery creative was built around consistency in typography, color palette, photography, and storytelling to strengthen the overall brand identity.",
    descriptionHeading: "Project description",
    approach:
      "We developed a clean and premium visual language inspired by modern cafés.",
    approachBullets: [
      "Brand awareness",
      "Product storytelling",
      "Premium coffee culture",
      "Community engagement",
      "Consistent aesthetics",
    ],
    delivered: [
      "Brand Identity",
      "Creative Direction",
      "Social Media Strategy",
      "Instagram Feed Design",
      "Promotional Creatives",
      "Marketing Design",
      "Content Design",
      "Visual Branding",
    ],
    deliveredHeading: "Services provided",
    results: [
      "Premium digital identity",
      "Consistent Instagram branding",
      "Modern visual storytelling",
      "High-quality promotional creatives",
      "Stronger customer trust",
      "Professional online presence",
    ],
    resultsHeading: "Results",
    services: ["Branding", "Social Media", "Creative Design"],
    clientInfo: {
      industry: "Food & Beverage",
      services: ["Branding", "Social Media", "Creative Design"],
    },
    imageSrc: "/images/portfolio/taglio/instagram-profile.png",
    imageAlt: "Taglio Instagram profile — taglio.india",
    previewImageSrc: "/images/portfolio/taglio/logo.png",
    heroImageFit: "contain",
    gallery: [
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio Instagram profile screenshot",
        label: "Instagram Profile",
        layout: "wide",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio Instagram feed preview",
        label: "Feed Preview",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio promotional posts",
        label: "Promotional Posts",
        layout: "tall",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio coffee photography",
        label: "Coffee Photography",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio pizza photography",
        label: "Pizza Photography",
      },
      {
        src: "/images/portfolio/taglio/logo.png",
        alt: "Taglio logo and brand assets",
        label: "Brand Assets",
        layout: "wide",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio marketing creatives",
        label: "Marketing Creatives",
      },
      {
        src: "/images/portfolio/taglio/instagram-profile.png",
        alt: "Taglio café environment",
        label: "Café Environment",
      },
    ],
    galleryHeading: "Project Gallery",
    testimonial: {
      quote:
        "Working with Univo Digital completely transformed our online presence. Every creative perfectly captured our brand's personality and helped us establish a premium identity.",
      author: "Taglio Team",
    },
    featured: true,
  },
];

export function getPortfolioProject(
  slug: string,
): PortfolioProject | undefined {
  return PORTFOLIO_PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedPortfolioProjects(): PortfolioProject[] {
  return PORTFOLIO_PROJECTS.filter((project) => project.featured);
}

export function getAllPortfolioSlugs(): string[] {
  return PORTFOLIO_PROJECTS.map((project) => project.slug);
}

export function getNextPortfolioProject(
  slug: string,
): PortfolioProject | undefined {
  const index = PORTFOLIO_PROJECTS.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return PORTFOLIO_PROJECTS[(index + 1) % PORTFOLIO_PROJECTS.length];
}

export function getPortfolioHref(slug: string) {
  return ROUTES.portfolio.detail(slug);
}
