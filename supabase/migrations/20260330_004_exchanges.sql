-- ─────────────────────────────────────────────────────────────────────────────
-- exchanges
-- Individual back-and-forth turns within a session.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE exchanges (
  id                       UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id               UUID          NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  -- 1-based position within the session
  sequence                 SMALLINT      NOT NULL CHECK (sequence >= 1),
  -- FK into content_library (avatar's statement shown to user)
  avatar_statement_id      UUID          NOT NULL,
  -- Which response type the user chose
  user_response_type       response_type NOT NULL,
  -- Populated only when user_response_is_custom = TRUE
  user_response_text       TEXT          CHECK (char_length(user_response_text) <= 1000),
  user_response_is_custom  BOOLEAN       NOT NULL DEFAULT FALSE,
  -- FK into content_library (avatar's reaction to user's response), nullable
  avatar_reaction_id       UUID,
  created_at               TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  UNIQUE (session_id, sequence)
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_exchanges_session_id ON exchanges (session_id);
CREATE INDEX idx_exchanges_session_seq ON exchanges (session_id, sequence);

-- ── RLS ───────────────────────────────────────────────────────────────────────
-- Users may access exchanges that belong to their own sessions.
-- We join through sessions to avoid storing user_id redundantly.

ALTER TABLE exchanges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "exchanges: select via own session"
  ON exchanges FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = exchanges.session_id
        AND sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "exchanges: insert via own session"
  ON exchanges FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM sessions
      WHERE sessions.id = exchanges.session_id
        AND sessions.user_id = auth.uid()
        AND sessions.completed = FALSE
    )
  );

-- Exchanges are immutable once written — no UPDATE or DELETE policies.
