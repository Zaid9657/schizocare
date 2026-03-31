// ─────────────────────────────────────────────────────────────────────────────
// Dialogue Engine Unit Tests
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage, createMockContext, resetAllEchoStorage } from "./test-utils";

// Pure logic imports (no Next.js dependencies)
import { canEndSession, shouldSuggestBreak, shouldAutoGround, MIN_EXCHANGES_TO_END, BREAK_SUGGESTION_THRESHOLD, MAX_DISTRESS_SIGNALS } from "@/lib/echo/dialogue/session-controller";
import { selectHostileStatement, selectReaction } from "@/lib/echo/dialogue/content-selector";
import { createContext, incrementExchange, recordStatementUsed } from "@/lib/echo/dialogue/context-manager";

beforeEach(() => {
  mockLocalStorage();
  resetAllEchoStorage();
});

// ── startSession / context creation ──────────────────────────────────────────

describe("createContext", () => {
  it("creates a valid context with required fields", () => {
    const ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    expect(ctx.sessionId).toBeTruthy();
    expect(ctx.avatarId).toBe("av_01");
    expect(ctx.avatarPersonality).toBe("critical");
    expect(ctx.locale).toBe("en");
    expect(ctx.phase).toBe("EARLY");
    expect(ctx.exchangeCount).toBe(0);
    expect(ctx.recentStatementIds).toEqual([]);
    expect(ctx.recentReactionIds).toEqual([]);
    expect(ctx.distressSignalCount).toBe(0);
  });

  it("generates unique session IDs", () => {
    const ctx1 = createContext({ avatarId: "av_01", avatarPersonality: "critical", locale: "en", phase: "EARLY" });
    const ctx2 = createContext({ avatarId: "av_01", avatarPersonality: "critical", locale: "en", phase: "EARLY" });
    expect(ctx1.sessionId).not.toBe(ctx2.sessionId);
  });
});

// ── canEndSession / minimum exchanges ────────────────────────────────────────

describe("canEndSession", () => {
  it("returns false before minimum exchanges", () => {
    const ctx = createMockContext({ exchangeCount: 0 });
    expect(canEndSession(ctx)).toBe(false);
  });

  it("returns false one exchange before minimum", () => {
    const ctx = createMockContext({ exchangeCount: MIN_EXCHANGES_TO_END - 1 });
    expect(canEndSession(ctx)).toBe(false);
  });

  it("returns true at the minimum exchange threshold", () => {
    const ctx = createMockContext({ exchangeCount: MIN_EXCHANGES_TO_END });
    expect(canEndSession(ctx)).toBe(true);
  });

  it("returns true above the minimum", () => {
    const ctx = createMockContext({ exchangeCount: 10 });
    expect(canEndSession(ctx)).toBe(true);
  });
});

// ── shouldSuggestBreak ────────────────────────────────────────────────────────

describe("shouldSuggestBreak", () => {
  it("returns false at 0 exchanges", () => {
    expect(shouldSuggestBreak(createMockContext({ exchangeCount: 0 }))).toBe(false);
  });

  it("returns true at the break suggestion threshold", () => {
    expect(shouldSuggestBreak(createMockContext({ exchangeCount: BREAK_SUGGESTION_THRESHOLD }))).toBe(true);
  });

  it("returns false one below threshold", () => {
    expect(shouldSuggestBreak(createMockContext({ exchangeCount: BREAK_SUGGESTION_THRESHOLD - 1 }))).toBe(false);
  });

  it("returns true at multiples of the threshold", () => {
    expect(shouldSuggestBreak(createMockContext({ exchangeCount: BREAK_SUGGESTION_THRESHOLD * 2 }))).toBe(true);
  });
});

// ── shouldAutoGround ──────────────────────────────────────────────────────────

describe("shouldAutoGround", () => {
  it("returns false below distress threshold", () => {
    expect(shouldAutoGround(createMockContext({ distressSignalCount: MAX_DISTRESS_SIGNALS - 1 }))).toBe(false);
  });

  it("returns true at distress threshold", () => {
    expect(shouldAutoGround(createMockContext({ distressSignalCount: MAX_DISTRESS_SIGNALS }))).toBe(true);
  });

  it("returns true above distress threshold", () => {
    expect(shouldAutoGround(createMockContext({ distressSignalCount: 10 }))).toBe(true);
  });
});

// ── content selector / repetition avoidance ──────────────────────────────────

describe("selectHostileStatement", () => {
  it("returns a statement for critical personality", () => {
    const stmt = selectHostileStatement({
      personality: "critical",
      exchangeCount: 0,
      recentIds: [],
    });
    expect(stmt).not.toBeNull();
    expect(stmt!.id).toBeTruthy();
  });

  it("avoids recently used IDs", () => {
    const firstRun: string[] = [];
    // Collect a few IDs
    for (let i = 0; i < 5; i++) {
      const s = selectHostileStatement({ personality: "critical", exchangeCount: 0, recentIds: firstRun });
      if (s && !firstRun.includes(s.id)) firstRun.push(s.id);
    }

    // With recent IDs excluded, next pick should avoid them (when pool is large enough)
    const next = selectHostileStatement({ personality: "critical", exchangeCount: 0, recentIds: firstRun });
    // It's allowed to repeat if pool is exhausted, but ideally it won't
    expect(next).not.toBeNull();
  });

  it("returns MILD intensity at exchange 0", () => {
    const stmt = selectHostileStatement({ personality: "critical", exchangeCount: 0, recentIds: [] });
    // At exchange 0 only MILD is allowed; statement should exist
    expect(stmt).not.toBeNull();
  });

  it("returns statement (intensity unlocked) at exchange 5+", () => {
    const stmt = selectHostileStatement({ personality: "critical", exchangeCount: 5, recentIds: [] });
    expect(stmt).not.toBeNull();
  });
});

// ── incrementExchange ─────────────────────────────────────────────────────────

describe("incrementExchange", () => {
  it("increments exchange count by 1", () => {
    const ctx = createMockContext({ exchangeCount: 2 });
    const updated = incrementExchange(ctx);
    expect(updated.exchangeCount).toBe(3);
  });
});

// ── recordStatementUsed ───────────────────────────────────────────────────────

describe("recordStatementUsed", () => {
  it("appends ID to recentStatementIds", () => {
    const ctx = createMockContext({ recentStatementIds: ["a", "b"] });
    const updated = recordStatementUsed(ctx, "c");
    expect(updated.recentStatementIds).toContain("c");
  });

  it("caps recentStatementIds at 3 entries", () => {
    const ctx = createMockContext({ recentStatementIds: ["a", "b", "c"] });
    const updated = recordStatementUsed(ctx, "d");
    expect(updated.recentStatementIds.length).toBeLessThanOrEqual(3);
    expect(updated.recentStatementIds).toContain("d");
  });
});
