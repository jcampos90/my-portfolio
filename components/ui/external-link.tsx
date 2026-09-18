import type { ReactNode } from "react";

/**
 * The one home of the new-tab contract for external links.
 *
 * "External" (a destination fact) and "opens in a new tab" (a behavior fact)
 * are deliberately not merged — see CONTEXT.md. This component claims the
 * former with `data-external` and enacts the latter with `target`, `rel` and
 * the accessible-name hint, so `newTab={false}` expresses "external, same tab"
 * without a rewrite. An internal destination that opens in a new tab stays a
 * plain `<a>`: wrapping it here would misclaim it as external.
 *
 * It does not verify the claim: parsing URLs here would couple `components/ui/`
 * to `content/`. `test/portfolio-contract.test.mts` is what decides
 * absolute-vs-self, and the print stylesheet keys off `a[data-external]`.
 *
 * There is no `{...rest}` spread on purpose: a new need should force a
 * deliberate interface change rather than slip through an attribute bag.
 */
export function ExternalLink({
  href,
  children,
  context,
  newTab = true,
  className,
}: {
  href: string;
  /** The visible label, owned by the caller — brand icon, arrow and all. */
  children: ReactNode;
  /**
   * Disambiguates when the same visible label points to different
   * destinations. Unnecessary when duplicate labels share one destination.
   */
  context?: string;
  newTab?: boolean;
  className?: string;
}) {
  return (
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
  );
}
