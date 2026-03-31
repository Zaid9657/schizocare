"use client";

import { useEffect } from "react";
import { logSafetyEvent } from "@/lib/echo/safety/safety-service";
import CrisisResources from "./CrisisResources";
import { useState } from "react";

const EN = {
  title:      "Checking In",
  message:    "It looks like you might be feeling different than before. How are you doing?",
  grounding:  "I'd like some grounding",
  resources:  "Show me support resources",
  okay:       "I'm okay",
};
const DE = {
  title:      "Kurzer Check-in",
  message:    "Es sieht aus, als könnte es dir anders gehen als vorher. Wie geht es dir?",
  grounding:  "Ich möchte Erdungsübungen",
  resources:  "Unterstützungsressourcen anzeigen",
  okay:       "Mir geht es gut",
};

interface MoodDropModalProps {
  locale:        string;
  sessionId?:    string;
  groundingHref: string;
  onContinue:    () => void;
}

export default function MoodDropModal({
  locale,
  sessionId,
  groundingHref,
  onContinue,
}: MoodDropModalProps) {
  const t = locale === "de" ? DE : EN;
  const [showResources, setShowResources] = useState(false);

  useEffect(() => {
    logSafetyEvent("local", {
      eventType: "MOOD_DROP",
      sessionId,
      metadata: { locale },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        backgroundColor: "#00000066",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        zIndex:          200,
        padding:         "16px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mood-drop-title"
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius:    "16px",
          padding:         "28px",
          maxWidth:        "440px",
          width:           "100%",
          maxHeight:       "90vh",
          overflowY:       "auto",
        }}
      >
        <div style={{ fontSize: "36px", textAlign: "center", marginBottom: "12px" }} aria-hidden="true">
          🤍
        </div>

        <h2
          id="mood-drop-title"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize:   "22px",
            fontWeight: "bold",
            color:      "#1A1A2E",
            margin:     "0 0 10px 0",
            textAlign:  "center",
          }}
        >
          {t.title}
        </h2>

        <p
          style={{
            color:      "#4A4A68",
            fontSize:   "16px",
            lineHeight: 1.7,
            textAlign:  "center",
            margin:     "0 0 24px 0",
          }}
        >
          {t.message}
        </p>

        {!showResources ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a
              href={groundingHref}
              style={{
                display:         "flex",
                alignItems:      "center",
                justifyContent:  "center",
                gap:             "8px",
                padding:         "14px 24px",
                backgroundColor: "#0B7B6F",
                color:           "#FFFFFF",
                borderRadius:    "10px",
                textDecoration:  "none",
                fontWeight:      "bold",
                fontSize:        "16px",
                minHeight:       "52px",
              }}
            >
              🌿 {t.grounding}
            </a>

            <button
              type="button"
              onClick={() => setShowResources(true)}
              style={{
                padding:         "13px 24px",
                backgroundColor: "#FFF8E8",
                color:           "#9E6D1B",
                border:          "2px solid #C08000",
                borderRadius:    "10px",
                fontWeight:      "bold",
                fontSize:        "15px",
                cursor:          "pointer",
                minHeight:       "50px",
                fontFamily:      "inherit",
              }}
            >
              📞 {t.resources}
            </button>

            <button
              type="button"
              onClick={onContinue}
              style={{
                padding:         "12px 24px",
                backgroundColor: "transparent",
                color:           "#7A7A96",
                border:          "1px solid #E0DDD7",
                borderRadius:    "10px",
                fontSize:        "14px",
                cursor:          "pointer",
                minHeight:       "48px",
                fontFamily:      "inherit",
              }}
            >
              {t.okay}
            </button>
          </div>
        ) : (
          <>
            <CrisisResources locale={locale} />
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowResources(false)}
                style={{ flex: 1, padding: "11px 16px", backgroundColor: "#F3F1ED", color: "#4A4A68", border: "1px solid #E0DDD7", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={onContinue}
                style={{ flex: 1, padding: "11px 16px", backgroundColor: "#F3F1ED", color: "#4A4A68", border: "1px solid #E0DDD7", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}
              >
                {t.okay}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
