export function StructuredData({ locale }: { locale: string }) {
  const siteUrl = "https://schizocare.org";

  const org = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: "SchizoCare",
    url: siteUrl,
    description:
      "Free tools to help people with schizophrenia. Track mood, manage medicine, practice exercises, and connect with support.",
    availableLanguage: ["English", "German"],
  };

  const faqItems =
    locale === "de"
      ? [
          { q: "Was ist SchizoCare?", a: "SchizoCare ist eine kostenlose App für Menschen mit Schizophrenie." },
          { q: "Ist es wirklich kostenlos?", a: "Ja, für Patienten ist es vollständig kostenlos." },
          { q: "Sind meine Daten sicher?", a: "Ja. Alle Ihre Daten sind verschlüsselt und privat." },
          { q: "Kann mein Arzt das auch nutzen?", a: "Ja. Ärzte haben ein eigenes Dashboard." },
        ]
      : [
          { q: "What is SchizoCare?", a: "SchizoCare is a free app for people with schizophrenia." },
          { q: "Is it really free?", a: "Yes, it is completely free for patients." },
          { q: "Is my information safe?", a: "Yes. All your information is encrypted and private." },
          { q: "Can my doctor use this too?", a: "Yes. Doctors have a special dashboard." },
        ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SchizoCare",
    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
