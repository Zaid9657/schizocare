"use client";

import { useState, useCallback } from "react";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import { classifyResponse } from "@/lib/echo/dialogue/response-classifier";
import { addFavorite, isFavorited } from "@/lib/echo/responses/favorites-service";
import { generateId } from "@/lib/echo/utils";

// ── Constants ─────────────────────────────────────────────────────────────────

const CHAR_LIMIT = 280;

const CATEGORY_META: Record<
  UserResponseCategory,
  { icon: string; labelEn: string; labelDe: string; color: string }
> = {
  ASSERTIVE:       { icon: "💪", labelEn: "Assertive",       labelDe: "Selbstbehauptend", color: "#6B3FA0" },
  DEFUSION:        { icon: "🧘", labelEn: "Defusion",        labelDe: "Defusion",         color: "#0B7B6F" },
  CHALLENGE:       { icon: "❓", labelEn: "Challenge",        labelDe: "Hinterfragen",     color: "#9E6D1B" },
  VALUES:          { icon: "💫", labelEn: "Values",           labelDe: "Werte",            color: "#2E7D50" },
  SELF_COMPASSION: { icon: "💗", labelEn: "Self-compassion",  labelDe: "Selbstmitgefühl",  color: "#B05080" },
  BOUNDARY:        { icon: "🛑", labelEn: "Boundary",         labelDe: "Grenze",           color: "#C03030" },
};

const ALL_CATEGORIES: UserResponseCategory[] = [
  "ASSERTIVE", "DEFUSION", "CHALLENGE", "VALUES", "SELF_COMPASSION", "BOUNDARY",
];

// ── Translations ──────────────────────────────────────────────────────────────

const EN = {
  placeholder: "Type your response…",
  highConf:    (type: string) => `This sounds like: ${type} (high confidence)`,
  pickType:    "Not sure — pick a type:",
  submit:      "Say this",
  saveToFavs:  "Save to my favorites",
  charOf:      (n: number, max: number) => `${n}/${max}`,
};
const DE = {
  placeholder: "Gib deine Antwort ein…",
  highConf:    (type: string) => `Das klingt wie: ${type} (hohe Konfidenz)`,
  pickType:    "Nicht sicher — wähle einen Typ:",
  submit:      "Das sagen",
  saveToFavs:  "Zu meinen Favoriten hinzufügen",
  charOf:      (n: number, max: number) => `${n}/${max}`,
};

// ── Component ─────────────────────────────────────────────────────────────────

interface CustomResponseInputProps {
  onSubmit: (text: string, category: UserResponseCategory | null) => void;
  locale:   string;
}

export default function CustomResponseInput({ onSubmit, locale }: CustomResponseInputProps) {
  const t = locale === "de" ? DE : EN;

  const [text, setText]                         = useState("");
  const [overrideCategory, setOverrideCategory] = useState<UserResponseCategory | null>(null);
  const [saveToFavorites, setSaveToFavorites]   = useState(false);

  const classified       = text.trim().length > 3 ? classifyResponse(text) : null;
  const detectedCategory = classified?.category ?? null;
  const confidence       = classified?.confidence ?? "none";
  const showOverride     = text.trim().length > 0 && confidence !== "high";
  const finalCategory    = overrideCategory ?? detectedCategory;
  const isSubmittable    = text.trim().length > 0;

  const handleSubmit = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (saveToFavorites) {
      const id = generateId("custom");
      if (!isFavorited(id)) {
        addFavorite("local", {
          responseId: id,
          category:   finalCategory ?? "ASSERTIVE",
          textEn:     trimmed,
          textDe:     trimmed,
        });
      }
    }

    onSubmit(trimmed, finalCategory);
    setText("");
    setOverrideCategory(null);
    setSaveToFavorites(false);
  }, [text, finalCategory, saveToFavorites, onSubmit]);

  return (
    <div
      style={{
        marginBottom: "12px",
        animation:    "echoExpandIn 0.18s ease both",
      }}
    >
      <style>{`
        @keyframes echoExpandIn {
          from { opacity: 0; transform: scaleY(0.95); transform-origin: top; }
          to   { opacity: 1; transform: scaleY(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echoExpandIn { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>

      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value.slice(0, CHAR_LIMIT));
          setOverrideCategory(null);
        }}
        placeholder={t.placeholder}
        rows={3}
        autoFocus
        style={{
          width:           "100%",
          padding:         "12px 14px",
          fontSize:        "15px",
          border:          "2px solid #6B3FA0",
          borderRadius:    "10px",
          outline:         "none",
          fontFamily:      "inherit",
          resize:          "none",
          boxSizing:       "border-box",
          backgroundColor: "#FFFFFF",
          color:           "#1A1A2E",
        }}
        onBlur={(e)  => { e.currentTarget.style.borderColor = text ? "#6B3FA0" : "#E0DDD7"; }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
        aria-label={t.placeholder}
      />

      {/* Char count */}
      <div
        style={{
          textAlign:    "right",
          fontSize:     "12px",
          color:        text.length > CHAR_LIMIT * 0.9 ? "#C03030" : "#9A9AB0",
          marginBottom: "8px",
        }}
      >
        {t.charOf(text.length, CHAR_LIMIT)}
      </div>

      {/* Live classifier feedback */}
      {text.trim().length > 3 && (
        <div style={{ marginBottom: "10px" }}>
          {confidence === "high" && detectedCategory && (
            <div
              style={{ fontSize: "13px", color: "#0B7B6F", fontWeight: "500", marginBottom: "6px" }}
              role="status"
              aria-live="polite"
            >
              {CATEGORY_META[detectedCategory].icon}{" "}
              {t.highConf(locale === "de" ? CATEGORY_META[detectedCategory].labelDe : CATEGORY_META[detectedCategory].labelEn)}
            </div>
          )}

          {showOverride && (
            <div>
              <div style={{ fontSize: "13px", color: "#7A7A96", marginBottom: "6px" }}>{t.pickType}</div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}
                role="group"
                aria-label={t.pickType}
              >
                {ALL_CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const sel  = (overrideCategory ?? detectedCategory) === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      onClick={() => setOverrideCategory(cat)}
                      style={{
                        display:         "inline-flex",
                        alignItems:      "center",
                        gap:             "4px",
                        padding:         "5px 12px",
                        minHeight:       "36px",
                        borderRadius:    "16px",
                        border:          sel ? `2px solid ${meta.color}` : "2px solid #E0DDD7",
                        backgroundColor: sel ? `${meta.color}12` : "#FFFFFF",
                        color:           sel ? meta.color : "#4A4A68",
                        fontWeight:      sel ? "bold" : "normal",
                        fontSize:        "13px",
                        cursor:          "pointer",
                        fontFamily:      "inherit",
                        outline:         "none",
                      }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = `0 0 0 2px ${meta.color}40`; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <span aria-hidden="true">{meta.icon}</span>
                      {locale === "de" ? meta.labelDe : meta.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Save to favorites */}
      {isSubmittable && (
        <label
          style={{
            display:      "flex",
            alignItems:   "center",
            gap:          "8px",
            fontSize:     "13px",
            color:        "#4A4A68",
            cursor:       "pointer",
            marginBottom: "12px",
            userSelect:   "none",
          }}
        >
          <input
            type="checkbox"
            checked={saveToFavorites}
            onChange={(e) => setSaveToFavorites(e.target.checked)}
            style={{ width: "16px", height: "16px", accentColor: "#C08000", cursor: "pointer" }}
          />
          ☆ {t.saveToFavs}
        </label>
      )}

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isSubmittable}
        style={{
          padding:         "11px 24px",
          backgroundColor: isSubmittable ? "#6B3FA0" : "#C0B8D0",
          color:           "#FFFFFF",
          border:          "none",
          borderRadius:    "10px",
          fontSize:        "15px",
          fontWeight:      "bold",
          cursor:          isSubmittable ? "pointer" : "not-allowed",
          minHeight:       "46px",
          fontFamily:      "inherit",
          outline:         "none",
        }}
        onFocus={(e) => { if (isSubmittable) e.currentTarget.style.boxShadow = "0 0 0 3px #6B3FA040"; }}
        onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; }}
      >
        {t.submit}
      </button>
    </div>
  );
}
