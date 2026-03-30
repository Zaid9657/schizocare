"use client";

import type {
  FaceConfig,
  FaceShape,
  EyeShape,
  EyeExpression,
  MouthExpression,
  HairStyle,
  HairColor,
  SkinTone,
  AgeAppearance,
} from "@/lib/echo/avatar/face-parts";
import {
  SKIN_TONES,
  HAIR_COLORS,
  DEFAULT_FACE_CONFIG,
} from "@/lib/echo/avatar/face-parts";
import AvatarPreview from "./AvatarPreview";

const EN = {
  sectionFace:   "Face shape",
  sectionSkin:   "Skin tone",
  sectionEyes:   "Eyes",
  sectionEyeExp: "Eye expression",
  sectionMouth:  "Mouth",
  sectionHair:   "Hair style",
  sectionHairCol:"Hair colour",
  sectionAge:    "Age appearance",
  livePreview:   "Live preview",
  faceShapes:    { oval:"Oval", round:"Round", square:"Square", heart:"Heart", oblong:"Oblong" },
  eyeShapes:     { round:"Round", almond:"Almond", narrow:"Narrow", wide:"Wide" },
  eyeExpressions:{ neutral:"Neutral", angry:"Stern", cold:"Cold" },
  mouthExpressions:{ neutral:"Neutral", frown:"Frown", sneer:"Sneer", thin:"Thin" },
  hairStyles:    { none:"No hair", short:"Short", medium:"Medium", long:"Long" },
  ages:          { young:"Young", middle:"Middle", older:"Older" },
};

const DE = {
  sectionFace:   "Gesichtsform",
  sectionSkin:   "Hautton",
  sectionEyes:   "Augen",
  sectionEyeExp: "Augenausdruck",
  sectionMouth:  "Mund",
  sectionHair:   "Frisur",
  sectionHairCol:"Haarfarbe",
  sectionAge:    "Erscheinungsalter",
  livePreview:   "Vorschau",
  faceShapes:    { oval:"Oval", round:"Rund", square:"Eckig", heart:"Herzf\u00f6rmig", oblong:"L\u00e4nglich" },
  eyeShapes:     { round:"Rund", almond:"Mandelform", narrow:"Schmal", wide:"Weit" },
  eyeExpressions:{ neutral:"Neutral", angry:"Streng", cold:"K\u00fchl" },
  mouthExpressions:{ neutral:"Neutral", frown:"Grimmig", sneer:"H\u00f6hnisch", thin:"Schmal" },
  hairStyles:    { none:"Ohne Haar", short:"Kurz", medium:"Mittel", long:"Lang" },
  ages:          { young:"Jung", middle:"Mittel", older:"\u00c4lter" },
};

// ── Generic option selector ────────────────────────────────────────────────────

function OptionRow<T extends string>({
  label,
  options,
  value,
  onChange,
  accentColor = "#6B3FA0",
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  accentColor?: string;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "14px", marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }} role="group" aria-label={label}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              style={{
                minHeight: "40px",
                padding: "0 14px",
                borderRadius: "8px",
                border: selected ? `2px solid ${accentColor}` : "2px solid #E0DDD7",
                backgroundColor: selected ? `${accentColor}12` : "#FFFFFF",
                color: selected ? accentColor : "#4A4A68",
                fontWeight: selected ? "bold" : "normal",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.12s ease",
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Swatch selector ────────────────────────────────────────────────────────────

function SwatchRow<T extends string>({
  label,
  swatches,
  value,
  onChange,
}: {
  label: string;
  swatches: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "14px", marginBottom: "8px" }}>
        {label}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }} role="group" aria-label={label}>
        {swatches.map((sw) => {
          const selected = value === sw;
          return (
            <button
              key={sw}
              type="button"
              aria-label={`Colour ${sw}`}
              aria-pressed={selected}
              onClick={() => onChange(sw)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: sw,
                border: selected ? "3px solid #1A1A2E" : "3px solid transparent",
                boxShadow: selected ? "0 0 0 2px #FFFFFF inset" : "none",
                cursor: "pointer",
                padding: 0,
                transition: "border 0.12s ease",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

interface FaceBuilderProps {
  value: FaceConfig;
  onChange: (patch: Partial<FaceConfig>) => void;
  locale: string;
}

export default function FaceBuilder({ value, onChange, locale }: FaceBuilderProps) {
  const t = locale === "de" ? DE : EN;

  const faceShapeOptions: { value: FaceShape; label: string }[] = [
    { value: "oval",   label: t.faceShapes.oval },
    { value: "round",  label: t.faceShapes.round },
    { value: "square", label: t.faceShapes.square },
    { value: "heart",  label: t.faceShapes.heart },
    { value: "oblong", label: t.faceShapes.oblong },
  ];

  const eyeShapeOptions: { value: EyeShape; label: string }[] = [
    { value: "round",  label: t.eyeShapes.round },
    { value: "almond", label: t.eyeShapes.almond },
    { value: "narrow", label: t.eyeShapes.narrow },
    { value: "wide",   label: t.eyeShapes.wide },
  ];

  const eyeExpressionOptions: { value: EyeExpression; label: string }[] = [
    { value: "neutral", label: t.eyeExpressions.neutral },
    { value: "angry",   label: t.eyeExpressions.angry },
    { value: "cold",    label: t.eyeExpressions.cold },
  ];

  const mouthOptions: { value: MouthExpression; label: string }[] = [
    { value: "neutral", label: t.mouthExpressions.neutral },
    { value: "frown",   label: t.mouthExpressions.frown },
    { value: "sneer",   label: t.mouthExpressions.sneer },
    { value: "thin",    label: t.mouthExpressions.thin },
  ];

  const hairStyleOptions: { value: HairStyle; label: string }[] = [
    { value: "none",   label: t.hairStyles.none },
    { value: "short",  label: t.hairStyles.short },
    { value: "medium", label: t.hairStyles.medium },
    { value: "long",   label: t.hairStyles.long },
  ];

  const ageOptions: { value: AgeAppearance; label: string }[] = [
    { value: "young",  label: t.ages.young },
    { value: "middle", label: t.ages.middle },
    { value: "older",  label: t.ages.older },
  ];

  return (
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
          <div style={{ fontSize: "12px", color: "#7A7A96", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {t.livePreview}
          </div>
          <AvatarPreview faceConfig={value} size="lg" label={t.livePreview} />
        </div>
      </div>

      <OptionRow label={t.sectionFace}   options={faceShapeOptions}     value={value.faceShape}       onChange={(v) => onChange({ faceShape: v })}       accentColor="#6B3FA0" />
      <SwatchRow label={t.sectionSkin}   swatches={SKIN_TONES}          value={value.skinTone as SkinTone}         onChange={(v) => onChange({ skinTone: v })} />
      <OptionRow label={t.sectionEyes}   options={eyeShapeOptions}      value={value.eyeShape}        onChange={(v) => onChange({ eyeShape: v })}        accentColor="#4A7FC1" />
      <OptionRow label={t.sectionEyeExp} options={eyeExpressionOptions} value={value.eyeExpression}   onChange={(v) => onChange({ eyeExpression: v })}   accentColor="#C03030" />
      <OptionRow label={t.sectionMouth}  options={mouthOptions}         value={value.mouthExpression} onChange={(v) => onChange({ mouthExpression: v })} accentColor="#9E6D1B" />
      <OptionRow label={t.sectionHair}   options={hairStyleOptions}     value={value.hairStyle}       onChange={(v) => onChange({ hairStyle: v })}       accentColor="#2E7D50" />
      <SwatchRow label={t.sectionHairCol} swatches={HAIR_COLORS}        value={value.hairColor as HairColor}       onChange={(v) => onChange({ hairColor: v })} />
      <OptionRow label={t.sectionAge}    options={ageOptions}           value={value.ageAppearance}   onChange={(v) => onChange({ ageAppearance: v })}   accentColor="#4A4A68" />
    </div>
  );
}
