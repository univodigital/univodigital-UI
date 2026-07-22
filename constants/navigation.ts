import { ROUTES } from "./routes";
import type { FooterColumn, NavItem, SocialLink } from "@/types";

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  {
    label: "Services",
    href: ROUTES.services.root,
    children: [
      { label: "Branding", href: ROUTES.services.branding },
      {
        label: "Website Development",
        href: ROUTES.services.websiteDevelopment,
      },
      {
        label: "Social Media Marketing",
        href: ROUTES.services.socialMediaMarketing,
      },
      {
        label: "Performance Marketing",
        href: ROUTES.services.performanceMarketing,
      },
    ],
  },
  { label: "Portfolio", href: ROUTES.portfolio.root },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_NAV: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: ROUTES.about },
      { label: "Portfolio", href: ROUTES.portfolio.root },
      { label: "Contact", href: ROUTES.contact },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Branding", href: ROUTES.services.branding },
      {
        label: "Website Development",
        href: ROUTES.services.websiteDevelopment,
      },
      {
        label: "Social Media Marketing",
        href: ROUTES.services.socialMediaMarketing,
      },
      {
        label: "Performance Marketing",
        href: ROUTES.services.performanceMarketing,
      },
    ],
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/univodigital",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/univodigital",
    icon: "instagram",
  },
];
