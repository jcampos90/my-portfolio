/** Certifications. Both credentials are publicly verifiable at the URLs below. */

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  summary: string;
  credentialId: string;
  verifyUrl: string;
};

export const certifications: Certification[] = [
  {
    name: "Google AI Professional Certificate",
    issuer: "Google, via Coursera",
    date: "August 2026",
    summary:
      "Eight courses covering generative AI for brainstorming, research, writing, content creation, data analysis, app building, and deployment — completed with a portfolio of AI-built artifacts and a custom AI solution.",
    credentialId: "N2BDBTW8GBZR",
    verifyUrl: "https://coursera.org/verify/professional-cert/N2BDBTW8GBZR",
  },
  {
    name: "Introduction to Generative AI for Developers With Copilot",
    issuer: "Microsoft, via Coursera",
    date: "September 2026",
    summary:
      "Applying generative AI tooling to day-to-day development work, authorised by Microsoft and delivered through Coursera.",
    credentialId: "871KSBHS0UC7",
    verifyUrl: "https://coursera.org/verify/871KSBHS0UC7",
  },
];
