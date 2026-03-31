"use client";

import EchoProgressBar from "@/components/echo/ui/EchoProgressBar";
import { TOTAL_STEPS } from "@/hooks/echo/useOnboarding";

const EN = {
  stepOf:          (n: number, t: number) => `Step ${n} of ${t}`,
  skipToGrounding: "Need to ground first?",
  back:            "← Back",
  next:            "Continue →",
};
const DE = {
  stepOf:          (n: number, t: number) => `Schritt ${n} von ${t}`,
  skipToGrounding: "Erst erden?",
  back:            "← Zurück",
  next:            "Weiter →",
};

interface OnboardingLayoutProps {
  step:             number;
  locale:           string;
  children:         React.ReactNode;
  onNext?:          () => void;
  onBack?:          () => void;
  onSkip?:          () => void;
  nextLabel?:       string;
  /** Hide the bottom nav row (steps that handle their own CTAs) */
  hideNav?:         boolean;
  /** Disable the Next button */
  nextDisabled?:    boolean;
}

export default function OnboardingLayout({
  step,
  locale,
  children,
  onNext,
  onBack,
  onSkip,
  nextLabel,
  hideNav = false,
  nextDisabled = false,
}: OnboardingLayoutProps) {
  const t       = locale === "de" ? DE : EN;
  const percent = Math.round(((step - 1) / (TOTAL_STEPS - 1)) * 100);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", display: "flex", flexDirection: "column", minHeight: "60vh" }}>

      {/* Progress bar */}
      <div style={{ marginBottom: "8px" }}>
        <EchoProgressBar
          percent={percent}
          label={t.stepOf(step, TOTAL_STEPS)}
          accentColor="#6B3FA0"
          height={6}
        />
      </div>

      {/* Skip link */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          type="button"
          onClick={onSkip}
          style={{
            background:     "none",
            border:         "none",
            color:          "#0B7B6F",
            fontSize:       "13px",
            cursor:         "pointer",
            padding:        "4px 0",
            fontFamily:     "inherit",
            textDecoration: "underline",
          }}
        >
          🌿 {t.skipToGrounding}
        </button>
      </div>

      {/* Content area */}
      <div style={{ flex: 1 }}>
        {children}
      </div>

      {/* Navigation */}
      {!hideNav && (
        <div
          style={{
            display:        "flex",
            justifyContent: "space-between",
            alignItems:     "center",
            marginTop:      "32px",
            gap:            "12px",
          }}
        >
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              style={{
                padding:         "11px 22px",
                backgroundColor: "#F3F1ED",
                color:           "#4A4A68",
                border:          "1px solid #E0DDD7",
                borderRadius:    "10px",
                fontSize:        "15px",
                cursor:          "pointer",
                minHeight:       "48px",
                fontFamily:      "inherit",
              }}
            >
              {t.back}
            </button>
          ) : (
            <div />
          )}

          {onNext && (
            <button
              type="button"
              onClick={onNext}
              disabled={nextDisabled}
              style={{
                padding:         "11px 28px",
                backgroundColor: nextDisabled ? "#C0B8D0" : "#6B3FA0",
                color:           "#FFFFFF",
                border:          "none",
                borderRadius:    "10px",
                fontSize:        "15px",
                fontWeight:      "bold",
                cursor:          nextDisabled ? "not-allowed" : "pointer",
                minHeight:       "48px",
                fontFamily:      "inherit",
              }}
            >
              {nextLabel ?? t.next}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
