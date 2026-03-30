-- ─────────────────────────────────────────────────────────────────────────────
-- avatars
-- Visual/voice representations of the voices a user works with.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE avatars (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID        NOT NULL REFERENCES echo_users(id) ON DELETE CASCADE,
  name          TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  -- shape, primaryColor, iconKey, animationStyle, etc.
  visual_config JSONB       NOT NULL DEFAULT '{}',
  -- pitch, rate, volume, useTextOnly
  voice_config  JSONB       NOT NULL DEFAULT '{"useTextOnly": true}',
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enforce maximum 5 active avatars per user at the DB level
CREATE OR REPLACE FUNCTION check_avatar_limit()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF (
    SELECT COUNT(*) FROM avatars
    WHERE user_id = NEW.user_id AND is_active = TRUE
  ) >= 5 THEN
    RAISE EXCEPTION 'Maximum of 5 active avatars per user';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER avatars_limit_check
  BEFORE INSERT ON avatars
  FOR EACH ROW EXECUTE FUNCTION check_avatar_limit();

CREATE TRIGGER avatars_updated_at
  BEFORE UPDATE ON avatars
  FOR EACH ROW EXECUTE FUNCTION echo_set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_avatars_user_id ON avatars (user_id);
CREATE INDEX idx_avatars_user_active ON avatars (user_id, is_active);

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE avatars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "avatars: select own"
  ON avatars FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "avatars: insert own"
  ON avatars FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "avatars: update own"
  ON avatars FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "avatars: delete own"
  ON avatars FOR DELETE
  USING (auth.uid() = user_id);
