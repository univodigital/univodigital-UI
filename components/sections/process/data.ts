import type { LucideIcon } from "lucide-react";
import {
  CompassIcon,
  LayersIcon,
  PenToolIcon,
  RocketIcon,
} from "lucide-react";

export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    step: 1,
    title: "Discover",
    description:
      "We align on goals, audience, and constraints — then map the opportunity with clear priorities.",
    icon: CompassIcon,
  },
  {
    id: "design",
    step: 2,
    title: "Design",
    description:
      "Brand, UX, and visual systems come together into a direction that feels premium and intentional.",
    icon: PenToolIcon,
  },
  {
    id: "build",
    step: 3,
    title: "Build",
    description:
      "We ship polished experiences — structured for performance, SEO, and long-term scalability.",
    icon: LayersIcon,
  },
  {
    id: "launch",
    step: 4,
    title: "Launch & grow",
    description:
      "Go live with confidence, then refine with measurement, campaigns, and continuous improvement.",
    icon: RocketIcon,
  },
];
