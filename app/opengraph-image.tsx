import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Required for metadata routes under `output: 'export'`. */
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 600,
            color: "#6d28d9",
            letterSpacing: "-0.01em",
          }}
        >
          portfolio.jcdevsolutions.com
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              color: "#1b1725",
              letterSpacing: "-0.035em",
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 34, fontWeight: 600, color: "#6d28d9" }}>
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              maxWidth: 940,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#52525b",
            }}
          >
            {site.headline}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 22, color: "#71717a" }}>
          {site.location} · {site.discipline}
        </div>
      </div>
    ),
    size,
  );
}
