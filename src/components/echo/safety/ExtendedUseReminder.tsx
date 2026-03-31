"use client";

import { useEffect } from "react";
import { logSafetyEvent } from "@/lib/echo/safety/safety-service";

const EN = {
  title:    "Taking a Break",
  message:  "You've been practicing for a while. Taking breaks is part of healthy practice.",
  takBreak: "Take a break",
  continue: "I want to continue",
};
const DE = {
  title:    "Eine Pause einlegen",
  message:  "Du übst schon eine Weile. Pausen zu machen ist ein Teil gesunder Praxis.",
  takBreak: "Pause machen",
  continue: "Ich möchte weitermachen",
};

interface ExtendedUseReminderProps {
  locale:     string;
  sessionId?: string;
  onBreak:    () => void;
  onContinue: () => void;
}

export default function ExtendedUseReminder({
  locale,
  sessionId,
  onBreak,
  onContinue,
}: ExtendedUseReminderProps) {
  const t = locale === "de" ? DE : EN;

  useEffect(() => {
    logSafetyEvent("local", {
      eventType: "EXTENDED_USE",
      sessionId,
      metadata: { locale },
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position:        "fixed",
        inset:           0,
        backgroundColor: "#00000055",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        zIndex:          150,
        padding:         "16px",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="extended-use-title"
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius:    "16px",
          padding:         "28px",
          maxWidth:        "380px",
          width:           "100%",
          textAlign:       "center",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "12px" }} aria-hidden="true">☕</div>

        <h2
          id="extended-use-title"
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize:   "20px",
            fontWeight: "bold",
            color:      "#1A1A2E",
            margin:     "0 0 10px 0",
          }}
        >
          {t.title}
        </h2>

        <p
          style={{
            color:      "#4A4A68",
            fontSize:   "15px",
            lineHeight: 1.7,
            margin:     "0 0 24px 0",
          }}
        >
          {t.message}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            type="button"
            onClick={onBreak}
            style={{
              padding:         "13px 24px",
              backgroundColor: "#0B7B6F",
              color:           "#FFFFFF",
              border:          "none",
              borderRadius:    "10px",
              fontWeight:      "bold",
              fontSize:        "15px",
              cursor:          "pointer",
              minHeight:       "50px",
              fontFamily:      "inherit",
            }}
          >
            🌿 {t.takBreak}
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
      </div>
    </div>
  );
}
