export type TestimonialPreview = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  /** Initials for avatar placeholder */
  initials: string;
};

export type CompanyLogo = {
  id: string;
  name: string;
};

export const TESTIMONIALS: TestimonialPreview[] = [
  {
    id: "1",
    name: "Aisha Rahman",
    role: "Head of Brand",
    company: "Northline",
    quote:
      "Univo Digital gave our brand a sharper voice and a digital presence that finally matches how we operate. The process was clear, collaborative, and fast.",
    rating: 5,
    initials: "AR",
  },
  {
    id: "2",
    name: "Marcus Chen",
    role: "Founder",
    company: "Vespera",
    quote:
      "They didn't just design a website — they built a conversion system. Launch week performance exceeded every benchmark we set.",
    rating: 5,
    initials: "MC",
  },
  {
    id: "3",
    name: "Priya Nair",
    role: "Marketing Director",
    company: "Cobalt Lab",
    quote:
      "Our social content finally feels intentional. The team connected creative direction with measurable outcomes without slowing us down.",
    rating: 5,
    initials: "PN",
  },
  {
    id: "4",
    name: "Daniel Okonkwo",
    role: "Growth Lead",
    company: "Atelier Nine",
    quote:
      "Paid acquisition used to feel noisy. Univo brought structure, sharper landing experiences, and reporting we actually trust.",
    rating: 5,
    initials: "DO",
  },
  {
    id: "5",
    name: "Elena Brooks",
    role: "CEO",
    company: "Kinetic Co",
    quote:
      "Premium craft with commercial thinking. Rare combination — and exactly what we needed for our next stage of growth.",
    rating: 5,
    initials: "EB",
  },
];

export const TESTIMONIAL_COMPANIES: CompanyLogo[] = [
  { id: "northline", name: "Northline" },
  { id: "vespera", name: "Vespera" },
  { id: "cobalt", name: "Cobalt Lab" },
  { id: "atelier", name: "Atelier Nine" },
  { id: "kinetic", name: "Kinetic Co" },
  { id: "plainform", name: "Plainform" },
];
