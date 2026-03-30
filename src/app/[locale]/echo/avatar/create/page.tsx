import AvatarCreateWizard from "./AvatarCreateWizard";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AvatarCreatePage({ params }: Props) {
  const { locale } = await params;
  return <AvatarCreateWizard locale={locale} />;
}
