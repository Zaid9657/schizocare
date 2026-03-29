"use client";

import Link from "next/link";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "name": "Schizophrenia Symptoms",
      "description":
        "Complete guide to schizophrenia symptoms including positive, negative, and cognitive symptoms. Learn the early warning signs.",
      "about": { "@type": "MedicalCondition", "name": "Schizophrenia" },
      "mainContentOfPage": { "@type": "WebPageElement", "cssSelector": "article" },
      "specialty": "Psychiatry",
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What are the first signs of schizophrenia?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Early signs often include social withdrawal, sleep problems, declining performance at work or school, trouble thinking clearly, unusual suspiciousness, and difficulty concentrating. These signs can appear months or years before a first episode.",
          },
        },
        {
          "@type": "Question",
          "name": "Can schizophrenia symptoms come and go?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Many people experience periods of remission where symptoms are minimal, and periods where symptoms are more active. Consistent treatment helps reduce the frequency and severity of symptom episodes.",
          },
        },
        {
          "@type": "Question",
          "name": "Are symptoms the same for everyone?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Schizophrenia affects each person differently. Some people mainly experience hallucinations, others have more negative symptoms like low motivation. Treatment is personalized based on each person's specific symptoms.",
          },
        },
        {
          "@type": "Question",
          "name": "Can symptoms get better with treatment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. With proper treatment including medication, therapy, and support, most people see significant improvement in their symptoms. Many people with schizophrenia lead fulfilling, independent lives.",
          },
        },
      ],
    },
  ],
};

const EN = {
  // Meta / breadcrumb
  breadcrumbHome: "Home",
  breadcrumbPillar: "Schizophrenia",
  breadcrumbCurrent: "Symptoms",
  backLink: "← Back to: What is Schizophrenia?",

  // Hero
  heroLabel: "SchizoCare Guide",
  heroTitle: "Schizophrenia Symptoms",
  heroSubtitle:
    "Understanding the signs of schizophrenia — what to look for and when to seek help.",

  // Overview
  overviewLabel: "Overview",
  overviewTitle: "About These Symptoms",
  overviewText1:
    "Schizophrenia symptoms vary from person to person. No two people experience them in exactly the same way. Some people have strong positive symptoms like hallucinations. Others have more negative symptoms like low motivation. Many have a mix of both.",
  overviewText2:
    "Symptoms usually appear in the late teens to early 30s. They often develop gradually. Early treatment leads to much better outcomes. And the good news is: symptoms can be managed. With the right support, many people reduce their symptoms significantly.",

  // Positive
  positiveLabel: "Positive Symptoms",
  positiveTitle: "Positive Symptoms",
  positiveNote:
    '⚠️ Note: "Positive" does not mean good. It means experiences that are added to your normal thinking and perception.',
  positiveIntro: "Positive symptoms are things you experience that most other people do not:",
  hallTitle: "Hallucinations",
  hallDesc:
    "Hallucinations mean you see, hear, smell, or feel things that are not there. The most common type is hearing voices. These voices may seem very real — commenting on what you do, talking to each other, or giving commands. Other types include seeing things, or feeling sensations on your skin.",
  delusTitle: "Delusions",
  delusDesc:
    "Delusions are strong beliefs that are not based in reality — and that stay fixed even when others show they are not true. Common types include: paranoid delusions (believing people are watching or plotting against you), grandiose delusions (believing you have special powers or are a famous person), and referential delusions (believing random events have personal meaning directed at you).",
  speechTitle: "Disorganized Speech",
  speechDesc:
    "Thoughts may jump between unrelated topics. Sentences may not connect. Sometimes speech becomes so disorganized that it is hard for others to follow. You may feel your thoughts are moving too fast or getting tangled.",
  behaviorTitle: "Disorganized Behavior",
  behaviorDesc:
    "Actions may become unpredictable or hard to understand. Everyday tasks like cooking or getting dressed may become very difficult. Sometimes behavior can seem childlike or unusual to others.",

  // Negative
  negativeLabel: "Negative Symptoms",
  negativeTitle: "Negative Symptoms",
  negativeNote:
    '⚠️ Note: "Negative" means things are reduced — not that they are bad. These symptoms are often mistaken for depression or laziness, but they are part of the condition.',
  negativeIntro: "Negative symptoms involve a reduction in normal abilities and experiences:",
  affectTitle: "Flat Affect",
  affectDesc:
    "Facial expressions and voice tone may become less varied. You may feel emotions inside but show less of them on the outside. Others may think you are uninterested, but this is a symptom — not a choice.",
  speechRedTitle: "Reduced Speech",
  speechRedDesc:
    "You may talk less than before. Answers may become shorter. Finding words or starting conversations may feel difficult. This is called alogia.",
  motivTitle: "Low Motivation",
  motivDesc:
    "Starting or finishing tasks — even simple ones — can feel very hard. This is called avolition. It is not laziness. The brain is working differently, and everyday actions require much more effort.",
  withdrawTitle: "Social Withdrawal",
  withdrawDesc:
    "You may want to spend more time alone and less time with family or friends. Social situations may feel overwhelming or pointless. This can lead to isolation if not supported.",
  anhedTitle: "Anhedonia",
  anhedDesc:
    "Activities that used to bring pleasure — hobbies, food, music, time with people — may feel less enjoyable or feel empty. This is one of the harder symptoms to talk about.",

  // Cognitive
  cognitiveLabel: "Cognitive Symptoms",
  cognitiveTitle: "Cognitive Symptoms",
  cognitiveIntro:
    "Cognitive symptoms affect how you think, remember, and process information. They can have a big impact on daily life — work, school, and independent living.",
  memTitle: "Memory Problems",
  memDesc:
    "You may find it harder to remember things — appointments, instructions, or things you just read. Working memory (holding information in mind while doing something) is often affected.",
  attTitle: "Attention Difficulties",
  attDesc:
    "Staying focused on a task — reading, following a conversation, or watching a film — may feel much harder than before. Distractions feel larger.",
  execTitle: "Executive Function",
  execDesc:
    "Planning, organizing, and making decisions may feel overwhelming. Breaking a task into steps, or knowing where to start, can feel very difficult.",
  speedTitle: "Processing Speed",
  speedDesc:
    "Thinking may feel slower. Responding in conversations or processing information quickly may require more effort.",
  cognitiveNote:
    "SchizoCare has brain training exercises designed to help with these challenges. They are step-by-step, easy to use, and free.",

  // Early warning signs
  earlyLabel: "Early Signs",
  earlyTitle: "Early Warning Signs",
  earlyIntro:
    "Sometimes symptoms develop slowly over months before a first episode. This period is called the prodromal phase. Recognizing early changes can lead to earlier help.",
  earlyItems: [
    "Sleep problems — sleeping too much, too little, or at unusual times",
    "Declining performance at school or work",
    "Trouble thinking clearly or staying focused",
    "Growing suspiciousness — feeling watched or unsafe without clear reason",
    "Pulling away from friends and family",
    "Unusual or strange ideas that feel very real",
    "Neglecting personal hygiene or daily routines",
  ],
  earlyAdvice:
    "If you or someone you care about shows several of these signs, speak with a doctor. Getting support early makes a big difference.",
  earlyLink: "Learn more about early warning signs →",

  // Relapse
  relapseLabel: "Relapse",
  relapseTitle: "When Symptoms Get Worse",
  relapseIntro:
    "Even with treatment, symptoms can sometimes return or get worse. This is called a relapse. Knowing the warning signs helps you act quickly.",
  relapseTriggers: "Common triggers include:",
  triggerItems: [
    "Stopping or changing medication without medical advice",
    "High levels of stress",
    "Substance use (alcohol, cannabis, other drugs)",
    "Lack of sleep",
    "Major life changes",
  ],
  relapseAdvice:
    "Tracking your mood and symptoms regularly can help you spot early changes. SchizoCare's mood tracker is designed to help with this. If symptoms are getting worse, contact your doctor as soon as possible.",

  // Comparison
  compareLabel: "Diagnosis",
  compareTitle: "Symptoms vs Other Conditions",
  compareText1:
    "Some symptoms of schizophrenia are similar to those in other conditions — bipolar disorder, severe depression, or PTSD. For example, bipolar disorder can include psychosis during episodes. Depression can cause low motivation and withdrawal. PTSD can cause paranoia and hearing sounds.",
  compareText2:
    "Only a qualified mental health professional can make a diagnosis. If you are concerned about any symptoms — yours or someone you care about — the most important step is to see a doctor.",

  // Getting help
  helpLabel: "Get Help",
  helpTitle: "Getting Help",
  helpText1:
    "If you think you or someone you care about may have schizophrenia symptoms, talk to a doctor or psychiatrist. An evaluation usually includes a conversation about your experiences, a review of your history, and sometimes a physical check to rule out other causes.",
  helpText2:
    "You do not have to describe symptoms perfectly. Just share what you notice. The doctor will ask questions to understand.",
  ctaButton: "Sign Up Free — It's Free",
  ctaDesc: "SchizoCare helps you track symptoms, manage medication, and practice exercises that help.",

  // FAQ
  faqLabel: "Questions",
  faqTitle: "Frequently Asked Questions",
  faq1Q: "What are the first signs of schizophrenia?",
  faq1A:
    "Early signs often include social withdrawal, sleep problems, declining performance at work or school, trouble thinking clearly, unusual suspiciousness, and difficulty concentrating. These signs can appear months or years before a first episode.",
  faq2Q: "Can schizophrenia symptoms come and go?",
  faq2A:
    "Yes. Many people experience periods of remission where symptoms are minimal, and periods where symptoms are more active. Consistent treatment helps reduce the frequency and severity of symptom episodes.",
  faq3Q: "Are symptoms the same for everyone?",
  faq3A:
    "No. Schizophrenia affects each person differently. Some people mainly experience hallucinations, others have more negative symptoms like low motivation. Treatment is personalized based on each person's specific symptoms.",
  faq4Q: "Can symptoms get better with treatment?",
  faq4A:
    "Yes. With proper treatment including medication, therapy, and support, most people see significant improvement in their symptoms. Many people with schizophrenia lead fulfilling, independent lives.",
};

const DE = {
  breadcrumbHome: "Startseite",
  breadcrumbPillar: "Schizophrenie",
  breadcrumbCurrent: "Symptome",
  backLink: "← Zurück zu: Was ist Schizophrenie?",

  heroLabel: "SchizoCare Ratgeber",
  heroTitle: "Symptome der Schizophrenie",
  heroSubtitle:
    "Die Zeichen der Schizophrenie verstehen — worauf man achten sollte und wann man Hilfe sucht.",

  overviewLabel: "Überblick",
  overviewTitle: "Über diese Symptome",
  overviewText1:
    "Schizophrenie-Symptome unterscheiden sich von Person zu Person. Keine zwei Menschen erleben sie genau gleich. Manche haben ausgeprägte positive Symptome wie Halluzinationen. Andere haben mehr negative Symptome wie geringe Motivation. Viele haben eine Mischung aus beidem.",
  overviewText2:
    "Symptome treten oft im späten Teenageralter bis in die frühen 30er Jahre auf. Sie entwickeln sich häufig langsam. Frühe Behandlung führt zu viel besseren Ergebnissen. Die gute Nachricht: Symptome können bewältigt werden. Mit der richtigen Unterstützung können viele Menschen ihre Symptome erheblich reduzieren.",

  positiveLabel: "Positive Symptome",
  positiveTitle: "Positive Symptome",
  positiveNote:
    '⚠️ Hinweis: „Positiv" bedeutet nicht gut. Es bedeutet Erfahrungen, die zum normalen Denken und Wahrnehmen hinzukommen.',
  positiveIntro: "Positive Symptome sind Dinge, die Sie erleben, die die meisten anderen Menschen nicht erleben:",
  hallTitle: "Halluzinationen",
  hallDesc:
    "Halluzinationen bedeuten, dass Sie Dinge sehen, hören, riechen oder fühlen, die nicht da sind. Der häufigste Typ ist Stimmen hören. Diese Stimmen können sehr real wirken — sie kommentieren, was Sie tun, sprechen miteinander oder geben Befehle. Andere Typen umfassen das Sehen von Dingen oder Empfindungen auf der Haut.",
  delusTitle: "Wahnvorstellungen",
  delusDesc:
    "Wahnvorstellungen sind starke Überzeugungen, die nicht der Realität entsprechen — und die auch dann bestehen bleiben, wenn andere zeigen, dass sie nicht wahr sind. Häufige Typen: paranoide Wahnvorstellungen (die Überzeugung, dass jemand Sie beobachtet oder gegen Sie vorgeht), Größenwahn (die Überzeugung, besondere Kräfte zu haben) und Beziehungsideen (die Überzeugung, dass zufällige Ereignisse eine persönliche Bedeutung für Sie haben).",
  speechTitle: "Desorganisiertes Sprechen",
  speechDesc:
    "Gedanken können zwischen nicht zusammenhängenden Themen springen. Sätze verbinden sich möglicherweise nicht. Manchmal wird das Sprechen so desorganisiert, dass es für andere schwer zu folgen ist. Sie können das Gefühl haben, dass sich Ihre Gedanken zu schnell bewegen oder verheddern.",
  behaviorTitle: "Desorganisiertes Verhalten",
  behaviorDesc:
    "Handlungen können unvorhersehbar oder schwer verständlich werden. Alltägliche Aufgaben wie Kochen oder Anziehen können sehr schwierig werden. Manchmal kann Verhalten für andere kindlich oder ungewöhnlich wirken.",

  negativeLabel: "Negative Symptome",
  negativeTitle: "Negative Symptome",
  negativeNote:
    '⚠️ Hinweis: „Negativ" bedeutet, dass Fähigkeiten vermindert sind — nicht dass sie schlecht sind. Diese Symptome werden oft mit Depression oder Faulheit verwechselt, sind aber Teil der Erkrankung.',
  negativeIntro: "Negative Symptome beinhalten eine Verminderung normaler Fähigkeiten und Erfahrungen:",
  affectTitle: "Flacher Affekt",
  affectDesc:
    "Mimik und Stimmton können weniger variiert werden. Sie können Emotionen innerlich fühlen, aber weniger davon nach außen zeigen. Andere denken vielleicht, Sie sind desinteressiert — aber das ist ein Symptom, keine Wahl.",
  speechRedTitle: "Vermindertes Sprechen",
  speechRedDesc:
    "Sie sprechen vielleicht weniger als zuvor. Antworten werden kürzer. Wörter zu finden oder Gespräche zu beginnen kann sich schwierig anfühlen. Dies wird Alogie genannt.",
  motivTitle: "Geringe Motivation",
  motivDesc:
    "Aufgaben zu beginnen oder zu beenden — selbst einfache — kann sich sehr schwer anfühlen. Dies wird Abulie genannt. Es ist keine Faulheit. Das Gehirn arbeitet anders, und alltägliche Handlungen erfordern viel mehr Aufwand.",
  withdrawTitle: "Sozialer Rückzug",
  withdrawDesc:
    "Sie möchten vielleicht mehr Zeit allein verbringen und weniger Zeit mit Familie oder Freunden. Soziale Situationen können sich überwältigend oder sinnlos anfühlen. Dies kann zu Isolation führen, wenn es nicht unterstützt wird.",
  anhedTitle: "Anhedonie",
  anhedDesc:
    "Aktivitäten, die früher Freude bereitet haben — Hobbys, Essen, Musik, Zeit mit Menschen — können sich weniger angenehm oder leer anfühlen. Das ist eines der schwieriger zu beschreibenden Symptome.",

  cognitiveLabel: "Kognitive Symptome",
  cognitiveTitle: "Kognitive Symptome",
  cognitiveIntro:
    "Kognitive Symptome beeinflussen, wie Sie denken, sich erinnern und Informationen verarbeiten. Sie können einen großen Einfluss auf das tägliche Leben haben — Arbeit, Schule und selbständiges Leben.",
  memTitle: "Gedächtnisprobleme",
  memDesc:
    "Es kann schwieriger werden, sich an Dinge zu erinnern — Termine, Anweisungen oder Dinge, die Sie gerade gelesen haben. Das Arbeitsgedächtnis (Informationen im Gedächtnis halten, während man etwas tut) ist häufig betroffen.",
  attTitle: "Aufmerksamkeitsschwierigkeiten",
  attDesc:
    "Sich auf eine Aufgabe zu konzentrieren — Lesen, einem Gespräch folgen oder einen Film ansehen — kann sich viel schwerer anfühlen als zuvor. Ablenkungen fühlen sich größer an.",
  execTitle: "Exekutivfunktion",
  execDesc:
    "Planen, Organisieren und Entscheidungen treffen kann sich überwältigend anfühlen. Eine Aufgabe in Schritte zu unterteilen oder zu wissen, wo man anfangen soll, kann sich sehr schwierig anfühlen.",
  speedTitle: "Verarbeitungsgeschwindigkeit",
  speedDesc:
    "Das Denken kann sich langsamer anfühlen. Schnell auf Gespräche zu reagieren oder Informationen zu verarbeiten erfordert mehr Aufwand.",
  cognitiveNote:
    "SchizoCare hat Gehirntraining-Übungen, die bei diesen Herausforderungen helfen sollen. Sie sind schrittweise, einfach zu benutzen und kostenlos.",

  earlyLabel: "Frühe Zeichen",
  earlyTitle: "Frühe Warnzeichen",
  earlyIntro:
    "Manchmal entwickeln sich Symptome langsam über Monate vor einer ersten Episode. Diese Periode wird als Prodromalphase bezeichnet. Frühe Veränderungen zu erkennen kann zu früherer Hilfe führen.",
  earlyItems: [
    "Schlafprobleme — zu viel, zu wenig oder zu ungewöhnlichen Zeiten schlafen",
    "Nachlassende Leistung in der Schule oder bei der Arbeit",
    "Schwierigkeiten, klar zu denken oder fokussiert zu bleiben",
    "Wachsendes Misstrauen — sich beobachtet oder unsicher fühlen ohne klaren Grund",
    "Rückzug von Freunden und Familie",
    "Ungewöhnliche oder seltsame Ideen, die sich sehr real anfühlen",
    "Vernachlässigung persönlicher Hygiene oder täglicher Routinen",
  ],
  earlyAdvice:
    "Wenn Sie oder jemand, dem Sie wichtig sind, mehrere dieser Zeichen zeigt, sprechen Sie mit einem Arzt. Frühe Unterstützung macht einen großen Unterschied.",
  earlyLink: "Mehr über frühe Warnzeichen →",

  relapseLabel: "Rückfall",
  relapseTitle: "Wenn Symptome schlimmer werden",
  relapseIntro:
    "Selbst mit Behandlung können Symptome manchmal zurückkehren oder sich verschlimmern. Dies wird als Rückfall bezeichnet. Die Warnzeichen zu kennen hilft, schnell zu handeln.",
  relapseTriggers: "Häufige Auslöser sind:",
  triggerItems: [
    "Medikamente ohne ärztlichen Rat absetzen oder ändern",
    "Hohe Stressbelastung",
    "Substanzkonsum (Alkohol, Cannabis, andere Drogen)",
    "Schlafmangel",
    "Große Lebensveränderungen",
  ],
  relapseAdvice:
    "Ihre Stimmung und Symptome regelmäßig zu verfolgen kann helfen, frühe Veränderungen zu erkennen. Der Stimmungstracker von SchizoCare ist dafür ausgelegt. Wenn Symptome schlimmer werden, wenden Sie sich so schnell wie möglich an Ihren Arzt.",

  compareLabel: "Diagnose",
  compareTitle: "Symptome im Vergleich zu anderen Erkrankungen",
  compareText1:
    "Einige Symptome der Schizophrenie ähneln denen bei anderen Erkrankungen — bipolarer Störung, schwerer Depression oder PTBS. Beispielsweise kann eine bipolare Störung während Episoden Psychosen umfassen. Depression kann geringe Motivation und Rückzug verursachen. PTBS kann Paranoia und Geräusche hören verursachen.",
  compareText2:
    "Nur ein qualifizierter Psychiater kann eine Diagnose stellen. Wenn Sie sich Sorgen um Symptome machen — Ihre eigenen oder die von jemandem, dem Sie wichtig sind — ist der wichtigste Schritt, einen Arzt aufzusuchen.",

  helpLabel: "Hilfe holen",
  helpTitle: "Hilfe holen",
  helpText1:
    "Wenn Sie denken, dass Sie oder jemand, dem Sie wichtig sind, Symptome einer Schizophrenie haben könnte, sprechen Sie mit einem Arzt oder Psychiater. Eine Bewertung umfasst in der Regel ein Gespräch über Ihre Erfahrungen, eine Überprüfung Ihrer Krankengeschichte und manchmal eine körperliche Untersuchung.",
  helpText2:
    "Sie müssen Symptome nicht perfekt beschreiben. Teilen Sie einfach mit, was Sie bemerken. Der Arzt wird Fragen stellen, um zu verstehen.",
  ctaButton: "Kostenlos registrieren",
  ctaDesc: "SchizoCare hilft Ihnen, Symptome zu verfolgen, Medikamente zu verwalten und hilfreiche Übungen zu machen.",

  faqLabel: "Fragen",
  faqTitle: "Häufig gestellte Fragen",
  faq1Q: "Was sind die ersten Anzeichen einer Schizophrenie?",
  faq1A:
    "Frühe Anzeichen sind häufig sozialer Rückzug, Schlafprobleme, nachlassende Leistung bei der Arbeit oder in der Schule, Schwierigkeiten, klar zu denken, ungewöhnliches Misstrauen und Konzentrationsprobleme. Diese Zeichen können Monate oder Jahre vor einer ersten Episode auftreten.",
  faq2Q: "Können Schizophrenie-Symptome kommen und gehen?",
  faq2A:
    "Ja. Viele Menschen erleben Phasen der Remission, in denen die Symptome minimal sind, und Phasen, in denen die Symptome aktiver sind. Konsequente Behandlung hilft, Häufigkeit und Schwere der Symptomepisoden zu reduzieren.",
  faq3Q: "Sind die Symptome bei allen gleich?",
  faq3A:
    "Nein. Schizophrenie betrifft jeden Menschen anders. Manche erleben hauptsächlich Halluzinationen, andere haben mehr negative Symptome wie geringe Motivation. Die Behandlung wird individuell auf die spezifischen Symptome jeder Person abgestimmt.",
  faq4Q: "Können Symptome mit Behandlung besser werden?",
  faq4A:
    "Ja. Mit der richtigen Behandlung, einschließlich Medikamenten, Therapie und Unterstützung, sehen die meisten Menschen eine erhebliche Verbesserung ihrer Symptome. Viele Menschen mit Schizophrenie führen ein erfülltes, selbständiges Leben.",
};

interface Props {
  locale: string;
}

export function SymptomsPage({ locale }: Props) {
  const c = locale === "de" ? DE : EN;
  const homeHref = `/${locale}`;
  const pillarHref = locale === "de" ? `/${locale}/schizophrenie` : `/${locale}/schizophrenia`;
  const earlyHref = locale === "de" ? `/${locale}/schizophrenie/fruehe-warnzeichen` : `/${locale}/schizophrenia/early-warning-signs`;
  const toolsHref = `/${locale}#tools`;

  const sectionAlt = { padding: "48px 16px", backgroundColor: "#F9F8F6" };
  const sectionWhite = { padding: "48px 16px", backgroundColor: "#FFFFFF" };
  const sectionWarm = { padding: "48px 16px", backgroundColor: "#F3F1ED" };
  const container = { maxWidth: "960px", margin: "0 auto" };
  const h2 = { fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "28px", fontWeight: "bold" as const, color: "#1A1A2E", margin: "0 0 16px 0", lineHeight: 1.2 };
  const p = { color: "#4A4A68", lineHeight: 1.8, margin: "0 0 16px 0" };
  const label = { fontSize: "12px", fontWeight: "bold" as const, textTransform: "uppercase" as const, letterSpacing: "0.1em", color: "#0B7B6F", margin: "0 0 8px 0", display: "block" as const };
  const card = { backgroundColor: "#FFFFFF", border: "2px solid #EEECE8", borderRadius: "12px", padding: "24px" };
  const linkStyle = { color: "#0B7B6F", fontWeight: "bold" as const, textDecoration: "none", display: "inline-block" as const, marginTop: "8px" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <article>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ padding: "16px 16px 0", maxWidth: "960px", margin: "0 auto" }}>
          <ol style={{ display: "flex", flexWrap: "wrap", gap: "8px", listStyle: "none", padding: 0, margin: 0, fontSize: "14px", color: "#7A7A96" }}>
            <li><Link href={homeHref} style={{ color: "#0B7B6F", textDecoration: "none" }}>{c.breadcrumbHome}</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href={pillarHref} style={{ color: "#0B7B6F", textDecoration: "none" }}>{c.breadcrumbPillar}</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" style={{ color: "#1A1A2E", fontWeight: "bold" }}>{c.breadcrumbCurrent}</li>
          </ol>
        </nav>

        {/* Back link */}
        <div style={{ padding: "8px 16px 0", maxWidth: "960px", margin: "0 auto" }}>
          <Link href={pillarHref} style={linkStyle}>{c.backLink}</Link>
        </div>

        {/* Hero */}
        <section style={{ padding: "40px 16px 40px", backgroundColor: "#F9F8F6" }}>
          <div style={container}>
            <div style={{ maxWidth: "700px" }}>
              <span style={label}>{c.heroLabel}</span>
              <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "42px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 20px 0", lineHeight: 1.15 }}>
                {c.heroTitle}
              </h1>
              <p style={{ color: "#4A4A68", fontSize: "20px", lineHeight: 1.6, margin: 0 }}>{c.heroSubtitle}</p>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section id="overview" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.overviewLabel}</span>
            <h2 style={h2}>{c.overviewTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.overviewText1}</p>
              <p style={{ ...p, margin: 0 }}>{c.overviewText2}</p>
            </div>
          </div>
        </section>

        {/* Positive Symptoms */}
        <section id="positive-symptoms" style={{ padding: "48px 16px", backgroundColor: "#E8F0FA" }}>
          <div style={container}>
            <span style={{ ...label, color: "#2A5FA8" }}>{c.positiveLabel}</span>
            <h2 style={h2}>{c.positiveTitle}</h2>
            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid #C5D9F5", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", maxWidth: "680px" }}>
              <p style={{ color: "#2A5FA8", fontWeight: "bold", margin: 0, fontSize: "15px" }}>{c.positiveNote}</p>
            </div>
            <p style={p}>{c.positiveIntro}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
              {[
                { title: c.hallTitle, desc: c.hallDesc, icon: "👂" },
                { title: c.delusTitle, desc: c.delusDesc, icon: "💭" },
                { title: c.speechTitle, desc: c.speechDesc, icon: "🗣️" },
                { title: c.behaviorTitle, desc: c.behaviorDesc, icon: "🌀" },
              ].map(({ title, desc, icon }) => (
                <div key={title} style={{ ...card, borderTop: "4px solid #4A90D9" }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }} aria-hidden="true">{icon}</div>
                  <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 8px 0" }}>{title}</h3>
                  <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Negative Symptoms */}
        <section id="negative-symptoms" style={{ padding: "48px 16px", backgroundColor: "#FBF3E3" }}>
          <div style={container}>
            <span style={{ ...label, color: "#7A4F0A" }}>{c.negativeLabel}</span>
            <h2 style={h2}>{c.negativeTitle}</h2>
            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid #E8C97A", borderRadius: "10px", padding: "14px 18px", marginBottom: "24px", maxWidth: "680px" }}>
              <p style={{ color: "#7A4F0A", fontWeight: "bold", margin: 0, fontSize: "15px" }}>{c.negativeNote}</p>
            </div>
            <p style={p}>{c.negativeIntro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "720px" }}>
              {[
                { title: c.affectTitle, desc: c.affectDesc, icon: "😐" },
                { title: c.speechRedTitle, desc: c.speechRedDesc, icon: "🤐" },
                { title: c.motivTitle, desc: c.motivDesc, icon: "🪫" },
                { title: c.withdrawTitle, desc: c.withdrawDesc, icon: "🚪" },
                { title: c.anhedTitle, desc: c.anhedDesc, icon: "🎭" },
              ].map(({ title, desc, icon }) => (
                <div key={title} style={{ ...card, display: "flex", gap: "16px", alignItems: "flex-start", borderLeft: "4px solid #D4A017" }}>
                  <div style={{ fontSize: "26px", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">{icon}</div>
                  <div>
                    <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>{title}</h3>
                    <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cognitive Symptoms */}
        <section id="cognitive-symptoms" style={{ padding: "48px 16px", backgroundColor: "#F0EBF8" }}>
          <div style={container}>
            <span style={{ ...label, color: "#4A2A7A" }}>{c.cognitiveLabel}</span>
            <h2 style={h2}>{c.cognitiveTitle}</h2>
            <p style={p}>{c.cognitiveIntro}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
              {[
                { title: c.memTitle, desc: c.memDesc, icon: "🧩" },
                { title: c.attTitle, desc: c.attDesc, icon: "🎯" },
                { title: c.execTitle, desc: c.execDesc, icon: "📋" },
                { title: c.speedTitle, desc: c.speedDesc, icon: "⏱️" },
              ].map(({ title, desc, icon }) => (
                <div key={title} style={{ ...card, borderTop: "4px solid #8B5CF6" }}>
                  <div style={{ fontSize: "28px", marginBottom: "10px" }} aria-hidden="true">{icon}</div>
                  <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 8px 0" }}>{title}</h3>
                  <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>{desc}</p>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid #C4B5FD", borderRadius: "10px", padding: "14px 18px", maxWidth: "680px" }}>
              <p style={{ color: "#4A2A7A", fontWeight: "bold", margin: 0, fontSize: "15px" }}>{c.cognitiveNote}</p>
            </div>
          </div>
        </section>

        {/* Early Warning Signs */}
        <section id="early-signs" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.earlyLabel}</span>
            <h2 style={h2}>{c.earlyTitle}</h2>
            <p style={p}>{c.earlyIntro}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", maxWidth: "620px" }}>
              {c.earlyItems.map((item: string) => (
                <li key={item} style={{ display: "flex", gap: "12px", padding: "10px 0", borderBottom: "1px solid #EEECE8", color: "#4A4A68", lineHeight: 1.6 }}>
                  <span aria-hidden="true" style={{ color: "#0B7B6F", fontWeight: "bold", flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ ...p, fontWeight: "bold", color: "#1A1A2E" }}>{c.earlyAdvice}</p>
            <Link href={earlyHref} style={linkStyle}>{c.earlyLink}</Link>
          </div>
        </section>

        {/* Relapse */}
        <section id="relapse" style={sectionAlt}>
          <div style={container}>
            <span style={label}>{c.relapseLabel}</span>
            <h2 style={h2}>{c.relapseTitle}</h2>
            <p style={p}>{c.relapseIntro}</p>
            <p style={{ ...p, fontWeight: "bold", color: "#1A1A2E", margin: "0 0 12px 0" }}>{c.relapseTriggers}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", maxWidth: "580px" }}>
              {c.triggerItems.map((item: string) => (
                <li key={item} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: "1px solid #E0DDD7", color: "#4A4A68", lineHeight: 1.6 }}>
                  <span aria-hidden="true" style={{ color: "#C03030", flexShrink: 0 }}>⚠</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ ...p, margin: 0 }}>{c.relapseAdvice}</p>
          </div>
        </section>

        {/* Comparison */}
        <section id="comparison" style={sectionWarm}>
          <div style={container}>
            <span style={label}>{c.compareLabel}</span>
            <h2 style={h2}>{c.compareTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.compareText1}</p>
              <p style={{ ...p, margin: 0, fontWeight: "bold", color: "#1A1A2E" }}>{c.compareText2}</p>
            </div>
          </div>
        </section>

        {/* Getting Help + CTA */}
        <section id="get-help" style={{ padding: "48px 16px", backgroundColor: "#E8F5F2" }}>
          <div style={container}>
            <span style={label}>{c.helpLabel}</span>
            <h2 style={h2}>{c.helpTitle}</h2>
            <div style={{ maxWidth: "680px" }}>
              <p style={p}>{c.helpText1}</p>
              <p style={{ ...p, marginBottom: "28px" }}>{c.helpText2}</p>
              <p style={{ color: "#4A4A68", marginBottom: "20px" }}>{c.ctaDesc}</p>
              <Link
                href={toolsHref}
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "52px", padding: "0 28px", backgroundColor: "#0B7B6F", color: "#FFFFFF", fontWeight: "bold", borderRadius: "8px", textDecoration: "none", fontSize: "17px" }}
              >
                ✓ {c.ctaButton}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.faqLabel}</span>
            <h2 style={h2}>{c.faqTitle}</h2>
            <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {[
                { q: c.faq1Q, a: c.faq1A },
                { q: c.faq2Q, a: c.faq2A },
                { q: c.faq3Q, a: c.faq3A },
                { q: c.faq4Q, a: c.faq4A },
              ].map(({ q, a }) => (
                <details key={q} style={{ borderBottom: "1px solid #EEECE8", padding: "4px 0" }}>
                  <summary style={{ cursor: "pointer", fontWeight: "bold", color: "#1A1A2E", padding: "14px 8px", minHeight: "52px", display: "flex", alignItems: "center", fontSize: "17px", lineHeight: 1.4, listStyle: "none" }}>
                    {q}
                  </summary>
                  <p style={{ ...p, padding: "0 8px 16px 8px", margin: 0, fontSize: "16px" }}>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
