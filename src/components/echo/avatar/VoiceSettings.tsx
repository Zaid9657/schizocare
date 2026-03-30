"use client";

import { useState, useCallback } from "react";
import type { AvatarVoiceConfig } from "@/types/echo";

export type VoiceTone = "harsh" | "sneering" | "cold" | "mocking" | "aggressive";

export interface VoiceSettingsValue {
  voiceConfig: AvatarVoiceConfig;
  tone: VoiceTone;
}

const EN = {
  title:        "Set the Voice",
  pitch:        "Pitch",
  pitchLow:     "Low",
  pitchHigh:    "High",
  speed:        "Speed",
  speedSlow:    "Slow",
  speedFast:    "Fast",
  tone:         "Tone",
  tones: {
    harsh:      "Harsh",
    sneering:   "Sneering",
    cold:       "Cold",
    mocking:    "Mocking",
    aggressive: "Aggressive",
  },
  previewBtn:   "Preview voice",
  previewNote:  "Uses your browser\u2019s text-to-speech.",
  textOnly:     "Text-only mode (no audio)",
  sampleLabel:  "Sample text",
};

const DE = {
  title:        "Stimme einstellen",
  pitch:        "Tonh\u00f6he",
  pitchLow:     "Tief",
  pitchHigh:    "Hoch",
  speed:        "Geschwindigkeit",
  speedSlow:    "Langsam",
  speedFast:    "Schnell",
  tone:         "Klangart",
  tones: {
    harsh:      "Hart",
    sneering:   "H\u00f6hnisch",
    cold:       "Kalt",
    mocking:    "Spottend",
    aggressive: "Aggressiv",
  },
  previewBtn:   "Stimme vorspielen",
  previewNote:  "Nutzt die Text-zu-Sprache deines Browsers.",
  textOnly:     "Nur-Text-Modus (kein Audio)",
  sampleLabel:  "Beispieltext",
};

const SAMPLE_EN = "You\u2019re worthless.";
const SAMPLE_DE = "Du bist wertlos.";

const TONE_COLORS: Record<VoiceTone, string> = {
  harsh:      "#C03030",
  sneering:   "#9E6D1B",
  cold:       "#4A7FC1",
  mocking:    "#6B3FA0",
  aggressive: "#8B1A1A",
};

interface VoiceSettingsProps {
  value: VoiceSettingsValue;
  onChange: (patch: Partial<VoiceSettingsValue>) => void;
  locale: string;
}

export default function VoiceSettings({ value, onChange, locale }: VoiceSettingsProps) {
  const t = locale === "de" ? DE : EN;
  const sampleText = locale === "de" ? SAMPLE_DE : SAMPLE_EN;
  const [previewing, setPreviewing] = useState(false);

  const previewVoice = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(sampleText);
    utt.pitch  = value.voiceConfig.pitch;
    utt.rate   = value.voiceConfig.rate;
    utt.volume = value.voiceConfig.volume;
    setPreviewing(true);
    utt.onend  = () => setPreviewing(false);
    utt.onerror = () => setPreviewing(false);
    window.speechSynthesis.speak(utt);
  }, [value.voiceConfig, sampleText]);

  const toneOptions: VoiceTone[] = ["harsh", "sneering", "cold", "mocking", "aggressive"];

  return (
    <div>
      {/* Pitch */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <label style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px" }}>{t.pitch}</label>
          <span style={{ color: "#6B3FA0", fontWeight: "bold", fontSize: "14px" }}>
            {value.voiceConfig.pitch.toFixed(1)}×
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#7A7A96", width: "44px" }}>{t.pitchLow}</span>
          <input
            type="range" min={0.5} max={2.0} step={0.1}
            value={value.voiceConfig.pitch}
            onChange={(e) => onChange({ voiceConfig: { ...value.voiceConfig, pitch: Number(e.target.value) } })}
            aria-label={t.pitch}
            style={{ flex: 1, accentColor: "#6B3FA0", cursor: "pointer" }}
          />
          <span style={{ fontSize: "13px", color: "#7A7A96", width: "44px", textAlign: "right" }}>{t.pitchHigh}</span>
        </div>
      </div>

      {/* Speed */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
          <label style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px" }}>{t.speed}</label>
          <span style={{ color: "#6B3FA0", fontWeight: "bold", fontSize: "14px" }}>
            {value.voiceConfig.rate.toFixed(1)}×
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#7A7A96", width: "44px" }}>{t.speedSlow}</span>
          <input
            type="range" min={0.5} max={2.0} step={0.1}
            value={value.voiceConfig.rate}
            onChange={(e) => onChange({ voiceConfig: { ...value.voiceConfig, rate: Number(e.target.value) } })}
            aria-label={t.speed}
            style={{ flex: 1, accentColor: "#6B3FA0", cursor: "pointer" }}
          />
          <span style={{ fontSize: "13px", color: "#7A7A96", width: "44px", textAlign: "right" }}>{t.speedFast}</span>
        </div>
      </div>

      {/* Tone */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "10px" }}>
          {t.tone}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label={t.tone}>
          {toneOptions.map((tn) => {
            const selected = value.tone === tn;
            const col = TONE_COLORS[tn];
            return (
              <button
                key={tn}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onChange({ tone: tn })}
                style={{
                  minHeight: "44px",
                  padding: "0 16px",
                  borderRadius: "8px",
                  border: selected ? `2px solid ${col}` : "2px solid #E0DDD7",
                  backgroundColor: selected ? `${col}14` : "#FFFFFF",
                  color: selected ? col : "#4A4A68",
                  fontWeight: selected ? "bold" : "normal",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {t.tones[tn]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sample text display */}
      <div
        style={{
          backgroundColor: "#F3F1ED",
          border: "1px solid #E0DDD7",
          borderRadius: "10px",
          padding: "14px 16px",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "12px", color: "#7A7A96", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {t.sampleLabel}
        </div>
        <p style={{ margin: 0, fontSize: "16px", color: "#C03030", fontStyle: "italic" }}>
          &ldquo;{sampleText}&rdquo;
        </p>
      </div>

      {/* Preview button */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={previewVoice}
          disabled={previewing || value.voiceConfig.useTextOnly}
          style={{
            minHeight: "44px",
            padding: "0 20px",
            backgroundColor: previewing ? "#4A4A68" : "#6B3FA0",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "bold",
            cursor: previewing || value.voiceConfig.useTextOnly ? "not-allowed" : "pointer",
            opacity: value.voiceConfig.useTextOnly ? 0.4 : 1,
            fontFamily: "inherit",
          }}
          aria-busy={previewing}
        >
          {previewing ? "\u23F5 Playing\u2026" : `\u25B6 ${t.previewBtn}`}
        </button>
        <span style={{ fontSize: "13px", color: "#9A9AB0" }}>{t.previewNote}</span>
      </div>

      {/* Text-only toggle */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "16px",
          cursor: "pointer",
          fontSize: "15px",
          color: "#4A4A68",
        }}
      >
        <input
          type="checkbox"
          checked={value.voiceConfig.useTextOnly}
          onChange={(e) => onChange({ voiceConfig: { ...value.voiceConfig, useTextOnly: e.target.checked } })}
          style={{ width: "18px", height: "18px", accentColor: "#6B3FA0", cursor: "pointer" }}
        />
        {t.textOnly}
      </label>
    </div>
  );
}
