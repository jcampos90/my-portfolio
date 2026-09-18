# Portfolio

The personal portfolio for **Juan Campos** — the site that presents him to employers and engineering peers, as distinct from the [Business site](https://jcdevsolutions.com), which sells services to clients. See `CONTEXT.md` for the vocabulary.

Live at **https://portfolio.jcdevsolutions.com**

## What this is

A static site. No API, no database, no server-side runtime, no form. Next.js 16 with `output: 'export'`, producing plain HTML into `out/`.

The decisions behind that shape are recorded rather than assumed:

- `docs/adr/0001-portfolio-is-static.md` — why there is no backend
- `docs/adr/0002-portfolio-has-its-own-toolchain.md` — why Next.js and not the Business site's Astro
- `docs/adr/0003-unverifiable-cv-claims-are-deliberate.md` — why some claims cannot be verified, and why that is intentional

Read those before "fixing" anything that looks inconsistent.

## Editing the content

All of the copy lives in `content/`. There is no CMS, by design — editing the site means editing one obvious file.

| File | Contains |
| --- | --- |
| `content/site.ts` | Name, links, headline, intro and about copy, education, languages |
| `content/experience.ts` | Work history |
| `content/projects.ts` | The featured projects and their write-ups |
| `content/certifications.ts` | Credentials, with verification links |
| `content/skills.ts` | Grouped technical skills |

## The CV

- `assets/Juan_Campos_CV.docx` — the editable source
- `public/cv/Juan_Campos_CV.pdf` — what the site serves

Both are committed on purpose so the CV can be revised and regenerated without hunting for the original. To rebuild the PDF from the DOCX:

```bash
soffice --headless --convert-to pdf --outdir /tmp assets/Juan_Campos_CV.docx
```

The CV carries a phone number. The site deliberately does not — see the comment in `content/site.ts`. That mismatch is intentional; don't resolve it in one direction without asking.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export into out/
npm run typecheck
```

## Deployment

Cloudflare Pages, connected to this repository.

- **Framework preset:** Next.js (Static HTML Export) — build command `npx next build`, output directory `out`
- **Production branch:** `main`
- **Node version:** pinned by `.nvmrc`
- **Custom domain:** `portfolio.jcdevsolutions.com`, a DNS record in the `jcdevsolutions.com` zone, which already runs on Cloudflare nameservers

Analytics is Cloudflare Web Analytics, switched on with the one-click **Metrics → Enable Web Analytics** toggle on the Pages project. Cloudflare injects the beacon at deploy time, which is why there is no analytics code in this repository — do not add a beacon snippet, or page views will be counted twice.

`scripts/setup-cloudflare.sh` walks through the whole setup interactively. It is a one-off, not part of the build.

## Structure

```
app/                 routes, metadata, structured data, OG image, icon
components/sections/ one file per page section
components/ui/       shadcn-style primitives
content/             all copy, as typed data
docs/adr/            decision records
public/cv/           the served CV
```
