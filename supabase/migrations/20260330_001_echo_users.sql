-- ─────────────────────────────────────────────────────────────────────────────
-- echo_users
-- One row per authenticated user. Tracks ECHO-specific state and preferences.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE echo_users (
  id                UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  echo_onboarded_at TIMESTAMPTZ,
  current_phase     echo_phase  NOT NULL DEFAULT 'EARLY',
  session_count     INT         NOT NULL DEFAULT 0 CHECK (session_count >= 0),
  -- Stores locale, reduced-motion, text-speed, high-contrast, etc.
  preferences       JSONB       NOT NULL DEFAULT '{}',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Keep updated_at current automatically
CREATE OR REPLACE FUNCTION echo_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER echo_users_updated_at
  BEFORE UPDATE ON echo_users
  FOR EACH ROW EXECUTE FUNCTION echo_set_updated_at();

-- ── RLS ───────────────────────────────────────────────────────────────────────

ALTER TABLE echo_users ENABLE ROW LEVEL SECURITY;

-- Users can read their own row
CREATE POLICY "echo_users: select own"
  ON echo_users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own row (sign-up flow)
CREATE POLICY "echo_users: insert own"
  ON echo_users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own row
CREATE POLICY "echo_users: update own"
  ON echo_users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- No DELETE — soft-delete via auth.users cascade handles removal
