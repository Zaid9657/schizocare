"use client";

import { useState } from "react";
import Link from "next/link";
import { SAFE_PLACE_STEPS } from "@/lib/echo/grounding";

const EN = {
  back: "← Grounding",
  badge: "Guided Visualisation",
  title: "Safe Place",
  subtitle: "A quiet journey to somewhere you feel completely safe.",
  stepOf: (n: number, t: number) => `Step ${n} of ${t}`,
  btnContinue: "Continue",
  doneTitle: "Welcome back.",
  doneBody: "You can return to your safe place any time you need it. It belongs to you.",
  btnAgain: "Visit again",
  btnDone: "Return to grounding",
};

const DE = {
  back: "← Erdung",
  badge: "Geführte Visualisierung",
  title: "Sicherer Ort",
  subtitle: "Eine ruhige Reise zu einem Ort, an dem du dich vollkommen sicher fühlst.",
  stepOf: (n: number, t: number) => `Schritt ${n} von ${t}`,
  btnContinue: "Weiter",
  doneTitle: "Willkommen zurück.",
  doneBody: "Du kannst jederzeit zu deinem sicheren Ort zurückkehren, wenn du ihn brauchst. Er gehört dir.",
  btnAgain: "Erneut besuchen",
  btnDone: "Zurück zur Erdung",
};

// Warm gradient palette for each step
const STEP_GRADIENTS = [
  "linear-gradient(135deg, #0B7B6F08, #E8F5F2)",
  "linear-gradient(135deg, #9E6D1B08, #FBF3E3)",
  "linear-gradient(135deg, #4A7FC108, #E8F0FA)",
  "linear-gradient(135deg, #6B3FA008, #F0EBF8)",
  "linear-gradient(135deg, #2E7D5008, #E8F5EC)",
  "linear-gradient(135deg, #1A1A2E08, #F3F1ED)",
];

export default function SafePlaceExercise({ locale }: { locale: string }) {
  const c = locale === "de" ? DE : EN;
  const backHref = `/${locale}/echo/grounding`;

  const [stepIndex, setStepIndex] = useState<number | "done">(0);
  const total = SAFE_PLACE_STEPS.length;
  const isNumber = typeof stepIndex === "number";
  const current = isNumber ? SAFE_PLACE_STEPS[stepIndex] : SAFE_PLACE_STEPS[total - 1];
  const gradientBg = isNumber ? STEP_GRADIENTS[stepIndex] : STEP_GRADIENTS[total - 1];

  function advance() {
    if (typeof stepIndex === "number") {
      if (stepIndex < total - 1) setStepIndex(stepIndex + 1);
      else setStepIndex("done");
    }
  }

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
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
          color: "#9E6D1B",
          marginBottom: "8px",
        }}
      >
        {c.badge}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 6px 0",
        }}
      >
        {c.title}
      </h1>
      <p style={{ color: "#7A7A96", margin: "0 0 32px 0", fontSize: "15px" }}>
        {c.subtitle}
      </p>

      {/* Progress bar */}
      {isNumber && (
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "13px",
              color: "#7A7A96",
              marginBottom: "6px",
            }}
          >
            <span>{c.stepOf(stepIndex + 1, total)}</span>
            <span style={{ color: current.color, fontWeight: "bold" }}>
              {Math.round(((stepIndex + 1) / total) * 100)}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              backgroundColor: "#E0DDD7",
              borderRadius: 3,
              overflow: "hidden",
            }}
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={1}
            aria-valuemax={total}
          >
            <div
              style={{
                width: `${((stepIndex + 1) / total) * 100}%`,
                height: "100%",
                backgroundColor: current.color,
                borderRadius: 3,
                transition: "width 0.3s ease, background-color 0.3s ease",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Active step ── */}
      {isNumber && (
        <div
          key={current.id}
          style={{
            background: gradientBg,
            border: `2px solid ${current.color}44`,
            borderRadius: "16px",
            padding: "32px 28px",
            marginBottom: "24px",
          }}
        >
          {/* Icon */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              backgroundColor: `${current.color}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              marginBottom: "20px",
            }}
            aria-hidden="true"
          >
            {current.icon}
          </div>

          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#1A1A2E",
              margin: "0 0 14px 0",
              lineHeight: 1.3,
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {locale === "de" ? current.title.de : current.title.en}
          </h2>

          <p
            style={{
              color: "#4A4A68",
              fontSize: "17px",
              lineHeight: 1.85,
              margin: 0,
            }}
          >
            {locale === "de" ? current.body.de : current.body.en}
          </p>
        </div>
      )}

      {isNumber && (
        <button
          onClick={advance}
          style={{
            width: "100%",
            padding: "14px 28px",
            backgroundColor: current.color,
            color: "#FFFFFF",
            border: "none",
            borderRadius: "12px",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
            minHeight: "52px",
            transition: "background-color 0.15s ease",
          }}
        >
          {stepIndex < total - 1
            ? (locale === "de" ? current.cta.de : current.cta.en)
            : (locale === "de" ? current.cta.de : current.cta.en)}
        </button>
      )}

      {/* ── Done ── */}
      {stepIndex === "done" && (
        <div
          style={{
            backgroundColor: "#FBF3E3",
            border: "2px solid #9E6D1B",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }} aria-hidden="true">
            🏡
          </div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "26px",
              color: "#1A1A2E",
              margin: "0 0 12px 0",
            }}
          >
            {c.doneTitle}
          </h2>
          <p
            style={{
              color: "#4A4A68",
              lineHeight: 1.75,
              margin: "0 0 28px 0",
              fontSize: "16px",
            }}
          >
            {c.doneBody}
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setStepIndex(0)}
              style={{
                padding: "12px 24px",
                backgroundColor: "#9E6D1B",
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
      )}
    </div>
  );
}
