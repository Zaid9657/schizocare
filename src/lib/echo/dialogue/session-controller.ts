// ─────────────────────────────────────────────────────────────────────────────
// ECHO Session Controller
// Manages session lifecycle rules: minimum exchanges, positive ending
// enforcement, break thresholds, and session persistence.
// ─────────────────────────────────────────────────────────────────────────────

import type { Session, MoodRating } from "@/types/echo";
import type { EngineContext } from "./context-manager";
import type { WinStatement } from "@/lib/echo/content/seed-data";
import { generateId } from "@/lib/echo/utils";
import { MOOD_LABELS } from "@/lib/echo/constants";

// ── Constants ─────────────────────────────────────────────────────────────────

/** Minimum exchanges before the session can be ended by the user. */
export const MIN_EXCHANGES_TO_END = 3;

/** After this many exchanges, suggest a break (not a hard stop). */
export const BREAK_SUGGESTION_THRESHOLD = 8;

/** If distress signals occur this many times in one session, always route to grounding. */
export const MAX_DISTRESS_SIGNALS = 3;

// ── Predicates ────────────────────────────────────────────────────────────────

/** True once the user has completed the minimum exchanges required. */
export function canEndSession(ctx: EngineContext): boolean {
  return ctx.exchangeCount >= MIN_EXCHANGES_TO_END;
}

/** True when we should proactively suggest a break (not enforce one). */
export function shouldSuggestBreak(ctx: EngineContext): boolean {
  return ctx.exchangeCount > 0 && ctx.exchangeCount % BREAK_SUGGESTION_THRESHOLD === 0;
}

/** True when repeated distress signals warrant automatic grounding routing. */
export function shouldAutoGround(ctx: EngineContext): boolean {
  return ctx.distressSignalCount >= MAX_DISTRESS_SIGNALS;
}

// ── Session summary ───────────────────────────────────────────────────────────

export interface SessionSummary {
  sessionId:      string;
  durationSeconds: number;
  exchangeCount:  number;
  moodBefore:     number;
  moodAfter:      number;
  moodImprovement: number; // moodAfter - moodBefore (positive = better)
  winStatement:   WinStatement;
  locale:         string;
}

// ── Session builder ───────────────────────────────────────────────────────────

/**
 * Build a complete Session record ready to persist.
 * Called when the user confirms the session end (after win statement).
 */
export function buildSession(opts: {
  ctx:        EngineContext;
  moodBefore: number;
  moodAfter:  number;
  winStatement: WinStatement;
}): Session {
  const { ctx, moodBefore, moodAfter } = opts;
  const locale = ctx.locale as "en" | "de";
  const now = new Date().toISOString();
  const durationSeconds = Math.round(
    (Date.now() - new Date(ctx.startedAt).getTime()) / 1000
  );

  const moodLabel = (score: number): string =>
    MOOD_LABELS[score]?.[locale === "de" ? "de" : "en"] ?? "";

  const moodBeforeRating: MoodRating = {
    score:     moodBefore,
    label:     moodLabel(moodBefore),
    timestamp: ctx.startedAt,
  };

  const moodAfterRating: MoodRating = {
    score:     moodAfter,
    label:     moodLabel(moodAfter),
    timestamp: now,
  };

  return {
    id:              ctx.sessionId,
    avatarId:        ctx.avatarId,
    visitorId:       "local",
    sessionType:     "introduction",
    phase:           "closing",
    status:          "completed",
    locale,
    moodBefore:      moodBeforeRating,
    moodAfter:       moodAfterRating,
    startedAt:       ctx.startedAt,
    completedAt:     now,
    durationSeconds,
    exchangeCount:   ctx.exchangeCount,
    therapistNotes:  null,
    safetyFlagRaised: ctx.distressSignalCount >= MAX_DISTRESS_SIGNALS,
  };
}

/**
 * Build a SessionSummary from a completed Session + win statement.
 */
export function buildSummary(
  session: Session,
  winStatement: WinStatement
): SessionSummary {
  return {
    sessionId:       session.id,
    durationSeconds: session.durationSeconds ?? 0,
    exchangeCount:   session.exchangeCount,
    moodBefore:      session.moodBefore?.score ?? 5,
    moodAfter:       session.moodAfter?.score ?? 5,
    moodImprovement: (session.moodAfter?.score ?? 5) - (session.moodBefore?.score ?? 5),
    winStatement,
    locale:          session.locale,
  };
}

// ── Storage helpers ───────────────────────────────────────────────────────────

const SESSIONS_KEY = "echo_sessions";

export function persistSession(session: Session): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    const existing: Session[] = raw ? (JSON.parse(raw) as Session[]) : [];
    localStorage.setItem(SESSIONS_KEY, JSON.stringify([...existing, session]));
  } catch { /* quota — silent fail */ }
}

export function loadPersistedSessions(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch { return []; }
}

export function completedSessionCount(): number {
  return loadPersistedSessions().filter((s) => s.status === "completed").length;
}
