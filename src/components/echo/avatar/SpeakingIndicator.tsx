"use client";

// ─────────────────────────────────────────────────────────────────────────────
// SpeakingIndicator — animated waveform shown while avatar TTS is active
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";

interface SpeakingIndicatorProps {
  isSpeaking: boolean;
  /** Optional snippet of text being spoken — shown as caption */
  text?: string;
  /** Respect prefers-reduced-motion */
  reducedMotion?: boolean;
}

/** Number of bars in the waveform */
const BAR_COUNT = 5;

/** Heights for each bar at each animation frame (loops) */
const FRAMES: number[][] = [
  [3, 10, 18, 10,  3],
  [6, 18, 10, 18,  6],
  [10, 6, 18,  6, 10],
  [18, 10,  6, 10, 18],
  [10, 18, 10, 18, 10],
];
const FRAME_MS = 160;

export default function SpeakingIndicator({
  isSpeaking,
  text,
  reducedMotion = false,
}: SpeakingIndicatorProps) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!isSpeaking || reducedMotion) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), FRAME_MS);
    return () => clearInterval(id);
  }, [isSpeaking, reducedMotion]);

  if (!isSpeaking) return null;

  const heights = reducedMotion
    ? [8, 8, 8, 8, 8]  // static equal bars when reduced motion is on
    : FRAMES[frame];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Avatar is speaking"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {/* Waveform bars */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          height: "24px",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "4px",
              height: `${heights[i]}px`,
              borderRadius: "2px",
              backgroundColor: "#6B3FA0",
              transition: reducedMotion ? "none" : `height ${FRAME_MS * 0.8}ms ease`,
            }}
          />
        ))}
      </div>

      {/* Caption text */}
      {text && (
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#6B3FA0",
            fontStyle: "italic",
            textAlign: "center",
            maxWidth: "320px",
            lineHeight: 1.5,
          }}
        >
          &ldquo;{text}&rdquo;
        </p>
      )}
    </div>
  );
}
