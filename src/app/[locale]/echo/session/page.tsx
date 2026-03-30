import type { Metadata } from "next";
import SessionWrapper from "./SessionWrapper";

export const metadata: Metadata = {
  title: "Session — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function SessionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <SessionWrapper locale={locale} />;
}
