/**
 * Field contracts.
 *
 * A content record's type and its renderer can drift in silence: adding a
 * required field to `Project` makes the compiler check the data literal and
 * nothing else, so a populated field can typecheck clean and never appear on
 * the page. A field contract closes that gap — see
 * docs/adr/0004-content-fields-declare-how-they-surface.md.
 *
 * This module is deliberately type-only. The contract literals next to each
 * renderer are imported by `node --test`, and Node's resolver does not honour
 * tsconfig `paths`, so a runtime helper here would force every contract file to
 * reach back into `lib/` with a relative `.ts` specifier.
 */

/** A field the page shows. Every value it holds must appear in the output. */
export type Rendered = "rendered";

/** A field the page does not show, plus the code that consumes it instead. */
export type Structural = { structural: string };

/**
 * Every field of `T`, classified. `Record<keyof T, …>` is the whole mechanism:
 * TypeScript requires all keys, so adding a field to `T` stops the build at the
 * renderer that has to decide how the field surfaces.
 */
export type FieldContract<T> = Record<keyof T, Rendered | Structural>;
