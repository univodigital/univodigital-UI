import type { LucideIcon } from "lucide-react";
import {
  BarChart3Icon,
  BookOpenIcon,
  CalendarIcon,
  CameraIcon,
  ChartLineIcon,
  CircleDotIcon,
  ClockIcon,
  CodeIcon,
  CompassIcon,
  EyeIcon,
  FingerprintIcon,
  GlobeIcon,
  HandshakeIcon,
  HeartIcon,
  LayersIcon,
  LayoutGridIcon,
  LightbulbIcon,
  LineChartIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  MousePointerClickIcon,
  PackageIcon,
  PaletteIcon,
  PenToolIcon,
  RefreshCwIcon,
  RocketIcon,
  SearchIcon,
  Share2Icon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparklesIcon,
  TargetIcon,
  TimerIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";
import type { ServiceSlug } from "@/types";

export type ServiceVisualType =
  | "branding"
  | "website"
  | "social"
  | "performance";

export type ServiceOffering = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceTimelineStep = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export type ServiceFeature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceBenefit = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ServiceProject = {
  id: string;
  title: string;
  client: string;
  categoryLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** Portfolio slug — omit for placeholder cards */
  slug?: string;
  isPlaceholder?: boolean;
};

export type ServicePageData = {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  metaDescription: string;
  visualType: ServiceVisualType;
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  introduction: {
    eyebrow: string;
    heading: string;
    subheading: string;
    body: string;
  };
  offerings: {
    eyebrow: string;
    heading: string;
    items: ServiceOffering[];
  };
  process: {
    eyebrow: string;
    heading: string;
    steps: ServiceTimelineStep[];
  };
  whyChoose: {
    eyebrow: string;
    heading: string;
    features: ServiceFeature[];
  };
  projects: {
    eyebrow: string;
    heading: string;
    items: ServiceProject[];
  };
  benefits: {
    eyebrow: string;
    heading: string;
    items: ServiceBenefit[];
  };
  faq: {
    eyebrow: string;
    heading: string;
    description: string;
    items: ServiceFaqItem[];
  };
  cta: {
    headline: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

const SHARED_WHY_FEATURES: ServiceFeature[] = [
  {
    id: "creative-thinking",
    title: "Creative Thinking",
    description:
      "We approach every brief with fresh perspective — blending strategy with design that feels intentional, not templated.",
    icon: LightbulbIcon,
  },
  {
    id: "results-driven",
    title: "Results Driven",
    description:
      "Beautiful work is the baseline. We measure success by the outcomes it creates for your business.",
    icon: TargetIcon,
  },
  {
    id: "transparent-communication",
    title: "Transparent Communication",
    description:
      "Clear timelines, honest feedback, and regular updates — you always know where your project stands.",
    icon: MessageSquareIcon,
  },
  {
    id: "fast-delivery",
    title: "Fast Delivery",
    description:
      "Focused sprints and efficient workflows mean you launch sooner without sacrificing quality.",
    icon: TimerIcon,
  },
  {
    id: "modern-technologies",
    title: "Modern Technologies",
    description:
      "We build with current tools and platforms so your brand stays performant, secure, and scalable.",
    icon: CodeIcon,
  },
  {
    id: "long-term-partnership",
    title: "Long-Term Partnership",
    description:
      "Many clients grow with us over years — from first logo to full digital ecosystems.",
    icon: HandshakeIcon,
  },
];

const SHARED_PROCESS: ServiceTimelineStep[] = [
  {
    id: "discover",
    number: "01",
    title: "Discover",
    description:
      "We learn your business, audience, and goals through focused conversations and research.",
  },
  {
    id: "research",
    number: "02",
    title: "Research",
    description:
      "Market analysis, competitor review, and audience insights shape every decision ahead.",
  },
  {
    id: "strategy",
    number: "03",
    title: "Strategy",
    description:
      "A clear roadmap with priorities, timelines, and success metrics everyone agrees on.",
  },
  {
    id: "execution",
    number: "04",
    title: "Execution",
    description:
      "Design, development, and content come together with precision and regular check-ins.",
  },
  {
    id: "optimization",
    number: "05",
    title: "Optimization",
    description:
      "We refine based on data and feedback — improving what works and fixing what doesn't.",
  },
  {
    id: "growth",
    number: "06",
    title: "Growth",
    description:
      "Launch is a starting point. We help you scale, iterate, and build lasting momentum.",
  },
];

export const SERVICES: ServicePageData[] = [
  {
    slug: "branding",
    title: "Branding",
    tagline: "Identity that earns attention and trust",
    description:
      "We craft brand systems that make your business memorable — from strategy and visual identity to guidelines your team can actually use.",
    metaDescription:
      "Premium branding services by Univo Digital — logo design, brand strategy, visual identity, packaging, and brand guidelines for businesses that want to stand out.",
    visualType: "branding",
    hero: {
      eyebrow: "Branding",
      headline: "Build a brand",
      headlineAccent: "people remember",
      description:
        "Your brand is more than a logo. We design cohesive identity systems that communicate who you are, build trust, and create lasting recognition.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: { label: "View Our Work", href: ROUTES.portfolio.root },
    },
    introduction: {
      eyebrow: "Why it matters",
      heading: "Why This Service Matters",
      subheading: "First impressions shape every relationship",
      body: "Before a customer reads a single word on your website, they've already formed an opinion. Strong branding gives you control over that moment — creating recognition, communicating quality, and building the trust that turns visitors into loyal customers. Businesses with consistent brand presentation see up to 23% higher revenue. We help you show up with clarity and confidence across every touchpoint.",
    },
    offerings: {
      eyebrow: "Capabilities",
      heading: "What We Offer",
      items: [
        {
          id: "logo-design",
          title: "Logo Design",
          description:
            "Distinctive marks designed to work at every size — from favicon to storefront signage.",
          icon: PenToolIcon,
        },
        {
          id: "brand-strategy",
          title: "Brand Strategy",
          description:
            "Positioning, messaging, and audience definition that gives your creative direction purpose.",
          icon: CompassIcon,
        },
        {
          id: "brand-identity",
          title: "Brand Identity",
          description:
            "Complete visual systems — color, typography, imagery, and tone — built for consistency.",
          icon: FingerprintIcon,
        },
        {
          id: "visual-language",
          title: "Visual Language",
          description:
            "Patterns, textures, and design elements that make your brand instantly recognizable.",
          icon: PaletteIcon,
        },
        {
          id: "packaging",
          title: "Packaging",
          description:
            "Product packaging that stands out on shelves and reinforces your brand story.",
          icon: PackageIcon,
        },
        {
          id: "brand-guidelines",
          title: "Brand Guidelines",
          description:
            "Practical documentation so your team and partners apply the brand correctly every time.",
          icon: BookOpenIcon,
        },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Our Process",
      steps: SHARED_PROCESS,
    },
    whyChoose: {
      eyebrow: "Why Univo",
      heading: "Why Choose Univo",
      features: SHARED_WHY_FEATURES,
    },
    projects: {
      eyebrow: "Featured Work",
      heading: "Featured Projects",
      items: [
        {
          id: "taglio-branding",
          title: "Taglio",
          client: "Taglio",
          categoryLabel: "Brand Identity",
          imageSrc: "/images/portfolio/taglio/logo.png",
          imageAlt: "Taglio brand identity and logo design",
          slug: "taglio",
        },
      ],
    },
    benefits: {
      eyebrow: "Outcomes",
      heading: "What You Gain",
      items: [
        {
          id: "recognition",
          title: "Increase Brand Recognition",
          description:
            "A cohesive identity makes your business instantly identifiable in crowded markets.",
          icon: EyeIcon,
        },
        {
          id: "trust",
          title: "Build Customer Trust",
          description:
            "Professional branding signals quality and reliability before you say a word.",
          icon: ShieldCheckIcon,
        },
        {
          id: "leads",
          title: "Generate More Leads",
          description:
            "Strong first impressions convert curiosity into conversations and inquiries.",
          icon: UsersIcon,
        },
        {
          id: "presence",
          title: "Strengthen Online Presence",
          description:
            "Consistent visuals across digital channels create a unified, premium experience.",
          icon: GlobeIcon,
        },
        {
          id: "growth",
          title: "Drive Sustainable Growth",
          description:
            "Brand equity compounds over time — every interaction reinforces your market position.",
          icon: TrendingUpIcon,
        },
        {
          id: "differentiation",
          title: "Stand Out From Competitors",
          description:
            "Distinctive design and messaging help you own a space competitors can't replicate.",
          icon: SparklesIcon,
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common Questions",
      description:
        "Everything you need to know about our branding process, timelines, and deliverables.",
      items: [
        {
          id: "branding-1",
          question: "How long does a branding project take?",
          answer:
            "Most branding projects take 4–8 weeks depending on scope. A logo-only project may finish in 2–3 weeks, while a full identity system with guidelines typically needs 6–8 weeks. We provide a clear timeline during discovery.",
        },
        {
          id: "branding-2",
          question: "What's included in a brand identity package?",
          answer:
            "Our packages typically include logo design, color palette, typography, visual language elements, and brand guidelines. We tailor deliverables to your needs — whether you need a complete system or focused updates to an existing brand.",
        },
        {
          id: "branding-3",
          question: "Do you work with existing brands or only new ones?",
          answer:
            "Both. We help startups build from scratch and assist established businesses with rebrands, refreshes, or extending their identity to new products and markets.",
        },
        {
          id: "branding-4",
          question: "How many logo concepts do you present?",
          answer:
            "We typically present 2–3 refined directions after an initial discovery phase. Rather than overwhelming you with options, we focus on strategic concepts backed by research and rationale.",
        },
        {
          id: "branding-5",
          question: "Will I own the final brand assets?",
          answer:
            "Yes. Upon project completion and final payment, you receive full ownership of all deliverables including source files, fonts, and usage rights.",
        },
        {
          id: "branding-6",
          question: "Can you help apply the brand across my website and social media?",
          answer:
            "Absolutely. Branding often flows into our web development and social media services. We design systems that work seamlessly across every channel your customers touch.",
        },
        {
          id: "branding-7",
          question: "What do you need from us to get started?",
          answer:
            "A brief discovery call, access to any existing brand materials, and clarity on your goals and target audience. We handle the rest — research, creative direction, and iterative refinement.",
        },
      ],
    },
    cta: {
      headline: "Let's Build Something Exceptional Together",
      description:
        "Ready to create a brand that stands out? Tell us about your vision and we'll craft an identity worth remembering.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: {
        label: "Schedule a Consultation",
        href: ROUTES.contact,
      },
    },
  },
  {
    slug: "website-development",
    title: "Website Development",
    tagline: "Digital experiences built to convert",
    description:
      "We design and develop fast, beautiful websites that turn visitors into customers — from business sites and landing pages to full e-commerce platforms.",
    metaDescription:
      "Website development by Univo Digital — business websites, landing pages, e-commerce, CMS integration, performance optimization, and SEO-ready builds.",
    visualType: "website",
    hero: {
      eyebrow: "Website Development",
      headline: "Websites that",
      headlineAccent: "work as hard as you do",
      description:
        "Your website is your most visible salesperson. We build fast, responsive, conversion-focused experiences that represent your brand and drive real business results.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: { label: "View Our Work", href: ROUTES.portfolio.root },
    },
    introduction: {
      eyebrow: "Why it matters",
      heading: "Why This Service Matters",
      subheading: "Your website is your 24/7 storefront",
      body: "Most customers research online before they buy. If your website is slow, outdated, or hard to navigate, you're losing business to competitors who invested in their digital presence. A well-built website builds credibility, captures leads around the clock, and scales with your growth. We focus on speed, clarity, and conversion — so every visit has the best chance of becoming a customer.",
    },
    offerings: {
      eyebrow: "Capabilities",
      heading: "What We Offer",
      items: [
        {
          id: "business-websites",
          title: "Business Websites",
          description:
            "Professional multi-page sites that communicate your value and guide visitors to action.",
          icon: GlobeIcon,
        },
        {
          id: "landing-pages",
          title: "Landing Pages",
          description:
            "Focused, high-converting pages designed for campaigns, launches, and lead capture.",
          icon: LayoutGridIcon,
        },
        {
          id: "ecommerce",
          title: "E-commerce",
          description:
            "Online stores with intuitive product discovery, secure checkout, and scalable catalog management.",
          icon: ShoppingCartIcon,
        },
        {
          id: "cms",
          title: "CMS Integration",
          description:
            "Content management systems that let your team update pages without touching code.",
          icon: LayersIcon,
        },
        {
          id: "performance",
          title: "Performance Optimization",
          description:
            "Lightning-fast load times and Core Web Vitals scores that keep visitors engaged.",
          icon: ZapIcon,
        },
        {
          id: "seo-ready",
          title: "SEO Ready",
          description:
            "Clean architecture, semantic markup, and technical foundations built for search visibility.",
          icon: SearchIcon,
        },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Our Process",
      steps: SHARED_PROCESS,
    },
    whyChoose: {
      eyebrow: "Why Univo",
      heading: "Why Choose Univo",
      features: SHARED_WHY_FEATURES,
    },
    projects: {
      eyebrow: "Featured Work",
      heading: "Featured Projects",
      items: [
        {
          id: "soil2spoon-web",
          title: "Soil2Spoon",
          client: "Soil2Spoon",
          categoryLabel: "Website Development",
          imageSrc: "/images/portfolio/soil2spoon/logo.png",
          imageAlt: "Soil2Spoon brand identity and logo design",
          slug: "soil2spoon",
        },
      ],
    },
    benefits: {
      eyebrow: "Outcomes",
      heading: "What You Gain",
      items: [
        {
          id: "conversions",
          title: "Improve Conversion Rates",
          description:
            "Strategic UX and clear calls-to-action turn more visitors into paying customers.",
          icon: MousePointerClickIcon,
        },
        {
          id: "leads",
          title: "Generate More Leads",
          description:
            "Optimized forms, landing pages, and contact flows capture interest when it matters most.",
          icon: UsersIcon,
        },
        {
          id: "trust",
          title: "Build Customer Trust",
          description:
            "A polished, professional site signals credibility and competence from the first click.",
          icon: ShieldCheckIcon,
        },
        {
          id: "presence",
          title: "Strengthen Online Presence",
          description:
            "A fast, mobile-first website ensures you show up strong on every device and platform.",
          icon: GlobeIcon,
        },
        {
          id: "growth",
          title: "Drive Sustainable Growth",
          description:
            "Scalable architecture means your site grows with your business — no rebuilds required.",
          icon: TrendingUpIcon,
        },
        {
          id: "speed",
          title: "Faster Time to Market",
          description:
            "Efficient development sprints get you live sooner without cutting corners on quality.",
          icon: RocketIcon,
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common Questions",
      description:
        "Answers about our web development process, technology choices, and project timelines.",
      items: [
        {
          id: "web-1",
          question: "What technologies do you use?",
          answer:
            "We primarily build with Next.js, React, and Tailwind CSS for performance and maintainability. For e-commerce, we work with Shopify and custom solutions. We choose the stack based on your needs — not trends.",
        },
        {
          id: "web-2",
          question: "How long does a website project take?",
          answer:
            "A landing page can launch in 2–3 weeks. Business websites typically take 4–8 weeks. E-commerce projects range from 6–12 weeks depending on catalog size and custom features. We provide a detailed timeline after discovery.",
        },
        {
          id: "web-3",
          question: "Will my website be mobile-friendly?",
          answer:
            "Every site we build is mobile-first and fully responsive. We test across devices and screen sizes to ensure a seamless experience everywhere.",
        },
        {
          id: "web-4",
          question: "Do you provide hosting and maintenance?",
          answer:
            "We can recommend and set up hosting on platforms like Vercel or AWS. We also offer ongoing maintenance packages for updates, security patches, and content changes.",
        },
        {
          id: "web-5",
          question: "Can you redesign my existing website?",
          answer:
            "Yes. We regularly take outdated sites and transform them into modern, high-performing experiences — preserving SEO value while upgrading design and functionality.",
        },
        {
          id: "web-6",
          question: "Is SEO included in web development?",
          answer:
            "We build with SEO fundamentals baked in — semantic HTML, fast load times, meta tags, sitemaps, and structured data. Dedicated SEO campaigns are available as a separate service.",
        },
        {
          id: "web-7",
          question: "Will I be able to update content myself?",
          answer:
            "We integrate user-friendly CMS options so your team can manage pages, blog posts, and products without developer help. We also provide training during handoff.",
        },
      ],
    },
    cta: {
      headline: "Let's Build Something Exceptional Together",
      description:
        "Ready for a website that represents your brand and drives results? Let's talk about your project.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: {
        label: "Schedule a Consultation",
        href: ROUTES.contact,
      },
    },
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    tagline: "Content that connects and converts",
    description:
      "We build social presence that feels authentic and drives engagement — from content strategy and creative design to community management and analytics.",
    metaDescription:
      "Social media marketing by Univo Digital — content strategy, creative design, Instagram marketing, community management, and analytics for brands that want to grow online.",
    visualType: "social",
    hero: {
      eyebrow: "Social Media Marketing",
      headline: "Turn followers",
      headlineAccent: "into fans",
      description:
        "Social media isn't about posting more — it's about posting with purpose. We create content strategies and visuals that build community, drive engagement, and grow your brand online.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: { label: "View Our Work", href: ROUTES.portfolio.root },
    },
    introduction: {
      eyebrow: "Why it matters",
      heading: "Why This Service Matters",
      subheading: "Your audience lives on social — meet them there",
      body: "Social platforms are where customers discover brands, form opinions, and decide who to trust. Consistent, high-quality content builds familiarity and loyalty over time. But random posting won't cut it — you need a strategy that aligns with your business goals, speaks to your audience, and creates content worth sharing. We help you show up consistently with creative that earns attention and drives action.",
    },
    offerings: {
      eyebrow: "Capabilities",
      heading: "What We Offer",
      items: [
        {
          id: "content-strategy",
          title: "Content Strategy",
          description:
            "Platform-specific plans aligned with your brand voice, audience, and business objectives.",
          icon: CompassIcon,
        },
        {
          id: "creative-design",
          title: "Creative Design",
          description:
            "Scroll-stopping visuals, reels, and graphics designed for each platform's format and audience.",
          icon: PaletteIcon,
        },
        {
          id: "content-calendar",
          title: "Content Calendar",
          description:
            "Structured posting schedules that maintain consistency without last-minute scrambling.",
          icon: CalendarIcon,
        },
        {
          id: "instagram-marketing",
          title: "Instagram Marketing",
          description:
            "Feed design, stories, reels, and profile optimization built for discovery and engagement.",
          icon: CameraIcon,
        },
        {
          id: "community-management",
          title: "Community Management",
          description:
            "Thoughtful engagement with your audience — replies, comments, and relationship building.",
          icon: HeartIcon,
        },
        {
          id: "analytics",
          title: "Analytics",
          description:
            "Performance tracking and reporting so you understand what's working and where to invest next.",
          icon: BarChart3Icon,
        },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Our Process",
      steps: SHARED_PROCESS,
    },
    whyChoose: {
      eyebrow: "Why Univo",
      heading: "Why Choose Univo",
      features: SHARED_WHY_FEATURES,
    },
    projects: {
      eyebrow: "Featured Work",
      heading: "Featured Projects",
      items: [
        {
          id: "taglio-social",
          title: "Taglio",
          client: "Taglio",
          categoryLabel: "Social Media",
          imageSrc: "/images/portfolio/taglio/instagram-profile.png",
          imageAlt: "Taglio Instagram profile and social media creatives",
          slug: "taglio",
        },
      ],
    },
    benefits: {
      eyebrow: "Outcomes",
      heading: "What You Gain",
      items: [
        {
          id: "recognition",
          title: "Increase Brand Recognition",
          description:
            "Consistent, quality content keeps your brand top-of-mind across platforms your audience uses daily.",
          icon: EyeIcon,
        },
        {
          id: "trust",
          title: "Build Customer Trust",
          description:
            "Authentic engagement and professional visuals signal a brand that cares about its community.",
          icon: ShieldCheckIcon,
        },
        {
          id: "engagement",
          title: "Boost Engagement",
          description:
            "Strategic content and creative design drive likes, shares, comments, and meaningful conversations.",
          icon: Share2Icon,
        },
        {
          id: "presence",
          title: "Strengthen Online Presence",
          description:
            "A cohesive social feed reinforces your brand identity and complements your website and marketing.",
          icon: GlobeIcon,
        },
        {
          id: "leads",
          title: "Generate More Leads",
          description:
            "Social content with clear CTAs and landing page integration turns followers into prospects.",
          icon: UsersIcon,
        },
        {
          id: "growth",
          title: "Drive Sustainable Growth",
          description:
            "Compounding audience growth and engagement create long-term marketing assets for your business.",
          icon: TrendingUpIcon,
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common Questions",
      description:
        "What to expect when working with us on social media strategy and content creation.",
      items: [
        {
          id: "social-1",
          question: "Which platforms do you manage?",
          answer:
            "We primarily focus on Instagram, LinkedIn, and Facebook — the platforms most relevant for B2B and consumer brands. We can advise on emerging platforms based on your audience.",
        },
        {
          id: "social-2",
          question: "Do you create the content or just strategy?",
          answer:
            "Both. We develop the strategy and create the visuals, copy, and calendar. For brands with in-house teams, we can provide creative direction and templates instead.",
        },
        {
          id: "social-3",
          question: "How often will you post on our accounts?",
          answer:
            "Posting frequency depends on your goals and platform. Most clients start with 3–5 posts per week on Instagram, adjusted based on performance data and audience response.",
        },
        {
          id: "social-4",
          question: "Can you manage paid social alongside organic?",
          answer:
            "Yes. Organic and paid social work best together. We coordinate content strategy with our performance marketing team for boosted posts and ad campaigns.",
        },
        {
          id: "social-5",
          question: "How do you measure success?",
          answer:
            "We track engagement rate, reach, follower growth, click-throughs, and conversions tied to social campaigns. Monthly reports show progress against agreed KPIs.",
        },
        {
          id: "social-6",
          question: "What if we already have a brand identity?",
          answer:
            "We adapt our creative to your existing brand guidelines. If you need branding work first, our branding team ensures everything aligns before content production begins.",
        },
        {
          id: "social-7",
          question: "How long before we see results?",
          answer:
            "Social media is a long game. Most clients see meaningful engagement growth within 2–3 months of consistent, strategic posting. We set realistic expectations during onboarding.",
        },
      ],
    },
    cta: {
      headline: "Let's Build Something Exceptional Together",
      description:
        "Ready to grow your social presence with content that resonates? Let's create a strategy that works.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: {
        label: "Schedule a Consultation",
        href: ROUTES.contact,
      },
    },
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tagline: "Campaigns measured by results, not vanity metrics",
    description:
      "We run data-driven ad campaigns that generate leads and revenue — Google Ads, Meta Ads, remarketing, conversion tracking, and continuous optimization.",
    metaDescription:
      "Performance marketing by Univo Digital — Google Ads, Meta Ads, lead generation, remarketing, conversion tracking, and campaign optimization for measurable ROI.",
    visualType: "performance",
    hero: {
      eyebrow: "Performance Marketing",
      headline: "Ads that",
      headlineAccent: "pay for themselves",
      description:
        "Every rupee spent should move the needle. We build and optimize paid campaigns focused on leads, sales, and measurable return — not just impressions.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: { label: "Schedule a Consultation", href: ROUTES.contact },
    },
    introduction: {
      eyebrow: "Why it matters",
      heading: "Why This Service Matters",
      subheading: "Growth you can measure and scale",
      body: "Organic reach alone rarely delivers predictable growth. Paid advertising puts your brand in front of the right people at the right time — but only when campaigns are structured, tracked, and optimized with discipline. Poorly managed ads burn budget fast. We build campaigns with clear goals, precise targeting, and continuous refinement so your marketing spend generates real returns you can report to stakeholders with confidence.",
    },
    offerings: {
      eyebrow: "Capabilities",
      heading: "What We Offer",
      items: [
        {
          id: "google-ads",
          title: "Google Ads",
          description:
            "Search, display, and shopping campaigns that capture high-intent customers actively looking for you.",
          icon: SearchIcon,
        },
        {
          id: "meta-ads",
          title: "Meta Ads",
          description:
            "Facebook and Instagram campaigns with precise audience targeting and creative testing at scale.",
          icon: MegaphoneIcon,
        },
        {
          id: "lead-generation",
          title: "Lead Generation",
          description:
            "Funnel design and ad strategies built to capture qualified leads and fill your pipeline.",
          icon: UsersIcon,
        },
        {
          id: "remarketing",
          title: "Remarketing",
          description:
            "Re-engage visitors who didn't convert the first time with tailored follow-up campaigns.",
          icon: RefreshCwIcon,
        },
        {
          id: "conversion-tracking",
          title: "Conversion Tracking",
          description:
            "Proper pixel setup, event tracking, and attribution so you know exactly what's driving results.",
          icon: CircleDotIcon,
        },
        {
          id: "campaign-optimization",
          title: "Campaign Optimization",
          description:
            "Ongoing A/B testing, bid management, and budget allocation to maximize ROAS over time.",
          icon: LineChartIcon,
        },
      ],
    },
    process: {
      eyebrow: "Process",
      heading: "Our Process",
      steps: SHARED_PROCESS,
    },
    whyChoose: {
      eyebrow: "Why Univo",
      heading: "Why Choose Univo",
      features: SHARED_WHY_FEATURES,
    },
    projects: {
      eyebrow: "Featured Work",
      heading: "Featured Projects",
      items: [
        {
          id: "perf-placeholder-1",
          title: "E-commerce Growth",
          client: "Retail Brand",
          categoryLabel: "Google & Meta Ads",
          imageSrc: "/images/services/performance.svg",
          imageAlt: "Performance marketing campaign dashboard preview",
          isPlaceholder: true,
        },
        {
          id: "perf-placeholder-2",
          title: "Lead Gen Funnel",
          client: "B2B SaaS",
          categoryLabel: "Lead Generation",
          imageSrc: "/images/services/performance.svg",
          imageAlt: "Lead generation campaign analytics preview",
          isPlaceholder: true,
        },
      ],
    },
    benefits: {
      eyebrow: "Outcomes",
      heading: "What You Gain",
      items: [
        {
          id: "leads",
          title: "Generate More Leads",
          description:
            "Targeted campaigns reach prospects ready to buy — filling your pipeline with qualified opportunities.",
          icon: UsersIcon,
        },
        {
          id: "conversions",
          title: "Improve Conversion Rates",
          description:
            "Landing page alignment, ad creative testing, and audience refinement lift conversion at every stage.",
          icon: MousePointerClickIcon,
        },
        {
          id: "roi",
          title: "Maximize Return on Ad Spend",
          description:
            "Continuous optimization ensures budget flows to campaigns and audiences that actually perform.",
          icon: ChartLineIcon,
        },
        {
          id: "visibility",
          title: "Increase Brand Visibility",
          description:
            "Strategic ad placement puts your brand in front of the right audience at scale.",
          icon: EyeIcon,
        },
        {
          id: "data",
          title: "Make Data-Driven Decisions",
          description:
            "Clear reporting and attribution give you confidence in where to invest next.",
          icon: BarChart3Icon,
        },
        {
          id: "growth",
          title: "Drive Sustainable Growth",
          description:
            "Scalable campaign structures grow with your business — from first sale to market expansion.",
          icon: TrendingUpIcon,
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Common Questions",
      description:
        "How we approach paid advertising, budgets, reporting, and campaign management.",
      items: [
        {
          id: "perf-1",
          question: "What's the minimum ad budget you work with?",
          answer:
            "We typically recommend a minimum monthly ad spend of ₹30,000–50,000 plus our management fee. This gives campaigns enough data to optimize effectively. We'll advise honestly if your budget isn't sufficient for meaningful results.",
        },
        {
          id: "perf-2",
          question: "How quickly will I see results?",
          answer:
            "Search campaigns can generate leads within days of launch. Meta campaigns usually need 2–4 weeks of learning and optimization before performance stabilizes. We set expectations based on your industry and competition.",
        },
        {
          id: "perf-3",
          question: "Do you create ad creatives or do we provide them?",
          answer:
            "We handle creative production — ad copy, images, and video variations for testing. If you have existing brand assets, we adapt them. For full brand campaigns, we coordinate with our design team.",
        },
        {
          id: "perf-4",
          question: "How do you report on campaign performance?",
          answer:
            "Monthly reports cover spend, impressions, clicks, conversions, cost per lead, and ROAS. We also provide access to live dashboards so you can check performance anytime.",
        },
        {
          id: "perf-5",
          question: "Can you work with our existing ad accounts?",
          answer:
            "Yes. We can take over existing Google Ads and Meta Business accounts, audit current performance, and restructure campaigns for better results.",
        },
        {
          id: "perf-6",
          question: "What's your management fee structure?",
          answer:
            "We offer flat monthly retainers based on campaign complexity and ad spend tier. No hidden fees — you always know what you're paying for management versus media spend.",
        },
        {
          id: "perf-7",
          question: "Do you guarantee results?",
          answer:
            "We don't guarantee specific numbers — no ethical agency can. We guarantee disciplined strategy, transparent reporting, and continuous optimization focused on your KPIs.",
        },
        {
          id: "perf-8",
          question: "Can performance marketing work with our website and branding?",
          answer:
            "Absolutely. Campaigns perform best when landing pages, brand creative, and tracking are aligned. We often collaborate across our web and branding teams for integrated results.",
        },
      ],
    },
    cta: {
      headline: "Let's Build Something Exceptional Together",
      description:
        "Ready to turn ad spend into measurable growth? Let's design campaigns that deliver real returns.",
      primaryCta: { label: "Start Your Project", href: ROUTES.contact },
      secondaryCta: {
        label: "Schedule a Consultation",
        href: ROUTES.contact,
      },
    },
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return SERVICES.map((service) => service.slug);
}

export function getServiceHref(slug: ServiceSlug): string {
  const routeMap: Record<ServiceSlug, string> = {
    branding: ROUTES.services.branding,
    "website-development": ROUTES.services.websiteDevelopment,
    "social-media-marketing": ROUTES.services.socialMediaMarketing,
    "performance-marketing": ROUTES.services.performanceMarketing,
  };
  return routeMap[slug];
}
