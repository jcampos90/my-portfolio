import Script from "next/script";

/**
 * Cloudflare Web Analytics.
 *
 * Cookieless, so it needs no consent banner. The token is a public site
 * identifier, not a secret — it ends up in the served HTML either way — but it
 * is kept as an environment variable so the repo carries no account-specific
 * value and the site builds fine without it.
 *
 * Set NEXT_PUBLIC_CF_ANALYTICS_TOKEN (locally in .env, and as an environment
 * variable on the Cloudflare Pages project). With no token, nothing renders.
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;

  if (!token) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
      strategy="afterInteractive"
    />
  );
}
