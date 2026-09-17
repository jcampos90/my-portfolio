import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static HTML only — see docs/adr/0001-portfolio-is-static.md.
   * No server, no API routes, no runtime.
   */
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
