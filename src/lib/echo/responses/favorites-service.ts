// ─────────────────────────────────────────────────────────────────────────────
// ECHO Favorites Service — localStorage-backed MVP
// Supabase integration ready: swap localStorage calls for supabase.from()
// calls against the user_responses table when auth is wired up.
// ─────────────────────────────────────────────────────────────────────────────

import type { UserResponseCategory } from "@/lib/echo/content/seed-data";

const STORAGE_KEY = "echo_response_favorites";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FavoriteResponse {
  responseId:  string;
  category:    UserResponseCategory;
  textEn:      string;
  textDe:      string;
  useCount:    number;
  savedAt:     string; // ISO date string
}

// ── Storage helpers ───────────────────────────────────────────────────────────

function readAll(): FavoriteResponse[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FavoriteResponse[]) : [];
  } catch {
    return [];
  }
}

function writeAll(favs: FavoriteResponse[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Returns all favorited responses, sorted by use count descending. */
export async function getFavorites(_userId: string): Promise<FavoriteResponse[]> {
  return readAll().sort((a, b) => b.useCount - a.useCount);
}

/** Adds a response to favorites. No-op if already present. */
export async function addFavorite(
  _userId: string,
  response: Omit<FavoriteResponse, "useCount" | "savedAt">
): Promise<void> {
  const all = readAll();
  if (all.some((f) => f.responseId === response.responseId)) return;
  writeAll([...all, { ...response, useCount: 0, savedAt: new Date().toISOString() }]);
}

/** Removes a response from favorites. No-op if not present. */
export async function removeFavorite(
  _userId: string,
  responseId: string
): Promise<void> {
  writeAll(readAll().filter((f) => f.responseId !== responseId));
}

/** Increments the use count for a favorited response. No-op if not favorited. */
export async function incrementUseCount(
  _userId: string,
  responseId: string
): Promise<void> {
  const all = readAll();
  const idx = all.findIndex((f) => f.responseId === responseId);
  if (idx === -1) return;
  all[idx] = { ...all[idx], useCount: all[idx].useCount + 1 };
  writeAll(all);
}

/** Synchronous helper for client components that need favorites without async. */
export function getFavoritesSync(): FavoriteResponse[] {
  return readAll().sort((a, b) => b.useCount - a.useCount);
}

/** Returns true if a given responseId is currently favorited. */
export function isFavorited(responseId: string): boolean {
  return readAll().some((f) => f.responseId === responseId);
}
