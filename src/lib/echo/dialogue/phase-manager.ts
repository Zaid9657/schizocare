// ─────────────────────────────────────────────────────────────────────────────
// ECHO Phase Manager
// Determines and advances a user's ReactionPhase (EARLY → MIDDLE → LATE)
// based on completed session count. Phases never regress.
// Persists to localStorage (Supabase-ready swap point).
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactionPhase } from "@/lib/echo/content/seed-data";
import { completedSessionCount } from "./session-controller";

// ── Thresholds ────────────────────────────────────────────────────────────────

/** Sessions completed to advance from EARLY → MIDDLE */
const EARLY_TO_MIDDLE = 3;

/** Sessions completed to advance from MIDDLE → LATE */
const MIDDLE_TO_LATE = 6;

// ── Storage ───────────────────────────────────────────────────────────────────

const PHASE_KEY = "echo_user_phase";

function readStoredPhase(): ReactionPhase | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PHASE_KEY);
    return raw as ReactionPhase | null;
  } catch { return null; }
}

function writePhase(phase: ReactionPhase): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PHASE_KEY, phase);
}

// ── Derivation ────────────────────────────────────────────────────────────────

/**
 * Derive the correct phase from a completed session count.
 * Never moves backwards from a stored phase.
 */
function derivePhase(
  completedSessions: number,
  currentPhase: ReactionPhase
): ReactionPhase {
  // Only advance, never regress
  const order: ReactionPhase[] = ["EARLY", "MIDDLE", "LATE"];
  let derived: ReactionPhase = "EARLY";

  if (completedSessions >= MIDDLE_TO_LATE) {
    derived = "LATE";
  } else if (completedSessions >= EARLY_TO_MIDDLE) {
    derived = "MIDDLE";
  }

  // Take whichever is further along
  return order.indexOf(derived) >= order.indexOf(currentPhase)
    ? derived
    : currentPhase;
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Read the user's current phase from storage (or derive it fresh).
 * Always call this when starting a new session.
 */
export function getUserPhase(_userId: string): ReactionPhase {
  const stored = readStoredPhase() ?? "EARLY";
  const count  = completedSessionCount();
  const phase  = derivePhase(count, stored);

  // Persist if we advanced
  if (phase !== stored) writePhase(phase);

  return phase;
}

/**
 * Check whether completing one more session would advance the phase.
 * Returns the new phase if it would advance, null if no change.
 */
export function checkPhaseAdvancement(_userId: string): ReactionPhase | null {
  const current = getUserPhase(_userId);
  const next    = derivePhase(completedSessionCount() + 1, current);
  return next !== current ? next : null;
}

/**
 * Force-set the phase (e.g. after session save, to ensure fresh reads).
 */
export function refreshPhase(_userId: string): ReactionPhase {
  const current = readStoredPhase() ?? "EARLY";
  const count   = completedSessionCount();
  const phase   = derivePhase(count, current);
  writePhase(phase);
  return phase;
}
