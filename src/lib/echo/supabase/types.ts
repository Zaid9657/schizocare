// ─────────────────────────────────────────────────────────────────────────────
// ECHO Supabase Types
// Hand-written to match the 9 migration files exactly.
// Update here whenever a migration adds/renames a column.
// ─────────────────────────────────────────────────────────────────────────────

// ── ENUM types ────────────────────────────────────────────────────────────────

export type EchoPhase = "EARLY" | "MIDDLE" | "LATE";

export type SessionType =
  | "GUIDED"
  | "FREE"
  | "QUICK"
  | "SKILL_FOCUS"
  | "CHALLENGE";

export type ResponseType =
  | "ASSERTIVE"
  | "DEFUSION"
  | "CHALLENGE"
  | "VALUES"
  | "SELF_COMPASSION"
  | "BOUNDARY";

export type ContentType =
  | "AVATAR_HOSTILE"
  | "AVATAR_SOFTENING"
  | "AVATAR_TRANSFORMING"
  | "AVATAR_REACTION"
  | "USER_RESPONSE"
  | "WIN_STATEMENT";

export type IntensityLevel = "MILD" | "MODERATE" | "INTENSE";

export type SafetyEventType =
  | "STRESS_BUTTON"
  | "CRISIS_KEYWORD"
  | "MOOD_DROP"
  | "EXTENDED_USE";

export type SafetyAction =
  | "GROUNDING_SHOWN"
  | "RESOURCES_SHOWN"
  | "SESSION_ENDED"
  | "NONE";

// ── echo_users ────────────────────────────────────────────────────────────────

export interface EchoUserPreferences {
  locale?:          string;
  reducedMotion?:   boolean;
  textSpeed?:       "slow" | "normal" | "fast";
  highContrast?:    boolean;
  [key: string]:    unknown;
}

export interface EchoUser {
  id:                string;   // UUID — matches auth.users(id)
  echo_onboarded_at: string | null;  // TIMESTAMPTZ
  current_phase:     EchoPhase;
  session_count:     number;
  preferences:       EchoUserPreferences;
  created_at:        string;   // TIMESTAMPTZ
  updated_at:        string;   // TIMESTAMPTZ
}

// Insert type — id must match the authenticated user's UID
export type EchoUserInsert = Omit<EchoUser, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type EchoUserUpdate = Partial<
  Omit<EchoUser, "id" | "created_at" | "updated_at">
>;

// ── avatars ───────────────────────────────────────────────────────────────────

export interface AvatarVisualConfig {
  shape?:          "circle" | "square" | "diamond";
  primaryColor?:   string;
  secondaryColor?: string;
  iconKey?:        string;
  size?:           "small" | "medium" | "large";
  animationStyle?: "pulse" | "bounce" | "static";
  [key: string]:   unknown;
}

export interface AvatarVoiceConfig {
  pitch?:       number;
  rate?:        number;
  volume?:      number;
  useTextOnly?: boolean;
  [key: string]: unknown;
}

export interface Avatar {
  id:            string;    // UUID
  user_id:       string;    // UUID → echo_users
  name:          string;
  visual_config: AvatarVisualConfig;
  voice_config:  AvatarVoiceConfig;
  is_active:     boolean;
  created_at:    string;    // TIMESTAMPTZ
  updated_at:    string;    // TIMESTAMPTZ
}

export type AvatarInsert = Omit<Avatar, "id" | "created_at" | "updated_at"> & {
  id?:         string;
  created_at?: string;
  updated_at?: string;
};

export type AvatarUpdate = Partial<
  Omit<Avatar, "id" | "user_id" | "created_at" | "updated_at">
>;

// ── sessions ──────────────────────────────────────────────────────────────────

export interface Session {
  id:                      string;       // UUID
  user_id:                 string;       // UUID → echo_users
  avatar_id:               string;       // UUID → avatars
  session_type:            SessionType;
  phase_at_start:          EchoPhase;
  mood_before:             number | null; // 1–10
  mood_after:              number | null; // 1–10
  target_duration_minutes: number | null;
  actual_duration_seconds: number | null;
  exchange_count:          number;
  completed:               boolean;
  ended_positively:        boolean | null;
  stress_button_used:      boolean;
  created_at:              string;       // TIMESTAMPTZ
  completed_at:            string | null; // TIMESTAMPTZ
}

export type SessionInsert = Omit<Session, "id" | "created_at"> & {
  id?:         string;
  created_at?: string;
};

export type SessionUpdate = Partial<
  Omit<Session, "id" | "user_id" | "created_at">
>;

// ── exchanges ─────────────────────────────────────────────────────────────────

export interface Exchange {
  id:                     string;        // UUID
  session_id:             string;        // UUID → sessions
  sequence:               number;        // 1-based
  avatar_statement_id:    string;        // UUID → content_library
  user_response_type:     ResponseType;
  user_response_text:     string | null; // populated when user_response_is_custom
  user_response_is_custom: boolean;
  avatar_reaction_id:     string | null; // UUID → content_library
  created_at:             string;        // TIMESTAMPTZ
}

export type ExchangeInsert = Omit<Exchange, "id" | "created_at"> & {
  id?:         string;
  created_at?: string;
};

// Exchanges are immutable once written — no update type needed.

// ── content_library ───────────────────────────────────────────────────────────

export interface ContentItem {
  id:                string;           // UUID
  content_type:      ContentType;
  phase:             EchoPhase | null; // NULL = all phases
  category:          string;
  text_en:           string;
  text_de:           string;
  audio_url_en:      string | null;
  audio_url_de:      string | null;
  intensity:         IntensityLevel;
  is_active:         boolean;
  clinical_approved: boolean;
  created_at:        string;           // TIMESTAMPTZ
}

export interface ContentFilters {
  content_type?: ContentType | ContentType[];
  phase?:        EchoPhase;
  intensity?:    IntensityLevel | IntensityLevel[];
  category?:     string;
}

// ── user_responses ────────────────────────────────────────────────────────────

export interface UserResponse {
  id:            string;        // UUID
  user_id:       string;        // UUID → echo_users
  response_type: ResponseType;
  content_id:    string | null; // UUID → content_library (null for fully custom)
  text:          string;
  is_custom:     boolean;
  use_count:     number;
  is_favorite:   boolean;
  created_at:    string;        // TIMESTAMPTZ
}

export type UserResponseInsert = Omit<UserResponse, "id" | "created_at"> & {
  id?:         string;
  created_at?: string;
};

export type UserResponseUpdate = Partial<
  Omit<UserResponse, "id" | "user_id" | "created_at">
>;

// ── progress ──────────────────────────────────────────────────────────────────

export type ResponseTypeCounts = Partial<Record<ResponseType, number>>;

export interface Progress {
  id:                    string;              // UUID
  user_id:               string;              // UUID → echo_users
  date:                  string;              // DATE as "YYYY-MM-DD"
  sessions_completed:    number;
  total_duration_seconds: number;
  response_types_used:   ResponseTypeCounts;
  avg_mood_improvement:  number | null;
  phase:                 EchoPhase;
  streak_days:           number;
  milestones_earned:     string[];
}

export type ProgressInsert = Omit<Progress, "id"> & { id?: string };
export type ProgressUpdate = Partial<Omit<Progress, "id" | "user_id" | "date">>;

export interface DateRange {
  from: string; // ISO date string "YYYY-MM-DD"
  to:   string; // ISO date string "YYYY-MM-DD"
}

// ── safety_events ─────────────────────────────────────────────────────────────

export interface SafetyEventDetails {
  mood_score?:    number;
  keyword?:       string;
  exchange_count?: number;
  distress_level?: "low" | "moderate" | "high";
  [key: string]:  unknown;
}

export interface SafetyEvent {
  id:           string;            // UUID
  user_id:      string;            // UUID → echo_users
  session_id:   string | null;     // UUID → sessions
  event_type:   SafetyEventType;
  details:      SafetyEventDetails;
  action_taken: SafetyAction;
  created_at:   string;            // TIMESTAMPTZ
}

// Insert only — rows are immutable (no update type)
export type SafetyEventInsert = Omit<SafetyEvent, "id" | "created_at"> & {
  id?:         string;
  created_at?: string;
};

// ── Session with exchanges (joined type) ─────────────────────────────────────

export type SessionWithExchanges = Session & { exchanges: Exchange[] };

// ── Table name constants ──────────────────────────────────────────────────────
// Use these instead of raw strings to get typo protection.

export const TABLES = {
  ECHO_USERS:      "echo_users",
  AVATARS:         "avatars",
  SESSIONS:        "sessions",
  EXCHANGES:       "exchanges",
  CONTENT_LIBRARY: "content_library",
  USER_RESPONSES:  "user_responses",
  PROGRESS:        "progress",
  SAFETY_EVENTS:   "safety_events",
} as const;
