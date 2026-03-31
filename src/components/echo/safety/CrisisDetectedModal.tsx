"use client";

import { useState } from "react";
import { logSafetyEvent } from "@/lib/echo/safety/safety-service";
import CrisisResources from "./CrisisResources";

const EN = {
  title:      "Are you okay?",
  message:    "We noticed you might be going through a difficult time. Would you like to take a break?",
  grounding:  "Take me to grounding",
  resources:  "Show crisis resources",
  continue:   "I'm okay, continue",
};
const DE = {
  title:      "Geht es dir gut?",
  message:    "Wir haben bemerkt, dass du möglicherweise eine schwierige Zeit durchmachst. Möchtest du eine Pause machen?",
  grounding:  "Zur Erdung",
  resources:  "Krisenressourcen anzeigen",
  continue:   "Mir geht es gut, weiter",
};

interface CrisisDetectedModalProps {
  locale:        string;
  sessionId?:    string;
  groundingHref: string;
  onContinue:    () => void;
}

export default function CrisisDetectedModal({
  locale,
  sessionId,
  groundingHref,
  onContinue,
}: CrisisDetectedModalProps) {
  const t = locale === "de" ? DE : EN;
  const [showResources, setShowResources] = useState(false);

  // Log on mount
  useState(() => {
    logSafetyEvent("local", {
      eventType: "CRISIS_KEYWORD",
      sessionId,
      metadata: { locale },
    });
  });

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        backgroundColor: "#00000080",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        zIndex:          200,
        padding:         "16px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="crisis-modal-title"
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius:    "16px",
          padding:         "28px",
          maxWidth:        "460px",
          width:           "100%",
          maxHeight:       "90vh",
          overflowY:       "auto",
        }}
      >
        <div style={{ fontSize: "36px", textAlign: "center", marginBottom: "12px" }} aria-hidden="true">
          💚
        </div>

        <h2
          id="crisis-modal-title"
          style={{
            fontFamily:  "var(--font-fraunces), Georgia, serif",
            fontSize:    "22px",
            fontWeight:  "bold",
            color:       "#1A1A2E",
            margin:      "0 0 10px 0",
            textAlign:   "center",
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
                textAlign:       "center",
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
              {t.continue}
            </button>
          </div>
        ) : (
          <>
            <CrisisResources locale={locale} />
            <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setShowResources(false)}
                style={{
                  flex:            1,
                  padding:         "11px 16px",
                  backgroundColor: "#F3F1ED",
                  color:           "#4A4A68",
                  border:          "1px solid #E0DDD7",
                  borderRadius:    "10px",
                  cursor:          "pointer",
                  fontFamily:      "inherit",
                  fontSize:        "14px",
                }}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={onContinue}
                style={{
                  flex:            1,
                  padding:         "11px 16px",
                  backgroundColor: "#F3F1ED",
                  color:           "#4A4A68",
                  border:          "1px solid #E0DDD7",
                  borderRadius:    "10px",
                  cursor:          "pointer",
                  fontFamily:      "inherit",
                  fontSize:        "14px",
                }}
              >
                {t.continue}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
