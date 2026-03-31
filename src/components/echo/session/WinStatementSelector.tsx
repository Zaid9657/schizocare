"use client";

import { useState } from "react";
import { WIN_STATEMENTS } from "@/lib/echo/content/seed-data";

const EN = {
  title:       "End on a positive note",
  subtitle:    "Choose a statement that feels true for you today.",
  custom:      "Write my own",
  customPH:    "I am…",
  complete:    "Complete session",
  charLimit:   120,
};
const DE = {
  title:       "Positiv beenden",
  subtitle:    "Wähle einen Satz, der sich heute für dich wahr anfühlt.",
  custom:      "Eigenen Satz schreiben",
  customPH:    "Ich bin…",
  complete:    "Sitzung abschließen",
  charLimit:   120,
};

interface WinStatementSelectorProps {
  onComplete:  (winText: string) => void;
  locale:      string;
}

export default function WinStatementSelector({ onComplete, locale }: WinStatementSelectorProps) {
  const t = locale === "de" ? DE : EN;
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  // Show 5 random win statements
  const [shown] = useState(() =>
    [...WIN_STATEMENTS].sort(() => Math.random() - 0.5).slice(0, 5)
  );

  const canSubmit = showCustom ? customText.trim().length > 2 : selected !== null;

  function handleComplete() {
    if (!canSubmit) return;
    const text = showCustom
      ? customText.trim()
      : shown.find((w) => w.id === selected)?.[locale === "de" ? "textDe" : "textEn"] ?? "";
    onComplete(text);
  }

  return (
    <div style={{ maxWidth: "520px" }}>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "24px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 8px 0",
        }}
      >
        {t.title}
      </h2>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>{t.subtitle}</p>

      {/* Preset win statements */}
      {!showCustom && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {shown.map((ws) => {
            const text = locale === "de" ? ws.textDe : ws.textEn;
            const sel  = selected === ws.id;
            return (
              <button
                key={ws.id}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => setSelected(ws.id)}
                style={{
                  padding: "14px 18px",
                  minHeight: "56px",
                  borderRadius: "10px",
                  border: sel ? "2px solid #2E7D50" : "2px solid #E0DDD7",
                  backgroundColor: sel ? "#E8F5EF" : "#FFFFFF",
                  color: sel ? "#1A4A2E" : "#1A1A2E",
                  fontWeight: sel ? "bold" : "normal",
                  fontSize: "16px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  lineHeight: 1.5,
                  transition: "all 0.12s ease",
                }}
              >
                {sel && <span style={{ marginRight: "8px" }} aria-hidden="true">✓</span>}
                {text}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom input */}
      {showCustom && (
        <div style={{ marginBottom: "16px" }}>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value.slice(0, t.charLimit))}
            placeholder={t.customPH}
            autoFocus
            style={{
              width: "100%",
              padding: "13px 16px",
              fontSize: "16px",
              border: "2px solid #6B3FA0",
              borderRadius: "10px",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
              backgroundColor: "#FFFFFF",
              color: "#1A1A2E",
            }}
            aria-label={t.customPH}
          />
          <div style={{ textAlign: "right", fontSize: "12px", color: "#9A9AB0", marginTop: "4px" }}>
            {customText.length}/{t.charLimit}
          </div>
        </div>
      )}

      {/* Toggle custom */}
      <button
        type="button"
        onClick={() => { setShowCustom(!showCustom); setSelected(null); setCustomText(""); }}
        style={{
          background: "none",
          border: "none",
          color: "#6B3FA0",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
          padding: "4px 0 16px 0",
          fontFamily: "inherit",
        }}
      >
        {showCustom ? "← Use a suggestion" : `✏️ ${t.custom}`}
      </button>

      {/* Complete button */}
      <button
        type="button"
        onClick={handleComplete}
        disabled={!canSubmit}
        style={{
          width: "100%",
          padding: "15px 28px",
          backgroundColor: canSubmit ? "#2E7D50" : "#A0C8B0",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: canSubmit ? "pointer" : "not-allowed",
          minHeight: "56px",
          fontFamily: "inherit",
        }}
      >
        {t.complete}
      </button>
    </div>
  );
}
