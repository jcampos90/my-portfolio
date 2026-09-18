import type { Education, Language } from "@/content/site";
import type { SkillGroup } from "@/content/skills";

import type { FieldContract } from "@/lib/content-contract";

/**
 * The three records the About section renders: grouped skills, education and
 * languages. Each has this one renderer, which is what makes a per-renderer
 * contract the right shape for it.
 */
export const skillGroupFields = {
  label: "rendered",
  items: "rendered",
} as const satisfies FieldContract<SkillGroup>;

export const educationFields = {
  degree: "rendered",
  institution: "rendered",
  year: "rendered",
} as const satisfies FieldContract<Education>;

export const languageFields = {
  name: "rendered",
  level: "rendered",
} as const satisfies FieldContract<Language>;
