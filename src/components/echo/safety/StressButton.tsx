"use client";

import { useState, useCallback } from "react";
import { logSafetyEvent } from "@/lib/echo/safety/safety-service";

interface StressButtonProps {
  onActivate:  () => void;
  locale?:     string;
  /** Minimum size in px (default 64) */
  minSize?:    number;
  /** Show as a floating fixed-position button */
  floating?:   boolean;
  disabled?:   boolean;
  sessionId?:  string;
}

const LABEL_EN = "I need support";
const LABEL_DE = "Ich brauche Hilfe";
const SUB_EN   = "Tap for grounding";
const SUB_DE   = "Tippen für Erdung";

export default function StressButton({
  onActivate,
  locale    = "en",
  minSize   = 64,
  floating  = false,
  disabled  = false,
  sessionId,
}: StressButtonProps) {
  const [pressed, setPressed] = useState(false);
  const label = locale === "de" ? LABEL_DE : LABEL_EN;
  const sub   = locale === "de" ? SUB_DE   : SUB_EN;

  const handleClick = useCallback(() => {
    if (disabled) return;
    setPressed(true);
    // Log event (fire-and-forget)
    logSafetyEvent("local", {
      eventType: "STRESS_BUTTON",
      sessionId,
      metadata: { locale },
    });
    // Brief visual feedback, then trigger
    setTimeout(() => {
      setPressed(false);
      onActivate();
    }, 120);
  }, [disabled, onActivate, sessionId, locale]);

  const button = (
    <>
      <style>{`
        @keyframes echo-stress-pulse {
          0%, 100% { box-shadow: 0 0 0 0   rgba(192,48,48,0.5); }
          50%       { box-shadow: 0 0 0 12px rgba(192,48,48,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echo-stress-pulse { to {} }
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        aria-label={`${label} — ${sub}`}
        style={{
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent:"center",
          gap:           "4px",
          minWidth:      minSize,
          minHeight:     minSize,
          padding:       floating ? "0" : "12px 24px",
          width:         floating ? minSize : undefined,
          height:        floating ? minSize : undefined,
          borderRadius:  floating ? "50%" : "16px",
          backgroundColor: pressed ? "#8B1A1A" : disabled ? "#C0A0A0" : "#C03030",
          color:         "#FFFFFF",
          border:        "3px solid rgba(255,255,255,0.3)",
          cursor:        disabled ? "not-allowed" : "pointer",
          fontFamily:    "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
          fontSize:      floating ? "26px" : "16px",
          fontWeight:    "bold",
          lineHeight:    1.2,
          transform:     pressed ? "scale(0.96)" : "scale(1)",
          transition:    "background-color 0.1s ease, transform 0.1s ease",
          animation:     floating && !disabled ? "echo-stress-pulse 2.5s ease-in-out infinite" : "none",
          userSelect:    "none",
          WebkitTapHighlightColor: "transparent",
          touchAction:   "manipulation",
          opacity:       disabled ? 0.6 : 1,
        }}
      >
        {floating ? (
          <span aria-hidden="true" style={{ fontSize: "26px" }}>🆘</span>
        ) : (
          <>
            <span aria-hidden="true" style={{ fontSize: "22px" }}>🌿</span>
            <span style={{ fontSize: "15px", fontWeight: "bold" }}>{label}</span>
            <span style={{ fontSize: "12px", opacity: 0.85, fontWeight: "normal" }}>{sub}</span>
          </>
        )}
      </button>
    </>
  );

  if (floating) {
    return (
      <div
        style={{
          position:  "fixed",
          bottom:    "24px",
          left:      "50%",
          transform: "translateX(-50%)",
          zIndex:    100,
        }}
      >
        {button}
      </div>
    );
  }

  return button;
}
