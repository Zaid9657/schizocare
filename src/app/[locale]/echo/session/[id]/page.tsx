import type { Metadata } from "next";
import ActiveSession from "./ActiveSession";

export const metadata: Metadata = {
  title: "Session — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function SessionIdPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  return <ActiveSession locale={locale} />;
}
