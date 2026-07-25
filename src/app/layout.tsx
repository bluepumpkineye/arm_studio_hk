import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@/components/analytics";
import { site } from "@/lib/site";
import { getLocale } from "@/lib/i18n-server";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://armstudio.hk"),
  title: {
    default: "Arm Studio — Interior Design Studio, Hong Kong",
    template: "%s · Arm Studio",
  },
  description:
    "Arm Studio Limited is a Hong Kong interior design studio crafting homes and workplaces with artistry, reliability and mindfulness. 2025 Home Journal Award Merit winners.",
  keywords: [
    "interior design Hong Kong",
    "Arm Studio",
    "home renovation Hong Kong",
    "interior designer HK",
    "Japandi Hong Kong",
    "village house renovation",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  openGraph: {
    type: "website",
    locale: "en_HK",
    url: "https://armstudio.hk",
    siteName: "Arm Studio",
    title: "Arm Studio — Interior Design Studio, Hong Kong",
    description:
      "Hong Kong interior design studio. Homes and workplaces shaped with artistry, reliability and mindfulness. 2025 Home Journal Award Merit.",
    images: [{ url: "/images/hero.jpg", width: 1500, height: 1000, alt: "Arm Studio interior design" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arm Studio — Interior Design Studio, Hong Kong",
    description:
      "Hong Kong interior design studio. 2025 Home Journal Award Merit winners.",
    images: ["/images/hero.jpg"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale === "zh" ? "zh-HK" : "en"} className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        <SiteHeader locale={locale} />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} />
        <Analytics />
      </body>
    </html>
  );
}
