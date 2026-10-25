/**
 * Single source of truth for site content and external links.
 *
 * Link verification (checked 2026-10):
 * - https://github.com/Tarush002 ............... verified live (GitHub API, HTTP 200)
 * - https://github.com/Tarush002/SpatialDisplayResearch  NOT publicly resolvable (HTTP 404 —
 *   repository appears to be private). No direct repo link is rendered anywhere; project CTAs
 *   point to the verified profile above instead.
 * - https://www.taylorfrancis.com/chapters/edit/10.1201/9781003518587-15/... verified live (HTTP 200)
 * - https://doi.org/10.1201/9781003518587-15 ... verified — resolves to the Taylor & Francis chapter
 * - https://www.linkedin.com/in/tarush-singh-477136294  supplied as the verified public profile
 * - No email address could be verified from any source, so no email link is rendered.
 *
 * Publication metadata (title variants, year 2024, book title "Recent Advances in
 * Computational Intelligence and Cyber Security", CRC Press, 1st ed., pp. 157–168,
 * type = book chapter) is extracted from the publisher's own citation metadata on the
 * verified page above. Nothing here is invented.
 */

export const SITE = {
  name: "Tarush Singh",
  wordmark: "TARUSH SINGH",
  tagline: "RESEARCHING THE DIGITAL WORLD",
  eyebrow: "INDEPENDENT RESEARCH · CYBERSECURITY · AI",
  headlinePre: "Understanding threats.",
  headlineMain: "Investigating what others miss.",
  headlineEm: "what others miss.",
  intro:
    "I'm Tarush Singh — an MCA Cyber Security student exploring OSINT, cyber threat intelligence, digital investigations, and AI-assisted security research.",
  status: "CURRENTLY BUILDING · SECURITY RESEARCH",
} as const;

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export const LINKS = {
  github: "https://github.com/Tarush002",
  linkedin: "https://www.linkedin.com/in/tarush-singh-477136294",
  publication:
    "https://www.taylorfrancis.com/chapters/edit/10.1201/9781003518587-15/exploring-ai-enabled-crime-depth-analysis-pornographic-image-morphing-anany-sharma-khyati-agarwal-tarush-singh?context=ubx&refId=5dc49bf5-81cf-4915-8d56-78d624824a28",
  doi: "https://doi.org/10.1201/9781003518587-15",
} as const;

export type ProjectVisual = "pipeline" | "planes" | "dossier";

export interface Project {
  index: string;
  title: string;
  category: string;
  description: string;
  status: string;
  /** true = the status chip is treated as "not yet built" (muted treatment) */
  planned: boolean;
  tags: string[];
  visual: ProjectVisual;
  /** Only links verified at build time are ever rendered. See file header. */
  cta: { label: string; href: string } | null;
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "AI-SOC",
    category: "AI SECURITY · THREAT ANALYSIS",
    description:
      "An intelligent cybersecurity analysis platform designed to assess suspicious URLs, phishing emails, authentication logs, shell commands, and security events. It focuses on deterministic threat categorization, risk scoring, explainable indicators, and actionable recommendations.",
    status: "IN DEVELOPMENT",
    planned: false,
    tags: ["Python", "FastAPI", "React", "TypeScript", "Tailwind CSS"],
    visual: "pipeline",
    cta: { label: "VIEW GITHUB", href: LINKS.github },
  },
  {
    index: "02",
    title: "SpatialDisplayResearch",
    category: "RESEARCH · SPATIAL COMPUTING",
    description:
      "A research-oriented project exploring spatial display technology, interactive visual experiences, and the intersection of AI and emerging display interfaces.",
    status: "IN DEVELOPMENT",
    planned: false,
    tags: ["Research", "Spatial Computing", "Interactive Visuals"],
    visual: "planes",
    cta: { label: "VIEW GITHUB", href: LINKS.github },
  },
  {
    index: "03",
    title: "OSINT Research Workspace",
    category: "OSINT · DIGITAL INVESTIGATIONS",
    description:
      "A structured workspace for organizing public-source findings, preserving source references, documenting investigative leads, and producing evidence-based intelligence reports.",
    status: "PLANNED",
    planned: true,
    tags: ["OSINT", "Methodology", "Source Preservation"],
    visual: "dossier",
    cta: null,
  },
];

export const PUBLICATION = {
  label: "PUBLISHED CHAPTER · CRC PRESS / TAYLOR & FRANCIS",
  title: "Exploring AI-Enabled Crime: An In-Depth Analysis of Pornographic Image Morphing",
  href: LINKS.publication,
  authors: ["Anany Sharma", "Khyati Agarwal", "Tarush Singh"],
  meta: {
    book: "Recent Advances in Computational Intelligence and Cyber Security",
    edition: "1st Edition",
    year: "2024",
    pages: "157–168",
    doi: "10.1201/9781003518587-15",
  },
  summary:
    "Examines how generative tools enable non-consensual, hyper-realistic morphed imagery — the algorithms, databases, and tools behind it — and outlines detection, removal, and mitigation pathways alongside the human cost.",
} as const;

export interface Capability {
  name: string;
  note: string;
}

/** Interest / direction — not represented as proven expertise. */
export const FOCUS_AREAS: Capability[] = [
  {
    name: "Open-source intelligence",
    note: "Structured public-source research and digital footprints.",
  },
  {
    name: "Cyber threat intelligence",
    note: "How threats emerge, move, and evolve.",
  },
  {
    name: "Security event analysis",
    note: "Reading logs and events for what matters.",
  },
  {
    name: "AI-assisted threat assessment",
    note: "Scoring and explaining risk with deterministic models.",
  },
  {
    name: "Research & technical documentation",
    note: "Findings written to be verified, not admired.",
  },
];

/** Demonstrated in real projects or published work. */
export const STACK: Capability[] = [
  { name: "Python", note: "Core scripting and analysis tooling." },
  { name: "FastAPI", note: "API services for assessment workflows." },
  { name: "React + TypeScript", note: "Interface layer for research tools." },
  { name: "Tailwind CSS", note: "Production styling across projects." },
  { name: "Academic writing", note: "Published book chapter, CRC Press, 2024." },
];

export interface Education {
  title: string;
  field: string;
  school: string;
  detail: string;
  period: string;
}

export const EDUCATION: Education[] = [
  {
    title: "MCA",
    field: "Cyber Security",
    school: "D Y Patil Deemed to be University",
    detail: "School of Humanities & Sciences, Navi Mumbai",
    period: "IN PROGRESS",
  },
  {
    title: "BCA",
    field: "Computer Applications",
    school: "University of Lucknow",
    detail: "Bachelor of Computer Applications",
    period: "2022 – 2025",
  },
];
