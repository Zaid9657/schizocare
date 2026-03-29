import { SymptomsPage } from "@/components/pages/SymptomsPage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = "https://schizocare.org";

  if (locale === "de") {
    return {
      title: "Symptome der Schizophrenie: Positive, Negative & Kognitive Zeichen | SchizoCare",
      description:
        "Erfahren Sie mehr über Symptome der Schizophrenie, einschließlich Halluzinationen, Wahnvorstellungen und kognitiver Veränderungen. Frühe Warnzeichen verstehen.",
      alternates: {
        canonical: `${siteUrl}/de/schizophrenie/symptome`,
        languages: {
          en: `${siteUrl}/en/schizophrenia/symptoms`,
          de: `${siteUrl}/de/schizophrenie/symptome`,
        },
      },
    };
  }

  return {
    title: "Schizophrenia Symptoms: Positive, Negative & Cognitive Signs | SchizoCare",
    description:
      "Learn about schizophrenia symptoms including hallucinations, delusions, and cognitive changes. Understand early warning signs and when to seek help.",
    alternates: {
      canonical: `${siteUrl}/en/schizophrenia/symptoms`,
      languages: {
        en: `${siteUrl}/en/schizophrenia/symptoms`,
        de: `${siteUrl}/de/schizophrenie/symptome`,
      },
    },
    openGraph: {
      title: "Schizophrenia Symptoms: Positive, Negative & Cognitive Signs | SchizoCare",
      description:
        "Learn about schizophrenia symptoms including hallucinations, delusions, and cognitive changes.",
      url: `${siteUrl}/en/schizophrenia/symptoms`,
      siteName: "SchizoCare",
      locale: "en_US",
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SymptomsPage locale={locale} />;
}
