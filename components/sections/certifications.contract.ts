import type { Certification } from "@/content/certifications";

import type { FieldContract } from "@/lib/content-contract";

/** How each field of a Certification surfaces. The credential URL is an href. */
export const certificationFields = {
  name: "rendered",
  issuer: "rendered",
  date: "rendered",
  summary: "rendered",
  credentialId: "rendered",
  verifyUrl: "rendered",
} as const satisfies FieldContract<Certification>;
