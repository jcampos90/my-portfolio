import type { Project } from "@/content/projects";

import type { FieldContract } from "@/lib/content-contract";

/**
 * How each field of a Featured project (CONTEXT.md) surfaces.
 *
 * `slug` is the only field the page never shows: it is the React key on the
 * project Card in projects.tsx. `repoUrl` and `sourceNote` are conditional but
 * both are rendered, so both are `rendered`.
 */
export const projectFields = {
  slug: { structural: "React key on the project Card in projects.tsx" },
  name: "rendered",
  tagline: "rendered",
  repoUrl: "rendered",
  sourceNote: "rendered",
  stack: "rendered",
  body: "rendered",
} as const satisfies FieldContract<Project>;
