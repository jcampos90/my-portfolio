# 01: Home the external-link contract

**What to build:** One `ExternalLink` component that owns the new-tab behavior, the marker the print stylesheet keys off, and the accessible-name hint, used by every external link on the page. Hero, Contact, Projects and Certifications keep their current appearance, open in a new tab, and all announce it — fixing the four links that currently do not. The print treatment stops keying off the href prefix and keys off the same marker. The full design is in the spec beside this ticket.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] All eight external links on the built page carry `target="_blank"`, a `rel` with both `noopener` and `noreferrer`, the external marker, and an "(opens in a new tab)" accessible-name hint.
- [ ] Projects and Certifications keep their disambiguating "for {name}" in the accessible name; Hero and Contact do not gain one, because their duplicate labels share a single destination.
- [ ] The print treatment keys off the external marker rather than the href prefix, and still prints the destination URL for every external link.
- [ ] Hero, Contact, Projects and Certifications look unchanged: the component adds and removes no icon or arrow.
- [ ] The relative CV link and the `mailto:` link are untouched — still same-tab, still not marked external.
- [ ] `npm run verify` passes.
