"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import FaceBuilder from "@/components/echo/avatar/FaceBuilder";
import VoiceSettings, { type VoiceSettingsValue } from "@/components/echo/avatar/VoiceSettings";
import AvatarDetails, { type AvatarDetailsValue } from "@/components/echo/avatar/AvatarDetails";
import AvatarPreview from "@/components/echo/avatar/AvatarPreview";
import { DEFAULT_FACE_CONFIG, type FaceConfig } from "@/lib/echo/avatar/face-parts";
import { createAvatar } from "@/lib/echo/avatar/avatar-service";

// ── i18n ──────────────────────────────────────────────────────────────────────

const EN = {
  back:           "\u2190 Back",
  backToAvatars:  "\u2190 Your voices",
  step:           (n: number, t: number) => `Step ${n} of ${t}`,
  steps: ["Intro", "Face", "Voice", "Details", "Preview"],
  // Step 0
  introTitle:     "Create Your Avatar",
  introBody:      "Let\u2019s create a face for your voice. By giving it a form, you step into a different relationship with it \u2014 one where you\u2019re in control.",
  introDetail:    "You choose every detail. You can change it later. You\u2019re in charge here.",
  btnBegin:       "Let\u2019s begin",
  // Step 1
  faceTitle:      "Build the Face",
  faceHint:       "Build a face that represents this voice as you experience it.",
  // Step 2
  voiceTitle:     "Set the Voice",
  voiceHint:      "Shape how this voice sounds in practice sessions.",
  // Step 3
  detailsTitle:   "Add Details",
  detailsHint:    "Everything here is optional and private.",
  // Step 4
  previewTitle:   "Meet Your Avatar",
  previewHint:    "This is the face you\u2019ll see during sessions.",
  empowerment:    "You created this. You control this. Let\u2019s practice together.",
  nameFallback:   "Your Voice",
  btnSave:        "Save and start",
  saving:         "Saving\u2026",
  saved:          "Avatar created!",
  btnNext:        "Next \u2192",
  btnPrev:        "\u2190 Back",
  errorMax:       "You already have 5 voices. Remove one before adding more.",
  errorGeneric:   "Something went wrong. Please try again.",
};

const DE = {
  back:           "\u2190 Zur\u00fcck",
  backToAvatars:  "\u2190 Deine Stimmen",
  step:           (n: number, t: number) => `Schritt ${n} von ${t}`,
  steps: ["Intro", "Gesicht", "Stimme", "Details", "Vorschau"],
  introTitle:     "Avatar erstellen",
  introBody:      "Lass uns ein Gesicht f\u00fcr deine Stimme erschaffen. Indem du ihr eine Form gibst, ver\u00e4nderst du deine Beziehung zu ihr \u2014 du \u00fcbernimmst die Kontrolle.",
  introDetail:    "Du w\u00e4hlst jedes Detail. Du kannst es sp\u00e4ter \u00e4ndern. Du bist hier der Chef.",
  btnBegin:       "Legen wir los",
  faceTitle:      "Gesicht gestalten",
  faceHint:       "Gestalte ein Gesicht, das diese Stimme so darstellt, wie du sie erlebst.",
  voiceTitle:     "Stimme einstellen",
  voiceHint:      "Forme, wie sich diese Stimme in \u00dcbungssitzungen anh\u00f6rt.",
  detailsTitle:   "Details hinzuf\u00fcgen",
  detailsHint:    "Alles hier ist optional und privat.",
  previewTitle:   "Dein Avatar",
  previewHint:    "Das ist das Gesicht, das du w\u00e4hrend der Sitzungen siehst.",
  empowerment:    "Du hast das erschaffen. Du kontrollierst das. Lass uns gemeinsam \u00fcben.",
  nameFallback:   "Deine Stimme",
  btnSave:        "Speichern und starten",
  saving:         "Speichern\u2026",
  saved:          "Avatar erstellt!",
  btnNext:        "Weiter \u2192",
  btnPrev:        "\u2190 Zur\u00fcck",
  errorMax:       "Du hast bereits 5 Stimmen. Entferne eine, bevor du weitere hinzuf\u00fcgst.",
  errorGeneric:   "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
};

// ── Step indicator ─────────────────────────────────────────────────────────────

function StepBar({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div
      style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "32px" }}
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${current + 1} of ${steps.length}: ${steps[current]}`}
    >
      {steps.map((label, i) => (
        <div key={i} title={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div
            style={{
              width: i === current ? 28 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: i < current ? "#0B7B6F" : i === current ? "#6B3FA0" : "#E0DDD7",
              transition: "all 0.25s ease",
            }}
          />
        </div>
      ))}
    </div>
  );
}

// ── Wizard state ──────────────────────────────────────────────────────────────

interface WizardState {
  faceConfig:    FaceConfig;
  voiceSettings: VoiceSettingsValue;
  details:       AvatarDetailsValue;
}

const DEFAULT_STATE: WizardState = {
  faceConfig: { ...DEFAULT_FACE_CONFIG },
  voiceSettings: {
    voiceConfig: { pitch: 1.2, rate: 1.0, volume: 1.0, useTextOnly: true },
    tone: "harsh",
  },
  details: {
    name:        "",
    personality: "critical",
    gender:      "neutral",
    notes:       "",
    remindsOf:   "",
  },
};

// ── Main wizard ────────────────────────────────────────────────────────────────

export default function AvatarCreateWizard({ locale }: { locale: string }) {
  const t = locale === "de" ? DE : EN;
  const totalSteps = 5; // 0=intro 1=face 2=voice 3=details 4=preview
  const [step, setStep] = useState(0);
  const [state, setState] = useState<WizardState>(DEFAULT_STATE);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [savedAvatarId, setSavedAvatarId] = useState<string | null>(null);

  const patchFace    = useCallback((p: Partial<FaceConfig>)            => setState((s) => ({ ...s, faceConfig:    { ...s.faceConfig,    ...p } })), []);
  const patchVoice   = useCallback((p: Partial<VoiceSettingsValue>)    => setState((s) => ({ ...s, voiceSettings: { ...s.voiceSettings, ...p } })), []);
  const patchDetails = useCallback((p: Partial<AvatarDetailsValue>)    => setState((s) => ({ ...s, details:       { ...s.details,       ...p } })), []);

  async function handleSave() {
    setSaveStatus("saving");
    setErrorMsg("");
    try {
      const fc = state.faceConfig;
      const avatar = await createAvatar("local", {
        name:        state.details.name.trim() || t.nameFallback,
        personality: state.details.personality,
        gender:      state.details.gender,
        notesUser:   [
          state.details.notes,
          state.details.remindsOf ? `Reminds me of: ${state.details.remindsOf}` : "",
        ].filter(Boolean).join("\n") || null,
        visualConfig: {
          // Map FaceConfig → existing AvatarVisualConfig schema
          shape:          fc.faceShape === "round" ? "circle" : fc.faceShape === "square" ? "square" : "organic",
          primaryColor:   fc.skinTone,
          secondaryColor: fc.hairColor,
          iconKey:        fc.eyeExpression === "angry" ? "storm" : fc.eyeExpression === "cold" ? "eye" : "wave",
          size:           "medium",
          animationStyle: "breathe",
          // Store full face config as extended data
          ...(fc as unknown as Record<string, unknown>),
        },
        voiceConfig: state.voiceSettings.voiceConfig,
      });
      setSavedAvatarId(avatar.id);
      setSaveStatus("saved");
    } catch (err) {
      const msg = err instanceof Error && err.message.includes("5")
        ? t.errorMax
        : t.errorGeneric;
      setErrorMsg(msg);
      setSaveStatus("error");
    }
  }

  const displayName = state.details.name.trim() || t.nameFallback;
  const echoHref = `/${locale}/echo`;
  const sessionHref = `/${locale}/echo/session`;

  // ── Done ────────────────────────────────────────────────────────────────────

  if (saveStatus === "saved") {
    return (
      <div style={{ maxWidth: "480px", margin: "0 auto", textAlign: "center", paddingTop: "20px" }}>
        <AvatarPreview faceConfig={state.faceConfig} size="lg" />
        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1A1A2E",
            margin: "20px 0 10px 0",
          }}
        >
          {displayName}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#0B7B6F",
            fontWeight: "bold",
            lineHeight: 1.6,
            margin: "0 0 28px 0",
          }}
        >
          {t.empowerment}
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href={sessionHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 28px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              minHeight: "52px",
            }}
          >
            {locale === "de" ? "Sitzung starten" : "Start a session"}
          </Link>
          <Link
            href={echoHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "13px 24px",
              backgroundColor: "#F3F1ED",
              color: "#4A4A68",
              border: "1px solid #E0DDD7",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "15px",
              minHeight: "52px",
            }}
          >
            {echoHref.includes("de") ? "Zur\u00fcck zu ECHO" : "Back to ECHO"}
          </Link>
        </div>
      </div>
    );
  }

  // ── Wizard steps ────────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* Back to avatars list */}
      <Link
        href={`/${locale}/echo/avatar`}
        style={{
          color: "#0B7B6F",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "20px",
        }}
      >
        {t.backToAvatars}
      </Link>

      <StepBar current={step} steps={t.steps} />

      {/* ── Step 0: Intro ── */}
      {step === 0 && (
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "block", fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#6B3FA0", marginBottom: "10px" }}>
            ECHO
          </span>
          <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "30px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 16px 0" }}>
            {t.introTitle}
          </h1>
          <p style={{ fontSize: "17px", color: "#4A4A68", lineHeight: 1.8, margin: "0 0 16px 0", maxWidth: "440px", marginLeft: "auto", marginRight: "auto" }}>
            {t.introBody}
          </p>
          <p style={{ fontSize: "15px", color: "#7A7A96", lineHeight: 1.7, margin: "0 0 36px 0" }}>
            {t.introDetail}
          </p>
          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              padding: "14px 40px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "52px",
            }}
          >
            {t.btnBegin}
          </button>
        </div>
      )}

      {/* ── Step 1: Face ── */}
      {step === 1 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
            {t.faceTitle}
          </h2>
          <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>{t.faceHint}</p>
          <FaceBuilder value={state.faceConfig} onChange={patchFace} locale={locale} />
        </div>
      )}

      {/* ── Step 2: Voice ── */}
      {step === 2 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
            {t.voiceTitle}
          </h2>
          <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>{t.voiceHint}</p>
          <VoiceSettings value={state.voiceSettings} onChange={patchVoice} locale={locale} />
        </div>
      )}

      {/* ── Step 3: Details ── */}
      {step === 3 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
            {t.detailsTitle}
          </h2>
          <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>{t.detailsHint}</p>
          <AvatarDetails value={state.details} onChange={patchDetails} locale={locale} />
        </div>
      )}

      {/* ── Step 4: Preview & confirm ── */}
      {step === 4 && (
        <div>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "24px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
            {t.previewTitle}
          </h2>
          <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>{t.previewHint}</p>

          {/* Large preview */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
            <div style={{ textAlign: "center" }}>
              <AvatarPreview faceConfig={state.faceConfig} size="lg" />
              <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "20px", marginTop: "12px" }}>
                {displayName}
              </div>
              {state.details.personality && (
                <div style={{ color: "#6B3FA0", fontSize: "14px", marginTop: "4px" }}>
                  {locale === "de"
                    ? { critical:"Kritisch", protective:"Sch\u00fctzend", fearful:"\u00c4ngstlich", nurturing:"F\u00fcrsorglich", commanding:"Befehlend", neutral:"Neutral" }[state.details.personality]
                    : { critical:"Critical", protective:"Protective", fearful:"Fearful", nurturing:"Nurturing", commanding:"Commanding", neutral:"Neutral" }[state.details.personality]
                  }
                </div>
              )}
            </div>
          </div>

          {/* Summary card */}
          <div
            style={{
              backgroundColor: "#F9F8F6",
              border: "2px solid #EEECE8",
              borderRadius: "12px",
              padding: "18px 20px",
              marginBottom: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px 20px",
              fontSize: "14px",
              color: "#4A4A68",
            }}
          >
            {[
              [locale === "de" ? "Gesichtsform" : "Face shape",    state.faceConfig.faceShape],
              [locale === "de" ? "Augen"        : "Eyes",          `${state.faceConfig.eyeShape} · ${state.faceConfig.eyeExpression}`],
              [locale === "de" ? "Frisur"       : "Hair",          state.faceConfig.hairStyle],
              [locale === "de" ? "Stimm-Ton"    : "Voice tone",    state.voiceSettings.tone],
              [locale === "de" ? "Tonh\u00f6he" : "Pitch",         `${state.voiceSettings.voiceConfig.pitch}×`],
              [locale === "de" ? "Nur-Text"     : "Text-only",     state.voiceSettings.voiceConfig.useTextOnly ? (locale === "de" ? "Ja" : "Yes") : (locale === "de" ? "Nein" : "No")],
            ].map(([k, v]) => (
              <div key={k as string}>
                <div style={{ color: "#9A9AB0", fontSize: "12px", marginBottom: "2px" }}>{k}</div>
                <div style={{ fontWeight: 500, color: "#1A1A2E", textTransform: "capitalize" }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Empowerment */}
          <p style={{ fontSize: "17px", color: "#0B7B6F", fontWeight: "bold", textAlign: "center", margin: "0 0 24px 0", lineHeight: 1.6 }}>
            {t.empowerment}
          </p>

          {/* Error */}
          {saveStatus === "error" && (
            <div style={{ backgroundColor: "#FDEAEA", border: "2px solid #C03030", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px", color: "#8B1A1A", fontSize: "15px" }}>
              {errorMsg}
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saveStatus === "saving"}
            style={{
              width: "100%",
              padding: "15px 28px",
              backgroundColor: saveStatus === "saving" ? "#4A4A68" : "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: saveStatus === "saving" ? "default" : "pointer",
              minHeight: "56px",
            }}
          >
            {saveStatus === "saving" ? t.saving : t.btnSave}
          </button>
        </div>
      )}

      {/* ── Navigation ── */}
      {step > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", gap: "12px" }}>
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            style={{
              padding: "11px 22px",
              backgroundColor: "#F3F1ED",
              color: "#4A4A68",
              border: "1px solid #E0DDD7",
              borderRadius: "10px",
              fontSize: "15px",
              cursor: "pointer",
              minHeight: "48px",
              fontFamily: "inherit",
            }}
          >
            {t.btnPrev}
          </button>

          {step < totalSteps - 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
              style={{
                padding: "11px 28px",
                backgroundColor: "#6B3FA0",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                minHeight: "48px",
                fontFamily: "inherit",
              }}
            >
              {t.btnNext}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
