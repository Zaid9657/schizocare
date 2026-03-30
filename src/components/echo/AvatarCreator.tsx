"use client";

import { useState, useEffect } from "react";
import type { Avatar, AvatarPersonality, AvatarGender } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";
import { generateId } from "@/lib/echo/utils";

// ── Visual presets ────────────────────────────────────────────────────────────

const SHAPE_OPTIONS = [
  { value: "circle",  labelEn: "Round",    labelDe: "Rund",    preview: "●" },
  { value: "square",  labelEn: "Square",   labelDe: "Eckig",   preview: "■" },
  { value: "organic", labelEn: "Organic",  labelDe: "Organisch", preview: "❋" },
] as const;

const COLOR_PRESETS = [
  "#6B3FA0", "#0B7B6F", "#C03030", "#9E6D1B",
  "#2E7D50", "#1B5E91", "#7A4A2A", "#4A4A68",
];

const ICON_OPTIONS = [
  { key: "wave",    glyph: "🌊" },
  { key: "storm",   glyph: "⚡" },
  { key: "shield",  glyph: "🛡️" },
  { key: "eye",     glyph: "👁️" },
  { key: "flame",   glyph: "🔥" },
  { key: "cloud",   glyph: "☁️" },
  { key: "star",    glyph: "✦" },
  { key: "spiral",  glyph: "🌀" },
];

// ── Locale content ────────────────────────────────────────────────────────────

const EN = {
  title: "Create a Voice",
  subtitle: "Give this voice a form so you can work with it in dialogue.",
  stepName: "Name this voice",
  stepPersonality: "What kind of voice is it?",
  stepVisual: "Choose how it looks",
  namePlaceholder: "e.g. The Critic, The Protector…",
  nameHint: "Use whatever name feels right — you can change it later.",
  genderLabel: "Pronouns",
  genderNeutral: "They / Them",
  genderMale: "He / Him",
  genderFemale: "She / Her",
  shapeLabel: "Shape",
  colorLabel: "Colour",
  iconLabel: "Symbol",
  notesLabel: "Private notes (optional)",
  notesPlaceholder: "What do you know about this voice so far?",
  btnCreate: "Create Voice",
  btnBack: "Back",
  btnNext: "Next",
  saving: "Saving…",
  saved: "Voice created!",
  maxReached: "You can have up to 5 voices at a time.",
  existingTitle: "Your Voices",
  addAnother: "+ Add another voice",
  noVoices: "No voices yet.",
  editHint: "Tap a voice to edit or start a session.",
  deleteBtn: "Remove",
  confirmDelete: "Remove this voice? Sessions linked to it will remain.",
};

const DE = {
  title: "Eine Stimme erstellen",
  subtitle: "Gib dieser Stimme eine Form, damit du in einem Dialog mit ihr arbeiten kannst.",
  stepName: "Gib dieser Stimme einen Namen",
  stepPersonality: "Was f\u00fcr eine Stimme ist das?",
  stepVisual: "W\u00e4hle ihr Aussehen",
  namePlaceholder: "z.\u00a0B. Der Kritiker, Der Besch\u00fctzer\u2026",
  nameHint: "Benutze den Namen, der sich richtig anf\u00fchlt \u2014 du kannst ihn sp\u00e4ter \u00e4ndern.",
  genderLabel: "Pronomen",
  genderNeutral: "Sie / Ihnen (neutral)",
  genderMale: "Er / Ihm",
  genderFemale: "Sie / Ihr",
  shapeLabel: "Form",
  colorLabel: "Farbe",
  iconLabel: "Symbol",
  notesLabel: "Pers\u00f6nliche Notizen (optional)",
  notesPlaceholder: "Was wei\u00dft du bisher \u00fcber diese Stimme?",
  btnCreate: "Stimme erstellen",
  btnBack: "Zur\u00fcck",
  btnNext: "Weiter",
  saving: "Speichern\u2026",
  saved: "Stimme erstellt!",
  maxReached: "Du kannst bis zu 5 Stimmen gleichzeitig haben.",
  existingTitle: "Deine Stimmen",
  addAnother: "+ Weitere Stimme hinzuf\u00fcgen",
  noVoices: "Noch keine Stimmen.",
  editHint: "Tippe auf eine Stimme, um sie zu bearbeiten oder eine Sitzung zu starten.",
  deleteBtn: "Entfernen",
  confirmDelete: "Diese Stimme entfernen? Verkn\u00fcpfte Sitzungen bleiben erhalten.",
};

// ── Storage helpers ───────────────────────────────────────────────────────────

const STORAGE_KEY = "echo_avatars";

function loadAvatars(): Avatar[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch {
    return [];
  }
}

function saveAvatars(avatars: Avatar[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(avatars));
}

// ── Avatar visual preview ─────────────────────────────────────────────────────

function AvatarPreview({
  color,
  shape,
  iconKey,
  size = 64,
}: {
  color: string;
  shape: "circle" | "square" | "organic";
  iconKey: string;
  size?: number;
}) {
  const radius = shape === "circle" ? "50%" : shape === "square" ? "12px" : "38% 62% 55% 45% / 42% 48% 52% 58%";
  const icon = ICON_OPTIONS.find((i) => i.key === iconKey)?.glyph ?? "✦";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.4,
        flexShrink: 0,
        transition: "border-radius 0.3s ease",
      }}
      aria-hidden="true"
    >
      {icon}
    </div>
  );
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "28px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: i === current ? "#6B3FA0" : i < current ? "#B89FD0" : "#E0DDD7",
            transition: "all 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface AvatarCreatorProps {
  locale: string;
  onCreated?: (avatar: Avatar) => void;
}

type Step = 0 | 1 | 2; // name → personality → visual

const DEFAULT_VISUAL = {
  shape: "circle" as const,
  primaryColor: "#6B3FA0",
  secondaryColor: "#B89FD0",
  iconKey: "wave",
  size: "medium" as const,
  animationStyle: "breathe" as const,
};

export default function AvatarCreator({ locale, onCreated }: AvatarCreatorProps) {
  const c = locale === "de" ? DE : EN;

  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState<Step>(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState<AvatarPersonality>("neutral");
  const [gender, setGender] = useState<AvatarGender>("neutral");
  const [notes, setNotes] = useState("");
  const [shape, setShape] = useState<"circle" | "square" | "organic">("circle");
  const [color, setColor] = useState("#6B3FA0");
  const [iconKey, setIconKey] = useState("wave");

  useEffect(() => {
    setAvatars(loadAvatars());
  }, []);

  function resetForm() {
    setName("");
    setPersonality("neutral");
    setGender("neutral");
    setNotes("");
    setShape("circle");
    setColor("#6B3FA0");
    setIconKey("wave");
    setStep(0);
    setStatus("idle");
  }

  function handleCreate() {
    if (!name.trim()) return;
    setStatus("saving");

    const avatar: Avatar = {
      id: generateId("avatar"),
      visitorId: "local",
      name: name.trim(),
      personality,
      gender,
      visualConfig: {
        shape,
        primaryColor: color,
        secondaryColor: "#B89FD0",
        iconKey,
        size: "medium",
        animationStyle: "breathe",
      },
      voiceConfig: {
        pitch: 1.0,
        rate: 1.0,
        volume: 1.0,
        useTextOnly: true,
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      lastSeenAt: null,
      notesUser: notes.trim() || null,
    };

    const updated = [...avatars, avatar];
    saveAvatars(updated);
    setAvatars(updated);
    setStatus("saved");
    setTimeout(() => {
      setShowForm(false);
      resetForm();
      onCreated?.(avatar);
    }, 800);
  }

  function handleDelete(id: string) {
    const updated = avatars.filter((a) => a.id !== id);
    saveAvatars(updated);
    setAvatars(updated);
    setConfirmDeleteId(null);
  }

  const canAdd = avatars.length < 5;

  // ── Existing avatars list ──────────────────────────────────────────────────

  if (!showForm) {
    return (
      <div style={{ maxWidth: "600px" }}>
        <h1
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize: "28px",
            fontWeight: "bold",
            color: "#1A1A2E",
            margin: "0 0 6px 0",
          }}
        >
          {c.existingTitle}
        </h1>
        <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>
          {avatars.length > 0 ? c.editHint : c.noVoices}
        </p>

        {/* Avatar cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
          {avatars.map((av) => {
            const pConf = PERSONALITY_CONFIG[av.personality];
            const isDeleting = confirmDeleteId === av.id;
            return (
              <div
                key={av.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  border: `2px solid ${pConf.color}22`,
                  borderRadius: "12px",
                  padding: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <AvatarPreview
                  color={av.visualConfig.primaryColor}
                  shape={av.visualConfig.shape}
                  iconKey={av.visualConfig.iconKey}
                  size={52}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "16px" }}>
                    {av.name}
                  </div>
                  <div style={{ color: pConf.color, fontSize: "13px", marginTop: "2px" }}>
                    {pConf.icon}{" "}
                    {locale === "de" ? pConf.labelDe : pConf.labelEn}
                  </div>
                </div>
                {isDeleting ? (
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => handleDelete(av.id)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "#C03030",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        minHeight: "36px",
                      }}
                    >
                      {c.deleteBtn}
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      style={{
                        padding: "6px 14px",
                        backgroundColor: "#F3F1ED",
                        color: "#4A4A68",
                        border: "1px solid #E0DDD7",
                        borderRadius: "8px",
                        fontSize: "13px",
                        cursor: "pointer",
                        minHeight: "36px",
                      }}
                    >
                      {c.btnBack}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(av.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "transparent",
                      color: "#9A9AB0",
                      border: "1px solid #E0DDD7",
                      borderRadius: "8px",
                      fontSize: "13px",
                      cursor: "pointer",
                      minHeight: "36px",
                    }}
                    aria-label={`Remove ${av.name}`}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Confirm delete hint */}
        {confirmDeleteId && (
          <p style={{ fontSize: "13px", color: "#9E6D1B", marginBottom: "16px" }}>
            {c.confirmDelete}
          </p>
        )}

        {/* Add button */}
        {canAdd ? (
          <button
            onClick={() => setShowForm(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            {c.addAnother}
          </button>
        ) : (
          <p style={{ color: "#9A9AB0", fontSize: "14px" }}>{c.maxReached}</p>
        )}
      </div>
    );
  }

  // ── Creation form ──────────────────────────────────────────────────────────

  return (
    <div style={{ maxWidth: "560px" }}>
      {/* Header */}
      <button
        onClick={() => { setShowForm(false); resetForm(); }}
        style={{
          background: "none",
          border: "none",
          color: "#6B3FA0",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: "pointer",
          padding: "0",
          marginBottom: "20px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        ← {c.btnBack}
      </button>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "26px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 6px 0",
        }}
      >
        {c.title}
      </h1>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 28px 0" }}>
        {c.subtitle}
      </p>

      <StepDots current={step} total={3} />

      {/* ── Step 0: Name & gender ── */}
      {step === 0 && (
        <div>
          <label
            htmlFor="avatar-name"
            style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "8px" }}
          >
            {c.stepName}
          </label>
          <input
            id="avatar-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={c.namePlaceholder}
            maxLength={40}
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: "16px",
              border: "2px solid #E0DDD7",
              borderRadius: "10px",
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
              marginBottom: "6px",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
            autoFocus
          />
          <p style={{ fontSize: "13px", color: "#9A9AB0", margin: "0 0 24px 0" }}>
            {c.nameHint}
          </p>

          {/* Gender */}
          <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "10px" }}>
            {c.genderLabel}
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
            {(["neutral", "male", "female"] as AvatarGender[]).map((g) => {
              const labels: Record<AvatarGender, string> = {
                neutral: c.genderNeutral,
                male: c.genderMale,
                female: c.genderFemale,
              };
              return (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  style={{
                    padding: "8px 16px",
                    minHeight: "40px",
                    borderRadius: "8px",
                    border: gender === g ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                    backgroundColor: gender === g ? "#F0EBF8" : "#FFFFFF",
                    color: gender === g ? "#4A2A7A" : "#4A4A68",
                    fontWeight: gender === g ? "bold" : "normal",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {labels[g]}
                </button>
              );
            })}
          </div>

          <button
            disabled={!name.trim()}
            onClick={() => setStep(1)}
            style={{
              padding: "12px 28px",
              backgroundColor: name.trim() ? "#6B3FA0" : "#C0B8D0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: name.trim() ? "pointer" : "not-allowed",
              minHeight: "48px",
            }}
          >
            {c.btnNext} →
          </button>
        </div>
      )}

      {/* ── Step 1: Personality ── */}
      {step === 1 && (
        <div>
          <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "14px" }}>
            {c.stepPersonality}
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {(Object.entries(PERSONALITY_CONFIG) as [AvatarPersonality, typeof PERSONALITY_CONFIG[AvatarPersonality]][]).map(
              ([key, conf]) => (
                <button
                  key={key}
                  onClick={() => setPersonality(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    minHeight: "56px",
                    borderRadius: "10px",
                    border: personality === key ? `2px solid ${conf.color}` : "2px solid #E0DDD7",
                    backgroundColor: personality === key ? `${conf.color}11` : "#FFFFFF",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "22px", flexShrink: 0 }}>{conf.icon}</span>
                  <span
                    style={{
                      fontWeight: personality === key ? "bold" : "normal",
                      color: personality === key ? conf.color : "#1A1A2E",
                      fontSize: "15px",
                    }}
                  >
                    {locale === "de" ? conf.labelDe : conf.labelEn}
                  </span>
                </button>
              )
            )}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => setStep(0)}
              style={{
                padding: "12px 20px",
                backgroundColor: "#F3F1ED",
                color: "#4A4A68",
                border: "1px solid #E0DDD7",
                borderRadius: "10px",
                fontSize: "15px",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              ← {c.btnBack}
            </button>
            <button
              onClick={() => setStep(2)}
              style={{
                padding: "12px 28px",
                backgroundColor: "#6B3FA0",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              {c.btnNext} →
            </button>
          </div>
        </div>
      )}

      {/* ── Step 2: Visual ── */}
      {step === 2 && (
        <div>
          {/* Live preview */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <AvatarPreview color={color} shape={shape} iconKey={iconKey} size={96} />
              <div
                style={{
                  marginTop: "10px",
                  fontWeight: "bold",
                  color: "#1A1A2E",
                  fontSize: "16px",
                }}
              >
                {name}
              </div>
            </div>
          </div>

          <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "10px" }}>
            {c.shapeLabel}
          </label>
          <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
            {SHAPE_OPTIONS.map((s) => (
              <button
                key={s.value}
                onClick={() => setShape(s.value)}
                style={{
                  flex: 1,
                  padding: "10px",
                  minHeight: "48px",
                  borderRadius: "8px",
                  border: shape === s.value ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                  backgroundColor: shape === s.value ? "#F0EBF8" : "#FFFFFF",
                  color: shape === s.value ? "#4A2A7A" : "#4A4A68",
                  fontWeight: shape === s.value ? "bold" : "normal",
                  fontSize: "22px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
                title={locale === "de" ? s.labelDe : s.labelEn}
              >
                {s.preview}
                <span style={{ fontSize: "11px" }}>{locale === "de" ? s.labelDe : s.labelEn}</span>
              </button>
            ))}
          </div>

          <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "10px" }}>
            {c.colorLabel}
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
            {COLOR_PRESETS.map((c_) => (
              <button
                key={c_}
                onClick={() => setColor(c_)}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: c_,
                  border: color === c_ ? "3px solid #1A1A2E" : "3px solid transparent",
                  cursor: "pointer",
                  boxShadow: color === c_ ? "0 0 0 2px #FFFFFF inset" : "none",
                }}
                aria-label={`Color ${c_}`}
              />
            ))}
          </div>

          <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "10px" }}>
            {c.iconLabel}
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {ICON_OPTIONS.map((ic) => (
              <button
                key={ic.key}
                onClick={() => setIconKey(ic.key)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  border: iconKey === ic.key ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                  backgroundColor: iconKey === ic.key ? "#F0EBF8" : "#FFFFFF",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={ic.key}
              >
                {ic.glyph}
              </button>
            ))}
          </div>

          {/* Notes */}
          <label
            htmlFor="avatar-notes"
            style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", marginBottom: "8px" }}
          >
            {c.notesLabel}
          </label>
          <textarea
            id="avatar-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={c.notesPlaceholder}
            rows={3}
            maxLength={500}
            style={{
              width: "100%",
              padding: "12px 14px",
              fontSize: "15px",
              border: "2px solid #E0DDD7",
              borderRadius: "10px",
              outline: "none",
              fontFamily: "inherit",
              resize: "vertical",
              boxSizing: "border-box",
              marginBottom: "24px",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
          />

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              onClick={() => setStep(1)}
              style={{
                padding: "12px 20px",
                backgroundColor: "#F3F1ED",
                color: "#4A4A68",
                border: "1px solid #E0DDD7",
                borderRadius: "10px",
                fontSize: "15px",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              ← {c.btnBack}
            </button>
            <button
              onClick={handleCreate}
              disabled={status === "saving" || status === "saved"}
              style={{
                padding: "12px 28px",
                backgroundColor: status === "saved" ? "#2E7D50" : "#6B3FA0",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: status === "idle" ? "pointer" : "default",
                minHeight: "48px",
                transition: "background-color 0.2s ease",
              }}
            >
              {status === "saving" ? c.saving : status === "saved" ? c.saved : c.btnCreate}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
