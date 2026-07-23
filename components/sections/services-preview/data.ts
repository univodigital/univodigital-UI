export type ServiceCapabilityId =
  | "branding"
  | "website-development"
  | "social-media"
  | "performance";

export type ServiceCapability = {
  id: ServiceCapabilityId;
  title: string;
  description: string;
  tags: readonly string[];
};

/**
 * Four Univo capability cards — display-only home grid (not navigation).
 */
export const SERVICE_CAPABILITIES: readonly ServiceCapability[] = [
  {
    id: "branding",
    title: "Branding that sticks",
    description:
      "From positioning to visual systems, we shape brands that feel clear in the room and consistent everywhere they show up.",
    tags: [
      "Positioning",
      "Logo & Identity",
      "Brand Guidelines",
      "Messaging",
      "Art Direction",
      "Launch Kits",
    ],
  },
  {
    id: "website-development",
    title: "Websites that perform",
    description:
      "Clean, fast sites built on modern stacks — easy to manage, sharp on every screen, and ready for the traffic you want.",
    tags: [
      "Product Sites",
      "Marketing Sites",
      "Design Systems",
      "CMS Setup",
      "Motion & Micro-UX",
      "Handoff & Support",
    ],
  },
  {
    id: "social-media",
    title: "Social that compounds",
    description:
      "A steady creative engine — calendars, campaigns, and community work that keep your brand present without sounding generic.",
    tags: [
      "Channel Strategy",
      "Content Calendars",
      "Campaign Creatives",
      "Community Care",
      "Creator Collabs",
      "Reporting",
    ],
  },
  {
    id: "performance",
    title: "Growth you can measure",
    description:
      "Search, paid, and conversion work tied to real numbers — so spend, content, and experiments all pull in the same direction.",
    tags: [
      "Search Visibility",
      "Paid Acquisition",
      "Landing Pages",
      "Analytics Setup",
      "Experimentation",
      "Funnel Reviews",
    ],
  },
] as const;

/** @deprecated Prefer SERVICE_CAPABILITIES */
export const SERVICE_PREVIEW_ITEMS = SERVICE_CAPABILITIES;
export type ServicePreviewItem = ServiceCapability;
