"use client";

import Link from "next/link";

const EN = {
  title:   "You're Always in Control",
  points: [
    {
      icon:  "🛑",
      title: "Stress button",
      body:  "Tap it any time to pause and choose: keep going, take a break, or go straight to grounding.",
    },
    {
      icon:  "🌿",
      title: "Grounding tools",
      body:  "5-4-3-2-1 senses, box breathing, safe-place visualisation — always one tap away from any screen.",
    },
    {
      icon:  "✓",
      title: "Positive ending",
      body:  "Every session closes with a win statement you choose. You always leave feeling grounded.",
    },
  ],
  crisis:  "If you're in crisis, please reach out for support.",
  crisisLink: "Find crisis resources →",
};
const DE = {
  title:   "Du hast immer die Kontrolle",
  points: [
    {
      icon:  "🛑",
      title: "Stress-Knopf",
      body:  "Tippe jederzeit darauf, um zu pausieren und zu wählen: weitermachen, eine Pause einlegen oder direkt zur Erdung gehen.",
    },
    {
      icon:  "🌿",
      title: "Erdungsübungen",
      body:  "5-4-3-2-1 Sinne, Box-Atmung, Sicherer-Ort-Visualisierung — immer einen Tipp entfernt.",
    },
    {
      icon:  "✓",
      title: "Positiver Abschluss",
      body:  "Jede Sitzung endet mit einem Siegessatz, den du wählst. Du gehst immer geerdet.",
    },
  ],
  crisis:     "Wenn du in einer Krise bist, wende dich bitte an jemanden.",
  crisisLink: "Krisenressourcen finden →",
};

interface StepSafetyProps {
  locale: string;
}

export default function StepSafety({ locale }: StepSafetyProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "28px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 24px 0",
          lineHeight: 1.2,
        }}
      >
        {t.title}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
        {t.points.map(({ icon, title, body }) => (
          <div
            key={title}
            style={{
              display:         "flex",
              gap:             "14px",
              alignItems:      "flex-start",
              padding:         "16px 18px",
              backgroundColor: "#FFFFFF",
              border:          "2px solid #EEECE8",
              borderRadius:    "12px",
            }}
          >
            <span style={{ fontSize: "26px", flexShrink: 0, marginTop: "2px" }} aria-hidden="true">{icon}</span>
            <div>
              <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "4px" }}>{title}</div>
              <div style={{ color: "#4A4A68", fontSize: "14px", lineHeight: 1.6 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Crisis resources */}
      <div
        style={{
          backgroundColor: "#FFF8E8",
          border:          "1px solid #C08000",
          borderRadius:    "10px",
          padding:         "14px 18px",
        }}
      >
        <p style={{ margin: "0 0 6px 0", fontSize: "14px", color: "#4A3A00", lineHeight: 1.5 }}>
          {t.crisis}
        </p>
        <Link
          href="https://findahelpline.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9E6D1B", fontSize: "14px", fontWeight: "bold" }}
        >
          {t.crisisLink}
        </Link>
      </div>
    </div>
  );
}
