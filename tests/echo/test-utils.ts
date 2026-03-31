// ─────────────────────────────────────────────────────────────────────────────
// ECHO Test Utilities
// ─────────────────────────────────────────────────────────────────────────────

import type { Avatar, Session } from "@/types/echo";
import type { EngineContext } from "@/lib/echo/dialogue/context-manager";

// ── In-memory localStorage mock ───────────────────────────────────────────────

export function mockLocalStorage(): void {
  const store: Record<string, string> = {};
  const mock = {
    getItem:    (key: string) => store[key] ?? null,
    setItem:    (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear:      () => { Object.keys(store).forEach((k) => delete store[k]); },
    get length() { return Object.keys(store).length; },
    key:        (n: number) => Object.keys(store)[n] ?? null,
  };
  Object.defineProperty(globalThis, "localStorage", {
    value: mock,
    writable: true,
    configurable: true,
  });
  // Services guard on `typeof window === "undefined"` to detect SSR.
  // In the Node test environment we need window to exist for localStorage to be used.
  if (typeof globalThis.window === "undefined") {
    Object.defineProperty(globalThis, "window", {
      value: globalThis,
      writable: true,
      configurable: true,
    });
  }
}

// ── Factory helpers ───────────────────────────────────────────────────────────

export function createMockAvatar(overrides: Partial<Avatar> = {}): Avatar {
  return {
    id:          "avatar_test_01",
    visitorId:   "local",
    name:        "Test Voice",
    personality: "critical",
    gender:      "neutral",
    visualConfig: {
      shape:          "circle",
      primaryColor:   "#C03030",
      secondaryColor: "#8B1A1A",
      iconKey:        "storm",
      size:           "medium",
      animationStyle: "pulse",
    },
    voiceConfig: {
      pitch:       1.0,
      rate:        1.0,
      volume:      1.0,
      useTextOnly: true,
    },
    isActive:   true,
    createdAt:  "2025-01-01T00:00:00.000Z",
    lastSeenAt: null,
    notesUser:  null,
    ...overrides,
  };
}

export function createMockSession(overrides: Partial<Session> = {}): Session {
  return {
    id:              `session_test_${Date.now()}`,
    avatarId:        "avatar_test_01",
    visitorId:       "local",
    sessionType:     "introduction",
    phase:           "closing",
    status:          "completed",
    locale:          "en",
    moodBefore:      { score: 4, label: "A bit anxious", timestamp: "2025-01-01T10:00:00Z" },
    moodAfter:       { score: 6, label: "Mostly okay",   timestamp: "2025-01-01T10:15:00Z" },
    startedAt:       "2025-01-01T10:00:00.000Z",
    completedAt:     new Date().toISOString(),
    durationSeconds: 720,
    exchangeCount:   5,
    therapistNotes:  null,
    safetyFlagRaised: false,
    ...overrides,
  };
}

export function createMockContext(overrides: Partial<EngineContext> = {}): EngineContext {
  return {
    sessionId:          "ctx_test_01",
    avatarId:           "avatar_test_01",
    avatarPersonality:  "critical",
    locale:             "en",
    phase:              "EARLY",
    exchangeCount:      0,
    recentStatementIds: [],
    recentReactionIds:  [],
    usedWinStatementIds:[],
    startedAt:          new Date().toISOString(),
    distressSignalCount: 0,
    ...overrides,
  };
}

/** Clears all echo_* keys from localStorage. */
export function resetAllEchoStorage(): void {
  if (typeof localStorage === "undefined") return;
  const keys = Array.from({ length: localStorage.length }, (_, i) => localStorage.key(i))
    .filter((k): k is string => k !== null && k.startsWith("echo"));
  keys.forEach((k) => localStorage.removeItem(k));
}
