-- ─────────────────────────────────────────────────────────────────────────────
-- sessions
-- Each ECHO therapy session. Linked to one avatar and one user.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE sessions (
  id                       UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID         NOT NULL REFERENCES echo_users(id) ON DELETE CASCADE,
  avatar_id                UUID         NOT NULL REFERENCES avatars(id) ON DELETE RESTRICT,
  session_type             session_type NOT NULL DEFAULT 'GUIDED',
  -- Phase the user was in when the session began
  phase_at_start           echo_phase   NOT NULL DEFAULT 'EARLY',
  -- Mood scores: 1 (very distressed) – 10 (very good)
  mood_before              SMALLINT     CHECK (mood_before BETWEEN 1 AND 10),
  mood_after               SMALLINT     CHECK (mood_after  BETWEEN 1 AND 10),
  target_duration_minutes  SMALLINT     CHECK (target_duration_minutes > 0),
  actual_duration_seconds  INT          CHECK (actual_duration_seconds >= 0),
  exchange_count           SMALLINT     NOT NULL DEFAULT 0 CHECK (exchange_count >= 0),
  completed                BOOLEAN      NOT NULL DEFAULT FALSE,
  -- TRUE if user ended session via normal flow (not crisis/abandon)
  ended_positively         BOOLEAN,
  -- Whether the user pressed the stress/grounding button during the session
  stress_button_used       BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at               TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  completed_at             TIMESTAMPTZ,

  CONSTRAINT completed_at_requires_completed
    CHECK (completed_at IS NULL OR completed = TRUE)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_sessions_user_id         ON sessions (user_id);
CREATE INDEX idx_sessions_avatar_id       ON sessions (avatar_id);
CREATE INDEX idx_sessions_user_created    ON sessions (user_id, created_at DESC);
CREATE INDEX idx_sessions_user_completed  ON sessions (user_id, completed) WHERE completed = TRUE;

-- ── Auto-increment session_count on echo_users ────────────────────────────────

CREATE OR REPLACE FUNCTION increment_user_session_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.completed = TRUE AND (OLD.completed IS DISTINCT FROM TRUE) THEN
    UPDATE echo_users
    SET session_count = session_count + 1,
        updated_at    = NOW()
    WHERE id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER sessions_increment_count
  AFTER UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION increment_user_session_count();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sessions: select own"
  ON sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "sessions: insert own"
  ON sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sessions: update own"
  ON sessions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Allow delete only for incomplete/abandoned sessions
CREATE POLICY "sessions: delete own incomplete"
  ON sessions FOR DELETE
  USING (auth.uid() = user_id AND completed = FALSE);
