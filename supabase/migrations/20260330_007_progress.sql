-- ─────────────────────────────────────────────────────────────────────────────
-- progress
-- Daily roll-up snapshot. One row per user per day.
-- Written by a trigger on session completion (or by a scheduled function).
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE progress (
  id                    UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID        NOT NULL REFERENCES echo_users(id) ON DELETE CASCADE,
  -- Calendar date this row represents (UTC)
  date                  DATE        NOT NULL,
  sessions_completed    SMALLINT    NOT NULL DEFAULT 0 CHECK (sessions_completed >= 0),
  total_duration_seconds INT        NOT NULL DEFAULT 0 CHECK (total_duration_seconds >= 0),
  -- e.g. {"ASSERTIVE": 3, "DEFUSION": 1}
  response_types_used   JSONB       NOT NULL DEFAULT '{}',
  -- NULL if no paired mood scores for the day
  avg_mood_improvement  NUMERIC(4,2),
  phase                 echo_phase  NOT NULL DEFAULT 'EARLY',
  -- Running streak count as of this day
  streak_days           SMALLINT    NOT NULL DEFAULT 0 CHECK (streak_days >= 0),
  -- e.g. ['first_session', 'week_streak']
  milestones_earned     TEXT[]      NOT NULL DEFAULT '{}',

  UNIQUE (user_id, date)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_progress_user_date  ON progress (user_id, date DESC);
CREATE INDEX idx_progress_user_phase ON progress (user_id, phase);

-- ── Upsert helper function ────────────────────────────────────────────────────
-- Called after a session is completed to roll up the day's progress.

CREATE OR REPLACE FUNCTION upsert_daily_progress(
  p_user_id               UUID,
  p_date                  DATE,
  p_duration_seconds      INT,
  p_mood_improvement      NUMERIC,
  p_response_types        JSONB,
  p_phase                 echo_phase,
  p_streak_days           SMALLINT,
  p_milestones            TEXT[]
)
RETURNS VOID LANGUAGE plpgsql AS $$
BEGIN
  INSERT INTO progress (
    user_id, date, sessions_completed, total_duration_seconds,
    response_types_used, avg_mood_improvement, phase,
    streak_days, milestones_earned
  )
  VALUES (
    p_user_id, p_date, 1, p_duration_seconds,
    p_response_types, p_mood_improvement, p_phase,
    p_streak_days, p_milestones
  )
  ON CONFLICT (user_id, date) DO UPDATE SET
    sessions_completed    = progress.sessions_completed + 1,
    total_duration_seconds = progress.total_duration_seconds + EXCLUDED.total_duration_seconds,
    -- Merge response type counts
    response_types_used   = (
      SELECT jsonb_object_agg(key, COALESCE((progress.response_types_used->>key)::INT, 0)
                                   + COALESCE((EXCLUDED.response_types_used->>key)::INT, 0))
      FROM jsonb_object_keys(
        progress.response_types_used || EXCLUDED.response_types_used
      ) AS key
    ),
    avg_mood_improvement  = CASE
      WHEN EXCLUDED.avg_mood_improvement IS NULL THEN progress.avg_mood_improvement
      WHEN progress.avg_mood_improvement IS NULL THEN EXCLUDED.avg_mood_improvement
      ELSE ROUND(
        (progress.avg_mood_improvement * progress.sessions_completed
         + EXCLUDED.avg_mood_improvement)
        / (progress.sessions_completed + 1), 2
      )
    END,
    streak_days           = EXCLUDED.streak_days,
    milestones_earned     = (
      SELECT ARRAY_AGG(DISTINCT m)
      FROM UNNEST(progress.milestones_earned || EXCLUDED.milestones_earned) AS m
    );
END;
$$;

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress: select own"
  ON progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "progress: insert own"
  ON progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress: update own"
  ON progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
