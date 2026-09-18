# Content fields declare how they surface

A content record's type and the renderer that shows it can drift in silence. Adding a required field to `Project` makes `tsc` check the data literal in `content/projects.ts` and nothing else: the field can be populated for every Featured project, `npm run typecheck` can pass, and the page can still never show it. The failure is quiet in both directions — no error, no broken link, just a fact the owner believes is published and a visitor never sees.

We close that gap with a **field contract**: next to each renderer, one literal classifying every field of the record it renders as either `"rendered"` — the page shows it — or `structural`, naming the code that consumes it instead.

## Considered Options

- **Pass content into each section as a prop.** Rejected. There is exactly one content module per record type and nothing varies across it, so the seam would be hypothetical: the interface would widen for a caller that does not exist.
- **One central manifest of every record type.** Rejected. The claim being made is "this file surfaces this record's fields", so the compile error has to land in that file, next to the JSX that must satisfy it.
- **A runtime check as the only gate.** Rejected. A test catches a missing field only after a build; the compile-time map stops it at the moment the field is added.
- **The field contract, enforced twice.** Chosen.

## Consequences

- Adding a field to `Project`, `Role`, `Certification`, `SkillGroup`, `Education` or `Language` now breaks `tsc` until the author classifies it. That is the whole point.
- A `structural` entry has to name the consumer, so a field with no consumer cannot be waved through with a label. `Project.slug` names its React key in `projects.tsx`; `site.links.businessSite` had no consumer at all and was deleted rather than classified.
- `Education` and `Language` gained names in `content/site.ts` so they could be covered at all.
- `site` itself is deliberately **not** covered. It is a shared identity record read by six modules, so it has no single renderer to hang a contract on; its duplication across display strings, JSON-LD, OG metadata and a literal inside the OG image is a separate, still-open problem.
- The runtime half depends on a build. `npm run verify` makes that one command, and the check refuses to run against a stale `out/` — it compares the emitted page's mtime against the newest source file, so a forgotten build fails loudly instead of passing against yesterday's page.
- `.github/workflows/ci.yml` runs `npm run verify`. Cloudflare Pages builds with `npx next build` and never sees npm lifecycle scripts, so without that workflow nothing would run the check before deploy.
- The check adds no dependency: `node --test` reads TypeScript directly. That requires Node ≥ 22.18, which is why `.nvmrc` moved from `22` to `24`.
