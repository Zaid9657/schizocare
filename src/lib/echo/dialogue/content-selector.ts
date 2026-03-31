// ─────────────────────────────────────────────────────────────────────────────
// ECHO Content Selector
// Picks hostile statements and avatar reactions from the seed library,
// respecting personality, phase, intensity, and recent-use avoidance.
// ─────────────────────────────────────────────────────────────────────────────

import type { AvatarPersonality } from "@/types/echo";
import {
  HOSTILE_STATEMENTS,
  AVATAR_REACTIONS,
  WIN_STATEMENTS,
  type HostileStatement,
  type AvatarReaction,
  type WinStatement,
  type ReactionPhase,
  type UserResponseCategory,
  type Intensity,
} from "@/lib/echo/content/seed-data";
import { getReactionTypes } from "@/lib/echo/content/response-matrix";

// ── Intensity progression ─────────────────────────────────────────────────────

function intensityCap(exchangeCount: number): Intensity {
  if (exchangeCount < 2) return "MILD";
  if (exchangeCount < 5) return "MODERATE";
  return "INTENSE";
}

const INTENSITY_ORDER: Record<Intensity, number> = {
  MILD: 1,
  MODERATE: 2,
  INTENSE: 3,
};

function withinCap(intensity: Intensity, cap: Intensity): boolean {
  return INTENSITY_ORDER[intensity] <= INTENSITY_ORDER[cap];
}

// ── Avoidance-aware random pick ───────────────────────────────────────────────

function pick<T>(items: T[], exclude: string[], getId: (item: T) => string): T | null {
  const available = items.filter((i) => !exclude.includes(getId(i)));
  const pool = available.length > 0 ? available : items;
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Select the next hostile statement for the avatar to deliver.
 * Filters by personality match and intensity cap (mild → intense as session progresses).
 * Avoids the last 3 used statement IDs.
 */
export function selectHostileStatement(opts: {
  personality: AvatarPersonality;
  exchangeCount: number;
  recentIds: string[];
}): HostileStatement | null {
  const cap = intensityCap(opts.exchangeCount);

  const pool = HOSTILE_STATEMENTS.filter(
    (s) =>
      s.personalityTags.includes(opts.personality) &&
      withinCap(s.intensity, cap)
  );

  if (pool.length === 0) {
    // Relax intensity cap as fallback
    const fallback = HOSTILE_STATEMENTS.filter((s) =>
      s.personalityTags.includes(opts.personality)
    );
    return pick(fallback, opts.recentIds, (s) => s.id);
  }

  return pick(pool, opts.recentIds, (s) => s.id);
}

/**
 * Select an avatar reaction following the user's response.
 * Picks from reaction types prescribed by the response matrix for this phase/response pair.
 * Avoids the last 3 used reaction IDs.
 */
export function selectReaction(opts: {
  phase: ReactionPhase;
  responseCategory: UserResponseCategory;
  personality: AvatarPersonality;
  recentIds: string[];
}): AvatarReaction | null {
  const allowedTypes = getReactionTypes(opts.phase, opts.responseCategory);

  const pool = AVATAR_REACTIONS.filter(
    (r) =>
      r.phase === opts.phase &&
      allowedTypes.includes(r.reactionType) &&
      r.personalityTags.includes(opts.personality)
  );

  if (pool.length === 0) {
    // Relax personality constraint as fallback
    const fallback = AVATAR_REACTIONS.filter(
      (r) => r.phase === opts.phase && allowedTypes.includes(r.reactionType)
    );
    return pick(fallback, opts.recentIds, (r) => r.id);
  }

  return pick(pool, opts.recentIds, (r) => r.id);
}

/**
 * Pick a win statement for session close, avoiding recently used IDs.
 */
export function selectWinStatement(recentIds: string[]): WinStatement {
  return pick(WIN_STATEMENTS, recentIds, (w) => w.id) ?? WIN_STATEMENTS[0];
}
