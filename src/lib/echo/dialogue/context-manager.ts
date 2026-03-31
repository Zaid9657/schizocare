// ─────────────────────────────────────────────────────────────────────────────
// ECHO Context Manager
// Creates, loads, and persists EngineContext — the in-memory session state
// used by the dialogue engine. Backed by localStorage between page navigations.
// ─────────────────────────────────────────────────────────────────────────────

import type { AvatarPersonality } from "@/types/echo";
import type { ReactionPhase } from "@/lib/echo/content/seed-data";
import { generateId } from "@/lib/echo/utils";

const STORAGE_KEY = "echo_active_context";
const MAX_RECENT = 3;

// ── EngineContext ─────────────────────────────────────────────────────────────

export interface EngineContext {
  sessionId:         string;
  avatarId:          string;
  avatarPersonality: AvatarPersonality;
  locale:            string;
  phase:             ReactionPhase;
  exchangeCount:     number;
  /** IDs of the last MAX_RECENT hostile statements shown (avoidance) */
  recentStatementIds: string[];
  /** IDs of the last MAX_RECENT reactions shown (avoidance) */
  recentReactionIds:  string[];
  /** IDs of win statements already used in past sessions */
  usedWinStatementIds: string[];
  startedAt:         string;
  /** Total distress signal count this session (used by session-controller) */
  distressSignalCount: number;
}

// ── Factory ───────────────────────────────────────────────────────────────────

export function createContext(opts: {
  avatarId:          string;
  avatarPersonality: AvatarPersonality;
  locale:            string;
  phase:             ReactionPhase;
}): EngineContext {
  return {
    sessionId:           generateId("session"),
    avatarId:            opts.avatarId,
    avatarPersonality:   opts.avatarPersonality,
    locale:              opts.locale,
    phase:               opts.phase,
    exchangeCount:       0,
    recentStatementIds:  [],
    recentReactionIds:   [],
    usedWinStatementIds: loadUsedWinIds(),
    startedAt:           new Date().toISOString(),
    distressSignalCount: 0,
  };
}

// ── Mutations (all return a new context — treat as immutable) ─────────────────

export function recordStatementUsed(ctx: EngineContext, id: string): EngineContext {
  const ids = [id, ...ctx.recentStatementIds].slice(0, MAX_RECENT);
  return { ...ctx, recentStatementIds: ids };
}

export function recordReactionUsed(ctx: EngineContext, id: string): EngineContext {
  const ids = [id, ...ctx.recentReactionIds].slice(0, MAX_RECENT);
  return { ...ctx, recentReactionIds: ids };
}

export function incrementExchange(ctx: EngineContext): EngineContext {
  return { ...ctx, exchangeCount: ctx.exchangeCount + 1 };
}

export function recordDistressSignal(ctx: EngineContext): EngineContext {
  return { ...ctx, distressSignalCount: ctx.distressSignalCount + 1 };
}

export function recordWinStatementUsed(ctx: EngineContext, id: string): EngineContext {
  const ids = [...ctx.usedWinStatementIds, id];
  saveUsedWinIds(ids);
  return { ...ctx, usedWinStatementIds: ids };
}

// ── Persistence ───────────────────────────────────────────────────────────────

export function saveContext(ctx: EngineContext): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch { /* quota — silent fail */ }
}

export function loadContext(): EngineContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as EngineContext) : null;
  } catch { return null; }
}

export function clearContext(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// ── Win statement ID persistence (cross-session) ──────────────────────────────

const WIN_IDS_KEY = "echo_used_win_ids";

function loadUsedWinIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WIN_IDS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch { return []; }
}

function saveUsedWinIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  // Keep at most 9 (all 10 win statements minus 1, so one is always fresh)
  localStorage.setItem(WIN_IDS_KEY, JSON.stringify(ids.slice(-9)));
}
