# The Portfolio is a static site with no backend

The Portfolio exists to present Juan Campos to employers and engineering peers, and its content changes a handful of times a year. A server, database, and API would add three things to maintain in exchange for nothing this audience needs. We build it as static HTML: no API, no server-side runtime, no database. Contact is by email and LinkedIn rather than a form, and content lives in typed data modules in the repo rather than a CMS.

## Consequences

- The confidential `fe-api` work (Costa Rica electronic invoicing, XAdES signing, tax-authority integration) can never be shown as code, and the CV's NestJS claim gains no public proof from this site. This cost was accepted knowingly.
- Contact has no delivery failure mode to monitor, because there is no form to fail.
- Adding a dynamic capability later — a form, a guestbook, anything stateful — means revisiting this decision, not extending it.
