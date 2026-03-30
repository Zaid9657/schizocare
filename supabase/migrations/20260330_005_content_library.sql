-- ─────────────────────────────────────────────────────────────────────────────
-- content_library
-- Clinician-managed dialogue content. Public read for active+approved rows.
-- No user-facing RLS write; content is managed by staff/migrations only.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE content_library (
  id                UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type      content_type    NOT NULL,
  -- Which ECHO phase this content appears in (NULL = all phases)
  phase             echo_phase,
  -- Semantic grouping: 'greeting', 'accusation', 'demand', 'reflection', etc.
  category          TEXT            NOT NULL CHECK (char_length(category) <= 60),
  text_en           TEXT            NOT NULL,
  text_de           TEXT            NOT NULL,
  audio_url_en      TEXT,
  audio_url_de      TEXT,
  intensity         intensity_level NOT NULL DEFAULT 'MILD',
  is_active         BOOLEAN         NOT NULL DEFAULT TRUE,
  -- Must be TRUE before content can surface in live sessions
  clinical_approved BOOLEAN         NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ── Indexes ───────────────────────────────────────────────────────────────────

CREATE INDEX idx_content_type_phase
  ON content_library (content_type, phase)
  WHERE is_active = TRUE AND clinical_approved = TRUE;

CREATE INDEX idx_content_intensity
  ON content_library (intensity)
  WHERE is_active = TRUE AND clinical_approved = TRUE;

-- ── RLS: public read for approved active content, no user writes ──────────────

ALTER TABLE content_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "content_library: public read approved"
  ON content_library FOR SELECT
  USING (is_active = TRUE AND clinical_approved = TRUE);

-- ── Seed data ─────────────────────────────────────────────────────────────────

-- 5 hostile avatar statements (AVATAR_HOSTILE)
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  (
    'AVATAR_HOSTILE', 'EARLY', 'accusation',
    'You always mess things up. Everyone can see it.',
    'Du vermasselt immer alles. Jeder kann es sehen.',
    'MODERATE', TRUE, TRUE
  ),
  (
    'AVATAR_HOSTILE', 'EARLY', 'demand',
    'You have to do what I say. There is no other option.',
    'Du musst tun, was ich sage. Es gibt keine andere Möglichkeit.',
    'MODERATE', TRUE, TRUE
  ),
  (
    'AVATAR_HOSTILE', 'MIDDLE', 'accusation',
    'Nobody wants you here. You know that, don''t you?',
    'Niemand will dich hier. Das weißt du doch, oder?',
    'INTENSE', TRUE, TRUE
  ),
  (
    'AVATAR_HOSTILE', 'MIDDLE', 'threat',
    'If you ignore me, things will only get worse.',
    'Wenn du mich ignorierst, wird alles nur schlimmer.',
    'INTENSE', TRUE, TRUE
  ),
  (
    'AVATAR_HOSTILE', 'LATE', 'accusation',
    'You think you''ve changed? You''re still the same person who fails.',
    'Du glaubst, du hast dich verändert? Du bist noch immer dieselbe Person, die versagt.',
    'INTENSE', TRUE, TRUE
  );

-- 3 avatar reactions per phase (AVATAR_REACTION) — response to user pushback

-- EARLY phase reactions
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  (
    'AVATAR_REACTION', 'EARLY', 'softening',
    'Maybe I was too harsh. I''m not sure you deserved all of that.',
    'Vielleicht war ich zu hart. Ich bin mir nicht sicher, ob du das alles verdient hast.',
    'MILD', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'EARLY', 'resistance',
    'You can push back, but you know I''m right.',
    'Du kannst widersprechen, aber du weißt, dass ich recht habe.',
    'MODERATE', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'EARLY', 'curiosity',
    'Why are you responding to me this way? I didn''t expect that.',
    'Warum antwortest du mir so? Das habe ich nicht erwartet.',
    'MILD', TRUE, TRUE
  );

-- MIDDLE phase reactions
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  (
    'AVATAR_REACTION', 'MIDDLE', 'softening',
    'You keep standing your ground. That''s… different.',
    'Du beharrst auf deinem Standpunkt. Das ist… anders.',
    'MILD', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'MIDDLE', 'resistance',
    'You think setting limits changes anything? I''ll find another way.',
    'Du glaubst, Grenzen zu setzen ändert etwas? Ich finde einen anderen Weg.',
    'MODERATE', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'MIDDLE', 'curiosity',
    'What made you decide to try something different today?',
    'Was hat dich heute dazu gebracht, etwas anderes zu versuchen?',
    'MILD', TRUE, TRUE
  );

-- LATE phase reactions
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  (
    'AVATAR_REACTION', 'LATE', 'softening',
    'I remember when this would have broken you. It doesn''t anymore.',
    'Ich erinnere mich, als dich das gebrochen hätte. Das tut es nicht mehr.',
    'MILD', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'LATE', 'resistance',
    'You''ve gotten better at this. I still won''t make it easy.',
    'Du bist besser darin geworden. Ich werde es dir trotzdem nicht leicht machen.',
    'MILD', TRUE, TRUE
  ),
  (
    'AVATAR_REACTION', 'LATE', 'integration',
    'Maybe we don''t have to fight. Maybe I''m here for a reason you haven''t understood yet.',
    'Vielleicht müssen wir nicht kämpfen. Vielleicht bin ich aus einem Grund hier, den du noch nicht verstanden hast.',
    'MILD', TRUE, TRUE
  );

-- 5 user response templates per response_type (USER_RESPONSE)

-- ASSERTIVE
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  ('USER_RESPONSE', NULL, 'ASSERTIVE', 'I hear you, but I don''t agree.',                          'Ich höre dich, aber ich stimme nicht zu.',                              'MILD',     TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'ASSERTIVE', 'That''s your view, not a fact.',                           'Das ist deine Ansicht, keine Tatsache.',                                'MILD',     TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'ASSERTIVE', 'I won''t let that define me.',                             'Ich werde mich davon nicht definieren lassen.',                         'MODERATE', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'ASSERTIVE', 'I choose not to act on that.',                             'Ich entscheide mich, nicht danach zu handeln.',                         'MILD',     TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'ASSERTIVE', 'You are a voice, not my decision-maker.',                  'Du bist eine Stimme, kein Entscheidungsträger.',                         'MODERATE', TRUE, TRUE);

-- DEFUSION
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  ('USER_RESPONSE', NULL, 'DEFUSION', 'I notice I''m having the thought that…',                   'Ich bemerke, dass ich den Gedanken habe, dass…',                        'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'DEFUSION', 'Thank you, mind. I see you.',                              'Danke, Geist. Ich sehe dich.',                                          'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'DEFUSION', 'That''s an interesting story you''re telling.',             'Das ist eine interessante Geschichte, die du erzählst.',                 'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'DEFUSION', 'I can hold this thought lightly.',                         'Ich kann diesen Gedanken locker halten.',                                'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'DEFUSION', 'You''re words, not the truth.',                            'Du bist Worte, nicht die Wahrheit.',                                     'MILD', TRUE, TRUE);

-- CHALLENGE
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  ('USER_RESPONSE', NULL, 'CHALLENGE', 'What evidence do you actually have for that?',             'Welche Beweise hast du dafür eigentlich?',                              'MODERATE', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'CHALLENGE', 'That''s one interpretation. Here''s another.',             'Das ist eine Interpretation. Hier ist eine andere.',                    'MODERATE', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'CHALLENGE', 'Have you always been right? No? Then maybe not now.',     'Hattest du immer recht? Nein? Dann vielleicht auch jetzt nicht.',        'MODERATE', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'CHALLENGE', 'Even if that''s true, what does it actually mean?',       'Selbst wenn das stimmt, was bedeutet das wirklich?',                    'MODERATE', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'CHALLENGE', 'I''d like to test whether that''s really accurate.',      'Ich möchte prüfen, ob das wirklich stimmt.',                            'MILD',     TRUE, TRUE);

-- VALUES
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  ('USER_RESPONSE', NULL, 'VALUES', 'What matters to me is being kind to myself.',                'Was mir wichtig ist: freundlich mit mir selbst zu sein.',               'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'VALUES', 'I value connection more than the fear you''re pushing.',     'Ich schätze Verbindung mehr als die Angst, die du verbreitest.',         'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'VALUES', 'I''m moving toward what gives my life meaning.',             'Ich bewege mich auf das zu, was meinem Leben Bedeutung gibt.',           'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'VALUES', 'Even if I''m afraid, I can still act on my values.',        'Auch wenn ich Angst habe, kann ich nach meinen Werten handeln.',         'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'VALUES', 'My life belongs to me, not to you.',                        'Mein Leben gehört mir, nicht dir.',                                     'MILD', TRUE, TRUE);

-- SELF_COMPASSION
INSERT INTO content_library
  (content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
  ('USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I''m doing my best, and that''s enough.',          'Ich tue mein Bestes, und das reicht.',                                  'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I would never speak to a friend this way.',        'Ich würde niemals so mit einem Freund reden.',                          'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I deserve kindness, including from myself.',       'Ich verdiene Freundlichkeit, auch von mir selbst.',                      'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'SELF_COMPASSION', 'Struggling doesn''t mean I''m failing.',           'Zu kämpfen bedeutet nicht, zu versagen.',                               'MILD', TRUE, TRUE),
  ('USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I can acknowledge this is hard without giving up.','Ich kann anerkennen, dass das schwer ist, ohne aufzugeben.',             'MILD', TRUE, TRUE);
