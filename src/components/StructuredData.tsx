const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalOrganization",
      "@id": "https://schizocare.org/#organization",
      "name": "SchizoCare",
      "url": "https://schizocare.org",
      "logo": "https://schizocare.org/logo.png",
      "description":
        "Free tools and resources for schizophrenia recovery. Mood tracking, medication reminders, therapy exercises, and peer support.",
      "medicalSpecialty": "Psychiatry",
      "availableService": [
        { "@type": "MedicalTherapy", "name": "Mood Tracking" },
        { "@type": "MedicalTherapy", "name": "Medication Management" },
        { "@type": "MedicalTherapy", "name": "CBT Exercises" },
        { "@type": "MedicalTherapy", "name": "ACT for Voices" },
        { "@type": "MedicalTherapy", "name": "Peer Support Community" },
      ],
      "audience": [
        { "@type": "PeopleAudience", "audienceType": "Patients" },
        { "@type": "PeopleAudience", "audienceType": "Families" },
        { "@type": "MedicalAudience", "audienceType": "Clinicians" },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://schizocare.org/#website",
      "url": "https://schizocare.org",
      "name": "SchizoCare",
      "description": "Schizophrenia Recovery Platform",
      "publisher": { "@id": "https://schizocare.org/#organization" },
      "inLanguage": ["en", "de"],
    },
    {
      "@type": "FAQPage",
      "@id": "https://schizocare.org/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is SchizoCare?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SchizoCare is a free website and app that helps people with schizophrenia. It has tools for tracking your mood, remembering your medicine, doing helpful exercises, and talking with others who understand.",
          },
        },
        {
          "@type": "Question",
          "name": "Is it really free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All tools for patients are free. There is nothing hidden. Doctors pay for their professional dashboard, but you never have to pay.",
          },
        },
        {
          "@type": "Question",
          "name": "Is my information safe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Your data is private and protected. We use strong security with encryption. We follow HIPAA and DSGVO privacy rules. Only you and your doctor (if you choose) can see your information.",
          },
        },
        {
          "@type": "Question",
          "name": "Can my doctor use this too?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. There is a special dashboard for doctors. They can see how you are doing, plan your treatment, and even have video calls with you through SchizoCare.",
          },
        },
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
    />
  );
}
