import type { Metadata } from "next";
import SafePlaceExercise from "./SafePlaceExercise";

export const metadata: Metadata = {
  title: "Safe Place Visualisation — ECHO Grounding | SchizoCare",
  robots: "noindex",
};

export default async function SafePlacePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SafePlaceExercise locale={locale} />;
}
