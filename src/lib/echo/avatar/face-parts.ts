// ─────────────────────────────────────────────────────────────────────────────
// ECHO Avatar Face Parts — SVG path data
// All paths are normalised to a 200×200 viewBox.
// ─────────────────────────────────────────────────────────────────────────────

// ── Face shapes ───────────────────────────────────────────────────────────────

export type FaceShape = "oval" | "round" | "square" | "heart" | "oblong";

export const FACE_PATHS: Record<FaceShape, string> = {
  oval:   "M100,18 C140,18 172,52 172,100 C172,148 140,182 100,182 C60,182 28,148 28,100 C28,52 60,18 100,18 Z",
  round:  "M100,22 C142,22 178,58 178,100 C178,142 142,178 100,178 C58,178 22,142 22,100 C22,58 58,22 100,22 Z",
  square: "M34,26 C34,26 166,26 166,26 C170,26 174,30 174,34 C174,34 174,166 174,166 C174,170 170,174 166,174 C166,174 34,174 34,174 C30,174 26,170 26,166 C26,166 26,34 26,34 C26,30 30,26 34,26 Z",
  heart:  "M100,162 C100,162 30,110 30,72 C30,50 48,34 68,34 C82,34 94,42 100,54 C106,42 118,34 132,34 C152,34 170,50 170,72 C170,110 100,162 100,162 Z",
  oblong: "M100,10 C132,10 158,42 158,100 C158,158 132,190 100,190 C68,190 42,158 42,100 C42,42 68,10 100,10 Z",
};

// ── Skin tones ─────────────────────────────────────────────────────────────────

export const SKIN_TONES = [
  "#FDDBB4", "#F5C18A", "#E8A86A", "#C8814A",
  "#A0622E", "#7A3E14", "#4A2008", "#D8C0A8",
] as const;
export type SkinTone = typeof SKIN_TONES[number];

// ── Eye shapes + expressions ──────────────────────────────────────────────────

export type EyeShape = "round" | "almond" | "narrow" | "wide";
export type EyeExpression = "neutral" | "angry" | "cold";

// Left eye paths (right eye is mirrored via transform)
export const EYE_PATHS: Record<EyeShape, string> = {
  round:  "M62,88 C62,81 68,76 76,76 C84,76 90,81 90,88 C90,95 84,100 76,100 C68,100 62,95 62,88 Z",
  almond: "M60,90 C64,82 74,78 80,82 C86,86 88,94 84,100 C78,96 66,96 60,90 Z",
  narrow: "M62,88 C64,85 72,83 80,85 C88,87 90,91 88,94 C82,92 66,92 62,88 Z",
  wide:   "M58,88 C58,79 66,74 78,74 C90,74 96,79 96,88 C96,97 90,102 78,102 C66,102 58,97 58,88 Z",
};

export const BROW_PATHS: Record<EyeExpression, { left: string; right: string }> = {
  neutral: {
    left:  "M60,72 Q76,66 92,70",
    right: "M108,70 Q124,66 140,72",
  },
  angry: {
    left:  "M60,68 Q76,74 92,70",
    right: "M108,70 Q124,74 140,68",
  },
  cold: {
    left:  "M60,70 Q76,68 92,70",
    right: "M108,70 Q124,68 140,70",
  },
};

// Pupil (centred in eye)
export const PUPIL_PATH = "M74,86 C74,82 78,80 80,80 C82,80 84,82 84,86 C84,90 82,92 80,92 C78,92 74,90 74,86 Z";
export const PUPIL_HIGHLIGHT = "M81,83 C82,82 83,82 83,83 C83,84 82,84 81,83 Z";

// ── Mouth shapes + expressions ────────────────────────────────────────────────

export type MouthExpression = "neutral" | "frown" | "sneer" | "thin";

export const MOUTH_PATHS: Record<MouthExpression, string> = {
  neutral: "M76,128 Q100,136 124,128",
  frown:   "M76,134 Q100,124 124,134",
  sneer:   "M76,130 Q90,126 100,130 Q114,134 124,128",
  thin:    "M76,130 Q100,130 124,130",
};

// ── Hair styles ───────────────────────────────────────────────────────────────

export type HairStyle = "none" | "short" | "medium" | "long";

export const HAIR_COLORS = [
  "#1A0A00", "#3D1C00", "#6B3310", "#A0622E",
  "#C89B6E", "#D4C090", "#888888", "#EEEEEE",
] as const;
export type HairColor = typeof HAIR_COLORS[number];

export const HAIR_PATHS: Record<HairStyle, string> = {
  none:   "",
  short:  "M30,80 C30,34 170,34 170,80 C164,46 36,46 30,80 Z",
  medium: "M26,90 C26,24 174,24 174,90 C174,120 168,142 160,158 C152,140 146,110 140,96 C134,110 100,120 60,96 C54,110 48,140 40,158 C32,142 26,120 26,90 Z",
  long:   "M24,96 C24,22 176,22 176,96 C176,140 170,170 162,190 C154,165 148,130 140,108 C130,130 100,148 60,108 C52,130 46,165 38,190 C30,170 24,140 24,96 Z",
};

// ── Age appearance ────────────────────────────────────────────────────────────

export type AgeAppearance = "young" | "middle" | "older";

// Wrinkle/line paths for middle/older
export const AGE_PATHS: Record<AgeAppearance, string[]> = {
  young:  [],
  middle: [
    "M58,108 Q56,116 58,120",   // nasolabial left
    "M142,108 Q144,116 142,120", // nasolabial right
  ],
  older: [
    "M56,106 Q52,116 56,122",
    "M144,106 Q148,116 144,122",
    "M68,76 Q64,72 60,74",      // crow's feet left
    "M132,76 Q136,72 140,74",   // crow's feet right
  ],
};

// ── Full face config ──────────────────────────────────────────────────────────

export interface FaceConfig {
  faceShape:     FaceShape;
  skinTone:      SkinTone;
  eyeShape:      EyeShape;
  eyeExpression: EyeExpression;
  eyeColor:      string;
  mouthExpression: MouthExpression;
  hairStyle:     HairStyle;
  hairColor:     HairColor;
  ageAppearance: AgeAppearance;
}

export const DEFAULT_FACE_CONFIG: FaceConfig = {
  faceShape:       "oval",
  skinTone:        "#FDDBB4",
  eyeShape:        "round",
  eyeExpression:   "neutral",
  eyeColor:        "#3D2008",
  mouthExpression: "neutral",
  hairStyle:       "short",
  hairColor:       "#1A0A00",
  ageAppearance:   "middle",
};
