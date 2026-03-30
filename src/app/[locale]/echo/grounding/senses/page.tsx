import type { Metadata } from "next";
import SensesExercise from "./SensesExercise";

export const metadata: Metadata = {
  title: "5-4-3-2-1 Grounding — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function SensesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SensesExercise locale={locale} />;
}
