"use client";

import AvatarCreator from "@/components/echo/AvatarCreator";

export default function AvatarCreatorWrapper({ locale }: { locale: string }) {
  return <AvatarCreator locale={locale} />;
}
