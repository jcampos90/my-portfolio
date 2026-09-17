import { skillGroups } from "@/content/skills";
import { about, education, languages, site } from "@/content/site";

import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="space-y-5 text-muted-foreground">
        {about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="mt-10 grid gap-6 sm:grid-cols-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Education
          </dt>
          <dd className="mt-2 text-sm">
            {education.degree}
            <span className="block text-muted-foreground">
              {education.institution}, {education.year}
            </span>
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Languages
          </dt>
          <dd className="mt-2 text-sm">
            {languages.map((language) => (
              <span key={language.name} className="block">
                {language.name}
                <span className="text-muted-foreground"> — {language.level}</span>
              </span>
            ))}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Based in
          </dt>
          <dd className="mt-2 text-sm">
            {site.location}
            <span className="block text-muted-foreground">Working with distributed teams</span>
          </dd>
        </div>
      </dl>

      <div className="mt-10 border-t border-border pt-8">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Tools and technologies
        </h3>
        <dl className="mt-5 space-y-4">
          {skillGroups.map((group) => (
            <div key={group.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt className="text-sm font-medium">{group.label}</dt>
              <dd className="font-mono text-xs leading-6 text-muted-foreground">
                {group.items.join("  ·  ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
