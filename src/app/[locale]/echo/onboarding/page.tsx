import type { Metadata } from "next";
import OnboardingFlow from "./OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <OnboardingFlow locale={locale} />;
}
