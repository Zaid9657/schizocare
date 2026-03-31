"use client";

import { useState } from "react";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import { USER_RESPONSES } from "@/lib/echo/content/seed-data";
import CustomResponseInput from "./CustomResponseInput";

// ── Category metadata ─────────────────────────────────────────────────────────

const CATEGORY_META: Record<
  UserResponseCategory,
  { icon: string; labelEn: string; labelDe: string; color: string }
> = {
  ASSERTIVE:       { icon: "💪", labelEn: "Assertive",        labelDe: "Selbstbehauptend",  color: "#6B3FA0" },
  DEFUSION:        { icon: "🌬️", labelEn: "Defusion",         labelDe: "Defusion",          color: "#0B7B6F" },
  CHALLENGE:       { icon: "❓", labelEn: "Challenge",         labelDe: "Hinterfragen",      color: "#9E6D1B" },
  VALUES:          { icon: "⭐", labelEn: "Values",            labelDe: "Werte",             color: "#2E7D50" },
  SELF_COMPASSION: { icon: "💛", labelEn: "Self-compassion",   labelDe: "Selbstmitgefühl",   color: "#C08000" },
  BOUNDARY:        { icon: "🚧", labelEn: "Boundary",          labelDe: "Grenze",            color: "#C03030" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Pick 3 varied suggested responses, one per category group */
function pickSuggestions(excludeCategories: UserResponseCategory[] = []) {
  const categories: UserResponseCategory[] = [
    "ASSERTIVE", "DEFUSION", "CHALLENGE", "VALUES", "SELF_COMPASSION", "BOUNDARY",
  ];
  const available = categories.filter((c) => !excludeCategories.includes(c));
  // Pick 3 random categories, then one random response per category
  const shuffled = available.sort(() => Math.random() - 0.5).slice(0, 3);
  return shuffled.map((cat) => {
    const pool = USER_RESPONSES.filter((r) => r.category === cat);
    return pool[Math.floor(Math.random() * pool.length)];
  }).filter(Boolean);
}

// ── Component ─────────────────────────────────────────────────────────────────

interface ResponseSelectorProps {
  onRespond:     (category: UserResponseCategory) => void;
  onRespondText: (text: string) => void;
  locale:        string;
  /** If set, bias toward this category in suggestions */
  skillFocus?:   UserResponseCategory | null;
  disabled?:     boolean;
}

const EN = {
  prompt:     "How do you respond?",
  customize:  "Write my own response",
  cancelCustom: "Use a suggested response",
};
const DE = {
  prompt:     "Wie antwortest du?",
  customize:  "Eigene Antwort schreiben",
  cancelCustom: "Vorschlag verwenden",
};

export default function ResponseSelector({
  onRespond,
  onRespondText,
  locale,
  skillFocus,
  disabled = false,
}: ResponseSelectorProps) {
  const t = locale === "de" ? DE : EN;
  const [selected, setSelected] = useState<string | null>(null);
  const [showCustom, setShowCustom] = useState(false);
  const [suggestions] = useState(() =>
    pickSuggestions(skillFocus ? [] : [])
  );

  function handleSelect(responseId: string, category: UserResponseCategory) {
    if (disabled) return;
    setSelected(responseId);
    // Brief highlight then fire
    setTimeout(() => {
      onRespond(category);
      setSelected(null);
    }, 200);
  }

  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "bold",
          color: "#7A7A96",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "10px",
        }}
      >
        {t.prompt}
      </div>

      {!showCustom && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
          {suggestions.map((resp) => {
            if (!resp) return null;
            const meta = CATEGORY_META[resp.category];
            const isSelected = selected === resp.id;
            return (
              <button
                key={resp.id}
                type="button"
                onClick={() => handleSelect(resp.id, resp.category)}
                disabled={disabled}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  padding: "14px 16px",
                  minHeight: "60px",
                  borderRadius: "10px",
                  border: isSelected
                    ? `2px solid ${meta.color}`
                    : "2px solid #E0DDD7",
                  backgroundColor: isSelected ? `${meta.color}10` : "#FFFFFF",
                  cursor: disabled ? "not-allowed" : "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  opacity: disabled ? 0.6 : 1,
                  transition: "border-color 0.12s ease, background-color 0.12s ease",
                }}
                aria-pressed={isSelected}
              >
                {/* Category badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    backgroundColor: `${meta.color}18`,
                    color: meta.color,
                    fontSize: "11px",
                    fontWeight: "bold",
                    flexShrink: 0,
                    marginTop: "2px",
                    whiteSpace: "nowrap",
                  }}
                  aria-label={`Response type: ${locale === "de" ? meta.labelDe : meta.labelEn}`}
                >
                  <span aria-hidden="true">{meta.icon}</span>
                  {locale === "de" ? meta.labelDe : meta.labelEn}
                </div>

                {/* Response text */}
                <p style={{ margin: 0, fontSize: "15px", color: "#1A1A2E", lineHeight: 1.5 }}>
                  {locale === "de" ? resp.textDe : resp.textEn}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Custom response toggle */}
      {!showCustom ? (
        <button
          type="button"
          onClick={() => setShowCustom(true)}
          style={{
            background: "none",
            border: "none",
            color: "#6B3FA0",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            padding: "8px 0",
            fontFamily: "inherit",
          }}
        >
          ✏️ {t.customize}
        </button>
      ) : (
        <>
          <CustomResponseInput
            onSubmit={(text, category) => {
              if (category) {
                onRespond(category);
              } else {
                onRespondText(text);
              }
              setShowCustom(false);
            }}
            locale={locale}
          />
          <button
            type="button"
            onClick={() => setShowCustom(false)}
            style={{
              background: "none",
              border: "none",
              color: "#7A7A96",
              fontSize: "13px",
              cursor: "pointer",
              padding: "8px 0",
              fontFamily: "inherit",
            }}
          >
            ← {t.cancelCustom}
          </button>
        </>
      )}
    </div>
  );
}
