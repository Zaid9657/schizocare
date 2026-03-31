// ─────────────────────────────────────────────────────────────────────────────
// Safety System Unit Tests
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage, resetAllEchoStorage } from "./test-utils";
import { checkForCrisis } from "@/lib/echo/safety/crisis-keywords";
import { checkDistressLevel, logSafetyEvent, getSafetyEvents } from "@/lib/echo/safety/safety-service";
import type { DistressContext } from "@/lib/echo/safety/safety-service";

beforeEach(() => {
  mockLocalStorage();
  resetAllEchoStorage();
});

// ── Crisis keyword detection (EN) ─────────────────────────────────────────────

describe("checkForCrisis (EN)", () => {
  it("detects 'suicide'", () => {
    expect(checkForCrisis("I've been thinking about suicide", "en").detected).toBe(true);
  });

  it("detects 'want to die'", () => {
    expect(checkForCrisis("I want to die", "en").detected).toBe(true);
  });

  it("detects 'kill myself' keyword", () => {
    expect(checkForCrisis("I want to kill myself", "en").detected).toBe(true);
  });

  it("detects 'hurt myself'", () => {
    expect(checkForCrisis("I want to hurt myself", "en").detected).toBe(true);
  });

  it("detects 'self-harm'", () => {
    expect(checkForCrisis("I've been doing self-harm", "en").detected).toBe(true);
  });

  it("detects 'end it all'", () => {
    expect(checkForCrisis("I just want to end it all", "en").detected).toBe(true);
  });

  it("returns detected keyword", () => {
    const result = checkForCrisis("I've been thinking about suicide", "en");
    expect(result.keyword).toBeTruthy();
  });

  // No false positives
  it("does NOT flag 'I killed it at work today'", () => {
    expect(checkForCrisis("I killed it at work today", "en").detected).toBe(false);
  });

  it("does NOT flag generic emotional language", () => {
    expect(checkForCrisis("I'm feeling really stressed and sad", "en").detected).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(checkForCrisis("", "en").detected).toBe(false);
  });
});

// ── Crisis keyword detection (DE) ─────────────────────────────────────────────

describe("checkForCrisis (DE)", () => {
  it("detects German keyword 'selbstmord'", () => {
    expect(checkForCrisis("Ich denke an Selbstmord", "de").detected).toBe(true);
  });

  it("detects 'sterben wollen'", () => {
    expect(checkForCrisis("Ich will sterben wollen", "de").detected).toBe(true);
  });

  it("detects English keywords in DE mode as well", () => {
    expect(checkForCrisis("I want to die", "de").detected).toBe(true);
  });

  it("is case-insensitive in DE mode", () => {
    expect(checkForCrisis("SELBSTMORD", "de").detected).toBe(true);
  });
});

// ── Mood drop detection ───────────────────────────────────────────────────────

describe("checkDistressLevel - mood drops", () => {
  const base: DistressContext = {
    moodBefore: 6,
    moodAfter: 6,
    exchangeCount: 3,
    distressSignalCount: 0,
    sessionDurationSec: 300,
  };

  it("returns low for no mood drop and no signals", () => {
    const result = checkDistressLevel(base);
    expect(result.level).toBe("low");
    expect(result.shouldIntervene).toBe(false);
  });

  it("returns moderate for mood drop >= 2", () => {
    const result = checkDistressLevel({ ...base, moodBefore: 7, moodAfter: 5 });
    expect(result.level).toBe("moderate");
    expect(result.shouldIntervene).toBe(true);
  });

  it("returns high for mood drop >= 4", () => {
    const result = checkDistressLevel({ ...base, moodBefore: 7, moodAfter: 3 });
    expect(result.level).toBe("high");
    expect(result.shouldIntervene).toBe(true);
  });

  it("returns high when moodAfter <= 2", () => {
    const result = checkDistressLevel({ ...base, moodBefore: 5, moodAfter: 2 });
    expect(result.level).toBe("high");
    expect(result.shouldIntervene).toBe(true);
  });
});

// ── Distress signal count ─────────────────────────────────────────────────────

describe("checkDistressLevel - distress signal counts", () => {
  const base: DistressContext = {
    moodBefore: 5,
    moodAfter: 5,
    exchangeCount: 3,
    distressSignalCount: 0,
    sessionDurationSec: 300,
  };

  it("returns moderate for 2 distress signals", () => {
    const result = checkDistressLevel({ ...base, distressSignalCount: 2 });
    expect(result.level).toBe("moderate");
  });

  it("returns high for 3+ distress signals", () => {
    const result = checkDistressLevel({ ...base, distressSignalCount: 3 });
    expect(result.level).toBe("high");
  });
});

// ── Extended session time ─────────────────────────────────────────────────────

describe("checkDistressLevel - extended sessions", () => {
  it("returns moderate after 20 minutes even with no other signals", () => {
    const result = checkDistressLevel({
      moodBefore: 5,
      moodAfter: 5,
      exchangeCount: 15,
      distressSignalCount: 0,
      sessionDurationSec: 20 * 60 + 1,
    });
    expect(result.level).toBe("moderate");
    expect(result.shouldIntervene).toBe(true);
  });
});

// ── logSafetyEvent / getSafetyEvents ─────────────────────────────────────────

describe("logSafetyEvent and getSafetyEvents", () => {
  it("logs an event and retrieves it", async () => {
    await logSafetyEvent("user_01", {
      eventType: "STRESS_BUTTON",
      sessionId: "sess_01",
    });

    const events = await getSafetyEvents("user_01");
    expect(events).toHaveLength(1);
    expect(events[0].eventType).toBe("STRESS_BUTTON");
    expect(events[0].userId).toBe("user_01");
  });

  it("filters by sessionId", async () => {
    await logSafetyEvent("user_01", { eventType: "STRESS_BUTTON", sessionId: "sess_01" });
    await logSafetyEvent("user_01", { eventType: "CRISIS_KEYWORD", sessionId: "sess_02" });

    const events = await getSafetyEvents("user_01", "sess_01");
    expect(events).toHaveLength(1);
    expect(events[0].sessionId).toBe("sess_01");
  });

  it("does not return events from other users", async () => {
    await logSafetyEvent("user_01", { eventType: "STRESS_BUTTON" });
    const events = await getSafetyEvents("user_02");
    expect(events).toHaveLength(0);
  });
});
