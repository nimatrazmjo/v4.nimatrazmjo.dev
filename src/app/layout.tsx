import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}


