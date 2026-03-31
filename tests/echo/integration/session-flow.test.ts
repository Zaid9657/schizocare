// ─────────────────────────────────────────────────────────────────────────────
// Integration: Session Flow
// Tests the complete session flow using the pure-logic layer directly.
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage, resetAllEchoStorage } from "../test-utils";

import { createContext, incrementExchange, recordStatementUsed, recordDistressSignal, saveContext } from "@/lib/echo/dialogue/context-manager";
import { canEndSession, shouldAutoGround, buildSession, buildSummary, persistSession, MIN_EXCHANGES_TO_END, MAX_DISTRESS_SIGNALS } from "@/lib/echo/dialogue/session-controller";
import { selectHostileStatement, selectWinStatement } from "@/lib/echo/dialogue/content-selector";
import { completedSessionCount } from "@/lib/echo/dialogue/session-controller";
import { logSafetyEvent, getSafetyEvents } from "@/lib/echo/safety/safety-service";

beforeEach(() => {
  mockLocalStorage();
  resetAllEchoStorage();
});

// ── Complete session flow ─────────────────────────────────────────────────────

describe("session flow: setup → dialogue → win → persist", () => {
  it("enforces minimum exchange count before allowing end", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    // Below minimum: increment until one short of threshold, verify blocked each time
    for (let i = 0; i < MIN_EXCHANGES_TO_END - 1; i++) {
      expect(canEndSession(ctx)).toBe(false);
      ctx = incrementExchange(ctx);
    }
    // Still one short
    expect(canEndSession(ctx)).toBe(false);

    // Reach the threshold
    ctx = incrementExchange(ctx);
    expect(canEndSession(ctx)).toBe(true);
  });

  it("completes a full session and persists to storage", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    // Simulate minimum exchanges
    for (let i = 0; i < MIN_EXCHANGES_TO_END; i++) {
      const stmt = selectHostileStatement({ personality: "critical", exchangeCount: ctx.exchangeCount, recentIds: ctx.recentStatementIds });
      expect(stmt).not.toBeNull();
      ctx = recordStatementUsed(ctx, stmt!.id);
      ctx = incrementExchange(ctx);
    }

    expect(canEndSession(ctx)).toBe(true);

    // Select win statement
    const win = selectWinStatement(ctx.usedWinStatementIds);
    expect(win).toBeTruthy();

    // Build and persist session
    const session = buildSession({
      ctx,
      moodBefore: 4,
      moodAfter:  6,
      winStatement: win,
    });

    persistSession(session);

    // Verify persisted
    expect(completedSessionCount()).toBeGreaterThan(0);
  });

  it("session record contains correct fields after persistence", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    for (let i = 0; i < MIN_EXCHANGES_TO_END; i++) {
      ctx = incrementExchange(ctx);
    }

    const win = selectWinStatement([]);
    const session = buildSession({
      ctx,
      moodBefore: 5,
      moodAfter:  7,
      winStatement: win,
    });

    expect(session.avatarId).toBe("av_01");
    expect(session.status).toBe("completed");
    expect(session.exchangeCount).toBe(MIN_EXCHANGES_TO_END);
    expect(session.moodBefore?.score).toBe(5);
    expect(session.moodAfter?.score).toBe(7);
  });
});

// ── Stress button logs event + context preserved ──────────────────────────────

describe("stress button interaction", () => {
  it("logs a STRESS_BUTTON safety event", async () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    ctx = recordDistressSignal(ctx);
    saveContext(ctx);

    await logSafetyEvent("local", {
      eventType: "STRESS_BUTTON",
      sessionId: ctx.sessionId,
    });

    const events = await getSafetyEvents("local", ctx.sessionId);
    expect(events).toHaveLength(1);
    expect(events[0].eventType).toBe("STRESS_BUTTON");
  });

  it("context distressSignalCount increments after stress event", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    expect(ctx.distressSignalCount).toBe(0);
    ctx = recordDistressSignal(ctx);
    expect(ctx.distressSignalCount).toBe(1);
  });

  it("shouldAutoGround triggers after max distress signals", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    for (let i = 0; i < MAX_DISTRESS_SIGNALS; i++) {
      ctx = recordDistressSignal(ctx);
    }

    expect(shouldAutoGround(ctx)).toBe(true);
  });
});

// ── Session summary ───────────────────────────────────────────────────────────

describe("buildSummary", () => {
  it("calculates mood improvement correctly", () => {
    let ctx = createContext({
      avatarId: "av_01",
      avatarPersonality: "critical",
      locale: "en",
      phase: "EARLY",
    });

    for (let i = 0; i < MIN_EXCHANGES_TO_END; i++) {
      ctx = incrementExchange(ctx);
    }

    const win = selectWinStatement([]);
    const session = buildSession({
      ctx,
      moodBefore: 4,
      moodAfter:  7,
      winStatement: win,
    });

    const summary = buildSummary(session, win);
    expect(summary.moodImprovement).toBe(3);
    expect(summary.moodBefore).toBe(4);
    expect(summary.moodAfter).toBe(7);
  });
});
