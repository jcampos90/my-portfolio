import { Download, MapPin } from "lucide-react";

import { site } from "@/content/site";

import { Container } from "@/components/section";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";

export function Hero() {
  return (
    <div id="top" className="py-16 sm:py-24">
      <Container>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          {site.location}
        </p>

        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.name}
        </h1>

        <p className="mt-3 text-lg text-muted-foreground">
          {site.role}
          <span aria-hidden="true" className="px-2 text-border">
            ·
          </span>
          {site.discipline}
        </p>

        <p className="mt-8 text-xl font-medium text-balance sm:text-2xl">{site.headline}</p>

        <div className="mt-6 space-y-4 text-muted-foreground">
          {site.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={site.cvPath} className={buttonClass({})}>
            <Download aria-hidden="true" />
            Download CV
          </a>
          <ExternalLink
            href={site.links.github}
            className={buttonClass({ variant: "outline" })}
          >
            <GitHubIcon className="size-4" />
            GitHub
          </ExternalLink>
          <ExternalLink
            href={site.links.linkedin}
            className={buttonClass({ variant: "outline" })}
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </ExternalLink>
        </div>
      </Container>
    </div>
  );
}
