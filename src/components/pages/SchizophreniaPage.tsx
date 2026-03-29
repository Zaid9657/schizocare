"use client";

import Link from "next/link";

const EN = {
  heroTitle: "What is Schizophrenia?",
  heroSubtitle:
    "A complete guide to understanding schizophrenia — what it is, what causes it, and how people recover.",
  breadcrumbHome: "Home",
  breadcrumbCurrent: "Schizophrenia",

  overviewTitle: "Overview",
  overviewText:
    "Schizophrenia is a mental health condition that affects how a person thinks, feels, and experiences reality. It is a treatable condition. Many people with schizophrenia live full, meaningful lives. It affects about 1 in 100 people worldwide — across all countries, cultures, and backgrounds. With the right support, recovery is possible.",

  symptomsTitle: "Common Symptoms",
  symptomsIntro:
    "Symptoms of schizophrenia are usually grouped into three types. Not everyone has all of them.",
  positiveTitle: "Positive symptoms",
  positiveDesc: "These are experiences that are added to your normal thinking:",
  positive1: "Hallucinations — hearing, seeing, or feeling things that others do not",
  positive2: "Delusions — strong beliefs that are not based in reality",
  positive3: "Disorganized thinking — thoughts that feel jumbled or hard to follow",
  negativeTitle: "Negative symptoms",
  negativeDesc: "These are things that may be reduced or missing:",
  negative1: "Low motivation — finding it hard to start or finish things",
  negative2: "Flat emotions — not showing or feeling emotions as before",
  negative3: "Withdrawing from people — wanting to be alone more often",
  cognitiveTitle: "Cognitive symptoms",
  cognitiveDesc: "These affect thinking and memory:",
  cognitive1: "Trouble concentrating or staying focused",
  cognitive2: "Memory difficulties",
  cognitive3: "Finding it hard to make decisions",
  symptomsLink: "Learn more about symptoms →",

  causesTitle: "What Causes Schizophrenia?",
  causesIntro:
    "Schizophrenia is not caused by one single thing. It happens because of a combination of factors:",
  cause1Title: "Genetics",
  cause1Desc:
    "Schizophrenia can run in families. But having a family member with it does not mean you will get it.",
  cause2Title: "Brain chemistry",
  cause2Desc:
    "Differences in how the brain uses certain chemicals — especially dopamine — may play a role.",
  cause3Title: "Environment",
  cause3Desc:
    "Difficult experiences like stress, trauma, or substance use can increase the risk.",
  cause4Title: "Not anyone's fault",
  cause4Desc:
    "Schizophrenia is not caused by bad parenting, weakness, or personal failure. Nobody chooses to have it.",
  causesLink: "Learn more about causes →",

  typesTitle: "Types of Schizophrenia",
  typesText:
    "In the past, doctors used different names like 'paranoid schizophrenia' or 'disorganized schizophrenia.' Today, doctors think of it more as a spectrum. This means symptoms can look different in different people. Some people have strong positive symptoms. Others have more negative symptoms. Your doctor will look at your specific experience — not just a label.",
  typesLink: "Learn about the spectrum →",

  earlyTitle: "Early Warning Signs",
  earlyIntro:
    "Sometimes symptoms develop slowly. Recognizing early signs can help you get support sooner. Common early signs include:",
  early1: "Withdrawing from friends and family",
  early2: "Changes in sleep — sleeping too much or too little",
  early3: "Trouble concentrating at school or work",
  early4: "Unusual or strange thoughts that feel very real",
  early5: "Feeling suspicious or that something is not right",
  early6: "Decreased interest in things you used to enjoy",
  earlyAdvice:
    "If you or someone you know shows these signs, it is worth talking to a doctor. Getting help early makes a big difference.",
  earlyLink: "Learn about early warning signs →",

  treatmentTitle: "How is Schizophrenia Treated?",
  treatmentIntro:
    "The best treatment combines several approaches. Most people need more than one type of support.",
  treat1Title: "Medication",
  treat1Desc:
    "Antipsychotic medicines are the most common treatment. They reduce symptoms like hallucinations and delusions. Finding the right medicine can take time. It is important to take medicine regularly and talk to your doctor about side effects.",
  treat2Title: "Therapy",
  treat2Desc:
    "Talking therapies help you understand and manage symptoms. CBT (Cognitive Behavioral Therapy) helps you challenge unhelpful thoughts. ACT (Acceptance and Commitment Therapy) helps you accept difficult experiences and focus on what matters to you.",
  treat3Title: "Support",
  treat3Desc:
    "Support from family, friends, and community is very important. Peer support — talking with others who have lived experience — can also help. Tools like SchizoCare can help you track your mood, remember your medicine, and practice helpful exercises.",
  treat4Title: "A combination works best",
  treat4Desc:
    "Research shows that combining medicine, therapy, and support gives the best results. Working with your doctor to build a personal treatment plan is the key.",
  treatmentLink: "Explore treatment options →",

  livingTitle: "Living with Schizophrenia",
  livingText1:
    "Many people with schizophrenia live full and meaningful lives. They work, study, have relationships, and pursue goals that matter to them. Recovery does not always mean that symptoms disappear completely. For many people, recovery means managing symptoms well enough to live the life they want.",
  livingText2:
    "Self-care makes a big difference. Taking medicine regularly, getting enough sleep, reducing stress, eating well, and staying connected with supportive people all help.",
  livingText3:
    "You do not have to figure this out alone. Many people have walked this road before you. Support is available — and SchizoCare is here to help.",

  mythsTitle: "Myths vs Facts",
  myth1Q: "Myth: People with schizophrenia are dangerous.",
  myth1A:
    "Fact: People with schizophrenia are much more likely to be victims of violence than to be violent themselves. The idea that schizophrenia causes violence is a harmful stereotype.",
  myth2Q: "Myth: Schizophrenia means split personality.",
  myth2A:
    "Fact: Schizophrenia has nothing to do with split personality (which is called Dissociative Identity Disorder — a completely different condition). This confusion comes from a misunderstanding of the word.",
  myth3Q: "Myth: You cannot recover from schizophrenia.",
  myth3A:
    "Fact: Many people with schizophrenia recover significantly and live full lives. With good treatment and support, symptoms can be managed well. Recovery is real and it is possible.",
  myth4Q: "Myth: Schizophrenia is rare.",
  myth4A:
    "Fact: Schizophrenia affects about 1% of the world's population — that is around 24 million people. You are not alone.",

  ctaTitle: "How SchizoCare Can Help",
  ctaText:
    "SchizoCare is a free platform built for people with schizophrenia. It helps you track your mood, remember your medicine, practice therapy exercises, and connect with others who understand. Everything is free, private, and designed to be easy to use.",
  ctaButton: "Sign Up Free",
  ctaLearn: "Explore the tools →",

  faqTitle: "Frequently Asked Questions",
  faq1Q: "Is schizophrenia curable?",
  faq1A:
    "Schizophrenia is not yet fully curable, but it is very treatable. Many people with the right treatment have few or no symptoms for long periods. Recovery is possible for most people.",
  faq2Q: "Can people with schizophrenia work?",
  faq2A:
    "Yes. Many people with schizophrenia work, study, and live independently. The right treatment and support make this possible. Some people need accommodations, but employment and meaningful activity are realistic goals.",
  faq3Q: "Is schizophrenia hereditary?",
  faq3A:
    "Genes play a role, but having a family member with schizophrenia does not mean you will definitely get it. Most people with a family history do not develop the condition. It is a combination of genetics and environment.",
  faq4Q: "What is the difference between schizophrenia and psychosis?",
  faq4A:
    "Psychosis is a symptom — experiencing things like hallucinations or delusions. Schizophrenia is a condition that includes psychosis as part of its symptoms. Psychosis can also happen in other conditions like bipolar disorder, severe depression, or as a reaction to substances.",
  faq5Q: "Can stress make schizophrenia worse?",
  faq5A:
    "Yes. High stress can trigger or worsen symptoms. Managing stress — through therapy, exercise, sleep, and support — is an important part of recovery.",
};

const DE = {
  heroTitle: "Was ist Schizophrenie?",
  heroSubtitle:
    "Ein vollständiger Leitfaden zum Verständnis von Schizophrenie — was sie ist, was sie verursacht und wie Menschen genesen.",
  breadcrumbHome: "Startseite",
  breadcrumbCurrent: "Schizophrenie",

  overviewTitle: "Überblick",
  overviewText:
    "Schizophrenie ist eine psychische Erkrankung, die beeinflusst, wie eine Person denkt, fühlt und die Wirklichkeit erlebt. Sie ist behandelbar. Viele Menschen mit Schizophrenie führen ein erfülltes, bedeutungsvolles Leben. Sie betrifft etwa 1 von 100 Menschen weltweit — in allen Ländern, Kulturen und Hintergründen. Mit der richtigen Unterstützung ist Genesung möglich.",

  symptomsTitle: "Häufige Symptome",
  symptomsIntro:
    "Symptome der Schizophrenie werden meist in drei Typen eingeteilt. Nicht jeder hat alle davon.",
  positiveTitle: "Positive Symptome",
  positiveDesc: "Das sind Erfahrungen, die zum normalen Denken hinzukommen:",
  positive1: "Halluzinationen — Hören, Sehen oder Fühlen von Dingen, die andere nicht wahrnehmen",
  positive2: "Wahnvorstellungen — starke Überzeugungen, die nicht der Realität entsprechen",
  positive3: "Desorganisiertes Denken — Gedanken, die sich verwirrt oder schwer nachvollziehbar anfühlen",
  negativeTitle: "Negative Symptome",
  negativeDesc: "Das sind Dinge, die vermindert oder fehlend sein können:",
  negative1: "Geringe Motivation — es fällt schwer, Dinge zu beginnen oder zu beenden",
  negative2: "Flacher Affekt — Emotionen werden weniger gezeigt oder gefühlt als zuvor",
  negative3: "Rückzug von Menschen — der Wunsch, öfter allein zu sein",
  cognitiveTitle: "Kognitive Symptome",
  cognitiveDesc: "Diese beeinflussen Denken und Gedächtnis:",
  cognitive1: "Konzentrationsschwierigkeiten",
  cognitive2: "Gedächtnisprobleme",
  cognitive3: "Schwierigkeiten, Entscheidungen zu treffen",
  symptomsLink: "Mehr über Symptome erfahren →",

  causesTitle: "Was verursacht Schizophrenie?",
  causesIntro:
    "Schizophrenie wird nicht durch eine einzige Sache verursacht. Sie entsteht durch eine Kombination von Faktoren:",
  cause1Title: "Genetik",
  cause1Desc:
    "Schizophrenie kann in Familien vorkommen. Aber ein Familienmitglied mit Schizophrenie zu haben bedeutet nicht, dass man sie selbst bekommt.",
  cause2Title: "Gehirnchemie",
  cause2Desc:
    "Unterschiede in der Art, wie das Gehirn bestimmte Botenstoffe — besonders Dopamin — verarbeitet, können eine Rolle spielen.",
  cause3Title: "Umwelt",
  cause3Desc:
    "Schwierige Erfahrungen wie Stress, Trauma oder Drogenkonsum können das Risiko erhöhen.",
  cause4Title: "Es ist nicht die Schuld von jemandem",
  cause4Desc:
    "Schizophrenie wird nicht durch schlechte Erziehung, Schwäche oder persönliches Versagen verursacht. Niemand wählt, sie zu haben.",
  causesLink: "Mehr über Ursachen erfahren →",

  typesTitle: "Arten von Schizophrenie",
  typesText:
    "Früher verwendeten Ärzte verschiedene Namen wie 'paranoide Schizophrenie' oder 'desorganisierte Schizophrenie.' Heute betrachten Ärzte es eher als ein Spektrum. Das bedeutet, dass Symptome bei verschiedenen Menschen unterschiedlich aussehen können. Manche Menschen haben ausgeprägte positive Symptome. Andere haben mehr negative Symptome. Ihr Arzt wird Ihre spezifische Erfahrung betrachten — nicht nur ein Etikett.",
  typesLink: "Mehr über das Spektrum erfahren →",

  earlyTitle: "Frühe Warnzeichen",
  earlyIntro:
    "Manchmal entwickeln sich Symptome langsam. Frühe Anzeichen zu erkennen kann helfen, früher Unterstützung zu bekommen. Häufige frühe Anzeichen sind:",
  early1: "Rückzug von Freunden und Familie",
  early2: "Schlafveränderungen — zu viel oder zu wenig Schlaf",
  early3: "Konzentrationsprobleme in der Schule oder bei der Arbeit",
  early4: "Ungewöhnliche oder seltsame Gedanken, die sich sehr real anfühlen",
  early5: "Misstrauen oder das Gefühl, dass etwas nicht stimmt",
  early6: "Verlust des Interesses an Dingen, die man früher genossen hat",
  earlyAdvice:
    "Wenn Sie oder jemand, den Sie kennen, diese Anzeichen zeigt, lohnt es sich, mit einem Arzt zu sprechen. Frühe Hilfe macht einen großen Unterschied.",
  earlyLink: "Mehr über frühe Warnzeichen →",

  treatmentTitle: "Wie wird Schizophrenie behandelt?",
  treatmentIntro:
    "Die beste Behandlung kombiniert mehrere Ansätze. Die meisten Menschen brauchen mehr als eine Art von Unterstützung.",
  treat1Title: "Medikamente",
  treat1Desc:
    "Antipsychotische Medikamente sind die häufigste Behandlung. Sie reduzieren Symptome wie Halluzinationen und Wahnvorstellungen. Das richtige Medikament zu finden kann Zeit brauchen. Es ist wichtig, Medikamente regelmäßig zu nehmen und mit dem Arzt über Nebenwirkungen zu sprechen.",
  treat2Title: "Therapie",
  treat2Desc:
    "Gesprächstherapien helfen, Symptome zu verstehen und zu bewältigen. KVT (Kognitive Verhaltenstherapie) hilft, unförderliche Gedanken zu hinterfragen. ACT (Akzeptanz- und Commitment-Therapie) hilft, schwierige Erfahrungen anzunehmen und sich auf das zu konzentrieren, was wichtig ist.",
  treat3Title: "Unterstützung",
  treat3Desc:
    "Unterstützung durch Familie, Freunde und die Gemeinschaft ist sehr wichtig. Peer-Support — das Gespräch mit anderen, die eigene Erfahrungen haben — kann ebenfalls helfen. Werkzeuge wie SchizoCare helfen, Stimmung zu verfolgen, Medikamente zu erinnern und hilfreiche Übungen zu machen.",
  treat4Title: "Eine Kombination wirkt am besten",
  treat4Desc:
    "Forschungen zeigen, dass die Kombination aus Medikamenten, Therapie und Unterstützung die besten Ergebnisse liefert. Mit dem Arzt einen persönlichen Behandlungsplan zu erstellen ist der Schlüssel.",
  treatmentLink: "Behandlungsmöglichkeiten erkunden →",

  livingTitle: "Leben mit Schizophrenie",
  livingText1:
    "Viele Menschen mit Schizophrenie führen ein erfülltes und bedeutungsvolles Leben. Sie arbeiten, studieren, haben Beziehungen und verfolgen Ziele, die ihnen wichtig sind. Genesung bedeutet nicht immer, dass die Symptome vollständig verschwinden. Für viele Menschen bedeutet Genesung, Symptome gut genug zu bewältigen, um das Leben zu führen, das sie möchten.",
  livingText2:
    "Selbstfürsorge macht einen großen Unterschied. Medikamente regelmäßig nehmen, genug Schlafen, Stress reduzieren, gut essen und mit unterstützenden Menschen in Verbindung bleiben — all das hilft.",
  livingText3:
    "Sie müssen das nicht alleine herausfinden. Viele Menschen sind diesen Weg vor Ihnen gegangen. Unterstützung ist verfügbar — und SchizoCare ist hier, um zu helfen.",

  mythsTitle: "Mythen vs. Fakten",
  myth1Q: "Mythos: Menschen mit Schizophrenie sind gefährlich.",
  myth1A:
    "Fakt: Menschen mit Schizophrenie sind weitaus häufiger Opfer von Gewalt als Täter. Die Vorstellung, dass Schizophrenie Gewalt verursacht, ist ein schädliches Stereotyp.",
  myth2Q: "Mythos: Schizophrenie bedeutet gespaltene Persönlichkeit.",
  myth2A:
    "Fakt: Schizophrenie hat nichts mit gespaltener Persönlichkeit zu tun (die als Dissoziative Identitätsstörung bezeichnet wird — eine völlig andere Erkrankung). Diese Verwechslung entstand durch ein Missverständnis des Wortes.",
  myth3Q: "Mythos: Von Schizophrenie kann man sich nicht erholen.",
  myth3A:
    "Fakt: Viele Menschen mit Schizophrenie erholen sich erheblich und führen ein erfülltes Leben. Mit guter Behandlung und Unterstützung können Symptome gut bewältigt werden. Genesung ist real und möglich.",
  myth4Q: "Mythos: Schizophrenie ist selten.",
  myth4A:
    "Fakt: Schizophrenie betrifft etwa 1% der Weltbevölkerung — das sind rund 24 Millionen Menschen. Sie sind nicht allein.",

  ctaTitle: "Wie SchizoCare helfen kann",
  ctaText:
    "SchizoCare ist eine kostenlose Plattform, die für Menschen mit Schizophrenie entwickelt wurde. Sie hilft Ihnen, Ihre Stimmung zu verfolgen, Medikamente zu erinnern, Therapieübungen zu machen und sich mit anderen zu verbinden, die verstehen. Alles ist kostenlos, privat und einfach zu bedienen.",
  ctaButton: "Kostenlos registrieren",
  ctaLearn: "Die Werkzeuge erkunden →",

  faqTitle: "Häufig gestellte Fragen",
  faq1Q: "Ist Schizophrenie heilbar?",
  faq1A:
    "Schizophrenie ist noch nicht vollständig heilbar, aber sehr behandelbar. Viele Menschen mit der richtigen Behandlung haben über längere Zeiträume wenige oder keine Symptome. Genesung ist für die meisten Menschen möglich.",
  faq2Q: "Können Menschen mit Schizophrenie arbeiten?",
  faq2A:
    "Ja. Viele Menschen mit Schizophrenie arbeiten, studieren und leben selbständig. Die richtige Behandlung und Unterstützung machen dies möglich. Manche Menschen brauchen Anpassungen, aber Beschäftigung und bedeutungsvolle Aktivität sind realistische Ziele.",
  faq3Q: "Ist Schizophrenie erblich?",
  faq3A:
    "Gene spielen eine Rolle, aber ein Familienmitglied mit Schizophrenie zu haben bedeutet nicht, dass man sie definitiv bekommt. Die meisten Menschen mit einer Familiengeschichte entwickeln die Erkrankung nicht. Es ist eine Kombination aus Genetik und Umwelt.",
  faq4Q: "Was ist der Unterschied zwischen Schizophrenie und Psychose?",
  faq4A:
    "Psychose ist ein Symptom — das Erleben von Dingen wie Halluzinationen oder Wahnvorstellungen. Schizophrenie ist eine Erkrankung, die Psychose als Teil ihrer Symptome einschließt. Psychose kann auch bei anderen Erkrankungen wie bipolarer Störung, schwerer Depression oder als Reaktion auf Substanzen auftreten.",
  faq5Q: "Kann Stress Schizophrenie verschlimmern?",
  faq5A:
    "Ja. Hoher Stress kann Symptome auslösen oder verschlimmern. Stressbewältigung — durch Therapie, Bewegung, Schlaf und Unterstützung — ist ein wichtiger Teil der Genesung.",
};

const CONDITION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "MedicalCondition",
  name: "Schizophrenia",
  alternateName: "Schizophrenie",
  description:
    "Schizophrenia is a chronic mental health condition that affects how a person thinks, feels, and perceives reality.",
  signOrSymptom: [
    { "@type": "MedicalSignOrSymptom", name: "Hallucinations" },
    { "@type": "MedicalSignOrSymptom", name: "Delusions" },
    { "@type": "MedicalSignOrSymptom", name: "Disorganized thinking" },
    { "@type": "MedicalSignOrSymptom", name: "Reduced emotional expression" },
    { "@type": "MedicalSignOrSymptom", name: "Cognitive difficulties" },
  ],
  possibleTreatment: [
    { "@type": "MedicalTherapy", name: "Antipsychotic medication" },
    { "@type": "MedicalTherapy", name: "Cognitive Behavioral Therapy" },
    { "@type": "MedicalTherapy", name: "Acceptance and Commitment Therapy" },
  ],
  epidemiology: "Affects approximately 1% of the global population",
  relevantSpecialty: { "@type": "MedicalSpecialty", name: "Psychiatry" },
};

interface Props {
  locale: string;
}

export function SchizophreniaPage({ locale }: Props) {
  const c = locale === "de" ? DE : EN;
  const homeHref = `/${locale}`;
  const toolsHref = `/${locale}#tools`;

  const sectionStyle = { padding: "48px 16px" };
  const containerStyle = { maxWidth: "960px", margin: "0 auto" };
  const h2Style = {
    fontFamily: "var(--font-fraunces), Georgia, serif",
    fontSize: "28px",
    fontWeight: "bold" as const,
    color: "#1A1A2E",
    margin: "0 0 16px 0",
    lineHeight: 1.2,
  };
  const pStyle = { color: "#4A4A68", lineHeight: 1.8, margin: "0 0 16px 0" };
  const labelStyle = {
    fontSize: "12px",
    fontWeight: "bold" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#0B7B6F",
    margin: "0 0 8px 0",
  };
  const cardStyle = {
    backgroundColor: "#FFFFFF",
    border: "2px solid #EEECE8",
    borderRadius: "12px",
    padding: "24px",
  };
  const linkStyle = {
    color: "#0B7B6F",
    fontWeight: "bold" as const,
    textDecoration: "none",
    display: "inline-block",
    marginTop: "8px",
  };
  const listStyle = {
    color: "#4A4A68",
    lineHeight: 1.8,
    margin: "0 0 8px 0",
    paddingLeft: "4px",
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONDITION_SCHEMA) }}
      />

      <article>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{ padding: "16px 16px 0", maxWidth: "960px", margin: "0 auto" }}
        >
          <ol
            style={{
              display: "flex",
              gap: "8px",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontSize: "14px",
              color: "#7A7A96",
            }}
          >
            <li>
              <Link href={homeHref} style={{ color: "#0B7B6F", textDecoration: "none" }}>
                {c.breadcrumbHome}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" style={{ color: "#1A1A2E", fontWeight: "bold" }}>
              {c.breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section style={{ padding: "48px 16px 40px", backgroundColor: "#F9F8F6" }}>
          <div style={containerStyle}>
            <div style={{ maxWidth: "700px" }}>
              <p style={labelStyle}>SchizoCare Guide</p>
              <h1
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "42px",
                  fontWeight: "bold",
                  color: "#1A1A2E",
                  margin: "0 0 20px 0",
                  lineHeight: 1.15,
                }}
              >
                {c.heroTitle}
              </h1>
              <p style={{ color: "#4A4A68", fontSize: "20px", lineHeight: 1.6, margin: 0 }}>
                {c.heroSubtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" style={{ ...sectionStyle, backgroundColor: "#FFFFFF" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>{c.overviewTitle}</p>
            <h2 style={h2Style}>{c.overviewTitle}</h2>
            <p style={{ ...pStyle, fontSize: "19px" }}>{c.overviewText}</p>
          </div>
        </section>

        {/* Symptoms */}
        <section id="symptoms" style={{ ...sectionStyle, backgroundColor: "#F9F8F6" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Symptoms</p>
            <h2 style={h2Style}>{c.symptomsTitle}</h2>
            <p style={pStyle}>{c.symptomsIntro}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
                margin: "24px 0",
              }}
            >
              {[
                {
                  title: c.positiveTitle,
                  desc: c.positiveDesc,
                  items: [c.positive1, c.positive2, c.positive3],
                  color: "#E8F0FA",
                  accent: "#4A90D9",
                },
                {
                  title: c.negativeTitle,
                  desc: c.negativeDesc,
                  items: [c.negative1, c.negative2, c.negative3],
                  color: "#FBF3E3",
                  accent: "#9E6D1B",
                },
                {
                  title: c.cognitiveTitle,
                  desc: c.cognitiveDesc,
                  items: [c.cognitive1, c.cognitive2, c.cognitive3],
                  color: "#F0EBF8",
                  accent: "#6B3FA0",
                },
              ].map(({ title, desc, items, color, accent }) => (
                <div
                  key={title}
                  style={{ ...cardStyle, borderTop: `4px solid ${accent}` }}
                >
                  <div
                    style={{
                      backgroundColor: color,
                      borderRadius: "8px",
                      padding: "12px 16px",
                      marginBottom: "12px",
                    }}
                  >
                    <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: 0 }}>{title}</h3>
                  </div>
                  <p style={{ ...pStyle, fontSize: "15px" }}>{desc}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {items.map((item) => (
                      <li
                        key={item}
                        style={{
                          ...listStyle,
                          display: "flex",
                          gap: "8px",
                          fontSize: "15px",
                        }}
                      >
                        <span aria-hidden="true" style={{ color: "#0B7B6F", flexShrink: 0 }}>
                          •
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <a href={`/${locale}/schizophrenia/symptoms`} style={linkStyle}>
              {c.symptomsLink}
            </a>
          </div>
        </section>

        {/* Causes */}
        <section id="causes" style={{ ...sectionStyle, backgroundColor: "#FFFFFF" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Causes</p>
            <h2 style={h2Style}>{c.causesTitle}</h2>
            <p style={pStyle}>{c.causesIntro}</p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                margin: "24px 0",
              }}
            >
              {[
                { title: c.cause1Title, desc: c.cause1Desc, icon: "🧬" },
                { title: c.cause2Title, desc: c.cause2Desc, icon: "🧠" },
                { title: c.cause3Title, desc: c.cause3Desc, icon: "🌿" },
                { title: c.cause4Title, desc: c.cause4Desc, icon: "💛" },
              ].map(({ title, desc, icon }) => (
                <div key={title} style={cardStyle}>
                  <div style={{ fontSize: "28px", marginBottom: "12px" }} aria-hidden="true">
                    {icon}
                  </div>
                  <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 8px 0" }}>
                    {title}
                  </h3>
                  <p style={{ ...pStyle, fontSize: "15px", margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>

            <a href={`/${locale}/schizophrenia/causes`} style={linkStyle}>
              {c.causesLink}
            </a>
          </div>
        </section>

        {/* Types */}
        <section id="types" style={{ ...sectionStyle, backgroundColor: "#F3F1ED" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Types</p>
            <h2 style={h2Style}>{c.typesTitle}</h2>
            <p style={{ ...pStyle, maxWidth: "680px" }}>{c.typesText}</p>
            <a href={`/${locale}/schizophrenia/types`} style={linkStyle}>
              {c.typesLink}
            </a>
          </div>
        </section>

        {/* Early Warning Signs */}
        <section id="early-signs" style={{ ...sectionStyle, backgroundColor: "#FFFFFF" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Early Signs</p>
            <h2 style={h2Style}>{c.earlyTitle}</h2>
            <p style={pStyle}>{c.earlyIntro}</p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "0 0 20px 0",
                maxWidth: "600px",
              }}
            >
              {[
                c.early1,
                c.early2,
                c.early3,
                c.early4,
                c.early5,
                c.early6,
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "10px 0",
                    borderBottom: "1px solid #EEECE8",
                    color: "#4A4A68",
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ color: "#0B7B6F", fontWeight: "bold", flexShrink: 0 }}
                  >
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <p style={{ ...pStyle, fontWeight: "bold", color: "#1A1A2E" }}>{c.earlyAdvice}</p>
            <a href={`/${locale}/schizophrenia/early-warning-signs`} style={linkStyle}>
              {c.earlyLink}
            </a>
          </div>
        </section>

        {/* Treatment */}
        <section id="treatment" style={{ ...sectionStyle, backgroundColor: "#F9F8F6" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Treatment</p>
            <h2 style={h2Style}>{c.treatmentTitle}</h2>
            <p style={pStyle}>{c.treatmentIntro}</p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                margin: "24px 0",
                maxWidth: "720px",
              }}
            >
              {[
                { title: c.treat1Title, desc: c.treat1Desc, icon: "💊" },
                { title: c.treat2Title, desc: c.treat2Desc, icon: "🧠" },
                { title: c.treat3Title, desc: c.treat3Desc, icon: "💬" },
                { title: c.treat4Title, desc: c.treat4Desc, icon: "✓" },
              ].map(({ title, desc, icon }) => (
                <div
                  key={title}
                  style={{ ...cardStyle, display: "flex", gap: "16px", alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      backgroundColor: "#E8F5F2",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
                      {title}
                    </h3>
                    <p style={{ ...pStyle, margin: 0, fontSize: "15px" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href={`/${locale}/treatment`} style={linkStyle}>
              {c.treatmentLink}
            </a>
          </div>
        </section>

        {/* Living with Schizophrenia */}
        <section id="living" style={{ ...sectionStyle, backgroundColor: "#FFFFFF" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Recovery</p>
            <h2 style={h2Style}>{c.livingTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={pStyle}>{c.livingText1}</p>
              <p style={pStyle}>{c.livingText2}</p>
              <p style={{ ...pStyle, fontWeight: "bold", color: "#1A1A2E" }}>{c.livingText3}</p>
            </div>
          </div>
        </section>

        {/* Myths vs Facts */}
        <section id="myths" style={{ ...sectionStyle, backgroundColor: "#F3F1ED" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>Myths vs Facts</p>
            <h2 style={h2Style}>{c.mythsTitle}</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                maxWidth: "720px",
              }}
            >
              {[
                { myth: c.myth1Q, fact: c.myth1A },
                { myth: c.myth2Q, fact: c.myth2A },
                { myth: c.myth3Q, fact: c.myth3A },
                { myth: c.myth4Q, fact: c.myth4A },
              ].map(({ myth, fact }) => (
                <div key={myth} style={cardStyle}>
                  <p
                    style={{ color: "#C03030", fontWeight: "bold", margin: "0 0 8px 0", fontSize: "15px" }}
                  >
                    {myth}
                  </p>
                  <p style={{ color: "#2E7D50", margin: 0, fontSize: "15px", lineHeight: 1.7 }}>
                    {fact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — SchizoCare */}
        <section id="schizocare-help" style={{ ...sectionStyle, backgroundColor: "#E8F5F2" }}>
          <div style={containerStyle}>
            <div style={{ maxWidth: "640px" }}>
              <p style={labelStyle}>SchizoCare</p>
              <h2 style={h2Style}>{c.ctaTitle}</h2>
              <p style={{ ...pStyle, fontSize: "18px" }}>{c.ctaText}</p>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px" }}
              >
                <Link
                  href={toolsHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "52px",
                    padding: "0 28px",
                    backgroundColor: "#0B7B6F",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "17px",
                  }}
                >
                  ✓ {c.ctaButton}
                </Link>
                <Link
                  href={toolsHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "52px",
                    padding: "0 28px",
                    backgroundColor: "transparent",
                    color: "#0B7B6F",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "17px",
                    border: "2px solid #0B7B6F",
                  }}
                >
                  {c.ctaLearn}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={{ ...sectionStyle, backgroundColor: "#FFFFFF" }}>
          <div style={containerStyle}>
            <p style={labelStyle}>FAQ</p>
            <h2 style={h2Style}>{c.faqTitle}</h2>

            <div
              style={{
                maxWidth: "720px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {[
                { q: c.faq1Q, a: c.faq1A },
                { q: c.faq2Q, a: c.faq2A },
                { q: c.faq3Q, a: c.faq3A },
                { q: c.faq4Q, a: c.faq4A },
                { q: c.faq5Q, a: c.faq5A },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  style={{ borderBottom: "1px solid #EEECE8", padding: "4px 0" }}
                >
                  <summary
                    style={{
                      cursor: "pointer",
                      fontWeight: "bold",
                      color: "#1A1A2E",
                      padding: "14px 8px",
                      minHeight: "52px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "17px",
                      lineHeight: 1.4,
                      listStyle: "none",
                    }}
                  >
                    {q}
                  </summary>
                  <p
                    style={{
                      ...pStyle,
                      padding: "0 8px 16px 8px",
                      margin: 0,
                      fontSize: "16px",
                    }}
                  >
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
