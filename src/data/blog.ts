export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;     
  content: string;  
  tags?: string[];
  cover?: string;   
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "future-of-ai-in-mental-health",
    title: "The Future of AI in Mental Health",
    excerpt: "How AI is shaping the next generation of mental wellness tools and therapies.",
    date: "2024-10-26",
    tags: ["AI", "Mental Health", "Product"],
    cover: "/images/ai-future.jpg",
    content: `## The Future of AI in Mental Health
AI is reshaping assessment, triage, and support with safer guardrails and better UX.`,
  },
  {
    slug: "personalizing-therapy-with-ml",
    title: "Personalizing Therapy with Machine Learning",
    excerpt: "Tailoring treatment plans to individual needs with data-driven insights.",
    date: "2024-09-15",
    // ⬇️ Removed "Machine Learning", kept only Personalization
    tags: ["Personalization"],
    content: `## Personalizing Therapy
From clustering to reinforcement learning, ML can adapt interventions to the user.`,
  },
  {
    slug: "building-trust-in-ai-healthcare",
    title: "Building Trust in AI Healthcare",
    excerpt: "Our ethical approach to data privacy and patient security.",
    date: "2024-08-20",
    tags: ["Ethics", "Privacy"],
    cover: "/images/trust.jpg",
    content: `## Building Trust
Privacy by design, auditability, and clear consent are non-negotiable.`,
  },
];
