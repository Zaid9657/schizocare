// ─────────────────────────────────────────────────────────────────────────────
// ECHO Dialogue Engine
// Rule-based, deterministic. Never generates content — only selects from
// the pre-approved seed library. Always allows exit. Enforces a positive
// win statement before the session record is saved.
// ─────────────────────────────────────────────────────────────────────────────

import type { AvatarPersonality, AvatarTurn, SessionSummary } from "@/types/echo";
import type { UserResponseCategory, ReactionPhase } from "@/lib/echo/content/seed-data";
import {
  createContext,
  incrementExchange,
  recordStatementUsed,
  recordReactionUsed,
  recordDistressSignal,
  recordWinStatementUsed,
  saveContext,
  clearContext,
  type EngineContext,
} from "./context-manager";
import {
  selectHostileStatement,
  selectReaction,
  selectWinStatement,
} from "./content-selector";
import {
  canEndSession,
  shouldSuggestBreak,
  shouldAutoGround,
  buildSession,
  buildSummary,
  persistSession,
  BREAK_SUGGESTION_THRESHOLD,
} from "./session-controller";
import { getUserPhase, refreshPhase } from "./phase-manager";
import { classifyResponse } from "./response-classifier";

// ── Start session ─────────────────────────────────────────────────────────────

export interface StartSessionOptions {
  avatarId:          string;
  avatarPersonality: AvatarPersonality;
  locale:            string;
  /** Override phase (e.g. for testing). Defaults to getUserPhase(). */
  phaseOverride?:    ReactionPhase;
}

export interface StartSessionResult {
  context:            EngineContext;
  openingStatementText: string;
  openingStatementId:   string;
}

/**
 * Begin a new dialogue session.
 * Returns the context and the avatar's opening hostile statement.
 */
export function startSession(opts: StartSessionOptions): StartSessionResult {
  const phase = opts.phaseOverride ?? getUserPhase("local");

  const ctx = createContext({
    avatarId:          opts.avatarId,
    avatarPersonality: opts.avatarPersonality,
    locale:            opts.locale,
    phase,
  });

  const statement = selectHostileStatement({
    personality: opts.avatarPersonality,
    exchangeCount: 0,
    recentIds: [],
  });

  if (!statement) {
    // Should never happen with a populated seed library, but fail gracefully.
    throw new Error("echo/engine: no hostile statement available for this personality");
  }

  const newCtx = recordStatementUsed(ctx, statement.id);
  saveContext(newCtx);

  const text = opts.locale === "de" ? statement.textDe : statement.textEn;

  return { context: newCtx, openingStatementText: text, openingStatementId: statement.id };
}

// ── Process user response ─────────────────────────────────────────────────────

export interface ProcessResponseOptions {
  /** Current engine context */
  ctx: EngineContext;
  /**
   * Structured category chosen from preset buttons — OR —
   * raw free text (will be auto-classified).
   */
  responseCategory?: UserResponseCategory;
  responseText?:     string;
}

export interface ProcessResponseResult {
  /** Updated context — store this and pass it to the next call */
  context:     EngineContext;
  turn:        AvatarTurn;
  /** Route to grounding immediately (distress threshold exceeded) */
  routeToGrounding: boolean;
  /** Suggest a mid-session break (non-blocking) */
  suggestBreak:     boolean;
}

/**
 * Process the user's response to the current avatar statement.
 * Returns the avatar's reaction + the next statement, or signals session close.
 */
export function processResponse(opts: ProcessResponseOptions): ProcessResponseResult {
  let ctx = opts.ctx;

  // ── Resolve response category ────────────────────────────────────────────

  let category: UserResponseCategory;

  if (opts.responseCategory) {
    category = opts.responseCategory;
  } else if (opts.responseText) {
    const classified = classifyResponse(opts.responseText);
    // Default to ASSERTIVE when classifier has no match — a neutral assertion
    category = classified.category ?? "ASSERTIVE";
  } else {
    category = "ASSERTIVE";
  }

  // ── Increment exchange count ──────────────────────────────────────────────

  ctx = incrementExchange(ctx);

  // ── Distress signal (BOUNDARY or repeated grounding request) ─────────────

  if (category === "BOUNDARY") {
    ctx = recordDistressSignal(ctx);
  }

  // ── Auto-grounding check ──────────────────────────────────────────────────

  if (shouldAutoGround(ctx)) {
    saveContext(ctx);
    return {
      context: ctx,
      turn: _emptyTurn(),
      routeToGrounding: true,
      suggestBreak:     false,
    };
  }

  // ── Select reaction ───────────────────────────────────────────────────────

  const reaction = selectReaction({
    phase:            ctx.phase,
    responseCategory: category,
    personality:      ctx.avatarPersonality,
    recentIds:        ctx.recentReactionIds,
  });

  // ── Decide on close vs next statement ────────────────────────────────────

  const close = canEndSession(ctx) && category === "BOUNDARY";

  let nextStatementText: string | null = null;
  let nextStatementId:   string | null = null;

  if (!close) {
    const next = selectHostileStatement({
      personality:   ctx.avatarPersonality,
      exchangeCount: ctx.exchangeCount,
      recentIds:     ctx.recentStatementIds,
    });
    if (next) {
      nextStatementText = ctx.locale === "de" ? next.textDe : next.textEn;
      nextStatementId   = next.id;
      ctx = recordStatementUsed(ctx, next.id);
    }
  }

  if (reaction) ctx = recordReactionUsed(ctx, reaction.id);

  const reactionText = reaction
    ? (ctx.locale === "de" ? reaction.textDe : reaction.textEn)
    : "";

  const turn: AvatarTurn = {
    reactionText,
    reactionId:        reaction?.id ?? "",
    nextStatementText,
    nextStatementId,
    suggestClose:      close || canEndSession(ctx),
  };

  const suggestBreak = shouldSuggestBreak(ctx);

  saveContext(ctx);

  return { context: ctx, turn, routeToGrounding: false, suggestBreak };
}

// ── End session ───────────────────────────────────────────────────────────────

export interface EndSessionOptions {
  ctx:         EngineContext;
  moodBefore:  number;
  moodAfter:   number;
}

/**
 * Finalise the session:
 *   1. Pick a win statement
 *   2. Build + persist the Session record
 *   3. Refresh the user's phase
 *   4. Clear the active context
 *   5. Return the summary
 *
 * This is the *only* path that saves a session — ensuring a positive
 * win statement is always shown before saving.
 */
export function endSession(opts: EndSessionOptions): SessionSummary {
  let ctx = opts.ctx;

  // Pick win statement (avoids previously used ones)
  const win = selectWinStatement(ctx.usedWinStatementIds);
  ctx = recordWinStatementUsed(ctx, win.id);

  const session = buildSession({
    ctx,
    moodBefore:   opts.moodBefore,
    moodAfter:    opts.moodAfter,
    winStatement: win,
  });

  persistSession(session);
  refreshPhase("local");
  clearContext();

  const winText = opts.ctx.locale === "de" ? win.textDe : win.textEn;
  const summary = buildSummary(session, win);

  return {
    ...summary,
    winStatementId:   win.id,
    winStatementText: winText,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function _emptyTurn(): AvatarTurn {
  return {
    reactionText:      "",
    reactionId:        "",
    nextStatementText: null,
    nextStatementId:   null,
    suggestClose:      true,
  };
}
