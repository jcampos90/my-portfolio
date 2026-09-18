# 02: Gate external links in the built page

**What to build:** A check against the built page that refuses to pass when an external link is missing the contract, so the rule cannot be forgotten again. It finds every absolute `http(s)` link whose origin differs from the site's, requires the target, the rel and the hint, and fails when the number it finds does not match the number the content implies. The full design is in the spec beside this ticket.

**Blocked by:** 01 — Home the external-link contract

**Status:** resolved

- [x] The check fails when an external link lacks `target`, `rel`, or the accessible-name hint.
- [x] The check ignores the relative CV link and the `mailto:` link, which are deliberately same-tab.
- [x] The expected number of external links is derived from the content, not hardcoded, and a mismatch fails rather than passing vacuously.
- [x] Verified to fail when it should — an attribute stripped, the check red — then green again once restored.
- [x] `npm run verify` passes.

## Comments

2026-09-18 — The gate landed with ticket 01 in `e6fdfc9` ("Give the external link one home"), in
`test/portfolio-contract.test.mts`:

- `assertExternalLinkContract` selects `<a>`s whose href matches `^https?://` **and** whose origin
  differs from `new URL(site.url).origin`, then requires `target="_blank"`, a `rel` carrying both
  `noopener` and `noreferrer`, the exact `data-external` marker, and the `(opens in a new tab)`
  hint in the anchor text.
- The `^https?://` filter is the trap-note guard: `new URL("mailto:…").origin` is `"null"`, so the
  Contact email is left alone; the site-relative CV href never matches the scheme filter. Only the
  8 absolute third-party links are selected.
- Non-vacuity: the selected count must equal
  `4 + projects.filter((p) => p.repoUrl).length + certifications.length`. The `4` is the spec's fixed
  count of the Hero and Contact social links (GitHub and LinkedIn each), whose hrefs live in the
  components rather than in content; the project and certification terms are derived from the
  content records, so a new repoUrl or credential raises the expected count rather than slipping
  through.
- A companion test feeds `assertExternalLinkContract` a sound fixture and five mutants (no `target`,
  no `rel`, no marker, misspelled marker, no hint), asserting each mutation throws — so the gate is
  proven to reject, not merely to pass.

Red/green against the real built page (not only the synthetic fixture): removing `target: "_blank"`
from `components/ui/external-link.tsx` and rebuilding made the gate fail with
`external link "https://github.com/jcampos90" has no target="_blank"` (1 failing test); restoring the
component and re-running made it green again (11/11). The built `out/index.html` carries exactly 8
external anchors, each with `data-external`, `target` and `rel`, while the `mailto:` and three
relative CV anchors stay unmarked and same-tab.
