import { ACTPage } from "@/components/pages/ACTPage";
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
        ? "ACT-Therapie für Stimmen: Lernen, mit Stimmen zu leben | SchizoCare"
        : "ACT Therapy for Hearing Voices: Learn to Live with Voices | SchizoCare",
    description:
      locale === "de"
        ? "Entdecken Sie, wie die Akzeptanz- und Commitment-Therapie (ACT) Menschen mit Schizophrenie hilft, stimmenbedingten Stress zu reduzieren."
        : "Discover how Acceptance and Commitment Therapy (ACT) helps people with schizophrenia reduce voice-related distress.",
    alternates: {
      canonical: `${siteUrl}/de/behandlung/act-therapie-stimmen`,
      languages: {
        en: `${siteUrl}/en/treatment/act-therapy-voices`,
        de: `${siteUrl}/de/behandlung/act-therapie-stimmen`,
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
  return <ACTPage locale={locale} />;
}
