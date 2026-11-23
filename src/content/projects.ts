import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "landsiedel",
    title: "Two web platforms for a German seminar company",
    summary:
      "For a provider of seminars in Neuro-Linguistic Programming, I built and launched an online magazine in 8 languages and a seminar platform, with a Stripe payment system and an AI search. I was the company’s only developer.",
    role: "Full-stack developer (internship)",
    setting: "Landsiedel NLP Training GmbH, Germany",
    period: "January to June 2025",
    stack: ["PHP", "JavaScript", "MySQL", "Stripe API", "OpenAI API"],
    links: [
      { label: "world-of-nlp.org", href: "https://world-of-nlp.org" },
      { label: "webinar-tv.de", href: "https://webinar-tv.de" },
    ],
  },
  {
    slug: "living-architecture",
    title: "Living Architecture",
    summary:
      "A tool that records how a Python application really runs and turns its method calls into UML sequence diagrams. A four-stage filter keeps the calls that matter for the architecture and removes the noise.",
    role: "Bachelor thesis",
    setting: "Universität Rostock, Germany",
    period: "2025 to 2026",
    stack: ["Python", "FastAPI", "React", "Vite", "Docker"],
    links: [
      { label: "Code on GitHub", href: "https://github.com/miari959/living-architecture" },
    ],
  },
  {
    slug: "qutime",
    title: "QuTime: machine learning for hospital shift planning",
    summary:
      "I profiled and prepared a university hospital’s scheduling data and trained forecasting models for an AI-based system that plans shifts by combining machine learning with rule-based constraint satisfaction. In testing, it fulfilled more than 75% of staff shift wishes.",
    role: "Data profiling and preparation, machine learning and coordination with the hospital",
    setting: "Universität Rostock, industry project for QuTime with Rostock University Hospital",
    period: "2023 to 2024",
    stack: ["Python", "scikit-learn", "PostgreSQL", "Docker", "pytest", "Metanome"],
    links: [],
  },
];