/** Field contract: ./experience.contract.ts. */
import { roles } from "@/content/experience";

import { Section } from "@/components/section";

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-10">
        {roles.map((role) => (
          <li key={`${role.company}-${role.title}`} className="relative border-l border-border pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-[4.5px] top-1.5 size-2 rounded-full bg-primary"
            />

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold">{role.title}</h3>
              <p className="font-mono text-xs text-muted-foreground">{role.period}</p>
            </div>

            <p className="mt-0.5 text-sm font-medium text-primary">
              {role.company}
              {role.note ? (
                <span className="font-normal text-muted-foreground"> · {role.note}</span>
              ) : null}
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {role.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
