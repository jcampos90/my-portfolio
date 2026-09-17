import { site } from "@/content/site";

import { Container } from "@/components/section";
import { buttonClass } from "@/components/ui/button";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <div className="print-hidden sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between gap-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {site.name}
        </a>

        <nav aria-label="Sections" className="flex items-center gap-4 overflow-x-auto">
          <ul className="flex items-center gap-4 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="whitespace-nowrap transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.cvPath}
            className={buttonClass({ variant: "outline", size: "sm", className: "hidden sm:inline-flex" })}
          >
            CV
          </a>
        </nav>
      </Container>
    </div>
  );
}
