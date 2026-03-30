"use client";

import { useState, useCallback } from "react";

interface StressButtonProps {
  onActivate: () => void;
  locale?: string;
  /** Override minimum size (default 64px) */
  minSize?: number;
  /** Show as a floating fixed button */
  floating?: boolean;
}

const LABEL_EN = "I need support";
const LABEL_DE = "Ich brauche Hilfe";
const SUB_EN   = "Tap for grounding";
const SUB_DE   = "Tippen f\u00fcr Erdung";

export default function StressButton({
  onActivate,
  locale = "en",
  minSize = 64,
  floating = false,
}: StressButtonProps) {
  const [pressed, setPressed] = useState(false);
  const label = locale === "de" ? LABEL_DE : LABEL_EN;
  const sub   = locale === "de" ? SUB_DE   : SUB_EN;

  const handleClick = useCallback(() => {
    setPressed(true);
    // Brief visual feedback, then trigger
    setTimeout(() => {
      setPressed(false);
      onActivate();
    }, 120);
  }, [onActivate]);

  const button = (
    <>
      <style>{`
        @keyframes echo-stress-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(192,48,48,0.5); }
          50%       { box-shadow: 0 0 0 10px rgba(192,48,48,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echo-stress-pulse { to {} }
        }
      `}</style>
      <button
        type="button"
        onClick={handleClick}
        aria-label={`${label} — ${sub}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          minWidth: minSize,
          minHeight: minSize,
          padding: floating ? "0" : "12px 24px",
          width: floating ? minSize : undefined,
          height: floating ? minSize : undefined,
          borderRadius: floating ? "50%" : "16px",
          backgroundColor: pressed ? "#8B1A1A" : "#C03030",
          color: "#FFFFFF",
          border: "3px solid rgba(255,255,255,0.3)",
          cursor: "pointer",
          fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
          fontSize: floating ? "26px" : "16px",
          fontWeight: "bold",
          lineHeight: 1.2,
          transform: pressed ? "scale(0.96)" : "scale(1)",
          transition: "background-color 0.1s ease, transform 0.1s ease",
          animation: floating ? "echo-stress-pulse 2.5s ease-in-out infinite" : "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          touchAction: "manipulation",
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
          position: "fixed",
          bottom: "24px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
        }}
      >
        {button}
      </div>
    );
  }

  return button;
}
