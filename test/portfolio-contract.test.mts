/**
 * The Portfolio's contract, checked against the built page.
 *
 * The emitted tree is this site's interface — a visitor crosses nothing else —
 * so this reads `out/index.html` rather than rendering a proxy for it. That
 * costs a build; use `npm run verify`, and note that the staleness guard below
 * makes a forgotten build fail loudly instead of passing against yesterday's
 * page.
 *
 * It is `.mts` with relative `.ts` specifiers because Node's resolver needs the
 * extension and honours no tsconfig `paths`. That also keeps this file outside
 * `tsc --noEmit`, which is fine: the type-level half of the contract is the
 * `satisfies FieldContract<…>` in each `*.contract.ts`, and `tsc` checks those.
 * See docs/adr/0004-content-fields-declare-how-they-surface.md.
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  educationFields,
  languageFields,
  skillGroupFields,
} from "../components/sections/about.contract.ts";
import { certificationFields } from "../components/sections/certifications.contract.ts";
import { roleFields } from "../components/sections/experience.contract.ts";
import { projectFields } from "../components/sections/projects.contract.ts";

import { certifications } from "../content/certifications.ts";
import { roles } from "../content/experience.ts";
import { projects } from "../content/projects.ts";
import { about, education, languages, site } from "../content/site.ts";
import { skillGroups } from "../content/skills.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = path.join(root, "out", "index.html");

/** Directories whose contents reach the emitted page. */
const SOURCE_DIRS = ["app", "components", "content", "lib", "public"];

/** Type-only declarations: by construction they cannot change the output. */
const isTypeOnly = (name: string) =>
  name.endsWith(".contract.ts") || name === "content-contract.ts";

/** Newest `{ mtime, file }` under `dir`, ignoring type-only declarations. */
function newestSource(dir: string, newest = { mtime: 0, file: "" }) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      newest = newestSource(full, newest);
    } else if (!isTypeOnly(entry.name)) {
      const mtime = statSync(full).mtimeMs;
      if (mtime > newest.mtime) newest = { mtime, file: full };
    }
  }
  return newest;
}

// Registered first so a stale build fails before the field assertions, which
// would otherwise report every field in the site as missing.
test("out/index.html is newer than every source file", () => {
  assert.ok(
    existsSync(output),
    "out/index.html is missing. Run `npm run verify`, which builds before it checks.",
  );

  const built = statSync(output).mtimeMs;
  const newest = SOURCE_DIRS.map((dir) => newestSource(path.join(root, dir))).reduce((a, b) =>
    b.mtime > a.mtime ? b : a,
  );

  assert.ok(
    built >= newest.mtime,
    `out/index.html is stale — built ${new Date(built).toISOString()}, but ` +
      `${path.relative(root, newest.file)} changed ${new Date(newest.mtime).toISOString()}. ` +
      "Run `npm run verify`.",
  );
});

let decoded: string | undefined;

/**
 * The emitted page, entity-decoded and read lazily so a missing build fails in
 * the guard above rather than at import time.
 *
 * Script and style bodies are dropped first. Next serializes the React tree —
 * including props such as a `key` — into a flight-data `<script>`, which is
 * data no visitor ever sees; asserting against it would let a field that is
 * only a React key pass as rendered. What remains is markup: text and
 * attributes such as `href`, which is where a rendered field actually lives.
 *
 * React also escapes text on the way into the document ("can't" becomes
 * "can&#x27;t") and inserts comment separators between adjacent text nodes.
 * Decoding the entities, and asserting on each field's own value rather than on
 * a composed sentence, sidesteps both.
 */
function page(): string {
  decoded ??= readFileSync(output, "utf8")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
  return decoded;
}

function valuesOf(field: unknown): string[] {
  if (typeof field === "string") return [field];
  if (Array.isArray(field)) return field.flatMap(valuesOf);
  return [];
}

type Subject = {
  label: string;
  identify: (record: Record<string, unknown>) => string;
  fields: Record<string, unknown>;
  records: readonly unknown[];
};

const subjects: Subject[] = [
  {
    label: "Featured project",
    identify: (record) => String(record.name),
    fields: projectFields,
    records: projects,
  },
  {
    label: "Role",
    identify: (record) => `${record.title} at ${record.company}`,
    fields: roleFields,
    records: roles,
  },
  {
    label: "Certification",
    identify: (record) => String(record.name),
    fields: certificationFields,
    records: certifications,
  },
  {
    label: "Skill group",
    identify: (record) => String(record.label),
    fields: skillGroupFields,
    records: skillGroups,
  },
  {
    label: "Education",
    identify: (record) => String(record.degree),
    fields: educationFields,
    records: [education],
  },
  {
    label: "Language",
    identify: (record) => String(record.name),
    fields: languageFields,
    records: languages,
  },
];

for (const { label, identify, fields, records } of subjects) {
  test(`${label}: every rendered field is in the built page`, () => {
    for (const record of records as Record<string, unknown>[]) {
      const rendered = Object.entries(fields).filter(([, surface]) => surface === "rendered");
      const values = rendered.flatMap(([field]) => valuesOf(record[field]));

      assert.ok(
        values.length > 0,
        `${label} "${identify(record)}" produced no rendered value — nothing from this record ` +
          "would appear on the page.",
      );

      for (const [field] of rendered) {
        for (const value of valuesOf(record[field])) {
          assert.ok(
            page().includes(value),
            `${label} "${identify(record)}": field "${field}" is marked rendered but its value is ` +
              `not in out/index.html: ${JSON.stringify(value.slice(0, 90))}`,
          );
        }
      }
    }
  });
}

test("the prose in content/site.ts is in the built page", () => {
  for (const paragraph of [...site.intro, ...about]) {
    assert.ok(
      page().includes(paragraph),
      `A paragraph of copy is not in out/index.html: ${JSON.stringify(paragraph.slice(0, 90))}`,
    );
  }
});

test("the CV exists at site.cvPath, in public/ and in the build", () => {
  const relative = site.cvPath.replace(/^\//, "");
  assert.ok(existsSync(path.join(root, "public", relative)), `public/${relative} does not exist.`);
  assert.ok(
    existsSync(path.join(root, "out", relative)),
    `out/${relative} does not exist — run \`npm run build\`.`,
  );
});

