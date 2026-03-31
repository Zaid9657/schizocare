"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isOnboarded } from "@/lib/echo/onboarding/onboarding-service";

const EN = {
  badge:    "Early Access",
  title:    "ECHO",
  tagline:  "Voice Dialogue Therapy",
  body:     "ECHO is a guided therapy tool that helps you have a structured, therapeutic dialogue with the voices you hear. Instead of fighting them, you learn a new way to relate to them — reducing distress and building confidence.",
  features: [
    { icon: "🎭", label: "Create a visual avatar for each voice" },
    { icon: "💬", label: "Guided dialogue sessions at your own pace" },
    { icon: "🌿", label: "Grounding tools always one tap away" },
    { icon: "📈", label: "Track how your relationship with voices changes" },
    { icon: "🔒", label: "Fully private — no account required" },
  ],
  ctaAvatar:   "🎭 Create Your First Voice",
  ctaSession:  "💬 Start a Session",
  ctaGround:   "🌿 Grounding Tools",
  footnote:    "ECHO is being developed with input from people with lived experience and mental health professionals. Grounding tools are available now while the full feature is completed.",
};
const DE = {
  badge:    "Früher Zugang",
  title:    "ECHO",
  tagline:  "Stimmen-Dialog-Therapie",
  body:     "ECHO ist ein geführtes Therapiewerkzeug, das dir hilft, einen strukturierten, therapeutischen Dialog mit den Stimmen zu führen, die du hörst. Anstatt gegen sie zu kämpfen, lernst du eine neue Art, mit ihnen umzugehen — Stress zu reduzieren und Selbstvertrauen aufzubauen.",
  features: [
    { icon: "🎭", label: "Erstelle einen visuellen Avatar für jede Stimme" },
    { icon: "💬", label: "Geführte Dialogsitzungen in deinem eigenen Tempo" },
    { icon: "🌿", label: "Erdungsübungen immer einen Tipp entfernt" },
    { icon: "📈", label: "Verfolge, wie sich deine Beziehung zu Stimmen verändert" },
    { icon: "🔒", label: "Vollständig privat — kein Konto erforderlich" },
  ],
  ctaAvatar:   "🎭 Erste Stimme erstellen",
  ctaSession:  "💬 Sitzung starten",
  ctaGround:   "🌿 Erdungsübungen",
  footnote:    "ECHO wird mit Beiträgen von Menschen mit gelebter Erfahrung und Fachleuten für psychische Gesundheit entwickelt.",
};

interface EchoHomeProps {
  locale: string;
}

export default function EchoHome({ locale }: EchoHomeProps) {
  const router  = useRouter();
  const t       = locale === "de" ? DE : EN;

  // Redirect first-time users to onboarding
  useEffect(() => {
    if (!isOnboarded("local")) {
      router.replace(`/${locale}/echo/onboarding`);
    }
  }, [locale, router]);

  const avatarHref   = `/${locale}/echo/avatar`;
  const sessionHref  = `/${locale}/echo/session`;
  const groundHref   = `/${locale}/echo/grounding`;

  return (
    <div style={{ maxWidth: "640px" }}>
      {/* Badge */}
      <span
        style={{
          display:         "inline-block",
          backgroundColor: "#2E7D50",
          color:           "#FFFFFF",
          fontSize:        "12px",
          fontWeight:      "bold",
          padding:         "5px 12px",
          borderRadius:    "9999px",
          marginBottom:    "20px",
          textTransform:   "uppercase",
          letterSpacing:   "0.08em",
        }}
      >
        {t.badge}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "38px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 16px 0",
          lineHeight: 1.15,
        }}
      >
        {t.title}
      </h1>

      <p style={{ fontSize: "20px", color: "#4A4A68", lineHeight: 1.7, margin: "0 0 12px 0" }}>
        {t.tagline}
      </p>

      <p style={{ color: "#4A4A68", lineHeight: 1.8, margin: "0 0 32px 0", maxWidth: "560px" }}>
        {t.body}
      </p>

      {/* Feature list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
        {t.features.map(({ icon, label }) => (
          <div
            key={label}
            style={{
              display:         "flex",
              alignItems:      "center",
              gap:             "12px",
              padding:         "14px 18px",
              backgroundColor: "#FFFFFF",
              border:          "2px solid #EEECE8",
              borderRadius:    "10px",
              color:           "#1A1A2E",
              fontWeight:      500,
            }}
          >
            <span style={{ fontSize: "22px" }} aria-hidden="true">{icon}</span>
            {label}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Link
          href={avatarHref}
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "8px",
            minHeight:       "52px",
            padding:         "0 28px",
            backgroundColor: "#6B3FA0",
            color:           "#FFFFFF",
            fontWeight:      "bold",
            borderRadius:    "8px",
            textDecoration:  "none",
            fontSize:        "17px",
          }}
        >
          {t.ctaAvatar}
        </Link>
        <Link
          href={sessionHref}
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "8px",
            minHeight:       "52px",
            padding:         "0 28px",
            backgroundColor: "#FFFFFF",
            color:           "#6B3FA0",
            fontWeight:      "bold",
            borderRadius:    "8px",
            textDecoration:  "none",
            fontSize:        "17px",
            border:          "2px solid #6B3FA0",
          }}
        >
          {t.ctaSession}
        </Link>
        <Link
          href={groundHref}
          style={{
            display:         "inline-flex",
            alignItems:      "center",
            gap:             "8px",
            minHeight:       "52px",
            padding:         "0 28px",
            backgroundColor: "#FFFFFF",
            color:           "#0B7B6F",
            fontWeight:      "bold",
            borderRadius:    "8px",
            textDecoration:  "none",
            fontSize:        "17px",
            border:          "2px solid #0B7B6F",
          }}
        >
          {t.ctaGround}
        </Link>
      </div>

      <p style={{ marginTop: "32px", fontSize: "14px", color: "#7A7A96", lineHeight: 1.6, maxWidth: "500px" }}>
        {t.footnote}
      </p>
    </div>
  );
}
