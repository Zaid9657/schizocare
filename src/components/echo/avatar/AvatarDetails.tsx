"use client";

import type { AvatarPersonality, AvatarGender } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";

export interface AvatarDetailsValue {
  name: string;
  personality: AvatarPersonality;
  gender: AvatarGender;
  notes: string;
  remindsOf: string;
}

const EN = {
  nameLbl:       "Name this voice",
  namePH:        "e.g. The Critic, The Shadow\u2026",
  nameHint:      "You can change this later.",
  personality:   "What kind of voice is it?",
  genderLbl:     "Pronoun",
  genderNeutral: "They / Them",
  genderMale:    "He / Him",
  genderFemale:  "She / Her",
  remindsLbl:    "Who does this remind you of? \u00b7 optional",
  remindsPH:     "e.g. a parent, a teacher, an inner critic\u2026",
  remindsHint:   "This is private. It can help the therapy feel more personal.",
  notesLbl:      "Private notes \u00b7 optional",
  notesPH:       "What do you already know about this voice?",
};

const DE = {
  nameLbl:       "Gib dieser Stimme einen Namen",
  namePH:        "z.\u00a0B. Der Kritiker, Der Schatten\u2026",
  nameHint:      "Du kannst das sp\u00e4ter \u00e4ndern.",
  personality:   "Was f\u00fcr eine Stimme ist das?",
  genderLbl:     "Pronomen",
  genderNeutral: "Sie / Ihnen (neutral)",
  genderMale:    "Er / Ihm",
  genderFemale:  "Sie / Ihr",
  remindsLbl:    "Woran erinnert dich das? \u00b7 optional",
  remindsPH:     "z.\u00a0B. ein Elternteil, ein Lehrer, ein innerer Kritiker\u2026",
  remindsHint:   "Das bleibt privat. Es kann helfen, die Therapie pers\u00f6nlicher zu machen.",
  notesLbl:      "Pers\u00f6nliche Notizen \u00b7 optional",
  notesPH:       "Was wei\u00dft du bereits \u00fcber diese Stimme?",
};

interface AvatarDetailsProps {
  value: AvatarDetailsValue;
  onChange: (patch: Partial<AvatarDetailsValue>) => void;
  locale: string;
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  fontSize: "16px",
  border: "2px solid #E0DDD7",
  borderRadius: "10px",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  backgroundColor: "#FFFFFF",
  color: "#1A1A2E",
};

export default function AvatarDetails({ value, onChange, locale }: AvatarDetailsProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div>
      {/* Name */}
      <div style={{ marginBottom: "22px" }}>
        <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "7px" }}>
          {t.nameLbl}
        </label>
        <input
          type="text"
          value={value.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder={t.namePH}
          maxLength={40}
          autoFocus
          style={INPUT_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
        />
        <p style={{ fontSize: "13px", color: "#9A9AB0", margin: "5px 0 0 0" }}>{t.nameHint}</p>
      </div>

      {/* Personality */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "10px" }}>
          {t.personality}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }} role="group" aria-label={t.personality}>
          {(Object.entries(PERSONALITY_CONFIG) as [AvatarPersonality, (typeof PERSONALITY_CONFIG)[AvatarPersonality]][]).map(([key, conf]) => {
            const sel = value.personality === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => onChange({ personality: key })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "11px 14px",
                  minHeight: "52px",
                  borderRadius: "10px",
                  border: sel ? `2px solid ${conf.color}` : "2px solid #E0DDD7",
                  backgroundColor: sel ? `${conf.color}0F` : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <span style={{ fontSize: "20px", flexShrink: 0 }}>{conf.icon}</span>
                <span style={{ fontWeight: sel ? "bold" : "normal", color: sel ? conf.color : "#1A1A2E", fontSize: "15px" }}>
                  {locale === "de" ? conf.labelDe : conf.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender */}
      <div style={{ marginBottom: "22px" }}>
        <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "10px" }}>{t.genderLbl}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label={t.genderLbl}>
          {(["neutral","male","female"] as AvatarGender[]).map((g) => {
            const labels: Record<AvatarGender, string> = { neutral: t.genderNeutral, male: t.genderMale, female: t.genderFemale };
            const sel = value.gender === g;
            return (
              <button
                key={g}
                type="button"
                role="radio"
                aria-checked={sel}
                onClick={() => onChange({ gender: g })}
                style={{
                  minHeight: "42px",
                  padding: "0 16px",
                  borderRadius: "8px",
                  border: sel ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                  backgroundColor: sel ? "#F0EBF8" : "#FFFFFF",
                  color: sel ? "#4A2A7A" : "#4A4A68",
                  fontWeight: sel ? "bold" : "normal",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {labels[g]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reminds of */}
      <div style={{ marginBottom: "22px" }}>
        <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "7px" }}>
          {t.remindsLbl}
        </label>
        <input
          type="text"
          value={value.remindsOf}
          onChange={(e) => onChange({ remindsOf: e.target.value })}
          placeholder={t.remindsPH}
          maxLength={120}
          style={INPUT_STYLE}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
        />
        <p style={{ fontSize: "13px", color: "#9A9AB0", margin: "5px 0 0 0" }}>{t.remindsHint}</p>
      </div>

      {/* Notes */}
      <div style={{ marginBottom: "8px" }}>
        <label style={{ display: "block", fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", marginBottom: "7px" }}>
          {t.notesLbl}
        </label>
        <textarea
          value={value.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder={t.notesPH}
          rows={3}
          maxLength={500}
          style={{ ...INPUT_STYLE, resize: "vertical" }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#6B3FA0"; }}
          onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DDD7"; }}
        />
      </div>
    </div>
  );
}
