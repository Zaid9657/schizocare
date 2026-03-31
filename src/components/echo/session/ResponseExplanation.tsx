"use client";

import { useState } from "react";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";

// ── Explanation data ──────────────────────────────────────────────────────────

interface ExplanationEntry {
  icon:        string;
  nameEn:      string;
  nameDe:      string;
  explanationEn: string;
  explanationDe: string;
  color:       string;
}

const EXPLANATIONS: Record<UserResponseCategory, ExplanationEntry> = {
  ASSERTIVE: {
    icon: "💪",
    nameEn: "Assertive",
    nameDe: "Selbstbehauptend",
    explanationEn: "Stand up for yourself. Call the voice's bluff.",
    explanationDe: "Steh für dich ein. Zeig der Stimme, dass du dich nicht einschüchtern lässt.",
    color: "#6B3FA0",
  },
  DEFUSION: {
    icon: "🧘",
    nameEn: "Defusion",
    nameDe: "Defusion",
    explanationEn: "Step back from the thought. You don't have to believe it.",
    explanationDe: "Distanziere dich vom Gedanken. Du musst ihm nicht glauben.",
    color: "#0B7B6F",
  },
  CHALLENGE: {
    icon: "❓",
    nameEn: "Challenge",
    nameDe: "Hinterfragen",
    explanationEn: "Question the evidence. The voice often makes claims it can't back up.",
    explanationDe: "Hinterfrage die Beweise. Die Stimme behauptet oft Dinge, die sie nicht belegen kann.",
    color: "#9E6D1B",
  },
  VALUES: {
    icon: "💫",
    nameEn: "Values",
    nameDe: "Werte",
    explanationEn: "Reconnect with what matters to you.",
    explanationDe: "Erinnere dich daran, was dir wirklich wichtig ist.",
    color: "#2E7D50",
  },
  SELF_COMPASSION: {
    icon: "💗",
    nameEn: "Self-compassion",
    nameDe: "Selbstmitgefühl",
    explanationEn: "Treat yourself with the kindness you'd show a friend.",
    explanationDe: "Behandle dich mit derselben Güte, die du einem Freund zeigen würdest.",
    color: "#B05080",
  },
  BOUNDARY: {
    icon: "🛑",
    nameEn: "Boundary",
    nameDe: "Grenze",
    explanationEn: "You can choose when to engage and when to stop.",
    explanationDe: "Du kannst entscheiden, wann du dich engagierst und wann du aufhörst.",
    color: "#C03030",
  },
};

const ALL_CATEGORIES: UserResponseCategory[] = [
  "ASSERTIVE", "DEFUSION", "CHALLENGE", "VALUES", "SELF_COMPASSION", "BOUNDARY",
];

// ── Component ─────────────────────────────────────────────────────────────────

interface ResponseExplanationProps {
  locale: string;
  /** If provided, highlights this specific category */
  highlightCategory?: UserResponseCategory | null;
}

const EN = {
  trigger: "Why this response?",
  collapse: "Close",
};
const DE = {
  trigger: "Warum diese Antwort?",
  collapse: "Schließen",
};

export default function ResponseExplanation({
  locale,
  highlightCategory,
}: ResponseExplanationProps) {
  const t = locale === "de" ? DE : EN;
  const [open, setOpen] = useState(false);

  // Reduce motion preference
  const transition = "max-height 0.2s ease, opacity 0.15s ease";

  return (
    <div style={{ marginTop: "12px" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          color: "#7A7A96",
          fontSize: "13px",
          cursor: "pointer",
          padding: "4px 0",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <span aria-hidden="true" style={{ display: "inline-block", transition: "transform 0.15s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>▶</span>
        {open ? t.collapse : t.trigger}
      </button>

      {open && (
        <div
          style={{
            marginTop: "8px",
            backgroundColor: "#F9F8F6",
            border: "1px solid #EEECE8",
            borderRadius: "12px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
          role="region"
          aria-label={t.trigger}
        >
          {ALL_CATEGORIES.map((cat) => {
            const entry = EXPLANATIONS[cat];
            const isHighlighted = highlightCategory === cat;
            return (
              <div
                key={cat}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  padding: isHighlighted ? "10px 12px" : "4px 0",
                  borderRadius: isHighlighted ? "8px" : "0",
                  backgroundColor: isHighlighted ? `${entry.color}10` : "transparent",
                  border: isHighlighted ? `1px solid ${entry.color}40` : "none",
                  transition,
                }}
              >
                <span
                  style={{ fontSize: "20px", flexShrink: 0, marginTop: "1px" }}
                  aria-hidden="true"
                >
                  {entry.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "13px",
                      color: entry.color,
                      marginBottom: "2px",
                    }}
                  >
                    {locale === "de" ? entry.nameDe : entry.nameEn}
                  </div>
                  <div style={{ fontSize: "13px", color: "#4A4A68", lineHeight: 1.5 }}>
                    {locale === "de" ? entry.explanationDe : entry.explanationEn}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
