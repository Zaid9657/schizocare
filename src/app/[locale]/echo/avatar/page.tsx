import type { Metadata } from "next";
import AvatarCreatorWrapper from "./AvatarCreatorWrapper";

export const metadata: Metadata = {
  title: "Your Voices — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function AvatarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <AvatarCreatorWrapper locale={locale} />;
}
