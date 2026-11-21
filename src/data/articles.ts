export interface Article {
  slug: string;
  title: string;
  description: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    slug: "building-async-first-cultures",
    title: "Building async-first cultures that actually scale",
    description:
      "Explore how distributed teams reduce meeting fatigue, document decisions better, and maintain velocity without constant check-ins.",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces",
    imageAlt: "Team collaborating around a shared workspace",
    body: [
      "Async-first is not anti-meeting. It is pro-documentation. Teams that scale do so by making decisions discoverable, not by eliminating conversation.",
      "Start with a simple rule: every decision worth remembering gets a written record. Stand-ups become written updates. Design reviews become annotated docs. Status becomes a dashboard, not a call.",
      "The payoff is velocity. When context lives in writing, new joiners ramp faster, time zones stop being blockers, and meetings shrink to the ones that actually need human judgment.",
      "Pilot it in one squad for two sprints. Measure meeting hours saved and decision lead time. If both improve, roll it out team-wide.",
    ],
  },
  {
    slug: "rethinking-feedback-loops",
    title: "Rethinking feedback loops in product development",
    description:
      "Why the best product teams treat user signals as system inputs — and how tighter loops accelerate iteration cycles.",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces",
    imageAlt: "Professional reviewing analytics on screen",
    body: [
      "Feedback loops are only as good as their cadence. A quarterly survey tells you what happened; a weekly signal tells you what to do next.",
      "Treat user behaviour as a system input, not a report. Instrument the moments that matter, set thresholds, and let the data trigger action instead of waiting for a review.",
      "Tight loops compound. Small, frequent adjustments beat big, rare redesigns — and they keep teams aligned with what users actually do, not what they said they would do.",
      "Pick one metric, one segment, one weekly check-in. Automate the rest. Then expand.",
    ],
  },
  {
    slug: "incremental-architecture-decisions",
    title: "The case for incremental architecture decisions",
    description:
      "Discover why small, reversible technical bets outperform big-bang rewrites — and how to bake this mindset into your roadmap.",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces",
    imageAlt: "Engineer working on technical architecture",
    body: [
      "Big-bang rewrites fail because they concentrate risk. Incremental decisions spread it. Each small bet is reversible, testable, and cheap to abandon.",
      "Frame architecture choices as experiments: hypothesis, smallest change, measurement, keep or revert. The roadmap becomes a sequence of bets, not a single leap of faith.",
      "This mindset also keeps the team shipping. You never freeze delivery for a rewrite; you improve the system while it runs.",
      "Start with one pain point. Make the smallest change that could help. Measure. Repeat.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}