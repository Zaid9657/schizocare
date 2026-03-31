"use client";

import { useState, useCallback } from "react";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import { classifyResponse } from "@/lib/echo/dialogue/response-classifier";

const CHAR_LIMIT = 280;

const CATEGORY_META: Record<
  UserResponseCategory,
  { icon: string; labelEn: string; labelDe: string }
> = {
  ASSERTIVE:       { icon: "💪", labelEn: "Assertive",       labelDe: "Selbstbehauptend" },
  DEFUSION:        { icon: "🌬️", labelEn: "Defusion",        labelDe: "Defusion" },
  CHALLENGE:       { icon: "❓", labelEn: "Challenge",        labelDe: "Hinterfragen" },
  VALUES:          { icon: "⭐", labelEn: "Values",           labelDe: "Werte" },
  SELF_COMPASSION: { icon: "💛", labelEn: "Self-compassion",  labelDe: "Selbstmitgefühl" },
  BOUNDARY:        { icon: "🚧", labelEn: "Boundary",         labelDe: "Grenze" },
};

const ALL_CATEGORIES: UserResponseCategory[] = [
  "ASSERTIVE", "DEFUSION", "CHALLENGE", "VALUES", "SELF_COMPASSION", "BOUNDARY",
];

const EN = {
  placeholder: "Type your response…",
  sounds:      "This sounds like:",
  none:        "Not sure — pick a type:",
  submit:      "Say this",
  charOf:      (n: number, max: number) => `${n}/${max}`,
};
const DE = {
  placeholder: "Gib deine Antwort ein…",
  sounds:      "Das klingt wie:",
  none:        "Nicht sicher — wähle einen Typ:",
  submit:      "Das sagen",
  charOf:      (n: number, max: number) => `${n}/${max}`,
};

interface CustomResponseInputProps {
  onSubmit: (text: string, category: UserResponseCategory | null) => void;
  locale:   string;
}

export default function CustomResponseInput({ onSubmit, locale }: CustomResponseInputProps) {
  const t = locale === "de" ? DE : EN;
  const [text, setText] = useState("");
  const [overrideCategory, setOverrideCategory] = useState<UserResponseCategory | null>(null);

  const classified = text.trim() ? classifyResponse(text) : null;
  const detectedCategory = classified?.category ?? null;
  const confidence = classified?.confidence ?? "none";

  // User picks override only when confidence is low or none
  const showOverride = text.trim().length > 0 && confidence !== "high";
  const finalCategory = overrideCategory ?? detectedCategory;

  const handleSubmit = useCallback(() => {
    if (!text.trim()) return;
    onSubmit(text.trim(), finalCategory);
    setText("");
    setOverrideCategory(null);
  }, [text, finalCategory, onSubmit]);

  return (
    <div style={{ marginBottom: "12px" }}>
      {/* Text area */}
      <textarea
        value={text}
        onChange={(e) => {
          setText(e.target.value.slice(0, CHAR_LIMIT));
          setOverrideCategory(null);
        }}
        placeholder={t.placeholder}
        rows={3}
        style={{
          width: "100%",
          padding: "12px 14px",
          fontSize: "15px",
          border: "2px solid #E0DDD7",
          borderRadius: "10px",
          outline: "none",
          fontFamily: "inherit",
          resize: "none",
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
          color: "#1A1A2E",
        }}
        onFocus={(e)  => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
        onBlur={(e)   => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
        aria-label={t.placeholder}
      />

      {/* Char count */}
      <div style={{ textAlign: "right", fontSize: "12px", color: text.length > CHAR_LIMIT * 0.9 ? "#C03030" : "#9A9AB0", marginBottom: "8px" }}>
        {t.charOf(text.length, CHAR_LIMIT)}
      </div>

      {/* Classifier feedback */}
      {text.trim().length > 3 && (
        <div style={{ marginBottom: "10px" }}>
          {confidence === "high" && detectedCategory && (
            <div style={{ fontSize: "13px", color: "#0B7B6F" }}>
              {t.sounds}{" "}
              <strong>
                {CATEGORY_META[detectedCategory].icon}{" "}
                {locale === "de" ? CATEGORY_META[detectedCategory].labelDe : CATEGORY_META[detectedCategory].labelEn}
              </strong>
            </div>
          )}
          {showOverride && (
            <div>
              <div style={{ fontSize: "13px", color: "#7A7A96", marginBottom: "6px" }}>{t.none}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }} role="group" aria-label="Response type">
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
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "5px 12px",
                        minHeight: "34px",
                        borderRadius: "16px",
                        border: sel ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                        backgroundColor: sel ? "#F0EBF8" : "#FFFFFF",
                        color: sel ? "#4A2A7A" : "#4A4A68",
                        fontWeight: sel ? "bold" : "normal",
                        fontSize: "13px",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
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

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!text.trim()}
        style={{
          padding: "11px 24px",
          backgroundColor: text.trim() ? "#6B3FA0" : "#C0B8D0",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "15px",
          fontWeight: "bold",
          cursor: text.trim() ? "pointer" : "not-allowed",
          minHeight: "46px",
          fontFamily: "inherit",
        }}
      >
        {t.submit}
      </button>
    </div>
  );
}
