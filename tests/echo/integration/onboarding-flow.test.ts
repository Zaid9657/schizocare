// ─────────────────────────────────────────────────────────────────────────────
// Integration: Onboarding Flow
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage, resetAllEchoStorage } from "../test-utils";
import {
  isOnboarded,
  markOnboarded,
  getOnboardingProgress,
  saveOnboardingProgress,
  resetOnboarding,
} from "@/lib/echo/onboarding/onboarding-service";

const USER_ID = "local";

beforeEach(() => {
  mockLocalStorage();
  resetAllEchoStorage();
  resetOnboarding(USER_ID);
});

// ── Initial state ─────────────────────────────────────────────────────────────

describe("initial onboarding state", () => {
  it("new user is not onboarded", () => {
    expect(isOnboarded(USER_ID)).toBe(false);
  });

  it("new user starts at step 1", () => {
    const progress = getOnboardingProgress(USER_ID);
    expect(progress.step).toBe(1);
  });

  it("new user has not created avatar", () => {
    const progress = getOnboardingProgress(USER_ID);
    expect(progress.avatarCreated).toBe(false);
  });

  it("new user has not completed first session", () => {
    const progress = getOnboardingProgress(USER_ID);
    expect(progress.firstSessionDone).toBe(false);
  });
});

// ── Step progression ──────────────────────────────────────────────────────────

describe("step progression", () => {
  it("advances from step 1 to step 2", () => {
    saveOnboardingProgress(USER_ID, { step: 2 });
    expect(getOnboardingProgress(USER_ID).step).toBe(2);
  });

  it("advances through all 8 steps", () => {
    for (let step = 1; step <= 8; step++) {
      saveOnboardingProgress(USER_ID, { step });
      expect(getOnboardingProgress(USER_ID).step).toBe(step);
    }
  });

  it("preserves other fields when updating step", () => {
    saveOnboardingProgress(USER_ID, { avatarCreated: true });
    saveOnboardingProgress(USER_ID, { step: 4 });
    const progress = getOnboardingProgress(USER_ID);
    expect(progress.step).toBe(4);
    expect(progress.avatarCreated).toBe(true);
  });
});

// ── Completion ────────────────────────────────────────────────────────────────

describe("completion", () => {
  it("marks user as onboarded", () => {
    markOnboarded(USER_ID);
    expect(isOnboarded(USER_ID)).toBe(true);
  });

  it("remains onboarded after re-check", () => {
    markOnboarded(USER_ID);
    expect(isOnboarded(USER_ID)).toBe(true);
    expect(isOnboarded(USER_ID)).toBe(true);
  });

  it("can mark avatar creation", () => {
    saveOnboardingProgress(USER_ID, { avatarCreated: true });
    expect(getOnboardingProgress(USER_ID).avatarCreated).toBe(true);
  });

  it("can mark first session done", () => {
    saveOnboardingProgress(USER_ID, { firstSessionDone: true });
    expect(getOnboardingProgress(USER_ID).firstSessionDone).toBe(true);
  });
});

// ── Reset ─────────────────────────────────────────────────────────────────────

describe("reset", () => {
  it("clears onboarding status", () => {
    markOnboarded(USER_ID);
    resetOnboarding(USER_ID);
    expect(isOnboarded(USER_ID)).toBe(false);
  });

  it("resets progress to defaults after reset", () => {
    saveOnboardingProgress(USER_ID, { step: 7, avatarCreated: true });
    resetOnboarding(USER_ID);
    const progress = getOnboardingProgress(USER_ID);
    expect(progress.step).toBe(1);
    expect(progress.avatarCreated).toBe(false);
  });
});
