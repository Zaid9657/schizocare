"use client";

import Link from "next/link";

const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalTherapy",
      "name": "Acceptance and Commitment Therapy for Voices",
      "alternateName": ["ACT for Psychosis", "ACTp", "ACT for Voices"],
      "description":
        "A therapeutic approach that helps people change their relationship with auditory hallucinations through acceptance, mindfulness, and values-based living.",
      "medicineSystem": "WesternConventional",
      "relevantSpecialty": { "@type": "MedicalSpecialty", "name": "Psychiatry" },
      "study": {
        "@type": "MedicalStudy",
        "description":
          "Multiple randomized controlled trials show ACT reduces voice-related distress and improves quality of life.",
      },
      "indication": { "@type": "MedicalCondition", "name": "Schizophrenia" },
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Does ACT make voices go away?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "ACT doesn't aim to eliminate voices. Instead, it helps reduce the distress voices cause and lets you live a meaningful life even when voices are present. Many people find that when they stop fighting, voices become less intrusive over time.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I do ACT while taking medication?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. ACT works well alongside medication. It's not a replacement for medical treatment but an additional tool that can improve your quality of life. Always consult your doctor about your treatment plan.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does it take to see results?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some people notice shifts in a few weeks, while for others it takes longer. ACT is a skill that develops with practice. Even small improvements in how you relate to voices can make a big difference in daily life.",
          },
        },
        {
          "@type": "Question",
          "name": "What if the voices get worse when I stop fighting them?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This is a common concern. Initially, paying attention differently can feel uncomfortable. With practice, most people find that acceptance actually reduces the power and distress of voices. Go slowly and consider working with a trained therapist.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I do ACT on my own or do I need a therapist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can start with self-help exercises and tools like SchizoCare. Many people benefit from working with a therapist trained in ACT, especially at the beginning. A combination of self-practice and professional support often works best.",
          },
        },
      ],
    },
  ],
};

const EN = {
  breadcrumbHome: "Home",
  breadcrumbTreatment: "Treatment",
  breadcrumbCurrent: "ACT Therapy for Voices",
  badge: "Innovative Approach",

  heroTitle: "Learning to Live with Voices",
  heroSubtitle:
    "A different approach: instead of fighting the voices, learn a new way to relate to them. Many people find this reduces stress and improves daily life.",

  whatLabel: "About ACT",
  whatTitle: "What is ACT for Voices?",
  whatText1:
    "ACT stands for Acceptance and Commitment Therapy. It is a modern, evidence-based approach that was developed by clinical researchers studying why some people suffer more from their voices than others.",
  whatText2:
    "The key finding: it is not the voices themselves that cause the most suffering — it is the struggle against them. People who fight voices often find they get louder, more frequent, and more distressing.",
  whatText3:
    "ACT offers a different path. Instead of trying to eliminate voices, you learn to change your relationship with them. You become the person who hears voices — not a person controlled by them. Research from the UK, Australia, and the Netherlands shows that ACT reduces voice-related distress and improves quality of life. And importantly, it puts you in control.",

  paradoxLabel: "The Struggle",
  paradoxTitle: "Why Fighting Voices Often Does Not Work",
  paradoxText1:
    "Imagine falling into quicksand. Your instinct is to struggle — to push against it, to fight your way out. But struggling actually makes you sink faster. The more effort you put in, the worse it gets.",
  paradoxText2:
    "Voices can work the same way. The harder you fight them, argue with them, or try to block them out, the more mental energy you give them — and the stronger they feel.",
  paradoxText3:
    "Traditional approaches often focused on suppressing or challenging voices. This helps some people. But for others, it keeps them locked in an exhausting battle. ACT offers a way out of that battle — not by winning it, but by choosing not to fight.",

  coreLabel: "Core Concepts",
  coreTitle: "The Six Core Ideas of ACT",
  coreIntro: "ACT is built on six ideas. You do not need to master all of them. Start with one.",
  concepts: [
    {
      icon: "🌊",
      title: "Acceptance",
      desc: "Making room for voices without letting them control your life. Acceptance does not mean you like the voices or agree with them. It means you stop spending all your energy fighting something you cannot always control — and use that energy for your life instead.",
    },
    {
      icon: "🔍",
      title: "Cognitive Defusion",
      desc: 'Seeing voices as sounds or words — not commands or truths. Instead of "The voice is telling me I am worthless," try: "I notice I am hearing a voice that says I am worthless." This small shift creates distance. You observe the voice instead of becoming it.',
    },
    {
      icon: "🌿",
      title: "Present Moment",
      desc: "Voices often pull you into the past (\u201cremember when you failed\u201d) or the future (\u201csomething bad will happen\u201d). Grounding yourself in the present moment \u2014 what you can see, hear, touch right now \u2014 gives you a place voices cannot easily reach.",
    },
    {
      icon: "🌀",
      title: "Self as Context",
      desc: "You are not your voices. You are the person who experiences them. Think of yourself as the sky — voices are clouds passing through. The sky is never harmed by a cloud, no matter how dark. Your identity is larger than any symptom.",
    },
    {
      icon: "💛",
      title: "Values",
      desc: "What matters most to you? Family? Creativity? Kindness? Learning? Your values are like a compass. ACT helps you identify what truly matters and move toward it — even on difficult days when voices are loud.",
    },
    {
      icon: "👣",
      title: "Committed Action",
      desc: "Taking steps toward your values, even small ones, even when voices are present. You do not need silence to live a meaningful life. One small step in the direction of what you care about is always possible.",
    },
  ],

  exercisesLabel: "Exercises",
  exercisesTitle: "Practical Exercises to Try",
  exercisesIntro:
    "These exercises come from ACT practice. Try one at a time. There is no right or wrong way — just practice.",
  exercises: [
    {
      num: "1",
      title: "Passengers on the Bus",
      icon: "🚌",
      color: "#E8F5F2",
      borderColor: "#0B7B6F",
      steps: [
        "Imagine you are driving a bus toward something that matters to you — a goal, a value, a place.",
        "The voices are passengers on the bus. They can shout, criticize, or make noise.",
        "But you hold the steering wheel. You decide where the bus goes.",
        "You do not need to argue with the passengers or throw them off to keep driving.",
        "Practice: Close your eyes for two minutes. Picture the bus. Notice who is on it. Keep driving.",
      ],
    },
    {
      num: "2",
      title: "Voice Dialogue Journaling",
      icon: "📓",
      color: "#F0EBF8",
      borderColor: "#6B3FA0",
      steps: [
        "When a voice says something, write it down exactly.",
        "Then write a calm response: 'Thank you for sharing that.'",
        "You are not agreeing. You are not arguing. You are just acknowledging.",
        "Notice: the voice does not need your full attention to exist. You can respond gently and move on.",
        "Over time, track whether patterns change.",
      ],
    },
    {
      num: "3",
      title: "The Used Car Salesman",
      icon: "😄",
      color: "#FBF3E3",
      borderColor: "#9E6D1B",
      steps: [
        "Imagine your most critical voice as a pushy used car salesman.",
        "They are trying to sell you something — a belief, a fear, a story about yourself.",
        "Ask yourself: Would I buy this? Is this a good deal?",
        "Most of the time, the answer is no — and that can even be a little funny.",
        "Humor reduces fear. When you can smile at a voice, it has less power.",
      ],
    },
    {
      num: "4",
      title: "Grounding with Voices Present",
      icon: "🌱",
      color: "#E8F5EC",
      borderColor: "#2E7D50",
      steps: [
        "Voices often pull you out of the present. This exercise brings you back.",
        "Name 5 things you can see right now.",
        "Name 4 things you can physically feel (the chair, your clothes, the air).",
        "Name 3 things you can hear (besides voices).",
        "Name 2 things you can smell.",
        "Name 1 thing you can taste.",
        "Notice: you are here, in this moment. The voices may still be present — but so are you.",
      ],
    },
  ],
  exercisesNote:
    "SchizoCare includes guided versions of these exercises with step-by-step instructions and progress tracking. All free.",

  researchLabel: "Evidence",
  researchTitle: "What the Research Says",
  researchText1:
    "ACT for psychosis (sometimes called ACTp) has been studied in clinical trials across multiple countries, including the UK, Australia, and the Netherlands. Results consistently show:",
  researchPoints: [
    "Reduced distress caused by voices",
    "Improvements in quality of life",
    "Lower levels of depression and anxiety",
    "Better ability to function at work and in daily life",
    "Effects maintained at 6-month and 12-month follow-up",
  ],
  researchText2:
    "This is not an experimental fringe therapy. ACT is recommended by major mental health bodies including NICE (National Institute for Health and Care Excellence) in the UK. It is taught in psychiatric training programs and practiced by thousands of clinicians worldwide.",

  fitLabel: "Is ACT for You?",
  fitTitle: "Is ACT Right for Me?",
  fitText1:
    "ACT tends to be a good fit if voices cause you significant distress, if other approaches have not fully helped, or if you want to focus on living well rather than only on reducing symptoms.",
  fitText2:
    "ACT works alongside medication — it is not a replacement. You can start small: try one exercise this week. You can practice on your own or with a therapist. A therapist trained specifically in ACTp (ACT for psychosis) can guide you more deeply.",
  fitText3:
    "You do not need to be in the middle of a crisis to start. ACT is most powerful when practiced during calmer periods, so it becomes familiar before harder times.",

  startLabel: "Get Started",
  startTitle: "How to Get Started",
  startText1:
    "The easiest first step is to try one exercise from this page this week. Pick the one that sounds most approachable. Do it once. Notice what happens.",
  startText2:
    "If you want more support, look for a therapist trained in ACT or ACTp. Ask them if they have experience working with psychosis. Many therapists who practice ACT are comfortable working with voice hearers.",
  startText3:
    "SchizoCare's free therapy exercises include guided ACT practices designed for people who hear voices. They are step-by-step, short, and easy to use.",
  ctaPrimary: "Sign Up Free — Try an Exercise",
  ctaSecondary: "Explore all tools →",

  storiesLabel: "Stories",
  storiesTitle: "Stories of Change",
  storiesText:
    "\"The voices are still there sometimes. But they don't run my life anymore. I stopped arguing with them and started asking what I actually wanted to do that day.\" — Anonymous",
  storiesText2:
    "\"It sounds strange, but when I stopped trying to make the voice go away, it felt less powerful. Like it lost its grip.\" — Anonymous",
  storiesText3:
    "Many people who practice ACT report that voices are still present — but they take up less space. Life starts happening again, in the foreground.",

  faqLabel: "FAQ",
  faqTitle: "Common Questions",
  faqs: [
    {
      q: "Does ACT make voices go away?",
      a: "ACT doesn't aim to eliminate voices. Instead, it helps reduce the distress voices cause and lets you live a meaningful life even when voices are present. Many people find that when they stop fighting, voices become less intrusive over time.",
    },
    {
      q: "Can I do ACT while taking medication?",
      a: "Yes. ACT works well alongside medication. It's not a replacement for medical treatment but an additional tool that can improve your quality of life. Always consult your doctor about your treatment plan.",
    },
    {
      q: "How long does it take to see results?",
      a: "Some people notice shifts in a few weeks, while for others it takes longer. ACT is a skill that develops with practice. Even small improvements in how you relate to voices can make a big difference in daily life.",
    },
    {
      q: "What if the voices get worse when I stop fighting them?",
      a: "This is a common concern. Initially, paying attention differently can feel uncomfortable. With practice, most people find that acceptance actually reduces the power and distress of voices. Go slowly and consider working with a trained therapist.",
    },
    {
      q: "Can I do ACT on my own or do I need a therapist?",
      a: "You can start with self-help exercises and tools like SchizoCare. Many people benefit from working with a therapist trained in ACT, especially at the beginning. A combination of self-practice and professional support often works best.",
    },
  ],
};

const DE = {
  breadcrumbHome: "Startseite",
  breadcrumbTreatment: "Behandlung",
  breadcrumbCurrent: "ACT-Therapie für Stimmen",
  badge: "Innovativer Ansatz",

  heroTitle: "Lernen, mit Stimmen zu leben",
  heroSubtitle:
    "Ein anderer Ansatz: Statt gegen die Stimmen zu kämpfen, lernen Sie eine neue Art, mit ihnen umzugehen. Viele Menschen berichten, dass dies Stress reduziert und das tägliche Leben verbessert.",

  whatLabel: "Über ACT",
  whatTitle: "Was ist ACT für Stimmen?",
  whatText1:
    "ACT steht für Akzeptanz- und Commitment-Therapie. Es ist ein moderner, evidenzbasierter Ansatz, der von klinischen Forschern entwickelt wurde, die untersuchten, warum manche Menschen mehr unter ihren Stimmen leiden als andere.",
  whatText2:
    "Die wichtigste Erkenntnis: Nicht die Stimmen selbst verursachen das meiste Leid — sondern der Kampf gegen sie. Menschen, die gegen Stimmen kämpfen, erleben sie oft lauter, häufiger und belastender.",
  whatText3:
    "ACT bietet einen anderen Weg. Statt zu versuchen, Stimmen zu eliminieren, lernen Sie, Ihre Beziehung zu ihnen zu verändern. Sie werden zur Person, die Stimmen hört — nicht zu einer Person, die von ihnen kontrolliert wird. Forschungen aus Großbritannien, Australien und den Niederlanden zeigen, dass ACT stimmenbedingten Stress reduziert und die Lebensqualität verbessert.",

  paradoxLabel: "Der Kampf",
  paradoxTitle: "Warum der Kampf gegen Stimmen oft nicht funktioniert",
  paradoxText1:
    "Stellen Sie sich vor, Sie geraten in Treibsand. Ihr Instinkt ist zu kämpfen — sich dagegenzustemmen, sich herauszuarbeiten. Aber Kämpfen lässt Sie tatsächlich schneller sinken. Je mehr Energie Sie aufwenden, desto schlimmer wird es.",
  paradoxText2:
    "Stimmen können genauso funktionieren. Je härter Sie kämpfen, argumentieren oder versuchen, sie auszublenden, desto mehr mentale Energie geben Sie ihnen — und desto stärker fühlen sie sich an.",
  paradoxText3:
    "ACT bietet einen Ausweg aus diesem Kampf — nicht indem man ihn gewinnt, sondern indem man sich entscheidet, nicht zu kämpfen.",

  coreLabel: "Kernkonzepte",
  coreTitle: "Die sechs Kernideen von ACT",
  coreIntro:
    "ACT basiert auf sechs Ideen. Sie müssen nicht alle meistern. Beginnen Sie mit einer.",
  concepts: [
    {
      icon: "🌊",
      title: "Akzeptanz",
      desc: "Raum für Stimmen schaffen, ohne sich von ihnen kontrollieren zu lassen. Akzeptanz bedeutet nicht, dass Sie die Stimmen mögen oder ihnen zustimmen. Es bedeutet, dass Sie aufhören, all Ihre Energie damit zu verbringen, etwas zu bekämpfen, das Sie nicht immer kontrollieren können.",
    },
    {
      icon: "🔍",
      title: "Kognitive Defusion",
      desc: 'Stimmen als Klänge oder Wörter sehen — nicht als Befehle oder Wahrheiten. Statt „Die Stimme sagt mir, ich bin wertlos" versuchen Sie: „Ich bemerke, dass ich eine Stimme höre, die sagt, ich bin wertlos." Dieser kleine Unterschied schafft Abstand.',
    },
    {
      icon: "🌿",
      title: "Gegenwärtiger Moment",
      desc: "Stimmen ziehen Sie oft in die Vergangenheit oder Zukunft. Sich im gegenwärtigen Moment zu verankern — was Sie jetzt sehen, hören, fühlen können — gibt Ihnen einen Ort, den Stimmen schwer erreichen können.",
    },
    {
      icon: "🌀",
      title: "Selbst als Kontext",
      desc: "Sie sind nicht Ihre Stimmen. Sie sind die Person, die sie erlebt. Denken Sie an sich als den Himmel — Stimmen sind Wolken, die hindurchziehen. Der Himmel wird durch keine Wolke beschädigt, egal wie dunkel sie ist.",
    },
    {
      icon: "💛",
      title: "Werte",
      desc: "Was ist Ihnen am wichtigsten? Familie? Kreativität? Mitgefühl? Lernen? Ihre Werte sind wie ein Kompass. ACT hilft Ihnen zu erkennen, was wirklich wichtig ist, und sich darauf zuzubewegen — auch an schwierigen Tagen.",
    },
    {
      icon: "👣",
      title: "Engagiertes Handeln",
      desc: "Schritte in Richtung Ihrer Werte zu unternehmen, auch kleine, auch wenn Stimmen vorhanden sind. Sie brauchen keine Stille, um ein bedeutungsvolles Leben zu führen. Ein kleiner Schritt in Richtung dessen, was Ihnen wichtig ist, ist immer möglich.",
    },
  ],

  exercisesLabel: "Übungen",
  exercisesTitle: "Praktische Übungen zum Ausprobieren",
  exercisesIntro:
    "Diese Übungen kommen aus der ACT-Praxis. Probieren Sie eine nach der anderen aus. Es gibt keinen richtigen oder falschen Weg — nur Übung.",
  exercises: [
    {
      num: "1",
      title: "Fahrgäste im Bus",
      icon: "🚌",
      color: "#E8F5F2",
      borderColor: "#0B7B6F",
      steps: [
        "Stellen Sie sich vor, Sie fahren mit einem Bus auf etwas zu, das Ihnen wichtig ist — ein Ziel, ein Wert, ein Ort.",
        "Die Stimmen sind Fahrgäste im Bus. Sie können schreien, kritisieren oder Lärm machen.",
        "Aber Sie halten das Steuer. Sie entscheiden, wohin der Bus fährt.",
        "Sie müssen nicht mit den Fahrgästen streiten oder sie rauswerfen, um weiterzufahren.",
        "Übung: Schließen Sie zwei Minuten lang die Augen. Stellen Sie sich den Bus vor. Bemerken Sie, wer darin sitzt. Fahren Sie weiter.",
      ],
    },
    {
      num: "2",
      title: "Stimmen-Tagebuch",
      icon: "📓",
      color: "#F0EBF8",
      borderColor: "#6B3FA0",
      steps: [
        "Wenn eine Stimme etwas sagt, schreiben Sie es genau auf.",
        "Schreiben Sie dann eine ruhige Antwort: 'Danke, dass Sie das geteilt haben.'",
        "Sie stimmen nicht zu. Sie streiten nicht. Sie erkennen nur an.",
        "Bemerken Sie: Die Stimme braucht nicht Ihre volle Aufmerksamkeit. Sie können sanft antworten und weitermachen.",
        "Verfolgen Sie im Laufe der Zeit, ob sich Muster verändern.",
      ],
    },
    {
      num: "3",
      title: "Der Gebrauchtwagenhändler",
      icon: "😄",
      color: "#FBF3E3",
      borderColor: "#9E6D1B",
      steps: [
        "Stellen Sie sich Ihre kritischste Stimme als aufdringlichen Gebrauchtwagenhändler vor.",
        "Sie versuchen, Ihnen etwas zu verkaufen — eine Überzeugung, eine Angst, eine Geschichte über Sie selbst.",
        "Fragen Sie sich: Würde ich das kaufen? Ist das ein gutes Angebot?",
        "Meistens lautet die Antwort nein — und das kann sogar ein bisschen komisch sein.",
        "Humor reduziert Angst. Wenn Sie über eine Stimme lächeln können, hat sie weniger Macht.",
      ],
    },
    {
      num: "4",
      title: "Erdung mit Stimmen",
      icon: "🌱",
      color: "#E8F5EC",
      borderColor: "#2E7D50",
      steps: [
        "Stimmen ziehen Sie oft aus dem gegenwärtigen Moment. Diese Übung bringt Sie zurück.",
        "Nennen Sie 5 Dinge, die Sie gerade sehen können.",
        "Nennen Sie 4 Dinge, die Sie körperlich fühlen können (Stuhl, Kleidung, Luft).",
        "Nennen Sie 3 Dinge, die Sie hören können (außer Stimmen).",
        "Nennen Sie 2 Dinge, die Sie riechen können.",
        "Nennen Sie 1 Ding, das Sie schmecken können.",
        "Bemerken Sie: Sie sind hier, in diesem Moment. Die Stimmen können noch vorhanden sein — aber Sie auch.",
      ],
    },
  ],
  exercisesNote:
    "SchizoCare enthält geführte Versionen dieser Übungen mit Schritt-für-Schritt-Anleitungen und Fortschrittsverfolgung. Alles kostenlos.",

  researchLabel: "Belege",
  researchTitle: "Was die Forschung sagt",
  researchText1:
    "ACT für Psychose (manchmal ACTp genannt) wurde in klinischen Studien in mehreren Ländern untersucht, darunter Großbritannien, Australien und die Niederlande. Die Ergebnisse zeigen konsistent:",
  researchPoints: [
    "Reduzierter Stress durch Stimmen",
    "Verbesserungen der Lebensqualität",
    "Niedrigere Depressions- und Angstniveaus",
    "Bessere Funktionsfähigkeit bei der Arbeit und im Alltag",
    "Effekte bleiben bei 6-Monats- und 12-Monats-Nachuntersuchungen erhalten",
  ],
  researchText2:
    "ACT ist keine experimentelle Therapie. Sie wird von großen psychiatrischen Fachgesellschaften empfohlen und wird in psychiatrischen Ausbildungsprogrammen gelehrt und von Tausenden von Klinikern weltweit praktiziert.",

  fitLabel: "Ist ACT für Sie?",
  fitTitle: "Ist ACT das Richtige für mich?",
  fitText1:
    "ACT ist oft gut geeignet, wenn Stimmen erheblichen Stress verursachen, wenn andere Ansätze nicht vollständig geholfen haben oder wenn Sie sich darauf konzentrieren möchten, gut zu leben — nicht nur Symptome zu reduzieren.",
  fitText2:
    "ACT ergänzt Medikamente — es ist kein Ersatz. Sie können klein beginnen: Probieren Sie diese Woche eine Übung aus. Sie können allein üben oder mit einem Therapeuten.",
  fitText3:
    "Sie müssen sich nicht in einer Krise befinden, um anzufangen. ACT ist am wirkungsvollsten, wenn es in ruhigeren Zeiten geübt wird, damit es vertraut wird, bevor schwierigere Zeiten kommen.",

  startLabel: "Anfangen",
  startTitle: "Wie Sie anfangen können",
  startText1:
    "Der einfachste erste Schritt ist, diese Woche eine Übung von dieser Seite auszuprobieren. Wählen Sie die, die am zugänglichsten klingt. Machen Sie es einmal. Bemerken Sie, was passiert.",
  startText2:
    "Wenn Sie mehr Unterstützung möchten, suchen Sie nach einem Therapeuten, der in ACT oder ACTp ausgebildet ist. Fragen Sie, ob er Erfahrung mit der Arbeit mit Psychose hat.",
  startText3:
    "Die kostenlosen Therapieübungen von SchizoCare umfassen geführte ACT-Praktiken, die für Menschen entwickelt wurden, die Stimmen hören. Sie sind schrittweise, kurz und einfach zu benutzen.",
  ctaPrimary: "Kostenlos registrieren — Übung ausprobieren",
  ctaSecondary: "Alle Werkzeuge erkunden →",

  storiesLabel: "Erfahrungen",
  storiesTitle: "Erfahrungen von Veränderung",
  storiesText:
    "\u201eDie Stimmen sind manchmal noch da. Aber sie bestimmen mein Leben nicht mehr. Ich habe aufgehört, mit ihnen zu streiten, und angefangen zu fragen, was ich eigentlich an diesem Tag tun möchte.\u201c \u2014 Anonym",
  storiesText2:
    "\u201eEs klingt seltsam, aber als ich aufgehört habe, die Stimme loszuwerden, fühlte sie sich weniger mächtig an. Als hätte sie ihren Griff verloren.\u201c \u2014 Anonym",
  storiesText3:
    "Viele Menschen, die ACT praktizieren, berichten, dass Stimmen noch vorhanden sind \u2014 aber weniger Raum einnehmen. Das Leben beginnt wieder in den Vordergrund zu treten.",

  faqLabel: "FAQ",
  faqTitle: "Häufige Fragen",
  faqs: [
    {
      q: "Lässt ACT Stimmen verschwinden?",
      a: "ACT zielt nicht darauf ab, Stimmen zu eliminieren. Stattdessen hilft es, den durch Stimmen verursachten Stress zu reduzieren und ein bedeutungsvolles Leben zu führen, auch wenn Stimmen vorhanden sind. Viele Menschen finden, dass Stimmen weniger aufdringlich werden, wenn sie aufhören zu kämpfen.",
    },
    {
      q: "Kann ich ACT machen, während ich Medikamente nehme?",
      a: "Ja. ACT funktioniert gut neben Medikamenten. Es ist kein Ersatz für medizinische Behandlung, sondern ein zusätzliches Werkzeug. Sprechen Sie immer mit Ihrem Arzt über Ihren Behandlungsplan.",
    },
    {
      q: "Wie lange dauert es, bis man Ergebnisse sieht?",
      a: "Manche Menschen bemerken Veränderungen in wenigen Wochen, für andere dauert es länger. ACT ist eine Fähigkeit, die sich mit der Praxis entwickelt. Schon kleine Verbesserungen in der Art, wie Sie mit Stimmen umgehen, können einen großen Unterschied machen.",
    },
    {
      q: "Was, wenn die Stimmen schlimmer werden, wenn ich aufhöre zu kämpfen?",
      a: "Das ist eine häufige Sorge. Anfangs kann es sich unangenehm anfühlen, anders auf Stimmen zu achten. Mit der Praxis finden die meisten Menschen, dass Akzeptanz tatsächlich die Macht und den Stress der Stimmen reduziert. Gehen Sie langsam vor und erwägen Sie, mit einem ausgebildeten Therapeuten zu arbeiten.",
    },
    {
      q: "Kann ich ACT allein machen oder brauche ich einen Therapeuten?",
      a: "Sie können mit Selbsthilfe-Übungen und Werkzeugen wie SchizoCare beginnen. Viele Menschen profitieren davon, mit einem in ACT ausgebildeten Therapeuten zu arbeiten, besonders am Anfang. Eine Kombination aus Selbstübung und professioneller Unterstützung funktioniert oft am besten.",
    },
  ],
};

interface Props {
  locale: string;
}

export function ACTPage({ locale }: Props) {
  const c = locale === "de" ? DE : EN;
  const homeHref = `/${locale}`;
  const treatmentHref = `/${locale}/treatment`;
  const toolsHref = `/${locale}#tools`;
  const symptomsHref =
    locale === "de"
      ? `/${locale}/schizophrenie/symptome`
      : `/${locale}/schizophrenia/symptoms`;

  const sectionWhite = { padding: "48px 16px", backgroundColor: "#FFFFFF" };
  const sectionAlt = { padding: "48px 16px", backgroundColor: "#F9F8F6" };
  const sectionWarm = { padding: "48px 16px", backgroundColor: "#F3F1ED" };
  const container = { maxWidth: "960px", margin: "0 auto" };
  const h2: React.CSSProperties = {
    fontFamily: "var(--font-fraunces), Georgia, serif",
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1A1A2E",
    margin: "0 0 16px 0",
    lineHeight: 1.2,
  };
  const p: React.CSSProperties = { color: "#4A4A68", lineHeight: 1.8, margin: "0 0 16px 0" };
  const label: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "#0B7B6F",
    margin: "0 0 8px 0",
    display: "block",
  };
  const card: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "2px solid #EEECE8",
    borderRadius: "12px",
    padding: "24px",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
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
              flexWrap: "wrap",
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
            <li>
              <Link href={treatmentHref} style={{ color: "#0B7B6F", textDecoration: "none" }}>
                {c.breadcrumbTreatment}
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" style={{ color: "#1A1A2E", fontWeight: "bold" }}>
              {c.breadcrumbCurrent}
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section style={{ padding: "40px 16px", backgroundColor: "#F0EBF8" }}>
          <div style={container}>
            <div style={{ maxWidth: "720px" }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#6B3FA0",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: "bold",
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  marginBottom: "20px",
                }}
              >
                {c.badge}
              </span>
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

        {/* What is ACT */}
        <section id="what-is-act" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.whatLabel}</span>
            <h2 style={h2}>{c.whatTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.whatText1}</p>
              <p style={p}>{c.whatText2}</p>
              <p style={{ ...p, margin: 0 }}>{c.whatText3}</p>
            </div>
          </div>
        </section>

        {/* Why Fighting Doesn't Work */}
        <section id="struggle-paradox" style={sectionAlt}>
          <div style={container}>
            <span style={label}>{c.paradoxLabel}</span>
            <h2 style={h2}>{c.paradoxTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.paradoxText1}</p>
              <p style={p}>{c.paradoxText2}</p>
              <p style={{ ...p, margin: 0 }}>{c.paradoxText3}</p>
            </div>
          </div>
        </section>

        {/* Core Concepts */}
        <section id="core-concepts" style={{ padding: "48px 16px", backgroundColor: "#F0EBF8" }}>
          <div style={container}>
            <span style={{ ...label, color: "#4A2A7A" }}>{c.coreLabel}</span>
            <h2 style={h2}>{c.coreTitle}</h2>
            <p style={{ ...p, marginBottom: "28px" }}>{c.coreIntro}</p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {c.concepts.map(({ icon, title, desc }) => (
                <div key={title} style={{ ...card, borderTop: "4px solid #6B3FA0" }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }} aria-hidden="true">
                    {icon}
                  </div>
                  <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 8px 0" }}>
                    {title}
                  </h3>
                  <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0, fontSize: "15px" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Exercises */}
        <section id="exercises" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.exercisesLabel}</span>
            <h2 style={h2}>{c.exercisesTitle}</h2>
            <p style={{ ...p, marginBottom: "28px" }}>{c.exercisesIntro}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "760px" }}>
              {c.exercises.map(({ num, title, icon, color, borderColor, steps }) => (
                <div
                  key={num}
                  style={{
                    backgroundColor: color,
                    border: `2px solid ${borderColor}`,
                    borderRadius: "12px",
                    padding: "24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        backgroundColor: borderColor,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: "bold",
                        fontSize: "16px",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {num}
                    </div>
                    <span style={{ fontSize: "22px" }} aria-hidden="true">{icon}</span>
                    <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: 0, fontSize: "18px" }}>
                      {title}
                    </h3>
                  </div>
                  <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {steps.map((step: string, i: number) => (
                      <li
                        key={i}
                        style={{ display: "flex", gap: "12px", color: "#4A4A68", lineHeight: 1.7, fontSize: "15px" }}
                      >
                        <span
                          style={{
                            color: borderColor,
                            fontWeight: "bold",
                            flexShrink: 0,
                            minWidth: "20px",
                          }}
                          aria-hidden="true"
                        >
                          {i + 1}.
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <div
              style={{
                backgroundColor: "#E8F5F2",
                border: "2px solid #0B7B6F",
                borderRadius: "10px",
                padding: "16px 20px",
                marginTop: "24px",
                maxWidth: "680px",
              }}
            >
              <p style={{ color: "#0B7B6F", fontWeight: "bold", margin: 0 }}>
                💚 {c.exercisesNote}
              </p>
            </div>
          </div>
        </section>

        {/* Research */}
        <section id="research" style={sectionAlt}>
          <div style={container}>
            <span style={label}>{c.researchLabel}</span>
            <h2 style={h2}>{c.researchTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.researchText1}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                {c.researchPoints.map((point: string) => (
                  <li
                    key={point}
                    style={{ display: "flex", gap: "10px", padding: "8px 0", borderBottom: "1px solid #E0DDD7", color: "#4A4A68", lineHeight: 1.6 }}
                  >
                    <span style={{ color: "#2E7D50", fontWeight: "bold", flexShrink: 0 }}>✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <p style={{ ...p, margin: 0 }}>{c.researchText2}</p>
            </div>
          </div>
        </section>

        {/* Is ACT Right for Me */}
        <section id="is-act-right" style={sectionWarm}>
          <div style={container}>
            <span style={label}>{c.fitLabel}</span>
            <h2 style={h2}>{c.fitTitle}</h2>
            <div style={{ maxWidth: "700px" }}>
              <p style={p}>{c.fitText1}</p>
              <p style={p}>{c.fitText2}</p>
              <p style={{ ...p, margin: 0 }}>{c.fitText3}</p>
            </div>
          </div>
        </section>

        {/* Stories of Change */}
        <section id="stories" style={{ padding: "48px 16px", backgroundColor: "#FBF3E3" }}>
          <div style={container}>
            <span style={{ ...label, color: "#7A4F0A" }}>{c.storiesLabel}</span>
            <h2 style={h2}>{c.storiesTitle}</h2>
            <div style={{ maxWidth: "700px", display: "flex", flexDirection: "column", gap: "16px" }}>
              {[c.storiesText, c.storiesText2].map((quote) => (
                <blockquote
                  key={quote}
                  style={{
                    margin: 0,
                    backgroundColor: "#FFFFFF",
                    border: "2px solid #E8C97A",
                    borderLeft: "6px solid #9E6D1B",
                    borderRadius: "8px",
                    padding: "20px 24px",
                    color: "#4A4A68",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  {quote}
                </blockquote>
              ))}
              <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0, fontWeight: "bold" }}>
                {c.storiesText3}
              </p>
            </div>
          </div>
        </section>

        {/* How to Get Started + CTA */}
        <section id="get-started" style={{ padding: "48px 16px", backgroundColor: "#E8F5F2" }}>
          <div style={container}>
            <span style={label}>{c.startLabel}</span>
            <h2 style={h2}>{c.startTitle}</h2>
            <div style={{ maxWidth: "680px" }}>
              <p style={p}>{c.startText1}</p>
              <p style={p}>{c.startText2}</p>
              <p style={{ ...p, marginBottom: "28px" }}>{c.startText3}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
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
                  ✓ {c.ctaPrimary}
                </Link>
                <Link
                  href={toolsHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    minHeight: "52px",
                    padding: "0 24px",
                    backgroundColor: "transparent",
                    color: "#0B7B6F",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "17px",
                    border: "2px solid #0B7B6F",
                  }}
                >
                  {c.ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <div style={{ padding: "24px 16px", backgroundColor: "#F9F8F6", borderTop: "1px solid #E0DDD7" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px" }}>
            <Link href={symptomsHref} style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "15px" }}>
              ← Schizophrenia Symptoms
            </Link>
            <Link href={toolsHref} style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "15px" }}>
              Therapy Exercises →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <section id="faq" style={sectionWhite}>
          <div style={container}>
            <span style={label}>{c.faqLabel}</span>
            <h2 style={h2}>{c.faqTitle}</h2>
            <div style={{ maxWidth: "720px", display: "flex", flexDirection: "column", gap: "2px" }}>
              {c.faqs.map(({ q, a }) => (
                <details key={q} style={{ borderBottom: "1px solid #EEECE8", padding: "4px 0" }}>
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
