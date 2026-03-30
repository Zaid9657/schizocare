import { ACTPage } from "@/components/pages/ACTPage";
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
      title: "ACT-Therapie für Stimmen: Lernen, mit Stimmen zu leben | SchizoCare",
      description:
        "Entdecken Sie, wie die Akzeptanz- und Commitment-Therapie (ACT) Menschen mit Schizophrenie hilft, stimmenbedingten Stress zu reduzieren. Kostenlose Übungen und Werkzeuge.",
      alternates: {
        canonical: `${siteUrl}/de/behandlung/act-therapie-stimmen`,
        languages: {
          en: `${siteUrl}/en/treatment/act-therapy-voices`,
          de: `${siteUrl}/de/behandlung/act-therapie-stimmen`,
        },
      },
    };
  }

  return {
    title: "ACT Therapy for Hearing Voices: Learn to Live with Voices | SchizoCare",
    description:
      "Discover how Acceptance and Commitment Therapy (ACT) helps people with schizophrenia reduce voice-related distress. Free exercises and tools.",
    alternates: {
      canonical: `${siteUrl}/en/treatment/act-therapy-voices`,
      languages: {
        en: `${siteUrl}/en/treatment/act-therapy-voices`,
        de: `${siteUrl}/de/behandlung/act-therapie-stimmen`,
      },
    },
    openGraph: {
      title: "ACT Therapy for Hearing Voices: Learn to Live with Voices | SchizoCare",
      description:
        "Discover how Acceptance and Commitment Therapy (ACT) helps people with schizophrenia reduce voice-related distress.",
      url: `${siteUrl}/en/treatment/act-therapy-voices`,
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
  return <ACTPage locale={locale} />;
}
