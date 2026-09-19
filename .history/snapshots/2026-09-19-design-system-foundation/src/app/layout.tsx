import type { Metadata } from "next";
import { Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://nimatrazmjo.dev";
const SITE_TITLE = "Nimat Razmjo | Lead Software Engineer";
const SITE_DESCRIPTION =
  "Lead Software Engineer with 12+ years experience building high-traffic APIs, scalable backend systems, and modern full-stack applications.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Nimat Razmjo",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nimat Razmjo",
    "Software Engineer",
    "Lead Software Engineer",
    "Scalable Systems",
    "Cloud-Native Architecture",
    "Backend Engineering",
  ],
  authors: [{ name: "Nimat Razmjo", url: SITE_URL }],
  creator: "Nimat Razmjo",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Nimat Razmjo",
    images: [
      {
        url: "/images/white-logo.svg",
        width: 512,
        height: 512,
        alt: "Nimat Razmjo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@nimatrazmjo",
    images: ["/images/white-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nimat Razmjo",
  url: SITE_URL,
  jobTitle: "Lead Software Engineer",
  sameAs: [
    "https://github.com/nimatrazmjo",
    "https://linkedin.com/in/nimatrazmjo",
    "https://twitter.com/nimatrazmjo",
    "https://nimatrazmjo.substack.com",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${plexMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}


