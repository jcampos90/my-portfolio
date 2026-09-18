/**
 * Featured projects — the small set of repositories presented with a written
 * account of the work. See CONTEXT.md ("Featured project").
 *
 * Every claim below was checked against the source, not the README. Two of
 * these repositories' READMEs describe designs the code no longer has
 * (MySaaS's setup instructions target a class library; order-manager's
 * authentication section describes a removed Owner-only model), so the copy
 * here follows the code and, for order-manager, CONTEXT.md plus its ADRs.
 *
 * Do not add a claim here that you have not verified in the repository.
 */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Omitted when the source is not published — a dead link is worse than none. */
  repoUrl?: string;
  /** Shown instead of the source link when there is nothing to link to. */
  sourceNote?: string;
  stack: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "order-manager",
    name: "Order Manager",
    tagline:
      "Order management for a small bakery, built decision-first: a domain glossary and four ADRs before implementation.",
    repoUrl: "https://github.com/jcampos90/blazor_order_manager",
    stack: [".NET 10", "Blazor Server", "ASP.NET Core Identity", "PostgreSQL", "xUnit", "Docker"],
    body: [
      "A Spanish-language application for a bakery that takes advance orders. The central idea is that the deadline is derived rather than typed in: each order line knows its preparation time, so the app works backwards from the delivery time to the moment preparation has to start, and buckets orders by urgency from there.",
      "The business rules live in plain, testable services rather than inside components — preparation scheduling, urgency buckets, validation, order drafts — so the rules that matter are the easy ones to cover. The suite is 79 facts and 4 theories across 13 files.",
      "Four ADRs sit beside the code and are actually maintained, including a real supersession chain: the original Clerk/OIDC decision was superseded by ASP.NET Core Identity with local cookie auth, which was then amended by the staff-role and user-management decision. A glossary fixes the domain vocabulary — Owner versus Staff, Order versus OrderLine — so the words in the code and the words in the conversation stay the same.",
    ],
  },
  {
    slug: "mysaas",
    name: "MySaaS",
    tagline:
      "An architecture template for a modular monolith: one deployable unit, real internal boundaries, and decisions written down.",
    repoUrl: "https://github.com/jcampos90/dotnet-modulith-saas-template",
    stack: [".NET 10", "EF Core", "PostgreSQL", "MediatR", "NetArchTest", "Docker"],
    body: [
      "Three business modules — Identity, Billing, and Features — each split into Domain, Application, Infrastructure, Contracts, and PublicApi, deployed as a single API. Every module owns its own PostgreSQL schema, and one module reads another's data through its Contracts project rather than reaching into its internals.",
      "The part I care about most is enforcement. A NetArchTest suite asserts layer dependencies, module boundaries, contracts purity, and naming conventions, so a boundary violation fails the build instead of being caught in review. The coverage is deliberately partial — several assemblies are still on the TODO list — but the mechanism is real, and it is the practice I would carry onto a team.",
      "Domain events go through a transactional outbox: the publisher writes an outbox row into the same DbContext as the state change, and a background service drains it and marks it processed, so an event can't escape for work that was later rolled back.",
      "This is a template and an architecture demonstration first — a skeleton whose module layout and seams are the deliverable, not a finished product.",
    ],
  },
  {
    slug: "consignacion",
    name: "Consignación",
    tagline:
      "Consignment management for small retailers: products, shops, stock movements, and commission settlements.",
    sourceNote: "Source not published yet.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Prisma", "libSQL", "Tailwind CSS 4", "Vitest"],
    body: [
      "Consignment is awkward to model: stock sits in someone else's shop, ownership never transfers, and money only moves when an item sells. The app tracks products, the commerces holding them, every stock movement, and what is owed back after each settlement.",
      "Three decisions carry the design. The commission rate is snapshotted onto each consignment and settlement line, so changing a rate later cannot rewrite history. Stock is never stored as a number — it is always the sum of the movement rows, so it cannot drift out of step with what actually happened. And settling the same movement twice is made impossible by a database constraint rather than by application logic.",
      "Settlement calculations use decimal arithmetic with explicit rounding, and the calculator and the consignment state machine are pure functions with no I/O — which is what lets the suite reach 213 tests, including an end-to-end test that walks a product from creation through activation, two sales, a refill, an adjustment, a settlement, and payment.",
    ],
  },
];

/*
 * Deliberately not featured: the Business site (JcDevSolutions.com).
 *
 * It was going to be a short fourth item — proof of shipping. It was dropped
 * because jcdevsolutions.com currently has no DNS record and serves nothing,
 * it cannot honestly be presented as a live artifact, its GitHub repository is
 * private, and a client-services marketing site is aimed at the wrong audience
 * for this page.
 *
 * Re-add it here once it is actually deployed.
 */
