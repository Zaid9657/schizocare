// ─────────────────────────────────────────────────────────────────────────────
// ECHO Response Matrix
//
// Maps [Phase][UserResponseCategory] → which ReactionType(s) the avatar
// can show in response. Used by the session engine to pick appropriate
// avatar reactions from the seed data.
//
// Design intent:
//   EARLY  — avatar is defensive, dismissive, or caught off-guard
//   MIDDLE — avatar starts to crack; shows ambivalence and surprise
//   LATE   — avatar concedes or, in nurturing/protective cases, offers support
// ─────────────────────────────────────────────────────────────────────────────

import type { ReactionPhase, ReactionType, UserResponseCategory } from "./seed-data";

export type ResponseMatrix = Record<
  ReactionPhase,
  Record<UserResponseCategory, ReactionType[]>
>;

export const RESPONSE_MATRIX: ResponseMatrix = {
  EARLY: {
    ASSERTIVE:       ["PUSH_BACK", "HESITATE"],
    DEFUSION:        ["PUSH_BACK", "HESITATE"],
    CHALLENGE:       ["PUSH_BACK", "HESITATE"],
    VALUES:          ["PUSH_BACK", "HESITATE"],
    SELF_COMPASSION: ["PUSH_BACK", "HESITATE"],
    BOUNDARY:        ["PUSH_BACK", "HESITATE"],
  },
  MIDDLE: {
    ASSERTIVE:       ["ACKNOWLEDGE", "SURPRISED"],
    DEFUSION:        ["SURPRISED",   "ACKNOWLEDGE"],
    CHALLENGE:       ["ACKNOWLEDGE", "SURPRISED"],
    VALUES:          ["SURPRISED",   "ACKNOWLEDGE"],
    SELF_COMPASSION: ["ACKNOWLEDGE", "SURPRISED"],
    BOUNDARY:        ["ACKNOWLEDGE", "SURPRISED"],
  },
  LATE: {
    ASSERTIVE:       ["CONCEDE",  "SUPPORT"],
    DEFUSION:        ["CONCEDE",  "SUPPORT"],
    CHALLENGE:       ["CONCEDE",  "SUPPORT"],
    VALUES:          ["SUPPORT",  "CONCEDE"],
    SELF_COMPASSION: ["SUPPORT",  "CONCEDE"],
    BOUNDARY:        ["CONCEDE",  "SUPPORT"],
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns the ordered list of reaction types for a given phase and response.
 * First entry is the primary (preferred) reaction type.
 */
export function getReactionTypes(
  phase: ReactionPhase,
  responseCategory: UserResponseCategory
): ReactionType[] {
  return RESPONSE_MATRIX[phase][responseCategory];
}

/**
 * Returns the primary (most likely) reaction type for a given phase/response pair.
 */
export function getPrimaryReactionType(
  phase: ReactionPhase,
  responseCategory: UserResponseCategory
): ReactionType {
  return RESPONSE_MATRIX[phase][responseCategory][0];
}

/**
 * Returns true if the avatar should concede or support (late-phase affirmative reactions).
 */
export function isAffirmativeReaction(reactionType: ReactionType): boolean {
  return reactionType === "CONCEDE" || reactionType === "SUPPORT";
}

/**
 * Returns true if the avatar is showing early-phase resistance.
 */
export function isResistanceReaction(reactionType: ReactionType): boolean {
  return reactionType === "PUSH_BACK";
}
