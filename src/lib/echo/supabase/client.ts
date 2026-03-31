// ─────────────────────────────────────────────────────────────────────────────
// ECHO Supabase Client
// Single source of truth for the Supabase client instance.
//
// Uses an untyped client because hand-written Database types cannot satisfy
// the GenericSchema constraint in @supabase/postgrest-js v12+ without running
// `supabase gen types`. Once codegen is wired up, swap `SupabaseClient` for
// `SupabaseClient<Database>` and remove the casts in queries/mutations.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ── Environment validation ────────────────────────────────────────────────────

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[ECHO] Missing environment variable: ${name}\n` +
      `Add it to .env.local:\n  ${name}=your-value`
    );
  }
  return value;
}

// ── Client type ───────────────────────────────────────────────────────────────

export type EchoSupabaseClient = SupabaseClient;

// ── Factory ───────────────────────────────────────────────────────────────────

/**
 * Creates a Supabase client using the public anon key.
 * Safe to use in both browser and server (RSC / Route Handler) contexts.
 * The anon key is restricted by RLS — each user can only access their own rows.
 */
export function createEchoClient(): EchoSupabaseClient {
  const url     = getEnvVar("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey = getEnvVar("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return createClient(url, anonKey);
}

// ── Singleton for browser context ─────────────────────────────────────────────

let browserClient: EchoSupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for browser use.
 * Call this from Client Components and hooks.
 *
 * For Server Components / Route Handlers, call `createEchoClient()` directly
 * to get a fresh instance per request (Next.js caches server-side state).
 */
export function getEchoClient(): EchoSupabaseClient {
  if (typeof window === "undefined") {
    return createEchoClient();
  }
  if (!browserClient) {
    browserClient = createEchoClient();
  }
  return browserClient;
}
