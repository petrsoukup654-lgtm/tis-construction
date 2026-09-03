import type { Metadata } from "next";
import { Barlow, Barlow_Semi_Condensed, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact, site } from "@/lib/site";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Semi_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} — ${site.tagline}`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.shortName,
    title: `${site.shortName} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  icons: {
    icon: "/brand/tis-logo.gif",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.shortName,
  legalName: site.name,
  url: site.url,
  email: contact.email,
  telephone: contact.phone,
  foundingDate: String(site.founded),
  ...(contact.dic ? { vatID: contact.dic } : {}),
  taxID: contact.ico,
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.street,
    postalCode: contact.postalCode,
    addressLocality: contact.city,
    addressCountry: "CZ",
  },
  areaServed: "CZ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="cs"
      className={`${barlow.variable} ${barlowCondensed.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#obsah"
          className="btn-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent focus:px-4 focus:py-3 focus:text-white"
        >
          Přeskočit na obsah
        </a>
        <Header />
        <main id="obsah" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
