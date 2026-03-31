import type { Metadata } from "next";
import EchoHome from "./EchoHome";

export const metadata: Metadata = {
  title: "ECHO — Voice Dialogue Therapy | SchizoCare",
  description:
    "ECHO helps you have a structured, therapeutic dialogue with the voices you hear. Coming soon to SchizoCare.",
  robots: "noindex",
};

export default async function EchoHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <EchoHome locale={locale} />;
}
