"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import BreathingCircle, { PHASE_LABEL } from "@/components/echo/grounding/BreathingCircle";
import { BOX_BREATH_PHASES, BOX_BREATH_TOTAL_CYCLES } from "@/lib/echo/grounding";
import type { BreathPhase } from "@/lib/echo/grounding";

const EN = {
  back: "← Grounding",
  badge: "Box Breathing",
  title: "Box Breathing",
  subtitle: "4 counts in · 4 hold · 4 out · 4 hold",
  hint: "Follow the circle. Let it breathe for you.",
  cycle: "Cycle",
  of: "of",
  btnStart: "Begin",
  btnPause: "Pause",
  btnResume: "Resume",
  btnStop: "Stop",
  btnAgain: "Breathe again",
  btnDone: "I'm done",
  doneTitle: "Well done.",
  doneBody: "You completed all 4 cycles. Notice how you feel right now.",
  phaseIn:      "Breathe in slowly through your nose…",
  phaseHoldIn:  "Hold your breath gently…",
  phaseOut:     "Breathe out slowly through your mouth…",
  phaseHoldOut: "Hold, then begin again…",
};

const DE = {
  back: "← Erdung",
  badge: "Box-Atmung",
  title: "Box-Atmung",
  subtitle: "4 einatmen · 4 halten · 4 ausatmen · 4 halten",
  hint: "Folge dem Kreis. Lass ihn für dich atmen.",
  cycle: "Zyklus",
  of: "von",
  btnStart: "Beginnen",
  btnPause: "Pausieren",
  btnResume: "Fortsetzen",
  btnStop: "Stoppen",
  btnAgain: "Erneut atmen",
  btnDone: "Ich bin fertig",
  doneTitle: "Gut gemacht.",
  doneBody: "Du hast alle 4 Zyklen abgeschlossen. Bemerke, wie du dich jetzt fühlst.",
  phaseIn:      "Atme langsam durch die Nase ein…",
  phaseHoldIn:  "Atem sanft anhalten…",
  phaseOut:     "Atme langsam durch den Mund aus…",
  phaseHoldOut: "Halten, dann wieder von vorn…",
};

const PHASE_INSTRUCTION_KEY: Record<BreathPhase, keyof typeof EN> = {
  "in":       "phaseIn",
  "hold-in":  "phaseHoldIn",
  "out":      "phaseOut",
  "hold-out": "phaseHoldOut",
};

const TICK_MS = 50; // update interval

export default function BreathingExercise({ locale }: { locale: string }) {
  const c = locale === "de" ? DE : EN;
  const backHref = `/${locale}/echo/grounding`;

  type State = "idle" | "running" | "paused" | "done";
  const [state, setState] = useState<State>("idle");
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const phaseIndexRef = useRef(phaseIndex);
  phaseIndexRef.current = phaseIndex;

  const cycleCountRef = useRef(cycleCount);
  cycleCountRef.current = cycleCount;

  const elapsedMsRef = useRef(elapsedMs);
  elapsedMsRef.current = elapsedMs;

  const currentPhase = BOX_BREATH_PHASES[phaseIndex];
  const phaseDurationMs = currentPhase.durationSeconds * 1000;
  const phaseProgress = Math.min(elapsedMs / phaseDurationMs, 1);

  const stop = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setState("idle");
    setPhaseIndex(0);
    setCycleCount(0);
    setElapsedMs(0);
  }, []);

  const tick = useCallback(() => {
    const newElapsed = elapsedMsRef.current + TICK_MS;
    const phase = BOX_BREATH_PHASES[phaseIndexRef.current];
    const phaseDuration = phase.durationSeconds * 1000;

    if (newElapsed >= phaseDuration) {
      // Advance to next phase
      const nextIndex = (phaseIndexRef.current + 1) % BOX_BREATH_PHASES.length;
      const isNewCycle = nextIndex === 0;
      const newCycleCount = cycleCountRef.current + (isNewCycle ? 1 : 0);

      if (isNewCycle && newCycleCount >= BOX_BREATH_TOTAL_CYCLES) {
        // Done
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setState("done");
        setCycleCount(newCycleCount);
        setElapsedMs(0);
        return;
      }

      setPhaseIndex(nextIndex);
      setCycleCount(newCycleCount);
      setElapsedMs(0);
    } else {
      setElapsedMs(newElapsed);
    }
  }, []);

  const start = useCallback(() => {
    setState("running");
    intervalRef.current = setInterval(tick, TICK_MS);
  }, [tick]);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setState("paused");
  }, []);

  const resume = useCallback(() => {
    setState("running");
    intervalRef.current = setInterval(tick, TICK_MS);
  }, [tick]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const instruction = c[PHASE_INSTRUCTION_KEY[currentPhase.phase]];
  const phaseLabel = locale === "de"
    ? PHASE_LABEL[currentPhase.phase].de
    : PHASE_LABEL[currentPhase.phase].en;

  return (
    <div style={{ maxWidth: "480px", margin: "0 auto" }}>
      <Link
        href={backHref}
        style={{
          color: "#0B7B6F",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "24px",
        }}
      >
        {c.back}
      </Link>

      <span
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#4A7FC1",
          marginBottom: "8px",
        }}
      >
        {c.badge}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "30px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 6px 0",
        }}
      >
        {c.title}
      </h1>

      <p style={{ color: "#7A7A96", margin: "0 0 36px 0", fontSize: "15px" }}>
        {c.subtitle}
      </p>

      {/* ── Done state ── */}
      {state === "done" ? (
        <div
          style={{
            backgroundColor: "#E8F5F2",
            border: "2px solid #0B7B6F",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "52px", marginBottom: "16px" }} aria-hidden="true">🌿</div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "24px",
              color: "#1A1A2E",
              margin: "0 0 10px 0",
            }}
          >
            {c.doneTitle}
          </h2>
          <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: "0 0 28px 0" }}>
            {c.doneBody}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => { setState("idle"); setPhaseIndex(0); setCycleCount(0); setElapsedMs(0); }}
              style={{
                padding: "12px 24px",
                backgroundColor: "#0B7B6F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              {c.btnAgain}
            </button>
            <Link
              href={backHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "12px 24px",
                backgroundColor: "#F3F1ED",
                color: "#4A4A68",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "15px",
                minHeight: "48px",
                border: "1px solid #E0DDD7",
              }}
            >
              {c.btnDone}
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* ── Cycle counter ── */}
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#7A7A96",
              marginBottom: "20px",
              fontWeight: 500,
            }}
          >
            {state !== "idle" && (
              <span>
                {c.cycle} {cycleCount + 1} {c.of} {BOX_BREATH_TOTAL_CYCLES}
              </span>
            )}
          </div>

          {/* ── Breathing circle ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
            <BreathingCircle
              phase={currentPhase.phase}
              duration={currentPhase.durationSeconds}
              progress={state === "running" || state === "paused" ? phaseProgress : 0}
              size={220}
            />

            {/* Phase label + instruction */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "bold",
                  color: "#1A1A2E",
                  marginBottom: "6px",
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  minHeight: "32px",
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {state !== "idle" ? phaseLabel : c.hint}
              </div>
              {state === "running" && (
                <p style={{ color: "#7A7A96", fontSize: "15px", margin: 0 }}>
                  {instruction}
                </p>
              )}
              {state === "paused" && (
                <p style={{ color: "#9E6D1B", fontSize: "15px", margin: 0, fontWeight: 500 }}>
                  {locale === "de" ? "Pausiert" : "Paused"}
                </p>
              )}
            </div>
          </div>

          {/* ── Controls ── */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {state === "idle" && (
              <button
                onClick={start}
                style={{
                  padding: "14px 40px",
                  backgroundColor: "#4A7FC1",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "17px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  minHeight: "52px",
                  minWidth: "160px",
                }}
              >
                {c.btnStart}
              </button>
            )}
            {state === "running" && (
              <>
                <button
                  onClick={pause}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "#FFFFFF",
                    color: "#4A7FC1",
                    border: "2px solid #4A7FC1",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    minHeight: "48px",
                  }}
                >
                  {c.btnPause}
                </button>
                <button
                  onClick={stop}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "#F3F1ED",
                    color: "#4A4A68",
                    border: "1px solid #E0DDD7",
                    borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                    minHeight: "48px",
                  }}
                >
                  {c.btnStop}
                </button>
              </>
            )}
            {state === "paused" && (
              <>
                <button
                  onClick={resume}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "#4A7FC1",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    minHeight: "48px",
                  }}
                >
                  {c.btnResume}
                </button>
                <button
                  onClick={stop}
                  style={{
                    padding: "12px 28px",
                    backgroundColor: "#F3F1ED",
                    color: "#4A4A68",
                    border: "1px solid #E0DDD7",
                    borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                    minHeight: "48px",
                  }}
                >
                  {c.btnStop}
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* Tip */}
      {state === "idle" && (
        <p
          style={{
            marginTop: "32px",
            fontSize: "14px",
            color: "#7A7A96",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          {locale === "de"
            ? "Du machst 4 Zyklen à 16 Sekunden. Du kannst jederzeit pausieren."
            : "You'll complete 4 cycles of 16 seconds each. You can pause at any time."}
        </p>
      )}
    </div>
  );
}
