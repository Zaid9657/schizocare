"use client";

import { useEffect, useRef, useState } from "react";
import type { BreathPhase } from "@/lib/echo/grounding";

interface BreathingCircleProps {
  phase: BreathPhase;
  /** Duration of this phase in seconds */
  duration: number;
  /** 0–1 progress within current phase */
  progress: number;
  size?: number;
}

const PHASE_COLOR: Record<BreathPhase, string> = {
  "in":       "#4A7FC1",
  "hold-in":  "#6B3FA0",
  "out":      "#0B7B6F",
  "hold-out": "#2E7D50",
};

const PHASE_LABEL: Record<BreathPhase, { en: string; de: string }> = {
  "in":       { en: "Breathe in",  de: "Einatmen" },
  "hold-in":  { en: "Hold",        de: "Halten" },
  "out":      { en: "Breathe out", de: "Ausatmen" },
  "hold-out": { en: "Hold",        de: "Halten" },
};

export default function BreathingCircle({
  phase,
  duration,
  progress,
  size = 220,
}: BreathingCircleProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const prevPhaseRef = useRef(phase);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => { prevPhaseRef.current = phase; }, [phase]);

  const color = PHASE_COLOR[phase];
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.42;
  const minR = size * 0.18;

  // Scale radius by progress within phase
  let r: number;
  if (phase === "in") {
    r = minR + (maxR - minR) * progress;
  } else if (phase === "out") {
    r = maxR - (maxR - minR) * progress;
  } else {
    // hold phases: radius stays at max (hold-in) or min (hold-out)
    r = phase === "hold-in" ? maxR : minR;
  }

  // Circumference for the progress ring
  const ringR = maxR + size * 0.055;
  const circ = 2 * Math.PI * ringR;
  const dash = circ * progress;

  if (reducedMotion) {
    // Static: progress bar + phase label only
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            border: `4px solid ${color}`,
            backgroundColor: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-hidden="true"
        />
        {/* Progress bar */}
        <div
          style={{
            width: size * 0.8,
            height: 8,
            backgroundColor: "#E0DDD7",
            borderRadius: 4,
            overflow: "hidden",
          }}
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Phase progress`}
        >
          <div
            style={{
              width: `${progress * 100}%`,
              height: "100%",
              backgroundColor: color,
              borderRadius: 4,
            }}
          />
        </div>
        <span
          style={{
            fontSize: "15px",
            color: "#7A7A96",
            fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
          }}
        >
          {Math.round(duration - duration * progress)}s remaining
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        {/* Outer glow ring — tracks phase progress */}
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={`${color}22`}
          strokeWidth={size * 0.055}
        />
        <circle
          cx={cx}
          cy={cy}
          r={ringR}
          fill="none"
          stroke={color}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: `stroke-dasharray ${duration / 60}s linear` }}
        />

        {/* Breathing circle */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill={`${color}28`}
          stroke={color}
          strokeWidth={2.5}
          style={{ transition: `r ${duration / 60}s linear` }}
        />

        {/* Countdown seconds */}
        <text
          x={cx}
          y={cy + 6}
          textAnchor="middle"
          style={{
            fontSize: size * 0.13,
            fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            fontWeight: "bold",
            fill: color,
          }}
        >
          {Math.max(1, Math.ceil(duration - duration * progress))}
        </text>
      </svg>
    </div>
  );
}

export { PHASE_LABEL };
