// ─────────────────────────────────────────────────────────────────────────────
// Response Classifier Unit Tests
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect } from "vitest";
import { classifyResponse } from "@/lib/echo/dialogue/response-classifier";

describe("classifyResponse", () => {
  // ── No match ───────────────────────────────────────────────────────────────

  it("returns null category for empty input", () => {
    expect(classifyResponse("").category).toBeNull();
  });

  it("returns 'none' confidence for empty input", () => {
    expect(classifyResponse("").confidence).toBe("none");
  });

  it("returns null category for whitespace-only input", () => {
    expect(classifyResponse("   ").category).toBeNull();
  });

  it("returns null category for unrelated content", () => {
    expect(classifyResponse("I had a sandwich for lunch today").category).toBeNull();
  });

  // ── ASSERTIVE ─────────────────────────────────────────────────────────────

  it("classifies assertive response (single keyword)", () => {
    const result = classifyResponse("I won't listen to you");
    expect(result.category).toBeTruthy();
  });

  it("classifies assertive response (high confidence)", () => {
    const result = classifyResponse("I won't and i decide my own choices, not my authority");
    expect(result.category).toBe("ASSERTIVE");
    expect(result.confidence).toBe("high");
  });

  // ── DEFUSION ──────────────────────────────────────────────────────────────

  it("classifies defusion response", () => {
    const result = classifyResponse("I notice that is just a thought");
    expect(result.category).toBe("DEFUSION");
  });

  it("classifies defusion with 'just a thought' keyword", () => {
    const result = classifyResponse("This is just a thought, nothing more");
    expect(result.category).toBe("DEFUSION");
  });

  // ── CHALLENGE ─────────────────────────────────────────────────────────────

  it("classifies challenge response", () => {
    const result = classifyResponse("What evidence do you have for that?");
    expect(result.category).toBe("CHALLENGE");
  });

  it("classifies challenge with multiple matches as high confidence", () => {
    const result = classifyResponse("I disagree, what evidence? That is actually wrong about me");
    expect(result.category).toBe("CHALLENGE");
    expect(result.confidence).toBe("high");
  });

  // ── VALUES ────────────────────────────────────────────────────────────────

  it("classifies values response", () => {
    const result = classifyResponse("What matters to me is moving forward");
    expect(result.category).toBe("VALUES");
  });

  it("classifies values with 'important to me' keyword", () => {
    const result = classifyResponse("That is not important to me right now");
    expect(result.category).toBe("VALUES");
  });

  // ── SELF_COMPASSION ───────────────────────────────────────────────────────

  it("classifies self-compassion response", () => {
    const result = classifyResponse("I am doing my best and that is good enough");
    expect(result.category).toBe("SELF_COMPASSION");
  });

  // ── BOUNDARY ──────────────────────────────────────────────────────────────

  it("classifies boundary response", () => {
    const result = classifyResponse("I am done with this conversation, I need to step back");
    expect(result.category).toBe("BOUNDARY");
  });

  it("classifies boundary with 'stop' keyword", () => {
    const result = classifyResponse("I want to stop and take a break");
    expect(result.category).toBe("BOUNDARY");
  });

  // ── Case insensitivity ────────────────────────────────────────────────────

  it("is case-insensitive", () => {
    const lower = classifyResponse("evidence");
    const upper = classifyResponse("EVIDENCE");
    const mixed = classifyResponse("Evidence");

    expect(lower.category).toBe(upper.category);
    expect(lower.category).toBe(mixed.category);
  });

  // ── Confidence levels ─────────────────────────────────────────────────────

  it("returns low confidence for a single keyword match", () => {
    const result = classifyResponse("I notice this");
    expect(result.confidence).toBe("low");
  });

  it("returns high confidence for 2+ keyword matches in same category", () => {
    const result = classifyResponse("I notice this is just a thought, not a fact, acknowledging it");
    expect(result.confidence).toBe("high");
  });
});
