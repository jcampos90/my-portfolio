import type { Role } from "@/content/experience";

import type { FieldContract } from "@/lib/content-contract";

/** How each field of a Role surfaces. `note` is optional but rendered when set. */
export const roleFields = {
  company: "rendered",
  title: "rendered",
  period: "rendered",
  note: "rendered",
  highlights: "rendered",
} as const satisfies FieldContract<Role>;
