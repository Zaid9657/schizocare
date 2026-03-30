import type { AvatarPersonality, GroundingTechniqueType, SessionType } from "@/types/echo";

// Session flow order
export const SESSION_TYPE_ORDER: SessionType[] = [
  "introduction",
  "exploration",
  "negotiation",
  "integration",
];

// Personality display config
export const PERSONALITY_CONFIG: Record<
  AvatarPersonality,
  { labelEn: string; labelDe: string; color: string; icon: string }
> = {
  critical:    { labelEn: "Critical",    labelDe: "Kritisch",     color: "#C03030", icon: "⚡" },
  protective:  { labelEn: "Protective",  labelDe: "Schützend",    color: "#0B7B6F", icon: "🛡️" },
  fearful:     { labelEn: "Fearful",     labelDe: "Ängstlich",    color: "#9E6D1B", icon: "😟" },
  nurturing:   { labelEn: "Nurturing",   labelDe: "Fürsorglich",  color: "#2E7D50", icon: "💛" },
  commanding:  { labelEn: "Commanding",  labelDe: "Befehlend",    color: "#6B3FA0", icon: "📢" },
  neutral:     { labelEn: "Neutral",     labelDe: "Neutral",      color: "#4A4A68", icon: "⚪" },
};

// Grounding technique display config
export const GROUNDING_CONFIG: Record<
  GroundingTechniqueType,
  { labelEn: string; labelDe: string; icon: string; durationSeconds: number }
> = {
  five_senses:   { labelEn: "5-4-3-2-1 Grounding",        labelDe: "5-4-3-2-1 Erdung",          icon: "🌱", durationSeconds: 180 },
  box_breathing: { labelEn: "Box Breathing",               labelDe: "Box-Atmung",                 icon: "🫁", durationSeconds: 240 },
  body_scan:     { labelEn: "Body Scan",                   labelDe: "Körper-Scan",                icon: "🧘", durationSeconds: 300 },
  safe_place:    { labelEn: "Safe Place Visualisation",    labelDe: "Sicherer-Ort-Visualisierung",icon: "🏡", durationSeconds: 300 },
  cold_water:    { labelEn: "Cold Water Reset",            labelDe: "Kaltwasser-Reset",           icon: "💧", durationSeconds: 60  },
};

// Distress threshold above which grounding is auto-suggested
export const DISTRESS_GROUNDING_THRESHOLD = 7;

// Maximum exchanges per session before a break is suggested
export const MAX_EXCHANGES_BEFORE_BREAK = 8;

// Mood score labels
export const MOOD_LABELS: Record<number, { en: string; de: string }> = {
  1:  { en: "Very distressed",  de: "Sehr belastet" },
  2:  { en: "Distressed",       de: "Belastet" },
  3:  { en: "Quite anxious",    de: "Recht ängstlich" },
  4:  { en: "A bit anxious",    de: "Etwas ängstlich" },
  5:  { en: "Neutral",          de: "Neutral" },
  6:  { en: "Mostly okay",      de: "Meistens okay" },
  7:  { en: "Fairly calm",      de: "Ziemlich ruhig" },
  8:  { en: "Calm",             de: "Ruhig" },
  9:  { en: "Good",             de: "Gut" },
  10: { en: "Very good",        de: "Sehr gut" },
};
