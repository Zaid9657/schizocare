-- ─────────────────────────────────────────────────────────────────────────────
-- ECHO shared ENUM types
-- Must run before any table migrations that reference these types.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TYPE echo_phase AS ENUM ('EARLY', 'MIDDLE', 'LATE');

CREATE TYPE session_type AS ENUM (
  'GUIDED',
  'FREE',
  'QUICK',
  'SKILL_FOCUS',
  'CHALLENGE'
);

CREATE TYPE response_type AS ENUM (
  'ASSERTIVE',
  'DEFUSION',
  'CHALLENGE',
  'VALUES',
  'SELF_COMPASSION',
  'BOUNDARY'
);

CREATE TYPE content_type AS ENUM (
  'AVATAR_HOSTILE',
  'AVATAR_SOFTENING',
  'AVATAR_TRANSFORMING',
  'AVATAR_REACTION',
  'USER_RESPONSE',
  'WIN_STATEMENT'
);

CREATE TYPE intensity_level AS ENUM ('MILD', 'MODERATE', 'INTENSE');

CREATE TYPE safety_event_type AS ENUM (
  'STRESS_BUTTON',
  'CRISIS_KEYWORD',
  'MOOD_DROP',
  'EXTENDED_USE'
);

CREATE TYPE safety_action AS ENUM (
  'GROUNDING_SHOWN',
  'RESOURCES_SHOWN',
  'SESSION_ENDED',
  'NONE'
);
