export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "services",
    question: "What services does Univo Digital offer?",
    answer:
      "We specialize in branding, website development, social media marketing, and performance marketing — either as focused engagements or as an integrated growth partnership.",
  },
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "Timelines depend on scope. Brand systems often take 3–6 weeks, marketing websites 4–8 weeks, and ongoing social or paid programs run on monthly retainers with clear milestones from day one.",
  },
  {
    id: "process",
    question: "What does your process look like?",
    answer:
      "We follow four stages: Discover, Design, Build, and Launch & grow. Each phase includes clear deliverables, feedback loops, and decision points so progress stays transparent.",
  },
  {
    id: "pricing",
    question: "How do you price projects?",
    answer:
      "Most work is scoped as a fixed project fee or a monthly retainer. After a short discovery call, we share a proposal with timeline, deliverables, and investment clearly outlined.",
  },
  {
    id: "collaboration",
    question: "Who will we work with day to day?",
    answer:
      "You’ll collaborate directly with our strategy and design leads — not a black box. We keep communication focused, async-friendly, and accountable across every milestone.",
  },
  {
    id: "start",
    question: "How do we get started?",
    answer:
      "Book a consultation, share your goals and constraints, and we’ll recommend the right engagement. If it’s a fit, we kick off with discovery and a shared project plan.",
  },
];
