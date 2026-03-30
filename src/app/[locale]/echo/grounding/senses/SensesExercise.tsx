"use client";

import { useState } from "react";
import Link from "next/link";
import { SENSES_STEPS } from "@/lib/echo/grounding";

const EN = {
  back: "← Grounding",
  badge: "5-4-3-2-1 Grounding",
  title: "5-4-3-2-1",
  subtitle: "Anchor yourself in the present moment.",
  intro: "We'll move through your five senses, one at a time. Take your time with each one — there's no hurry.",
  btnStart: "Begin",
  btnNext: "Next sense →",
  btnFinish: "I'm done",
  stepLabel: "Step",
  of: "of",
  doneTitle: "You're here.",
  doneBody: "You just brought yourself fully into the present moment. Notice how you feel right now — grounded, aware, safe.",
  btnAgain: "Do it again",
  btnDone: "Return to grounding",
};

const DE = {
  back: "← Erdung",
  badge: "5-4-3-2-1 Erdung",
  title: "5-4-3-2-1",
  subtitle: "Verankere dich im gegenwärtigen Moment.",
  intro: "Wir gehen deine fünf Sinne nacheinander durch. Nimm dir für jeden die Zeit, die du brauchst — es gibt keine Eile.",
  btnStart: "Beginnen",
  btnNext: "Nächster Sinn →",
  btnFinish: "Ich bin fertig",
  stepLabel: "Schritt",
  of: "von",
  doneTitle: "Du bist hier.",
  doneBody: "Du hast dich gerade vollständig in den gegenwärtigen Moment gebracht. Bemerke, wie du dich jetzt fühlst — geerdet, bewusst, sicher.",
  btnAgain: "Wiederholen",
  btnDone: "Zurück zur Erdung",
};

export default function SensesExercise({ locale }: { locale: string }) {
  const c = locale === "de" ? DE : EN;
  const backHref = `/${locale}/echo/grounding`;

  const [step, setStep] = useState<"intro" | number | "done">("intro");

  const currentIndex = typeof step === "number" ? step : 0;
  const current = SENSES_STEPS[currentIndex];

  function nextStep() {
    if (typeof step === "number") {
      if (step < SENSES_STEPS.length - 1) {
        setStep(step + 1);
      } else {
        setStep("done");
      }
    }
  }

  const totalSteps = SENSES_STEPS.length;

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
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
          color: "#0B7B6F",
          marginBottom: "8px",
        }}
      >
        {c.badge}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 8px 0",
        }}
      >
        {c.title}
      </h1>
      <p style={{ color: "#7A7A96", margin: "0 0 32px 0", fontSize: "16px" }}>
        {c.subtitle}
      </p>

      {/* ── Intro ── */}
      {step === "intro" && (
        <div
          style={{
            backgroundColor: "#E8F5F2",
            border: "2px solid #0B7B6F",
            borderRadius: "16px",
            padding: "32px 28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "52px", marginBottom: "16px" }} aria-hidden="true">🌱</div>
          <p
            style={{
              fontSize: "17px",
              color: "#1A1A2E",
              lineHeight: 1.75,
              margin: "0 0 28px 0",
            }}
          >
            {c.intro}
          </p>
          <button
            onClick={() => setStep(0)}
            style={{
              padding: "14px 40px",
              backgroundColor: "#0B7B6F",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "52px",
            }}
          >
            {c.btnStart}
          </button>
        </div>
      )}

      {/* ── Step ── */}
      {typeof step === "number" && (
        <div>
          {/* Progress dots */}
          <div
            style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "28px" }}
            aria-label={`${c.stepLabel} ${step + 1} ${c.of} ${totalSteps}`}
          >
            {SENSES_STEPS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === step ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i < step
                    ? "#0B7B6F"
                    : i === step
                    ? current.color
                    : "#E0DDD7",
                  transition: "all 0.25s ease",
                }}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Sense card */}
          <div
            style={{
              border: `3px solid ${current.color}`,
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            {/* Header band */}
            <div
              style={{
                backgroundColor: current.color,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <span style={{ fontSize: "36px", lineHeight: 1 }} aria-hidden="true">
                {current.icon}
              </span>
              <div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: "2px",
                  }}
                >
                  {c.stepLabel} {step + 1} {c.of} {totalSteps}
                </div>
                <h2
                  style={{
                    color: "#FFFFFF",
                    fontSize: "22px",
                    fontWeight: "bold",
                    margin: 0,
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {locale === "de" ? current.prompt.de : current.prompt.en}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                padding: "20px 24px",
              }}
            >
              <p
                style={{
                  color: "#4A4A68",
                  fontSize: "16px",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {locale === "de" ? current.hint.de : current.hint.en}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={nextStep}
              style={{
                padding: "14px 40px",
                backgroundColor: current.color,
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
                minHeight: "52px",
                minWidth: "200px",
              }}
            >
              {step < totalSteps - 1 ? c.btnNext : c.btnFinish}
            </button>
          </div>
        </div>
      )}

      {/* ── Done ── */}
      {step === "done" && (
        <div
          style={{
            backgroundColor: "#E8F5F2",
            border: "2px solid #0B7B6F",
            borderRadius: "16px",
            padding: "36px 28px",
            textAlign: "center",
          }}
        >
          {/* Completion row of all sense emojis */}
          <div style={{ fontSize: "28px", marginBottom: "16px", letterSpacing: "6px" }} aria-hidden="true">
            {SENSES_STEPS.map((s) => s.icon).join("")}
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
              onClick={() => setStep("intro")}
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
      )}
    </div>
  );
}
