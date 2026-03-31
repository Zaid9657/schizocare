// ─────────────────────────────────────────────────────────────────────────────
// ECHO Supabase Utilities
// Error formatting and retry helpers shared by queries and mutations.
// ─────────────────────────────────────────────────────────────────────────────

import type { PostgrestError } from "@supabase/supabase-js";

// ── Error types ───────────────────────────────────────────────────────────────

export class EchoSupabaseError extends Error {
  readonly code:    string | null;
  readonly details: string | null;
  readonly hint:    string | null;

  constructor(error: PostgrestError | { message: string }) {
    const pg = error as PostgrestError;
    super(pg.message);
    this.name    = "EchoSupabaseError";
    this.code    = pg.code    ?? null;
    this.details = pg.details ?? null;
    this.hint    = pg.hint    ?? null;
  }
}

// ── Error handler ─────────────────────────────────────────────────────────────

/**
 * Normalises a Supabase/PostgREST error into a typed EchoSupabaseError.
 * Call after any `.from(...).select/insert/update/delete` to get a
 * consistent error shape throughout the codebase.
 *
 * @example
 * const { data, error } = await supabase.from("avatars").select("*");
 * if (error) throw handleSupabaseError(error);
 */
export function handleSupabaseError(
  error: PostgrestError | Error | null
): EchoSupabaseError {
  if (!error) {
    return new EchoSupabaseError({ message: "Unknown Supabase error" });
  }
  if (error instanceof EchoSupabaseError) return error;
  return new EchoSupabaseError(error as PostgrestError);
}

// ── Transient error detection ─────────────────────────────────────────────────

const TRANSIENT_CODES = new Set([
  "08000", // connection exception
  "08006", // connection failure
  "57P03", // cannot connect now
  "XX000", // internal error (often transient)
]);

function isTransient(error: unknown): boolean {
  if (!(error instanceof EchoSupabaseError)) return false;
  if (error.code && TRANSIENT_CODES.has(error.code)) return true;
  // Network-level errors from the fetch layer
  const msg = error.message.toLowerCase();
  return (
    msg.includes("networkerror") ||
    msg.includes("failed to fetch") ||
    msg.includes("econnreset") ||
    msg.includes("timeout")
  );
}

// ── Retry wrapper ─────────────────────────────────────────────────────────────

const DEFAULT_RETRIES    = 3;
const BASE_DELAY_MS      = 300;

/**
 * Retries `fn` up to `maxRetries` times on transient failures,
 * with exponential back-off (300 ms, 600 ms, 1200 ms, …).
 *
 * Non-transient errors (RLS violation, not-found, validation) are thrown
 * immediately without retrying.
 *
 * @example
 * const avatar = await withRetry(() => createAvatar(userId, config));
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = DEFAULT_RETRIES
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (!isTransient(err) || attempt === maxRetries) throw err;
      await new Promise((r) =>
        setTimeout(r, BASE_DELAY_MS * Math.pow(2, attempt))
      );
    }
  }
  throw lastError;
}
