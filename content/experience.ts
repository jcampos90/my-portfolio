/**
 * Work history. Sourced from the CV.
 *
 * The NearShore Tek entry describes confidential client work at a level of
 * detail that is safe to publish: the domain and the technical problems, with
 * no client name, schema, credential, or code. Do not expand it.
 */

export type Role = {
  company: string;
  title: string;
  period: string;
  /** Optional qualifier shown next to the period, e.g. "Independent". */
  note?: string;
  highlights: string[];
};

export const roles: Role[] = [
  {
    company: "NearShore Tek",
    title: "Senior Software Developer",
    period: "Jan 2023 — Present",
    highlights: [
      "Architect and maintain high-traffic web applications for international clients, using modern JavaScript frameworks with .NET microservices.",
      "Lead technical design and implementation for scalable architectures, with a focus on system modularity.",
      "Deliver an electronic invoicing API for the Costa Rican tax authority's v4.3/4.4 specification — XAdES XML signing, OAuth2 integration, and certificate lifecycle management for a regulated, high-availability workload.",
      "Mentor developers and run code review as a real quality gate for security, performance, and maintainability.",
    ],
  },
  {
    company: "Independent Consultant",
    title: "Freelance Full-Stack Developer",
    period: "Mar 2020 — Dec 2022",
    note: "Self-employed",
    highlights: [
      "Delivered end-to-end development for a global client portfolio, focused on custom enterprise solutions.",
      "Web: built high-performance front-ends in Next.js and Angular, optimised for SEO and cross-browser behaviour.",
      "Mobile: built and shipped cross-platform applications for iOS and Android with React Native.",
      "Back-end: designed secure .NET Core 7/8 APIs on clean architecture principles, built for availability.",
    ],
  },
  {
    company: "SicSoft",
    title: "Software Developer",
    period: "May 2015 — Mar 2020",
    highlights: [
      "Built enterprise desktop and web applications in an Agile team.",
      "Worked test-first — TDD workflows that measurably reduced production defects.",
      "Modernised legacy systems by refactoring older codebases to improve performance and admit new features.",
      "Designed UI/UX components that made complex data management comprehensible to end users.",
    ],
  },
];
