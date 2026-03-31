// ─────────────────────────────────────────────────────────────────────────────
// ECHO Supabase Queries (read-only)
// All functions require an authenticated Supabase client.
// RLS on every table ensures users only receive their own data.
//
// Return types are cast explicitly because we use an untyped client.
// When Supabase codegen is wired up, replace casts with generic inference.
// ─────────────────────────────────────────────────────────────────────────────

import type { EchoSupabaseClient } from "./client";
import type {
  EchoUser,
  Avatar,
  Session,
  Exchange,
  SessionWithExchanges,
  ContentItem,
  ContentFilters,
  Progress,
  DateRange,
} from "./types";
import { TABLES } from "./types";
import { handleSupabaseError } from "./utils";

// ── echo_users ────────────────────────────────────────────────────────────────

/**
 * Fetch the ECHO user record for the given auth UID.
 * Returns null if the user has not yet been onboarded (no row exists).
 */
export async function getEchoUser(
  client: EchoSupabaseClient,
  userId: string
): Promise<EchoUser | null> {
  const { data, error } = await client
    .from(TABLES.ECHO_USERS)
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw handleSupabaseError(error);
  return data as EchoUser | null;
}

/**
 * Upsert the ECHO user row. Safe to call on first login and on updates.
 */
export async function upsertEchoUser(
  client: EchoSupabaseClient,
  userId: string,
  data: Partial<Omit<EchoUser, "id" | "created_at" | "updated_at">>
): Promise<EchoUser> {
  const { data: row, error } = await client
    .from(TABLES.ECHO_USERS)
    .upsert({ id: userId, ...data }, { onConflict: "id" })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as EchoUser;
}

// ── avatars ───────────────────────────────────────────────────────────────────

/**
 * Returns all active avatars for the user, newest first.
 */
export async function getUserAvatars(
  client: EchoSupabaseClient,
  userId: string
): Promise<Avatar[]> {
  const { data, error } = await client
    .from(TABLES.AVATARS)
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) throw handleSupabaseError(error);
  return (data ?? []) as Avatar[];
}

/**
 * Returns the most recently created active avatar, or null.
 */
export async function getActiveAvatar(
  client: EchoSupabaseClient,
  userId: string
): Promise<Avatar | null> {
  const { data, error } = await client
    .from(TABLES.AVATARS)
    .select("*")
    .eq("user_id", userId)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw handleSupabaseError(error);
  return data as Avatar | null;
}

// ── sessions ──────────────────────────────────────────────────────────────────

/**
 * Returns completed sessions for the user, newest first.
 * @param limit  Max sessions (default 20, capped at 100).
 */
export async function getUserSessions(
  client: EchoSupabaseClient,
  userId: string,
  limit = 20
): Promise<Session[]> {
  const { data, error } = await client
    .from(TABLES.SESSIONS)
    .select("*")
    .eq("user_id", userId)
    .eq("completed", true)
    .order("created_at", { ascending: false })
    .limit(Math.min(limit, 100));

  if (error) throw handleSupabaseError(error);
  return (data ?? []) as Session[];
}

/**
 * Returns a session with all its exchanges, sorted by sequence.
 * Throws if the session does not exist or belongs to another user (RLS).
 */
export async function getSessionWithExchanges(
  client: EchoSupabaseClient,
  sessionId: string
): Promise<SessionWithExchanges> {
  const { data, error } = await client
    .from(TABLES.SESSIONS)
    .select(`
      *,
      exchanges (
        id,
        sequence,
        avatar_statement_id,
        user_response_type,
        user_response_text,
        user_response_is_custom,
        avatar_reaction_id,
        created_at
      )
    `)
    .eq("id", sessionId)
    .single();

  if (error) throw handleSupabaseError(error);

  const row = data as Session & { exchanges?: Exchange[] };
  return {
    ...row,
    exchanges: (row.exchanges ?? []).sort((a, b) => a.sequence - b.sequence),
  };
}

// ── progress ──────────────────────────────────────────────────────────────────

/**
 * Returns daily progress rows, newest first.
 * Optionally filtered by a date range (inclusive).
 */
export async function getUserProgress(
  client: EchoSupabaseClient,
  userId: string,
  dateRange?: DateRange
): Promise<Progress[]> {
  let query = client
    .from(TABLES.PROGRESS)
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (dateRange) {
    query = query.gte("date", dateRange.from).lte("date", dateRange.to);
  }

  const { data, error } = await query;
  if (error) throw handleSupabaseError(error);
  return (data ?? []) as Progress[];
}

// ── content_library ───────────────────────────────────────────────────────────

/**
 * Returns approved, active content items. Filters are ANDed.
 */
export async function getContentLibrary(
  client: EchoSupabaseClient,
  filters?: ContentFilters
): Promise<ContentItem[]> {
  let query = client
    .from(TABLES.CONTENT_LIBRARY)
    .select("*")
    .eq("is_active", true)
    .eq("clinical_approved", true);

  if (filters?.content_type) {
    const types = Array.isArray(filters.content_type)
      ? filters.content_type
      : [filters.content_type];
    query = query.in("content_type", types);
  }

  if (filters?.phase !== undefined) {
    query = query.or(`phase.eq.${filters.phase},phase.is.null`);
  }

  if (filters?.intensity) {
    const levels = Array.isArray(filters.intensity)
      ? filters.intensity
      : [filters.intensity];
    query = query.in("intensity", levels);
  }

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }

  const { data, error } = await query;
  if (error) throw handleSupabaseError(error);
  return (data ?? []) as ContentItem[];
}
