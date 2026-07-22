import type { LucideIcon } from "lucide-react";
import {
  LayersIcon,
  LineChartIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";

export type WhyChooseFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    id: "strategy",
    title: "Strategy before pixels",
    description:
      "Every engagement starts with clarity — audience, offer, and outcomes — so design and campaigns actually move the needle.",
    icon: TargetIcon,
  },
  {
    id: "craft",
    title: "Premium visual craft",
    description:
      "Clean typography, intentional motion, and refined interfaces that feel modern without looking like every other template.",
    icon: SparklesIcon,
  },
  {
    id: "systems",
    title: "Systems that scale",
    description:
      "Reusable components and brand systems built to grow with you — consistent across web, social, and campaigns.",
    icon: LayersIcon,
  },
  {
    id: "performance",
    title: "Built for performance",
    description:
      "Fast experiences, SEO-minded structure, and conversion-focused layouts that support real business goals.",
    icon: LineChartIcon,
  },
  {
    id: "partnership",
    title: "True partnership",
    description:
      "Direct collaboration with a team that listens, iterates quickly, and stays accountable from kickoff to launch.",
    icon: UsersIcon,
  },
  {
    id: "trust",
    title: "Reliable delivery",
    description:
      "Clear timelines, transparent communication, and quality standards you can trust on every milestone.",
    icon: ShieldCheckIcon,
  },
];
