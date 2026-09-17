/**
 * Identity, links, and the narrative copy. Editing the site starts here.
 *
 * The CV is the source of truth for claims about experience — including work
 * that is not publicly linkable. See docs/adr/0003-unverifiable-cv-claims-are-deliberate.md
 * before removing anything here on the grounds that it cannot be verified.
 */

export const site = {
  name: "Juan Campos",
  fullName: "Juan Antonio Campos Quesada",
  role: "Senior Software Engineer",
  discipline: "Full-Stack Developer",
  location: "San José, Costa Rica",
  email: "juancamposq@gmail.com",
  url: "https://portfolio.jcdevsolutions.com",

  /**
   * No phone number here, by decision: it gets scraped. The downloadable CV
   * still carries it, also by decision — do not "fix" that mismatch silently.
   */
  cvPath: "/cv/Juan_Campos_CV.pdf",

  metaDescription:
    "Senior Software Engineer in San José, Costa Rica. 11+ years architecting and shipping web, mobile, and API systems in .NET and TypeScript.",

  links: {
    github: "https://github.com/jcampos90",
    linkedin: "https://linkedin.com/in/juan-campos-a8082460",
    businessSite: "https://jcdevsolutions.com",
  },

  /** One line that has to survive a five-second scan. */
  headline: "I design and build systems that stay maintainable after I leave.",

  intro: [
    "I've spent 11 years building web, mobile, and API systems — mostly .NET and TypeScript — for corporate engineering teams and, for three of those years, as an independent consultant.",
    "Most of my work sits behind an employer or a client, so this site leads with the projects I can actually show you and describes the rest in plain terms.",
  ],
} as const;

export const about = [
  "I care most about the parts of software that are still costly three years in: where the boundaries between modules sit, which decisions get written down, and whether the test suite tells you the truth. That bias shows up in how I work — specifications and architecture decision records before implementation, architecture rules enforced by tests rather than by convention, and refactoring treated as ordinary work rather than a special project.",
  "I also lead and mentor: technical design for client engagements, code review as an actual quality gate, and bringing less experienced developers up on codebases that are already large. I work in English at C1 level with distributed teams, and I'm based in Costa Rica.",
  "More recently I've been integrating generative AI into the way I build — prototyping, research, and app scaffolding — while keeping the judgement about what ships firmly human.",
] as const;

export const education = {
  degree: "Bachelor of Science in Computer Engineering",
  institution: "Universidad Internacional San Isidro Labrador (UISIL)",
  year: "2012",
} as const;

export const languages = [
  { name: "Spanish", level: "Native" },
  { name: "English", level: "C1 — Professional working proficiency" },
] as const;
