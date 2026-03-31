// ─────────────────────────────────────────────
// ECHO — Voice Dialogue Therapy Types
// ─────────────────────────────────────────────

export type Locale = "en" | "de";

// ── Avatar ───────────────────────────────────

export type AvatarPersonality =
  | "critical"
  | "protective"
  | "fearful"
  | "nurturing"
  | "commanding"
  | "neutral";

export type AvatarGender = "neutral" | "male" | "female";

export interface AvatarVisualConfig {
  shape: "circle" | "square" | "organic";
  primaryColor: string;
  secondaryColor: string;
  iconKey: string; // maps to an SVG/emoji key
  size: "small" | "medium" | "large";
  animationStyle: "pulse" | "breathe" | "static";
}

export interface AvatarVoiceConfig {
  pitch: number; // 0.5 – 2.0
  rate: number; // 0.5 – 2.0
  volume: number; // 0.0 – 1.0
  useTextOnly: boolean; // accessibility: skip audio
}

export interface Avatar {
  id: string;
  visitorId: string; // FK → anonymous visitor
  name: string; // user-chosen
  personality: AvatarPersonality;
  gender: AvatarGender;
  visualConfig: AvatarVisualConfig;
  voiceConfig: AvatarVoiceConfig;
  isActive: boolean;
  createdAt: string; // ISO date string
  lastSeenAt: string | null;
  notesUser: string | null; // private user notes about this voice
}

// ── Session ──────────────────────────────────

export type SessionType =
  | "introduction"  // first contact, psychoeducation
  | "exploration"   // learn what the voice says / needs
  | "negotiation"   // find common ground
  | "integration";  // long-term relationship building

export type SessionPhase =
  | "grounding"    // start: safety check
  | "dialogue"     // main exchange
  | "reflection"   // what did we notice?
  | "closing";     // debrief & grounding out

export type SessionStatus = "active" | "completed" | "abandoned";

export interface MoodRating {
  score: number; // 1 – 10
  label: string; // "anxious", "calm", etc.
  timestamp: string;
}

export interface Session {
  id: string;
  avatarId: string;
  visitorId: string;
  sessionType: SessionType;
  phase: SessionPhase;
  status: SessionStatus;
  locale: Locale;
  moodBefore: MoodRating | null;
  moodAfter: MoodRating | null;
  startedAt: string;
  completedAt: string | null;
  durationSeconds: number | null;
  exchangeCount: number;
  therapistNotes: string | null; // populated by future clinician dashboard
  safetyFlagRaised: boolean;
}

// ── Exchange ─────────────────────────────────

export type UserResponseType =
  | "empathy"       // "I hear you"
  | "curiosity"     // "Tell me more"
  | "boundary"      // "I don't accept that"
  | "agreement"     // "You may be right"
  | "grounding"     // user triggered grounding mid-session
  | "skip"          // user skipped this exchange
  | "custom";       // free-text (future)

export interface Exchange {
  id: string;
  sessionId: string;
  sequence: number; // 1-based position in session
  avatarStatementId: string; // FK → ContentItem
  avatarStatementText: string; // resolved text at time of exchange
  userResponseType: UserResponseType;
  userResponseText: string | null; // for "custom" type
  durationSeconds: number | null; // time user spent before responding
  distressLevel: number | null; // 1–10, optional mid-exchange check
  createdAt: string;
}

// ── Content ──────────────────────────────────

export type ContentPhase = SessionType; // reuse same union

export type ContentCategory =
  | "greeting"
  | "accusation"
  | "demand"
  | "fear_expression"
  | "protective_statement"
  | "command"
  | "reflection_prompt"
  | "closing_statement";

export interface ContentItem {
  id: string;
  contentType: "avatar_statement" | "therapist_prompt" | "user_option";
  phase: ContentPhase;
  category: ContentCategory;
  personalityTags: AvatarPersonality[]; // which personalities use this
  textEn: string;
  textDe: string;
  intensityLevel: 1 | 2 | 3; // 1=mild, 2=moderate, 3=intense
  followUpIds: string[]; // IDs of appropriate follow-up ContentItems
  requiresGrounding: boolean; // flag for high-distress content
}

// ── Dialogue Context ─────────────────────────

export interface DialogueContext {
  sessionId: string;
  avatarId: string;
  phase: SessionPhase;
  sessionType: SessionType;
  exchangeCount: number;
  recentDistressLevel: number | null;
  groundingTriggeredCount: number;
  locale: Locale;
  lastUserResponseType: UserResponseType | null;
  avatarName: string;
  avatarPersonality: AvatarPersonality;
}

// ── User Progress ─────────────────────────────

export type ECHOPhaseProgress =
  | "not_started"
  | "introduction_complete"
  | "exploration_complete"
  | "negotiation_complete"
  | "integration_active";

export interface UserProgress {
  visitorId: string;
  sessionCount: number;
  completedSessionCount: number;
  phaseProgress: ECHOPhaseProgress;
  currentStreak: number; // consecutive days with a session
  longestStreak: number;
  totalMinutes: number;
  averageMoodBefore: number | null;
  averageMoodAfter: number | null;
  moodImprovementTrend: "improving" | "stable" | "declining" | null;
  lastSessionAt: string | null;
  badges: ECHOBadge[];
}

export type ECHOBadgeType =
  | "first_session"
  | "three_sessions"
  | "ten_sessions"
  | "first_boundary"
  | "mood_improvement"
  | "week_streak";

export interface ECHOBadge {
  type: ECHOBadgeType;
  earnedAt: string;
}

// ── Grounding ────────────────────────────────

export type GroundingTechniqueType =
  | "five_senses"    // 5-4-3-2-1
  | "box_breathing"  // 4-4-4-4
  | "body_scan"
  | "safe_place"
  | "cold_water";    // physiological sigh / cold water

export interface GroundingSession {
  id: string;
  visitorId: string;
  techniqueType: GroundingTechniqueType;
  triggeredFromSessionId: string | null;
  durationSeconds: number;
  distressBefore: number | null; // 1–10
  distressAfter: number | null;
  completedAt: string;
}

// ── Dialogue Engine ───────────────────────────────────────────────────────────

/**
 * One complete turn: the avatar's reaction to the user's response,
 * plus the next hostile statement (null if the session should close).
 */
export interface AvatarTurn {
  reactionText:      string;
  reactionId:        string;
  nextStatementText: string | null;
  nextStatementId:   string | null;
  /** True when the engine recommends ending the session */
  suggestClose:      boolean;
}

/**
 * Summary returned by endSession() after the user confirms the win statement.
 */
export interface SessionSummary {
  sessionId:        string;
  durationSeconds:  number;
  exchangeCount:    number;
  moodBefore:       number;
  moodAfter:        number;
  moodImprovement:  number;
  winStatementId:   string;
  winStatementText: string;
  locale:           string;
}

// ── UI State ─────────────────────────────────

export interface ECHOUIState {
  isSessionActive: boolean;
  isSafetyCheckVisible: boolean;
  isGroundingVisible: boolean;
  isAvatarAnimating: boolean;
  currentPhase: SessionPhase | null;
  textSpeed: "slow" | "normal" | "fast";
  highContrastMode: boolean;
  reducedMotion: boolean;
}
