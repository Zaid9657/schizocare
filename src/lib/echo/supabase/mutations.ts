// ─────────────────────────────────────────────────────────────────────────────
// ECHO Supabase Mutations (write operations)
// All functions require an authenticated Supabase client.
// RLS policies enforce ownership — users can only mutate their own rows.
//
// Return types are cast explicitly because we use an untyped client.
// When Supabase codegen is wired up, replace casts with generic inference.
// ─────────────────────────────────────────────────────────────────────────────

import type { EchoSupabaseClient } from "./client";
import type {
  Avatar,
  AvatarInsert,
  AvatarUpdate,
  Session,
  SessionInsert,
  SessionUpdate,
  Exchange,
  ExchangeInsert,
  Progress,
  SafetyEvent,
  SafetyEventInsert,
  UserResponse,
  UserResponseInsert,
  EchoPhase,
  ResponseTypeCounts,
} from "./types";
import { TABLES } from "./types";
import { handleSupabaseError } from "./utils";

// ── Avatars ───────────────────────────────────────────────────────────────────

/**
 * Creates a new avatar. The DB trigger enforces a max of 5 active per user.
 */
export async function createAvatar(
  client: EchoSupabaseClient,
  userId: string,
  config: Omit<AvatarInsert, "user_id">
): Promise<Avatar> {
  const { data, error } = await client
    .from(TABLES.AVATARS)
    .insert({ ...config, user_id: userId })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data as Avatar;
}

/**
 * Updates fields on an existing avatar. Only the owner can update (RLS).
 */
export async function updateAvatar(
  client: EchoSupabaseClient,
  avatarId: string,
  config: AvatarUpdate
): Promise<Avatar> {
  const { data, error } = await client
    .from(TABLES.AVATARS)
    .update(config)
    .eq("id", avatarId)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return data as Avatar;
}

/**
 * Soft-deletes an avatar by setting is_active = false.
 * Hard delete is avoided to preserve session history FK integrity.
 */
export async function deleteAvatar(
  client: EchoSupabaseClient,
  avatarId: string
): Promise<void> {
  const { error } = await client
    .from(TABLES.AVATARS)
    .update({ is_active: false })
    .eq("id", avatarId);

  if (error) throw handleSupabaseError(error);
}

/**
 * Marks an avatar as active. Does NOT deactivate others.
 */
export async function setActiveAvatar(
  client: EchoSupabaseClient,
  userId: string,
  avatarId: string
): Promise<void> {
  const { error } = await client
    .from(TABLES.AVATARS)
    .update({ is_active: true })
    .eq("id", avatarId)
    .eq("user_id", userId);

  if (error) throw handleSupabaseError(error);
}

// ── Sessions ──────────────────────────────────────────────────────────────────

/**
 * Opens a new session record. `completed` defaults to false in the DB.
 */
export async function createSession(
  client: EchoSupabaseClient,
  data: SessionInsert
): Promise<Session> {
  const { data: row, error } = await client
    .from(TABLES.SESSIONS)
    .insert(data)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as Session;
}

/**
 * Updates a session. Set `{ completed: true, completed_at: ... }` to close it.
 * The DB trigger increments the user's session_count automatically.
 */
export async function updateSession(
  client: EchoSupabaseClient,
  sessionId: string,
  data: SessionUpdate
): Promise<Session> {
  const { data: row, error } = await client
    .from(TABLES.SESSIONS)
    .update(data)
    .eq("id", sessionId)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as Session;
}

// ── Exchanges ─────────────────────────────────────────────────────────────────

/**
 * Records a single dialogue exchange within a session.
 * RLS enforces the session is not yet completed.
 */
export async function createExchange(
  client: EchoSupabaseClient,
  data: ExchangeInsert
): Promise<Exchange> {
  const { data: row, error } = await client
    .from(TABLES.EXCHANGES)
    .insert(data)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as Exchange;
}

// ── Progress ──────────────────────────────────────────────────────────────────

/**
 * Upserts a daily progress record. For atomic increments, prefer the
 * DB's `upsert_daily_progress` RPC. This handles full-row inserts/updates.
 */
export async function upsertDailyProgress(
  client: EchoSupabaseClient,
  userId: string,
  date: string,
  data: {
    sessions_completed?:     number;
    total_duration_seconds?: number;
    response_types_used?:    ResponseTypeCounts;
    avg_mood_improvement?:   number | null;
    phase?:                  EchoPhase;
    streak_days?:            number;
    milestones_earned?:      string[];
  }
): Promise<Progress> {
  const { data: row, error } = await client
    .from(TABLES.PROGRESS)
    .upsert(
      { user_id: userId, date, ...data },
      { onConflict: "user_id,date" }
    )
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as Progress;
}

// ── Safety events ─────────────────────────────────────────────────────────────

/**
 * Appends an immutable safety event. DB triggers block UPDATE/DELETE.
 */
export async function logSafetyEvent(
  client: EchoSupabaseClient,
  data: SafetyEventInsert
): Promise<SafetyEvent> {
  const { data: row, error } = await client
    .from(TABLES.SAFETY_EVENTS)
    .insert(data)
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as SafetyEvent;
}

// ── User responses ────────────────────────────────────────────────────────────

/**
 * Saves a user response (preset or custom) to their library.
 */
export async function saveUserResponse(
  client: EchoSupabaseClient,
  userId: string,
  data: Omit<UserResponseInsert, "user_id">
): Promise<UserResponse> {
  const { data: row, error } = await client
    .from(TABLES.USER_RESPONSES)
    .insert({ ...data, user_id: userId })
    .select()
    .single();

  if (error) throw handleSupabaseError(error);
  return row as UserResponse;
}

/**
 * Toggles the `is_favorite` flag on a user response.
 */
export async function toggleFavorite(
  client: EchoSupabaseClient,
  userId: string,
  responseId: string
): Promise<void> {
  const { data: current, error: fetchError } = await client
    .from(TABLES.USER_RESPONSES)
    .select("is_favorite")
    .eq("id", responseId)
    .eq("user_id", userId)
    .single();

  if (fetchError) throw handleSupabaseError(fetchError);

  const row = current as { is_favorite: boolean };
  const { error: updateError } = await client
    .from(TABLES.USER_RESPONSES)
    .update({ is_favorite: !row.is_favorite })
    .eq("id", responseId)
    .eq("user_id", userId);

  if (updateError) throw handleSupabaseError(updateError);
}

/**
 * Increments use_count for a saved response.
 * Tries the `increment_response_use_count` RPC first, falls back to
 * read-modify-write if the RPC doesn't exist yet.
 */
export async function incrementResponseUseCount(
  client: EchoSupabaseClient,
  responseId: string,
  userId: string
): Promise<void> {
  const { error } = await client.rpc("increment_response_use_count", {
    p_response_id: responseId,
    p_user_id:     userId,
  });

  if (error) {
    // Fallback: read-modify-write
    const { data, error: fetchError } = await client
      .from(TABLES.USER_RESPONSES)
      .select("use_count")
      .eq("id", responseId)
      .eq("user_id", userId)
      .single();

    if (fetchError) throw handleSupabaseError(fetchError);

    const row = data as { use_count: number };
    const { error: updateError } = await client
      .from(TABLES.USER_RESPONSES)
      .update({ use_count: (row.use_count ?? 0) + 1 })
      .eq("id", responseId)
      .eq("user_id", userId);

    if (updateError) throw handleSupabaseError(updateError);
  }
}
