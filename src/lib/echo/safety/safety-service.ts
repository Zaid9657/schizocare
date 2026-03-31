// ─────────────────────────────────────────────────────────────────────────────
// ECHO Safety Service — localStorage-backed MVP
// Supabase-ready: swap localStorage calls for supabase.from("safety_events")
// when auth is wired up.
// ─────────────────────────────────────────────────────────────────────────────

const STORAGE_KEY = "echo_safety_events";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SafetyEventType =
  | "STRESS_BUTTON"
  | "CRISIS_KEYWORD"
  | "MOOD_DROP"
  | "EXTENDED_USE"
  | "GROUNDING_TRIGGERED"
  | "SESSION_ABORTED";

export interface SafetyEvent {
  id:         string;
  userId:     string;
  sessionId?: string;
  eventType:  SafetyEventType;
  metadata?:  Record<string, unknown>;
  createdAt:  string;
}

export interface DistressContext {
  moodBefore:          number;
  moodAfter?:          number;
  exchangeCount:       number;
  distressSignalCount: number;
  sessionDurationSec:  number;
}

// ── Storage helpers ───────────────────────────────────────────────────────────

function readAll(): SafetyEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SafetyEvent[]) : [];
  } catch {
    return [];
  }
}

function writeAll(events: SafetyEvent[]): void {
  // Cap at 500 events to prevent unbounded growth
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-500)));
}

function makeId(): string {
  return `se_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Logs a safety event (fire-and-forget pattern; safe to call without await). */
export async function logSafetyEvent(
  userId: string,
  event: Omit<SafetyEvent, "id" | "userId" | "createdAt">
): Promise<void> {
  const all = readAll();
  const newEvent: SafetyEvent = {
    id:        makeId(),
    userId,
    createdAt: new Date().toISOString(),
    ...event,
  };
  writeAll([...all, newEvent]);
}

/** Returns all safety events, optionally filtered by sessionId. */
export async function getSafetyEvents(
  userId: string,
  sessionId?: string
): Promise<SafetyEvent[]> {
  const all = readAll().filter((e) => e.userId === userId);
  if (sessionId) return all.filter((e) => e.sessionId === sessionId);
  return all;
}

/**
 * Evaluates the distress level from session context.
 * Returns a severity level and whether the system should intervene.
 */
export function checkDistressLevel(ctx: DistressContext): {
  level: "low" | "moderate" | "high";
  shouldIntervene: boolean;
} {
  const {
    moodBefore,
    moodAfter,
    distressSignalCount,
    sessionDurationSec,
  } = ctx;

  const moodDrop = moodAfter !== undefined ? moodBefore - moodAfter : 0;
  const isExtended = sessionDurationSec >= 20 * 60; // 20 minutes

  if (distressSignalCount >= 3 || moodDrop >= 4 || (moodAfter !== undefined && moodAfter <= 2)) {
    return { level: "high", shouldIntervene: true };
  }

  if (distressSignalCount >= 2 || moodDrop >= 2 || isExtended) {
    return { level: "moderate", shouldIntervene: true };
  }

  return { level: "low", shouldIntervene: false };
}
