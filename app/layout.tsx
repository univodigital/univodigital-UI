import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import { BRAND, SITE, SITE_METADATA } from "@/constants/site";
import { AppProviders } from "@/providers";

import "@/styles/globals.css";

/**
 * Inter — primary UI typeface (headings + body).
 * Designed for screens; variable weights + OpenType features (calt, tnum).
 * @see https://www.figma.com/resource-library/best-fonts-for-websites/#_1-inter
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  metadataBase: new URL(SITE.url),
  icons: {
    icon: BRAND.icon,
    apple: BRAND.icon,
  },
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    siteName: SITE_METADATA.openGraph.siteName,
    type: SITE_METADATA.openGraph.type,
    locale: SITE_METADATA.openGraph.locale,
  },
  twitter: {
    card: SITE_METADATA.twitter.card,
    title: SITE.name,
    description: SITE.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable}`}
    >
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
