-- ─────────────────────────────────────────────────────────────────────────────
-- safety_events
-- Immutable audit log of safety-relevant events during ECHO sessions.
-- Rows are never updated or deleted — append-only.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE safety_events (
  id           UUID               PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID               NOT NULL REFERENCES echo_users(id) ON DELETE CASCADE,
  -- NULL if triggered outside a session (e.g. standalone grounding)
  session_id   UUID               REFERENCES sessions(id) ON DELETE SET NULL,
  event_type   safety_event_type  NOT NULL,
  -- Flexible bag: mood score, keyword matched, distress rating, exchange count, etc.
  details      JSONB              NOT NULL DEFAULT '{}',
  action_taken safety_action      NOT NULL DEFAULT 'NONE',
  created_at   TIMESTAMPTZ        NOT NULL DEFAULT NOW()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_safety_events_user_id    ON safety_events (user_id);
CREATE INDEX idx_safety_events_session_id ON safety_events (session_id);
CREATE INDEX idx_safety_events_user_date  ON safety_events (user_id, created_at DESC);
CREATE INDEX idx_safety_events_type       ON safety_events (event_type);

-- ── Prevent updates and deletes (append-only table) ──────────────────────────

CREATE OR REPLACE FUNCTION deny_safety_event_mutation()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'safety_events rows are immutable';
END;
$$;

CREATE TRIGGER safety_events_no_update
  BEFORE UPDATE ON safety_events
  FOR EACH ROW EXECUTE FUNCTION deny_safety_event_mutation();

CREATE TRIGGER safety_events_no_delete
  BEFORE DELETE ON safety_events
  FOR EACH ROW EXECUTE FUNCTION deny_safety_event_mutation();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE safety_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "safety_events: select own"
  ON safety_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "safety_events: insert own"
  ON safety_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- No UPDATE or DELETE policies — the triggers above enforce immutability
-- even if a policy were accidentally added.
