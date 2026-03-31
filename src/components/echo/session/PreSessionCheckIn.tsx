"use client";

import { MOOD_LABELS } from "@/lib/echo/constants";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import Link from "next/link";

const SKILL_CHIPS: { category: UserResponseCategory; labelEn: string; labelDe: string; icon: string }[] = [
  { category: "ASSERTIVE",       labelEn: "Stand my ground",    labelDe: "Meinen Standpunkt vertreten", icon: "💪" },
  { category: "DEFUSION",        labelEn: "Defuse the voice",   labelDe: "Stimme entschärfen",          icon: "🌬️" },
  { category: "CHALLENGE",       labelEn: "Challenge it",       labelDe: "Hinterfragen",                icon: "❓" },
  { category: "VALUES",          labelEn: "Use my values",      labelDe: "Meine Werte nutzen",          icon: "⭐" },
  { category: "SELF_COMPASSION", labelEn: "Self-compassion",    labelDe: "Selbstmitgefühl",             icon: "💛" },
  { category: "BOUNDARY",        labelEn: "Set a boundary",     labelDe: "Grenze setzen",               icon: "🚧" },
];

const EN = {
  title:        "Before we begin",
  moodQ:        "How are you feeling right now?",
  moodHint:     "1 = very distressed · 5 = calm and ready",
  practiceQ:    "What would you like to practice? (optional)",
  practiceHint: "Your choice focuses the session. You can skip this.",
  btnReady:     "I'm Ready",
  groundLink:   "Need to ground first?",
};

const DE = {
  title:        "Bevor wir beginnen",
  moodQ:        "Wie fühlst du dich gerade?",
  moodHint:     "1 = sehr belastet · 5 = ruhig und bereit",
  practiceQ:    "Was möchtest du üben? (optional)",
  practiceHint: "Deine Wahl gibt der Sitzung einen Fokus. Du kannst das überspringen.",
  btnReady:     "Ich bin bereit",
  groundLink:   "Erst zur Erdung?",
};

interface PreSessionCheckInProps {
  mood:           number;
  onMoodChange:   (v: number) => void;
  skillFocus:     UserResponseCategory | null;
  onSkillChange:  (v: UserResponseCategory | null) => void;
  onReady:        () => void;
  locale:         string;
  groundingHref:  string;
}

export default function PreSessionCheckIn({
  mood,
  onMoodChange,
  skillFocus,
  onSkillChange,
  onReady,
  locale,
  groundingHref,
}: PreSessionCheckInProps) {
  const t = locale === "de" ? DE : EN;
  // Use MOOD_LABELS 1-10 but display 1-5 (scale /2 for display)
  const labelIdx = Math.round(mood * 2); // 1-5 → 2-10 proxy
  const moodLabel = MOOD_LABELS[Math.min(10, Math.max(1, labelIdx))]?.[locale === "de" ? "de" : "en"] ?? "";

  return (
    <div style={{ maxWidth: "520px" }}>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 24px 0",
        }}
      >
        {t.title}
      </h2>

      {/* Mood check */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #EEECE8",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <label
          style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "6px" }}
        >
          {t.moodQ}
        </label>
        <p style={{ fontSize: "13px", color: "#7A7A96", margin: "0 0 14px 0" }}>{t.moodHint}</p>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#9A9AB0" }}>
          <span>1</span>
          <span
            style={{
              fontWeight: "bold",
              color: mood <= 2 ? "#C03030" : mood <= 3 ? "#9E6D1B" : "#2E7D50",
              fontSize: "15px",
            }}
          >
            {mood} — {moodLabel}
          </span>
          <span>5</span>
        </div>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={mood}
          onChange={(e) => onMoodChange(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#6B3FA0", cursor: "pointer" }}
          aria-label={t.moodQ}
        />
      </div>

      {/* Skill focus chips */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #EEECE8",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#1A1A2E", marginBottom: "6px" }}>
          {t.practiceQ}
        </div>
        <p style={{ fontSize: "13px", color: "#7A7A96", margin: "0 0 14px 0" }}>{t.practiceHint}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label={t.practiceQ}>
          {SKILL_CHIPS.map((chip) => {
            const sel = skillFocus === chip.category;
            return (
              <button
                key={chip.category}
                type="button"
                role="checkbox"
                aria-checked={sel}
                onClick={() => onSkillChange(sel ? null : chip.category)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 14px",
                  minHeight: "40px",
                  borderRadius: "20px",
                  border: sel ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                  backgroundColor: sel ? "#F0EBF8" : "#FFFFFF",
                  color: sel ? "#4A2A7A" : "#4A4A68",
                  fontWeight: sel ? "bold" : "normal",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <span aria-hidden="true">{chip.icon}</span>
                {locale === "de" ? chip.labelDe : chip.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onReady}
        style={{
          width: "100%",
          padding: "15px 28px",
          backgroundColor: "#6B3FA0",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: "pointer",
          minHeight: "56px",
          marginBottom: "16px",
          fontFamily: "inherit",
        }}
      >
        {t.btnReady}
      </button>

      <Link
        href={groundingHref}
        style={{
          display: "block",
          textAlign: "center",
          color: "#0B7B6F",
          fontSize: "14px",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        🌿 {t.groundLink}
      </Link>
    </div>
  );
}
