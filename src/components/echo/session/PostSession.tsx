"use client";

import { useState } from "react";
import Link from "next/link";
import type { SessionSummary } from "@/types/echo";
import { MOOD_LABELS } from "@/lib/echo/constants";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";

const CATEGORY_ICONS: Record<UserResponseCategory, string> = {
  ASSERTIVE:       "💪",
  DEFUSION:        "🌬️",
  CHALLENGE:       "❓",
  VALUES:          "⭐",
  SELF_COMPASSION: "💛",
  BOUNDARY:        "🚧",
};

const EN = {
  title:       "Session complete",
  moodAfterQ:  "How are you feeling now?",
  moodHint:    "1 = very distressed · 10 = very good",
  delta:       (d: number) => d > 0 ? `+${d} mood improvement` : d < 0 ? `${d} mood change` : "Mood stayed the same",
  winLabel:    "Your win statement:",
  noticeQ:     "What did you notice? (optional)",
  noticePH:    "Any thoughts or observations from this session…",
  summaryTitle:"Session summary",
  duration:    "Duration",
  exchanges:   "Exchanges",
  btnHome:     "Back to ECHO",
  btnAgain:    "Start another session",
  btnSave:     "Save reflection",
  minutes:     "min",
};
const DE = {
  title:       "Sitzung abgeschlossen",
  moodAfterQ:  "Wie fühlst du dich jetzt?",
  moodHint:    "1 = sehr belastet · 10 = sehr gut",
  delta:       (d: number) => d > 0 ? `+${d} Stimmungsverbesserung` : d < 0 ? `${d} Stimmungsveränderung` : "Stimmung blieb gleich",
  winLabel:    "Dein Siegessatz:",
  noticeQ:     "Was hast du bemerkt? (optional)",
  noticePH:    "Gedanken oder Beobachtungen aus dieser Sitzung…",
  summaryTitle:"Sitzungsübersicht",
  duration:    "Dauer",
  exchanges:   "Austausche",
  btnHome:     "Zurück zu ECHO",
  btnAgain:    "Weitere Sitzung",
  btnSave:     "Reflexion speichern",
  minutes:     "Min.",
};

interface PostSessionProps {
  summary:     SessionSummary;
  moodAfter:   number;
  onMoodAfter: (v: number) => void;
  onFinish:    () => void;
  locale:      string;
  echoHref:    string;
}

export default function PostSession({
  summary,
  moodAfter,
  onMoodAfter,
  onFinish,
  locale,
  echoHref,
}: PostSessionProps) {
  const t = locale === "de" ? DE : EN;
  const [reflection, setReflection] = useState("");
  const [saved, setSaved] = useState(false);

  const moodLabel = MOOD_LABELS[moodAfter]?.[locale === "de" ? "de" : "en"] ?? "";
  const delta = moodAfter - summary.moodBefore;
  const durationMin = Math.max(1, Math.round((summary.durationSeconds ?? 0) / 60));

  function handleSave() {
    // Persist reflection to localStorage alongside session data
    if (typeof window !== "undefined" && reflection.trim()) {
      const key = `echo_reflection_${summary.sessionId}`;
      localStorage.setItem(key, reflection.trim());
    }
    setSaved(true);
    onFinish();
  }

  return (
    <div style={{ maxWidth: "520px" }}>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "26px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 4px 0",
        }}
      >
        ✓ {t.title}
      </h2>

      {/* Win statement highlight */}
      <div
        style={{
          backgroundColor: "#E8F5EF",
          border: "2px solid #2E7D50",
          borderRadius: "12px",
          padding: "16px 20px",
          margin: "20px 0",
        }}
      >
        <div style={{ fontSize: "12px", color: "#2E7D50", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
          {t.winLabel}
        </div>
        <p style={{ margin: 0, fontSize: "17px", color: "#1A4A2E", fontWeight: "bold", lineHeight: 1.5 }}>
          &ldquo;{summary.winStatementText}&rdquo;
        </p>
      </div>

      {/* Mood after */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "2px solid #EEECE8",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "6px" }}>
          {t.moodAfterQ}
        </label>
        <p style={{ fontSize: "13px", color: "#7A7A96", margin: "0 0 14px 0" }}>{t.moodHint}</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "13px", color: "#9A9AB0" }}>
          <span>1</span>
          <span style={{ fontWeight: "bold", color: moodAfter <= 3 ? "#C03030" : moodAfter <= 6 ? "#9E6D1B" : "#2E7D50", fontSize: "15px" }}>
            {moodAfter} — {moodLabel}
          </span>
          <span>10</span>
        </div>
        <input
          type="range" min={1} max={10} value={moodAfter}
          onChange={(e) => onMoodAfter(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#6B3FA0", cursor: "pointer" }}
          aria-label={t.moodAfterQ}
        />
        {/* Delta */}
        <p style={{ margin: "12px 0 0 0", fontSize: "14px", fontWeight: "bold", color: delta > 0 ? "#2E7D50" : delta < 0 ? "#C03030" : "#7A7A96" }}>
          {t.delta(delta)}
        </p>
      </div>

      {/* Session summary card */}
      <div
        style={{
          backgroundColor: "#F9F8F6",
          border: "1px solid #EEECE8",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        <div>
          <div style={{ fontSize: "12px", color: "#7A7A96", marginBottom: "3px" }}>{t.duration}</div>
          <div style={{ fontWeight: "bold", color: "#1A1A2E" }}>{durationMin} {t.minutes}</div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "#7A7A96", marginBottom: "3px" }}>{t.exchanges}</div>
          <div style={{ fontWeight: "bold", color: "#1A1A2E" }}>{summary.exchangeCount}</div>
        </div>
      </div>

      {/* Reflection textarea */}
      <div style={{ marginBottom: "24px" }}>
        <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "8px" }}>
          {t.noticeQ}
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder={t.noticePH}
          rows={3}
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: "15px",
            border: "2px solid #E0DDD7",
            borderRadius: "10px",
            outline: "none",
            fontFamily: "inherit",
            resize: "vertical",
            boxSizing: "border-box",
            backgroundColor: "#FFFFFF",
            color: "#1A1A2E",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
        />
      </div>

      {/* Actions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          type="button"
          onClick={handleSave}
          disabled={saved}
          style={{
            padding: "14px 28px",
            backgroundColor: saved ? "#2E7D50" : "#6B3FA0",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: saved ? "default" : "pointer",
            minHeight: "52px",
            fontFamily: "inherit",
          }}
        >
          {saved ? "✓ Saved" : t.btnSave}
        </button>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => { window.location.href = echoHref + "/session/new"; }}
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#F3F1ED",
              color: "#4A4A68",
              border: "1px solid #E0DDD7",
              borderRadius: "10px",
              fontSize: "14px",
              cursor: "pointer",
              minHeight: "48px",
              fontFamily: "inherit",
            }}
          >
            {t.btnAgain}
          </button>
          <Link
            href={echoHref}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              backgroundColor: "#F3F1ED",
              color: "#4A4A68",
              border: "1px solid #E0DDD7",
              borderRadius: "10px",
              fontSize: "14px",
              textDecoration: "none",
              minHeight: "48px",
            }}
          >
            {t.btnHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
