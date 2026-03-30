import type { Metadata } from "next";
import BreathingExercise from "./BreathingExercise";

export const metadata: Metadata = {
  title: "Box Breathing — ECHO Grounding | SchizoCare",
  robots: "noindex",
};

export default async function BreathingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <BreathingExercise locale={locale} />;
}
