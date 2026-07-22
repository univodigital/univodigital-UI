export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
  external?: boolean;
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "linkedin" | "twitter" | "facebook" | "youtube" | "github";
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};
