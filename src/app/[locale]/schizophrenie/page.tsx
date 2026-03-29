import { SchizophreniaPage } from "@/components/pages/SchizophreniaPage";
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
      title: "Was ist Schizophrenie? Symptome, Ursachen & Behandlung | SchizoCare",
      description:
        "Erfahren Sie, was Schizophrenie ist, welche Symptome, Ursachen und Behandlungsmöglichkeiten es gibt. Kostenlose Ressourcen und Werkzeuge zur Genesung.",
      alternates: {
        canonical: `${siteUrl}/de/schizophrenie`,
        languages: {
          en: `${siteUrl}/en/schizophrenia`,
          de: `${siteUrl}/de/schizophrenie`,
        },
      },
    };
  }

  return {
    title: "What is Schizophrenia? Symptoms, Causes & Treatment | SchizoCare",
    description:
      "Learn what schizophrenia is, its symptoms, causes, and treatment options.",
    alternates: {
      canonical: `${siteUrl}/en/schizophrenia`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SchizophreniaPage locale={locale} />;
}
