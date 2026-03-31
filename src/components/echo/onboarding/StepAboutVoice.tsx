"use client";

import { useState } from "react";

type NegativeOption = "yes" | "sometimes" | "no";
type FrequencyOption = "rarely" | "sometimes" | "often" | "always";

const EN = {
  title:       "About Your Experience",
  subtitle:    "This helps us tailor the practice. All optional — skip any question.",
  q1:          "Does your voice say negative things?",
  q1Options: [
    { value: "yes" as NegativeOption,       label: "Yes" },
    { value: "sometimes" as NegativeOption, label: "Sometimes" },
    { value: "no" as NegativeOption,        label: "No / Not sure" },
  ],
  q2:          "How often do you hear it?",
  q2Options: [
    { value: "rarely" as FrequencyOption,    label: "Rarely" },
    { value: "sometimes" as FrequencyOption, label: "Sometimes" },
    { value: "often" as FrequencyOption,     label: "Often" },
    { value: "always" as FrequencyOption,    label: "Almost always" },
  ],
  skip:        "Skip this step",
  continue:    "Continue →",
};
const DE = {
  title:       "Über deine Erfahrung",
  subtitle:    "Das hilft uns, die Übung anzupassen. Alles optional — überspringe beliebige Fragen.",
  q1:          "Sagt deine Stimme negative Dinge?",
  q1Options: [
    { value: "yes" as NegativeOption,       label: "Ja" },
    { value: "sometimes" as NegativeOption, label: "Manchmal" },
    { value: "no" as NegativeOption,        label: "Nein / Unsicher" },
  ],
  q2:          "Wie oft hörst du sie?",
  q2Options: [
    { value: "rarely" as FrequencyOption,    label: "Selten" },
    { value: "sometimes" as FrequencyOption, label: "Manchmal" },
    { value: "often" as FrequencyOption,     label: "Oft" },
    { value: "always" as FrequencyOption,    label: "Fast immer" },
  ],
  skip:        "Diesen Schritt überspringen",
  continue:    "Weiter →",
};

interface StepAboutVoiceProps {
  locale:  string;
  onNext:  () => void;
}

function ChipGroup<T extends string>({
  options, value, onChange,
}: {
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px", marginBottom: "20px" }}>
      {options.map((opt) => {
        const sel = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={sel}
            onClick={() => onChange(opt.value)}
            style={{
              padding:         "9px 18px",
              minHeight:       "40px",
              borderRadius:    "20px",
              border:          sel ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
              backgroundColor: sel ? "#F0EBF8" : "#FFFFFF",
              color:           sel ? "#4A2A7A" : "#4A4A68",
              fontWeight:      sel ? "bold" : "normal",
              fontSize:        "14px",
              cursor:          "pointer",
              fontFamily:      "inherit",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default function StepAboutVoice({ locale, onNext }: StepAboutVoiceProps) {
  const t = locale === "de" ? DE : EN;
  const [negativity, setNegativity] = useState<NegativeOption | null>(null);
  const [frequency, setFrequency]   = useState<FrequencyOption | null>(null);

  // Save answers to localStorage for potential future personalisation
  function handleContinue() {
    if (typeof window !== "undefined") {
      localStorage.setItem("echo_about_voice", JSON.stringify({ negativity, frequency }));
    }
    onNext();
  }

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "28px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 8px 0",
        }}
      >
        {t.title}
      </h2>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 28px 0", lineHeight: 1.6 }}>
        {t.subtitle}
      </p>

      <div style={{ fontWeight: "600", color: "#1A1A2E", fontSize: "16px" }}>{t.q1}</div>
      <ChipGroup options={t.q1Options} value={negativity} onChange={setNegativity} />

      <div style={{ fontWeight: "600", color: "#1A1A2E", fontSize: "16px" }}>{t.q2}</div>
      <ChipGroup options={t.q2Options} value={frequency} onChange={setFrequency} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" }}>
        <button
          type="button"
          onClick={handleContinue}
          style={{
            padding:         "14px 28px",
            backgroundColor: "#6B3FA0",
            color:           "#FFFFFF",
            border:          "none",
            borderRadius:    "10px",
            fontSize:        "16px",
            fontWeight:      "bold",
            cursor:          "pointer",
            minHeight:       "52px",
            fontFamily:      "inherit",
          }}
        >
          {t.continue}
        </button>
        <button
          type="button"
          onClick={onNext}
          style={{
            background:     "none",
            border:         "none",
            color:          "#7A7A96",
            fontSize:       "14px",
            cursor:         "pointer",
            padding:        "8px 0",
            fontFamily:     "inherit",
            textAlign:      "center",
          }}
        >
          {t.skip}
        </button>
      </div>
    </div>
  );
}
