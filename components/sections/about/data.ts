import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  CompassIcon,
  FlaskConicalIcon,
  HandshakeIcon,
  LightbulbIcon,
  LineChartIcon,
  MessageSquareIcon,
  PaletteIcon,
  RocketIcon,
  SearchIcon,
  SparklesIcon,
  TargetIcon,
  TimerIcon,
  TrendingUpIcon,
  ZapIcon,
} from "lucide-react";

export type Belief = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type WhyFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type StoryStage = {
  id: string;
  label: string;
  icon: LucideIcon;
};

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export const STORY_STAGES: StoryStage[] = [
  { id: "idea", label: "Idea", icon: LightbulbIcon },
  { id: "strategy", label: "Strategy", icon: CompassIcon },
  { id: "execution", label: "Execution", icon: RocketIcon },
  { id: "growth", label: "Growth", icon: TrendingUpIcon },
];

export const BELIEFS: Belief[] = [
  {
    id: "strategy-first",
    title: "Strategy First",
    description: "Clarity before creative — every move starts with intent.",
    icon: TargetIcon,
  },
  {
    id: "creative-thinking",
    title: "Creative Thinking",
    description: "Bold ideas, refined into systems that feel premium.",
    icon: SparklesIcon,
  },
  {
    id: "growth-driven",
    title: "Growth Driven",
    description: "Design and campaigns measured by business outcomes.",
    icon: LineChartIcon,
  },
];

export const ABOUT_PROCESS: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description: "Goals, audience, and constraints — mapped with precision.",
    icon: SearchIcon,
  },
  {
    id: "research",
    title: "Research",
    description: "Market signals and competitive context, distilled clearly.",
    icon: FlaskConicalIcon,
  },
  {
    id: "strategy",
    title: "Strategy",
    description: "A focused plan that connects brand, product, and growth.",
    icon: CompassIcon,
  },
  {
    id: "execute",
    title: "Execute",
    description: "Crafted delivery across design, web, and campaigns.",
    icon: ZapIcon,
  },
  {
    id: "optimize",
    title: "Optimize",
    description: "Measure, refine, and compound what works.",
    icon: BarChart3Icon,
  },
];

export const WHY_FEATURES: WhyFeature[] = [
  {
    id: "transparent",
    title: "Transparent Communication",
    description: "Clear updates. No ambiguity. Shared visibility.",
    icon: MessageSquareIcon,
  },
  {
    id: "performance",
    title: "Performance Marketing",
    description: "Campaigns engineered for qualified demand.",
    icon: LineChartIcon,
  },
  {
    id: "creative",
    title: "Creative Solutions",
    description: "Distinctive brand systems that feel intentional.",
    icon: PaletteIcon,
  },
  {
    id: "partnership",
    title: "Long-Term Partnership",
    description: "Aligned for compounding results, not one-offs.",
    icon: HandshakeIcon,
  },
  {
    id: "data",
    title: "Data Driven",
    description: "Decisions guided by signal, not assumptions.",
    icon: BarChart3Icon,
  },
  {
    id: "fast",
    title: "Fast Turnaround",
    description: "Momentum without sacrificing craft.",
    icon: TimerIcon,
  },
];

export const ABOUT_STATS: Stat[] = [
  { id: "campaigns", value: 100, suffix: "+", label: "Campaigns" },
  { id: "projects", value: 15, suffix: "+", label: "Projects" },
  { id: "industries", value: 8, suffix: "+", label: "Industries" },
  { id: "satisfaction", value: 99, suffix: "%", label: "Client Satisfaction" },
];
