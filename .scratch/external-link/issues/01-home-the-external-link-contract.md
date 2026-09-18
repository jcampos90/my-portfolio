# 01: Home the external-link contract

**What to build:** One `ExternalLink` component that owns the new-tab behavior, the marker the print stylesheet keys off, and the accessible-name hint, used by every external link on the page. Hero, Contact, Projects and Certifications keep their current appearance, open in a new tab, and all announce it — fixing the four links that currently do not. The print treatment stops keying off the href prefix and keys off the same marker. The full design is in the spec beside this ticket.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] All eight external links on the built page carry `target="_blank"`, a `rel` with both `noopener` and `noreferrer`, the external marker, and an "(opens in a new tab)" accessible-name hint.
- [x] Projects and Certifications keep their disambiguating "for {name}" in the accessible name; Hero and Contact do not gain one, because their duplicate labels share a single destination.
- [x] The print treatment keys off the external marker rather than the href prefix, and still prints the destination URL for every external link.
- [x] Hero, Contact, Projects and Certifications look unchanged: the component adds and removes no icon or arrow.
- [x] The relative CV link and the `mailto:` link are untouched — still same-tab, still not marked external.
- [x] `npm run verify` passes.

## Comments

2026-09-18 — Landed in `e6fdfc9` ("Give the external link one home") alongside the gate ticket, but
this file was left `ready-for-agent` with its boxes unchecked. Re-verified against the built page and
closed:

- `components/ui/external-link.tsx` owns the contract; `hero.tsx`, `contact.tsx`, `projects.tsx` and
  `certifications.tsx` all render through it, and `app/globals.css` keys print on `a[data-external]`.
- `out/index.html` carries exactly 8 external anchors, every one with `target="_blank"`,
  `rel="noreferrer noopener"`, `data-external` and the hint. Projects and Certifications carry
  "for {name}"; Hero and Contact do not. The `mailto:` and three relative CV anchors stay unmarked and
  same-tab.
- `npm run verify` is green (11/11). Red/green re-run: stripping `target: "_blank"` from the component
  and rebuilding failed the gate (10 pass / 1 fail); restoring it returned 11/11.
