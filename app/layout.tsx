import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { certifications } from "@/content/certifications";
import { education, site } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: `${site.name} — ${site.role}`,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  keywords: [
    "Juan Campos",
    "Senior Software Engineer",
    "Full-Stack Developer",
    ".NET",
    "TypeScript",
    "React",
    "Next.js",
    "Costa Rica",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
    locale: "en_US",
    firstName: "Juan",
    lastName: "Campos",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Structured data. On a personal site this is the highest-value technical
 * detail there is: it is what connects the page to the person in a search
 * engine's understanding, rather than leaving it an anonymous document.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  description: site.metaDescription,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San José",
    addressCountry: "CR",
  },
  sameAs: [site.links.github, site.links.linkedin],
  knowsLanguage: ["es", "en"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.institution,
  },
  hasCredential: certifications.map((certification) => ({
    "@type": "EducationalOccupationalCredential",
    name: certification.name,
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: certification.issuer },
    url: certification.verifyUrl,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-dvh antialiased">
        {children}
        <script
          type="application/ld+json"
          // Static, author-controlled data — not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
