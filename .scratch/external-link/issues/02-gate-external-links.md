# 02: Gate external links in the built page

**What to build:** A check against the built page that refuses to pass when an external link is missing the contract, so the rule cannot be forgotten again. It finds every absolute `http(s)` link whose origin differs from the site's, requires the target, the rel and the hint, and fails when the number it finds does not match the number the content implies. The full design is in the spec beside this ticket.

**Blocked by:** 01 — Home the external-link contract

**Status:** ready-for-agent

- [ ] The check fails when an external link lacks `target`, `rel`, or the accessible-name hint.
- [ ] The check ignores the relative CV link and the `mailto:` link, which are deliberately same-tab.
- [ ] The expected number of external links is derived from the content, not hardcoded, and a mismatch fails rather than passing vacuously.
- [ ] Verified to fail when it should — an attribute stripped, the check red — then green again once restored.
- [ ] `npm run verify` passes.
