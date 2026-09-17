import { Download, Mail } from "lucide-react";

import { site } from "@/content/site";

import { Container, Section } from "@/components/section";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/brand-icons";
import { buttonClass } from "@/components/ui/button";

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
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonClass({ variant: "outline" })}
        >
          <LinkedInIcon className="size-4" />
          LinkedIn
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonClass({ variant: "outline" })}
        >
          <GitHubIcon className="size-4" />
          GitHub
        </a>
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
        <p>Built with Next.js, statically exported.</p>
      </Container>
    </footer>
  );
}
