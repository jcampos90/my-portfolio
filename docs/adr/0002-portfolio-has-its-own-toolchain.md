# The Portfolio has its own toolchain, separate from the Business site

A Business site already exists at `Astro/JcDevSolutions.com`, built with Astro 7 + Tailwind CSS v4 and deployed via Cloudflare. Reusing that stack was the cheap path. We chose instead to build the Portfolio as a standalone Next.js 16 application using static export (`output: 'export'`), because the two sites address different audiences with different evidence and must not read as duplicates of each other; a shared toolchain invites shared styling, shared components, and eventually a shared deploy. The Portfolio is hosted on Cloudflare Pages at `portfolio.jcdevsolutions.com`.

## Considered Options

- **Reuse Astro 7 + Tailwind 4 from the Business site** — rejected. Cheapest and already proven, but it pulls the two sites toward a single visual identity, which undermines the distinction between selling services and presenting a person.
- **NestJS with a real API** — rejected. See ADR-0001.
- **Next.js 16 with static export** — chosen. Static output keeps ADR-0001 intact, `output: 'export'` still gives file-based routing, and MDX remains available when project write-ups outgrow one page.

## Consequences

- Near-duplicate knowledge of two frameworks to maintain.
- `Code/NestJs/my-portfolio` is now a misleading path: this directory contains no NestJS. The location was kept deliberately to avoid churn, not because it describes the contents.
