import { SymptomsPage } from "@/components/pages/SymptomsPage";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = "https://schizocare.org";

  return {
    title:
      locale === "de"
        ? "Symptome der Schizophrenie: Positive, Negative & Kognitive Zeichen | SchizoCare"
        : "Schizophrenia Symptoms: Positive, Negative & Cognitive Signs | SchizoCare",
    description:
      locale === "de"
        ? "Erfahren Sie mehr über Symptome der Schizophrenie, einschließlich Halluzinationen, Wahnvorstellungen und kognitiver Veränderungen."
        : "Learn about schizophrenia symptoms including hallucinations, delusions, and cognitive changes.",
    alternates: {
      canonical: `${siteUrl}/de/schizophrenie/symptome`,
      languages: {
        en: `${siteUrl}/en/schizophrenia/symptoms`,
        de: `${siteUrl}/de/schizophrenie/symptome`,
      },
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
