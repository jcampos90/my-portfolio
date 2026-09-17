/**
 * Featured projects — the small set of repositories presented with a written
 * account of the work. See CONTEXT.md ("Featured project").
 *
 * Only linkable work belongs here. Confidential work is described in
 * content/experience.ts instead, and unlinkable CV claims stay in the
 * experience and skills sections.
 */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  repoUrl: string;
  stack: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "mysaas",
    name: "MySaaS",
    tagline:
      "A modular monolith template whose architectural boundaries are enforced by tests rather than by convention.",
    repoUrl: "https://github.com/jcampos90/dotnet-modulith-saas-template",
    stack: [".NET 10", "EF Core", "MediatR", "PostgreSQL", "Architecture tests"],
    body: [
      "A starting point for SaaS products built as a modular monolith: a single deployable unit with real internal boundaries, so you keep the operational simplicity of one application without the coupling that usually arrives with it.",
      "The interesting part is enforcement. The rules about which module may talk to which are asserted by architecture tests that fail the build when someone reaches across a boundary — which is what keeps the design honest a year later, when nobody remembers the diagram.",
      "State changes and their side effects are kept together through a transactional outbox, so a domain event can't be published for work that was later rolled back.",
    ],
  },
  {
    slug: "order-manager",
    name: "Order Manager",
    tagline:
      "Order management for a small bakery, built decision-first: a specification, a domain glossary, and four ADRs before implementation.",
    repoUrl: "https://github.com/jcampos90/blazor_order_manager",
    stack: [".NET 10", "Blazor Server", "ASP.NET Core Identity", "PostgreSQL"],
    body: [
      "A Spanish-language application for a bakery that takes advance orders, where the deadline is derived rather than typed in: the system works backwards from the delivery time to the moment preparation has to begin.",
      "It is also where I practise the working method I'd want on a team. The requirements live in a written specification, the domain vocabulary lives in a context document, and the decisions that shaped the design are recorded as ADRs beside the code — with a test suite covering the parts that are expensive to get wrong.",
    ],
  },
  {
    slug: "consignacion",
    name: "Consignación",
    tagline:
      "Consignment management for small retailers: products, shops, consignments, and settlements in one Next.js application.",
    repoUrl: "https://github.com/jcampos90/nextjs_consignacion",
    stack: ["Next.js 16", "React", "TypeScript", "Prisma", "libSQL", "Tailwind CSS", "Vitest"],
    body: [
      "Consignment is awkward to model: stock sits in someone else's shop, ownership never transfers, and money only moves when an item sells. The application tracks products, the shops holding them, what has been consigned, and what is owed back after each settlement.",
      "Built with the Next.js App Router and Prisma over libSQL, with the data model and the settlement logic kept in their own modules so the part that decides who gets paid is testable on its own.",
    ],
  },
];

/*
 * Deliberately not featured: the Business site (JcDevSolutions.com).
 *
 * It was going to be a short fourth item — proof of shipping. It was dropped
 * because jcdevsolutions.com currently has no DNS record and serves nothing,
 * so it cannot honestly be presented as a live artifact, and because a
 * client-services marketing site is aimed at the wrong audience for this page.
 *
 * Re-add it here once it is actually deployed, or if you want it listed with
 * its repository link instead of a live URL.
 */
