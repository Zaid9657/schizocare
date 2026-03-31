// ─────────────────────────────────────────────────────────────────────────────
// Favorites Service Unit Tests
// ─────────────────────────────────────────────────────────────────────────────

import { describe, it, expect, beforeEach } from "vitest";
import { mockLocalStorage, resetAllEchoStorage } from "./test-utils";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  incrementUseCount,
  isFavorited,
} from "@/lib/echo/responses/favorites-service";
// Note: isFavorited is sync and takes (responseId) only; userId param is reserved for Supabase
import type { FavoriteResponse } from "@/lib/echo/responses/favorites-service";

const USER_ID = "user_test_01";

const BASE_RESPONSE: Omit<FavoriteResponse, "useCount" | "savedAt"> = {
  responseId: "resp_001",
  category:   "ASSERTIVE",
  textEn:     "I won't listen to this",
  textDe:     "Ich höre das nicht",
};

beforeEach(() => {
  mockLocalStorage();
  resetAllEchoStorage();
});

// ── getFavorites ──────────────────────────────────────────────────────────────

describe("getFavorites", () => {
  it("returns empty array when no favorites exist", async () => {
    const favs = await getFavorites(USER_ID);
    expect(favs).toEqual([]);
  });

  it("returns added favorites", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(1);
    expect(favs[0].responseId).toBe("resp_001");
  });

  it("sorts by useCount descending", async () => {
    await addFavorite(USER_ID, { ...BASE_RESPONSE, responseId: "resp_001" });
    await addFavorite(USER_ID, { ...BASE_RESPONSE, responseId: "resp_002" });

    await incrementUseCount(USER_ID, "resp_002");
    await incrementUseCount(USER_ID, "resp_002");

    const favs = await getFavorites(USER_ID);
    expect(favs[0].responseId).toBe("resp_002");
  });
});

// ── addFavorite ───────────────────────────────────────────────────────────────

describe("addFavorite", () => {
  it("adds a new favorite with useCount 0", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    const favs = await getFavorites(USER_ID);
    expect(favs[0].useCount).toBe(0);
  });

  it("is a no-op if the response is already favorited", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    await addFavorite(USER_ID, BASE_RESPONSE);
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(1);
  });

  it("stores savedAt as an ISO date string", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    const favs = await getFavorites(USER_ID);
    expect(() => new Date(favs[0].savedAt)).not.toThrow();
    expect(new Date(favs[0].savedAt).toISOString()).toBe(favs[0].savedAt);
  });
});

// ── removeFavorite ────────────────────────────────────────────────────────────

describe("removeFavorite", () => {
  it("removes an existing favorite", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    await removeFavorite(USER_ID, "resp_001");
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(0);
  });

  it("is a no-op if the response is not favorited", async () => {
    await removeFavorite(USER_ID, "nonexistent_id");
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(0);
  });

  it("only removes the targeted response", async () => {
    await addFavorite(USER_ID, { ...BASE_RESPONSE, responseId: "resp_001" });
    await addFavorite(USER_ID, { ...BASE_RESPONSE, responseId: "resp_002" });
    await removeFavorite(USER_ID, "resp_001");
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(1);
    expect(favs[0].responseId).toBe("resp_002");
  });
});

// ── incrementUseCount ─────────────────────────────────────────────────────────

describe("incrementUseCount", () => {
  it("increments useCount by 1", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    await incrementUseCount(USER_ID, "resp_001");
    const favs = await getFavorites(USER_ID);
    expect(favs[0].useCount).toBe(1);
  });

  it("increments multiple times", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    await incrementUseCount(USER_ID, "resp_001");
    await incrementUseCount(USER_ID, "resp_001");
    await incrementUseCount(USER_ID, "resp_001");
    const favs = await getFavorites(USER_ID);
    expect(favs[0].useCount).toBe(3);
  });

  it("is a no-op for non-existent responseId", async () => {
    await incrementUseCount(USER_ID, "nonexistent");
    const favs = await getFavorites(USER_ID);
    expect(favs).toHaveLength(0);
  });
});

// ── isFavorited ───────────────────────────────────────────────────────────────

describe("isFavorited", () => {
  it("returns false when not favorited", () => {
    expect(isFavorited("resp_001")).toBe(false);
  });

  it("returns true after adding", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    expect(isFavorited("resp_001")).toBe(true);
  });

  it("returns false after removing", async () => {
    await addFavorite(USER_ID, BASE_RESPONSE);
    await removeFavorite(USER_ID, "resp_001");
    expect(isFavorited("resp_001")).toBe(false);
  });
});
