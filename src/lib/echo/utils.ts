import type { Avatar, Session, UserProgress, ECHOPhaseProgress } from "@/types/echo";
import { SESSION_TYPE_ORDER } from "./constants";

/** Generate a random ID (client-safe, no crypto dependency) */
export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Resolve localised text from a content item */
export function resolveText(
  item: { textEn: string; textDe: string },
  locale: string
): string {
  return locale === "de" ? item.textDe : item.textEn;
}

/** Check whether a session is still within a safe exchange count */
export function isSessionHealthy(session: Session, maxExchanges: number): boolean {
  return session.status === "active" && session.exchangeCount < maxExchanges;
}

/** Derive the next session type for a visitor based on progress */
export function nextSessionType(progress: UserProgress): ECHOPhaseProgress {
  return progress.phaseProgress;
}

/** Format duration in seconds to "X min Y sec" */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

/** Return a safe display name for an avatar (truncated if too long) */
export function avatarDisplayName(avatar: Avatar, maxLength = 20): string {
  return avatar.name.length > maxLength
    ? avatar.name.slice(0, maxLength - 1) + "\u2026"
    : avatar.name;
}

/** Calculate mood delta (positive = improvement) */
export function moodDelta(session: Session): number | null {
  if (session.moodBefore === null || session.moodAfter === null) return null;
  return session.moodAfter.score - session.moodBefore.score;
}

/** Return the human-readable phase label */
export function sessionTypeLabel(
  type: Session["sessionType"],
  locale: string
): string {
  const labels: Record<Session["sessionType"], { en: string; de: string }> = {
    introduction: { en: "Introduction", de: "Einführung" },
    exploration:  { en: "Exploration",  de: "Erkundung" },
    negotiation:  { en: "Negotiation",  de: "Verhandlung" },
    integration:  { en: "Integration",  de: "Integration" },
  };
  return locale === "de" ? labels[type].de : labels[type].en;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Determine overall progress percentage (0–100) based on session type order */
export function sessionTypeProgressPercent(type: Session["sessionType"]): number {
  const index = SESSION_TYPE_ORDER.indexOf(type);
  return Math.round(((index + 1) / SESSION_TYPE_ORDER.length) * 100);
}
