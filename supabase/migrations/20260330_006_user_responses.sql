-- ─────────────────────────────────────────────────────────────────────────────
-- user_responses
-- User's saved/favourite responses — both preset picks and custom text.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE user_responses (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID          NOT NULL REFERENCES echo_users(id) ON DELETE CASCADE,
  response_type response_type NOT NULL,
  -- For preset responses: maps to content_library.id. NULL for fully custom.
  content_id    UUID          REFERENCES content_library(id) ON DELETE SET NULL,
  -- The actual text shown/spoken (may differ from content_library if customised)
  text          TEXT          NOT NULL CHECK (char_length(text) BETWEEN 1 AND 1000),
  is_custom     BOOLEAN       NOT NULL DEFAULT FALSE,
  -- How many times the user has used this response across sessions
  use_count     INT           NOT NULL DEFAULT 0 CHECK (use_count >= 0),
  is_favorite   BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_user_responses_user_id       ON user_responses (user_id);
CREATE INDEX idx_user_responses_user_favorite ON user_responses (user_id, is_favorite) WHERE is_favorite = TRUE;
CREATE INDEX idx_user_responses_user_type     ON user_responses (user_id, response_type);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE user_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_responses: select own"
  ON user_responses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_responses: insert own"
  ON user_responses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_responses: update own"
  ON user_responses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_responses: delete own"
  ON user_responses FOR DELETE
  USING (auth.uid() = user_id);
