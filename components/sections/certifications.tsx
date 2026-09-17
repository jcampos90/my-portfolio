import { ArrowUpRight, Award } from "lucide-react";

import { certifications } from "@/content/certifications";

import { Section } from "@/components/section";
import { Card } from "@/components/ui/card";

export function Certifications() {
  return (
    <Section id="certifications" title="Certifications">
      <ul className="space-y-6">
        {certifications.map((certification) => (
          <li key={certification.credentialId}>
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Award className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">{certification.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground">{certification.date}</p>
                  </div>

                  <p className="mt-0.5 text-sm text-muted-foreground">{certification.issuer}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{certification.summary}</p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                    <a
                      href={certification.verifyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Verify credential
                      <ArrowUpRight className="size-3" aria-hidden="true" />
                      <span className="sr-only">for {certification.name} (opens in a new tab)</span>
                    </a>
                    <span className="font-mono text-muted-foreground">
                      ID {certification.credentialId}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
