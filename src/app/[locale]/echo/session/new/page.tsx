import type { Metadata } from "next";
import NewSessionSetup from "./NewSessionSetup";

export const metadata: Metadata = {
  title: "New Session — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function NewSessionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <NewSessionSetup locale={locale} />;
}
