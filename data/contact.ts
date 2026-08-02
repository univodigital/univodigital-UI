import {
  ClockIcon,
  GlobeIcon,
  HandshakeIcon,
  LightbulbIcon,
  MailIcon,
  PhoneIcon,
  TargetIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { SITE } from "@/constants/site";
import type { ContactSubject } from "@/types";

export type ContactOption = {
  id: string;
  title: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  href?: string;
};

export type ContactServiceChoice = {
  id: string;
  title: string;
  description: string;
  subject: ContactSubject;
};

export type ContactWhyFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ContactTimelineStage = {
  id: string;
  label: string;
  description: string;
};

export type ContactFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    id: "email",
    title: "Email",
    value: SITE.email,
    detail: "Response within 24 hours",
    icon: MailIcon,
    href: `mailto:${SITE.email}`,
  },
  {
    id: "phone",
    title: "Phone",
    value: "+91 70236 10789",
    detail: "Available Monday – Saturday",
    icon: PhoneIcon,
    href: "tel:+917023610789",
  },
  {
    id: "location",
    title: "Location",
    value: "India",
    detail: "Working with clients worldwide",
    icon: GlobeIcon,
  },
  {
    id: "hours",
    title: "Business Hours",
    value: "Monday – Saturday",
    detail: "10:00 AM – 7:00 PM",
    icon: ClockIcon,
  },
];

export const CONTACT_SERVICE_CHOICES: ContactServiceChoice[] = [
  {
    id: "branding",
    title: "Branding",
    description:
      "Identity, visual systems, and brand strategy that make you unforgettable.",
    subject: "branding",
  },
  {
    id: "website",
    title: "Website Development",
    description:
      "Fast, conversion-focused websites built for growth and scalability.",
    subject: "website",
  },
  {
    id: "social",
    title: "Social Media Marketing",
    description:
      "Content, campaigns, and community building across the platforms that matter.",
    subject: "social",
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description:
      "Paid media and analytics-driven campaigns that deliver measurable ROI.",
    subject: "performance",
  },
];

export const CONTACT_WHY_FEATURES: ContactWhyFeature[] = [
  {
    id: "creative",
    title: "Creative Solutions",
    description: "Tailored strategies for every business.",
    icon: LightbulbIcon,
  },
  {
    id: "communication",
    title: "Transparent Communication",
    description: "Clear timelines and regular updates.",
    icon: UsersIcon,
  },
  {
    id: "results",
    title: "Results Focused",
    description: "Everything is designed to help your business grow.",
    icon: TargetIcon,
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    description: "We build relationships beyond project delivery.",
    icon: HandshakeIcon,
  },
];

export const CONTACT_TIMELINE: ContactTimelineStage[] = [
  {
    id: "discovery",
    label: "Discovery",
    description: "We learn about your goals, audience, and vision.",
  },
  {
    id: "strategy",
    label: "Strategy",
    description: "We define the roadmap, scope, and success metrics.",
  },
  {
    id: "design",
    label: "Design",
    description: "We craft visuals and experiences that reflect your brand.",
  },
  {
    id: "development",
    label: "Development",
    description: "We build, test, and refine every detail with precision.",
  },
  {
    id: "launch",
    label: "Launch",
    description: "We go live with confidence and a clear rollout plan.",
  },
  {
    id: "growth",
    label: "Growth",
    description: "We optimize, iterate, and scale what works.",
  },
];

export const CONTACT_FAQ_ITEMS: ContactFaqItem[] = [
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Timelines depend on scope and complexity. Branding projects typically take 4–8 weeks, websites 6–12 weeks, and ongoing marketing engagements run on monthly cycles. We share a detailed timeline after discovery so you know exactly what to expect.",
  },
  {
    id: "cost",
    question: "How much do your services cost?",
    answer:
      "Every project is tailored to your goals. We provide transparent proposals after understanding your requirements — no hidden fees. Share your brief through the form and we'll recommend the right approach and investment level.",
  },
  {
    id: "startups",
    question: "Do you work with startups?",
    answer:
      "Absolutely. We partner with ambitious startups and established brands alike. Whether you're launching from scratch or refining an existing presence, we adapt our process to your stage and budget.",
  },
  {
    id: "redesign",
    question: "Can you redesign an existing website?",
    answer:
      "Yes. We regularly help businesses modernize outdated websites — improving UX, performance, SEO, and conversion without losing brand equity. We'll audit what you have and propose a clear path forward.",
  },
  {
    id: "international",
    question: "Do you work internationally?",
    answer:
      "We work with clients across India and worldwide. Remote collaboration is built into our process — with structured check-ins, shared tools, and async updates that keep projects moving smoothly across time zones.",
  },
  {
    id: "after-submit",
    question: "What happens after I submit the form?",
    answer:
      "You'll receive a confirmation email within minutes. Our team reviews your brief within one business day and schedules a discovery call to discuss goals, timeline, and next steps. No pressure — just a thoughtful conversation.",
  },
];

export const CONTACT_SUBJECT_OPTIONS: {
  value: ContactSubject;
  label: string;
}[] = [
  { value: "branding", label: "Branding" },
  { value: "website", label: "Website Development" },
  { value: "social", label: "Social Media Marketing" },
  { value: "performance", label: "Performance Marketing" },
  { value: "consultation", label: "Free Consultation" },
  { value: "general", label: "General Inquiry" },
  { value: "other", label: "Other" },
];
