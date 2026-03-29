import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { SkipLink } from "@/components/ui/SkipLink";
import { CrisisBanner } from "@/components/layout/CrisisBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";
import "@/styles/globals.css";

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-atkinson",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const locales = ["en", "de"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = "https://schizocare.org";

  const descriptions: Record<string, string> = {
    en: "SchizoCare: free tools to help people with schizophrenia. Track mood, manage medicine, practice exercises, and connect with support. Safe, private, and made with doctors.",
    de: "SchizoCare: kostenlose Werkzeuge für Menschen mit Schizophrenie. Stimmung verfolgen, Medikamente verwalten, Übungen machen und Unterstützung finden.",
  };

  const titles: Record<string, string> = {
    en: "SchizoCare — Recovery Tools for People with Schizophrenia",
    de: "SchizoCare — Hilfsmittel für Menschen mit Schizophrenie",
  };

  return {
    title: titles[locale] ?? titles.en,
    description: descriptions[locale] ?? descriptions.en,
    robots: "index, follow",
    openGraph: {
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
      url: `${siteUrl}/${locale}`,
      siteName: "SchizoCare",
      locale: locale === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.en,
      description: descriptions[locale] ?? descriptions.en,
    },
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { en: `${siteUrl}/en`, de: `${siteUrl}/de` },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${atkinson.variable} ${fraunces.variable}`}>
      <body className={atkinson.className}>
        <NextIntlClientProvider messages={messages}>
          <SkipLink />
          <CrisisBanner />
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <StructuredData />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
