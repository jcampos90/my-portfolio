import { Download, Mail } from "lucide-react";

import { site } from "@/content/site";

import { Container, Section } from "@/components/section";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/external-link";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p className="text-lg text-balance sm:text-xl">
        The quickest way to reach me is email. I read everything, and I answer.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href={`mailto:${site.email}`} className={buttonClass({})}>
          <Mail aria-hidden="true" />
          {site.email}
        </a>
        <a href={site.cvPath} className={buttonClass({ variant: "outline" })}>
          <Download aria-hidden="true" />
          Download CV
        </a>
        <ExternalLink
          href={site.links.linkedin}
          className={buttonClass({ variant: "outline" })}
        >
          <LinkedInIcon className="size-4" />
          LinkedIn
        </ExternalLink>
        <ExternalLink
          href={site.links.github}
          className={buttonClass({ variant: "outline" })}
        >
          <GitHubIcon className="size-4" />
          GitHub
        </ExternalLink>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
        <p>
          {site.fullName} · {site.location}
        </p>
      </Container>
    </footer>
  );
}
