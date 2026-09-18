# Give the external link one home

Status: resolved
Type: task
Source: `.scratch/architecture-review/architecture-review-portfolio.html`, section 2

## Problem

The site's new-tab contract for external links is hand-written at every call site: the
`target="_blank" rel="noreferrer noopener"` pair, the accessible-name hint, and the fact
the print stylesheet keys off all travel separately, remembered by whoever writes the
next `<a>`.

The built page renders **8** external anchors from **6** source call sites —
`projects.tsx:29` and `certifications.tsx:29` each sit inside a `.map()` over two
records. Every one carries `target` and `rel`; only **4 of 8** carry the hint:

| anchor | target | rel | hint |
| --- | --- | --- | --- |
| `github.com/jcampos90` (Hero) | yes | yes | **no** |
| `linkedin.com/in/juan-campos-a8082460` (Hero) | yes | yes | **no** |
| `github.com/jcampos90/blazor_order_manager` | yes | yes | yes |
| `github.com/jcampos90/dotnet-modulith-saas-template` | yes | yes | yes |
| `coursera.org/verify/professional-cert/N2BDBTW8GBZR` | yes | yes | yes |
| `coursera.org/verify/871KSBHS0UC7` | yes | yes | yes |
| `linkedin.com/in/juan-campos-a8082460` (Contact) | yes | yes | **no** |
| `github.com/jcampos90` (Contact) | yes | yes | **no** |

The four misses are exactly Hero and Contact. The same author remembered twice and forgot
four times, in the same style — the signature of a rule with no home.

"External link" also has a second, independent definition: `app/globals.css:109` keys the
print treatment off `a[href^="http"]`. It agrees with the markup today only because every
absolute URL on the page happens to be third-party. Nothing reconciles the two.

`buttonClass` (`components/ui/button.tsx:35`) cannot help: it is a class-string seam, so
it cannot own `target`, `rel`, or the accessible name.

## Decision

### 1. Two properties, not one

**External link** is a destination fact: the href's origin differs from `site.url`'s
origin. **Presenting in a new tab** is a behavior fact. They coincide on this page today
and are deliberately not merged, because the module must be able to express "external,
same tab" and "internal, new tab" without a rewrite. `CONTEXT.md` records the distinction.

Site policy: external links open in a new tab by default. No call site needs same-tab
today; the capability is kept, the default carries.

### 2. One element seam

A new server component, `components/ui/external-link.tsx`, exporting `ExternalLink`:

```tsx
ExternalLink({
  href: string,              // required
  children: ReactNode,       // required — the visible label
  context?: string,          // renders "for {context} (opens in a new tab)"
  newTab?: boolean,          // default true
  className?: string,        // so buttonClass(...) call sites keep working
})
```

It renders a plain `<a>`:

```tsx
<a
  href={href}
  className={className}
  data-external=""
  {...(newTab ? { target: "_blank", rel: "noreferrer noopener" } : {})}
>
  {children}
  {newTab ? (
    <span className="sr-only">
      {context ? `for ${context} ` : ""}(opens in a new tab)
    </span>
  ) : null}
</a>
```

- The hint describes actual behavior: it is rendered only when `newTab`, and it can no
  longer be forgotten when it applies.
- No `{...rest}` spread. A new need should force a deliberate interface change, in the
  same spirit as the field contract.
- `data-external` is the component's claim that the destination is external. The component
  does **not** verify it: parsing URLs would couple `components/ui/` to `content/`, which
  currently depends only on `lib/utils`. The gate below is what decides absolute-vs-self.
- The caller owns all visible content — label, brand icon, arrow. The component owns the
  new-tab contract, not the paint.

`context` is required when the same visible label points to different destinations
(Projects' "Source", Certifications' "Verify credential") and unnecessary when duplicates
share one destination (Hero's and Contact's "GitHub" both point at the same profile). This
is a convention on the component, not a machine-enforced rule.

### 3. Migrate the six call sites

- `hero.tsx` — GitHub, LinkedIn: `className={buttonClass({ variant: "outline" })}`, brand
  icon, no `context`.
- `contact.tsx` — LinkedIn, GitHub: as Hero, no `context`.
- `projects.tsx` — `GitHubIcon` + "Source" + `ArrowUpRight`, `context={project.name}`.
- `certifications.tsx` — "Verify credential" + `ArrowUpRight`,
  `context={certification.name}`.

Visual output is otherwise unchanged: the component adds no icon or arrow of its own.

### 4. One definition for print

`app/globals.css:109` changes from `a[href^="http"]::after` to `a[data-external]::after`.
The marker the component sets becomes the single definition of "external" for paginated
media too.

### 5. Enforcement

The repo has no linter; its culture is "enforced twice" (ADR-0004). The gate extends
`test/portfolio-contract.test.mts`, which already reads `out/index.html` and imports
`site`:

- Extract `<a …>…</a>` from the de-scripted page.
- Select those whose href matches `^https?://` **and** whose origin differs from
  `new URL(site.url).origin`.
- Assert each has `target="_blank"`, a `rel` containing both `noopener` and `noreferrer`,
  and anchor text containing `(opens in a new tab)`.
- Assert the selected count equals the count derived from content —
  `4` (Hero + Contact social, GitHub + LinkedIn each)
  `+ projects.filter((p) => p.repoUrl).length + certifications.length` — which is **8**
  today. Without a non-vacuity assertion the gate would pass silently the day the
  extractor stops matching, which is the failure mode the existing staleness guard exists
  to prevent.

## Considered options

- **A props helper, `externalLinkProps(href)`, mirroring `buttonClass`.** Rejected. It can
  own attributes but not the accessible name — the one part that was actually forgotten.
- **A `buttonClass` variant.** Rejected. Class-string seam; same limitation.
- **Host→brand-icon map inside the component** (as the architecture review proposed).
  Rejected. Certifications points at `coursera.org`, which has no brand mark, so the map
  needs a fallback anyway; sniffing hosts in a presentational primitive couples it to
  destinations; and `components/ui/brand-icons.tsx` already owns brand marks.
- **Appending a visible `ArrowUpRight` on every external link.** Deferred, not rejected.
  It would home the visible cue too, at the cost of changing the Hero and Contact buttons.
  That is a separate visual decision, noted below.
- **One concept: "external" means "opens in a new tab".** Rejected. The CSS already defines
  external by destination while the markup enacts it by behavior; merging them is what
  produced the split, and it forecloses "external, same tab".
- **Verifying the origin inside the component.** Rejected. Couples `components/ui/` to
  `content/`; the gate is the right place to decide absolute-vs-self.
- **Leaving `a[href^="http"]` in the print stylesheet.** Rejected. That is the second
  definition the ticket exists to collapse, and it would misclassify a future absolute
  self-link.

## Acceptance

- All 8 rendered external anchors carry the hint, `target`, `rel`, and `data-external`.
- `npm run verify` passes with the new gate test.
- The gate was verified to fail when an anchor is stripped of `target`, `rel`, or the
  hint.
- `CONTEXT.md` defines **External link** and distinguishes it from new-tab presentation.

## Out of scope

- `site.cvPath` (a site-relative PDF, same tab) and `mailto:` — not external, left as
  plain `<a>`.
- The JSON-LD `sameAs` and `hasCredential.url`, the metadata `site.url`, and the hardcoded
  domain in `app/opengraph-image.tsx`. ADR-0004 already parks the `site`-record
  duplication across display strings, JSON-LD, OG metadata and the OG image literal as a
  separate, still-open problem.
- A visible new-tab affordance. If the arrow is later homed too, add it to the component
  as an opt-in rather than reintroducing per-call-site markup.

## Trap for the implementer

`new URL("mailto:juancamposq@gmail.com").origin` returns the string `"null"`. A gate that
compares origins without first filtering to `^https?://` will classify the Contact
`mailto:` link as external and fail the build on a link that is deliberately same-tab.

## Comments

Derived in a `/grill-with-docs` session. The design tree was worked in three rounds and
each branch confirmed before this file was written; the architecture review's
host→brand-icon proposal was the one branch deliberately overridden.
