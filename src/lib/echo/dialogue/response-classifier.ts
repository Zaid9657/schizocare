// ─────────────────────────────────────────────────────────────────────────────
// ECHO Response Classifier
// Keyword-based classification of free-text user input → UserResponseCategory.
// Used when the user types a custom response rather than picking a preset.
// ─────────────────────────────────────────────────────────────────────────────

import type { UserResponseCategory } from "@/lib/echo/content/seed-data";

// ── Keyword patterns ──────────────────────────────────────────────────────────

const PATTERNS: Record<UserResponseCategory, string[]> = {
  ASSERTIVE: [
    "don't control", "dont control", "not listening", "stronger",
    "won't", "wont", "i decide", "not my authority",
    "believe you", "you're wrong", "youre wrong", "you are wrong",
    "not true", "i choose", "i refuse",
  ],
  DEFUSION: [
    "just a thought", "only a thought", "notice", "noticing",
    "opinion", "choosing not", "hold lightly", "words in my mind",
    "don't have to believe", "dont have to believe", "not a fact",
    "acknowledge", "aware",
  ],
  CHALLENGE: [
    "evidence", "prove", "actually", "wrong about", "how do you know",
    "not true", "disagree", "another interpretation", "that's not",
    "thats not", "where's your", "wheres your", "really?",
  ],
  VALUES: [
    "matters to me", "focus on", "important to me", "values",
    "care about", "what i value", "meaning", "what matters",
    "moving toward", "choose to", "my life",
  ],
  SELF_COMPASSION: [
    "deserve", "human", "be kind", "compassion", "doing my best",
    "good enough", "enough", "struggling", "still trying",
    "with care", "treat myself", "i'm okay", "im okay",
  ],
  BOUNDARY: [
    "ending", "done", "over", "conversation", "not engaging",
    "won't engage", "wont engage", "stop", "leave", "step back",
    "take a break", "not today", "set a limit", "you don't speak",
  ],
};

// ── Scorer ────────────────────────────────────────────────────────────────────

/**
 * Score a normalised input string against all keyword lists.
 * Returns an object mapping each category to its hit count.
 */
function scoreInput(normalised: string): Record<UserResponseCategory, number> {
  const scores = {} as Record<UserResponseCategory, number>;
  for (const [cat, keywords] of Object.entries(PATTERNS) as [UserResponseCategory, string[]][]) {
    scores[cat] = keywords.reduce(
      (acc, kw) => acc + (normalised.includes(kw) ? 1 : 0),
      0
    );
  }
  return scores;
}

// ── Public API ────────────────────────────────────────────────────────────────

export interface ClassifyResult {
  category: UserResponseCategory | null;
  confidence: "high" | "low" | "none";
  scores: Record<UserResponseCategory, number>;
}

/**
 * Classify a free-text user response into a UserResponseCategory.
 *
 * Returns `null` category when no keywords match (caller should fall back
 * to presenting the preset response buttons).
 */
export function classifyResponse(text: string): ClassifyResult {
  const normalised = text.toLowerCase().trim();
  const scores = scoreInput(normalised);

  const best = (Object.entries(scores) as [UserResponseCategory, number][])
    .sort((a, b) => b[1] - a[1])[0];

  if (!best || best[1] === 0) {
    return { category: null, confidence: "none", scores };
  }

  // Two or more hits → high confidence; one hit → low
  const confidence: ClassifyResult["confidence"] = best[1] >= 2 ? "high" : "low";

  return { category: best[0], confidence, scores };
}
