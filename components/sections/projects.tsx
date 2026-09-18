/**
 * Field contract: ./projects.contract.ts. Add a field to `Project` and the
 * build stops in that file until the field is classified.
 */
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/content/projects";

import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { GitHubIcon } from "@/components/ui/brand-icons";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";

export function Projects() {
  return (
    <Section id="projects" title="Projects">
      <p className="mb-8 text-muted-foreground">
        Three projects I&apos;ve built recently. The rest of my work sits behind employers and
        clients, so it&apos;s described in the experience section instead.
      </p>

      <div className="space-y-6">
        {projects.map((project) => (
          <Card key={project.slug} className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-lg font-semibold">{project.name}</h3>

              {project.repoUrl ? (
                <ExternalLink
                  href={project.repoUrl}
                  context={project.name}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  <GitHubIcon className="size-4" />
                  Source
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ExternalLink>
              ) : project.sourceNote ? (
                <p className="text-xs text-muted-foreground">{project.sourceNote}</p>
              ) : null}
            </div>

            <p className="mt-2 text-muted-foreground">{project.tagline}</p>

            <div className="mt-5 space-y-3 text-sm text-muted-foreground">
              {project.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li key={item}>
                  <Badge variant="outline" className="font-mono">
                    {item}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}
