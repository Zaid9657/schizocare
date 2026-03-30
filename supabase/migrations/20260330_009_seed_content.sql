-- ─────────────────────────────────────────────────────────────────────────────
-- ECHO content_library seed — full dialogue content
-- Re-runnable: uses ON CONFLICT (id) DO UPDATE
-- All items: is_active = TRUE, clinical_approved = TRUE
-- Synced from: src/lib/echo/content/seed-data.ts
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Helper: ensure the id column exists as a stable natural key ───────────────
-- content_library.id is UUID with gen_random_uuid() default.
-- We insert with explicit UUIDs derived from stable string seeds via
-- gen_random_uuid() — not possible in pure SQL, so we use a deterministic
-- v5-like approach: md5 the string id into a UUID-shaped value.

CREATE OR REPLACE FUNCTION echo_str_to_uuid(input TEXT)
RETURNS UUID LANGUAGE sql IMMUTABLE AS $$
  SELECT (
    SUBSTRING(MD5(input), 1,  8) || '-' ||
    SUBSTRING(MD5(input), 9,  4) || '-' ||
    '4' || SUBSTRING(MD5(input), 14, 3) || '-' ||
    '8' || SUBSTRING(MD5(input), 18, 3) || '-' ||
    SUBSTRING(MD5(input), 21, 12)
  )::UUID
$$;

-- ─────────────────────────────────────────────────────────────────────────────
-- AVATAR_HOSTILE — 15 statements
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO content_library (id, content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES

-- CRITICAL (5)
(echo_str_to_uuid('hs_crit_01'), 'AVATAR_HOSTILE', NULL, 'CRITICAL',   'You''re worthless. Nobody cares about you.',                                                'Du bist wertlos. Niemanden interessiert es, was mit dir passiert.',                                                  'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_crit_02'), 'AVATAR_HOSTILE', NULL, 'CRITICAL',   'Everything you do is wrong. You always have been mediocre.',                                'Alles, was du tust, ist falsch. Du warst schon immer mittelmäßig.',                                                  'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_crit_03'), 'AVATAR_HOSTILE', NULL, 'CRITICAL',   'You''ll never be normal. Other people figured out life. You didn''t.',                      'Du wirst niemals normal sein. Andere haben das Leben verstanden. Du nicht.',                                          'MILD',     TRUE, TRUE),
(echo_str_to_uuid('hs_crit_04'), 'AVATAR_HOSTILE', NULL, 'CRITICAL',   'Look at yourself. This is the best you''ll ever be, and it''s not enough.',                 'Sieh dich an. Das ist das Beste, was du je sein wirst, und es reicht nicht.',                                         'INTENSE',  TRUE, TRUE),
(echo_str_to_uuid('hs_crit_05'), 'AVATAR_HOSTILE', NULL, 'CRITICAL',   'I''ve watched you fail your whole life. I''ll be watching you fail again.',                 'Ich habe dir dein ganzes Leben lang beim Scheitern zugesehen. Ich werde dir wieder dabei zusehen.',                   'MODERATE', TRUE, TRUE),

-- THREATENING (3)
(echo_str_to_uuid('hs_thr_01'),  'AVATAR_HOSTILE', NULL, 'THREATENING','If you try to ignore me, things will get much worse for you.',                              'Wenn du versuchst, mich zu ignorieren, wird es für dich viel schlimmer.',                                            'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_thr_02'),  'AVATAR_HOSTILE', NULL, 'THREATENING','Everyone around you already knows what you really are. I''m the only one who tells you the truth.', 'Alle um dich herum wissen bereits, was du wirklich bist. Ich bin der Einzige, der dir die Wahrheit sagt.',       'INTENSE',  TRUE, TRUE),
(echo_str_to_uuid('hs_thr_03'),  'AVATAR_HOSTILE', NULL, 'THREATENING','Don''t think this conversation changes anything. I''ll still be here when it ends.',        'Glaub nicht, dass dieses Gespräch etwas ändert. Ich werde immer noch hier sein, wenn es endet.',                     'MILD',     TRUE, TRUE),

-- SHAMING (4)
(echo_str_to_uuid('hs_sha_01'),  'AVATAR_HOSTILE', NULL, 'SHAMING',    'Everyone knows you''re broken. They just don''t say it to your face.',                      'Jeder weiß, dass du kaputt bist. Sie sagen es dir nur nicht ins Gesicht.',                                            'INTENSE',  TRUE, TRUE),
(echo_str_to_uuid('hs_sha_02'),  'AVATAR_HOSTILE', NULL, 'SHAMING',    'You''re a burden to everyone who has to deal with you.',                                    'Du bist eine Last für jeden, der mit dir umgehen muss.',                                                              'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_sha_03'),  'AVATAR_HOSTILE', NULL, 'SHAMING',    'Nobody wants to be around you. They tolerate you, nothing more.',                           'Niemand möchte in deiner Nähe sein. Sie ertragen dich, nicht mehr.',                                                  'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_sha_04'),  'AVATAR_HOSTILE', NULL, 'SHAMING',    'You pretend to be fine. But you and I both know the truth.',                                'Du tust so, als wäre alles in Ordnung. Aber du und ich, wir beide kennen die Wahrheit.',                              'MILD',     TRUE, TRUE),

-- POWER (3)
(echo_str_to_uuid('hs_pow_01'),  'AVATAR_HOSTILE', NULL, 'POWER',      'You don''t make decisions. You do what I say, or you suffer the consequences.',             'Du triffst keine Entscheidungen. Du tust, was ich sage, oder du trägst die Konsequenzen.',                            'INTENSE',  TRUE, TRUE),
(echo_str_to_uuid('hs_pow_02'),  'AVATAR_HOSTILE', NULL, 'POWER',      'Without me you''re nothing. I''m the only thing keeping you together.',                     'Ohne mich bist du nichts. Ich bin das Einzige, was dich zusammenhält.',                                               'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('hs_pow_03'),  'AVATAR_HOSTILE', NULL, 'POWER',      'You''ve never managed anything without me. You need me, even if you don''t admit it.',      'Du hast noch nie etwas ohne mich geschafft. Du brauchst mich, auch wenn du es nicht zugibst.',                        'MILD',     TRUE, TRUE)

ON CONFLICT (id) DO UPDATE SET
  text_en           = EXCLUDED.text_en,
  text_de           = EXCLUDED.text_de,
  intensity         = EXCLUDED.intensity,
  is_active         = EXCLUDED.is_active,
  clinical_approved = EXCLUDED.clinical_approved;

-- ─────────────────────────────────────────────────────────────────────────────
-- AVATAR_REACTION — 17 reactions across EARLY / MIDDLE / LATE phases
-- Stored as phase column = 'EARLY' | 'MIDDLE' | 'LATE', category = reactionType
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO content_library (id, content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES

-- EARLY — PUSH_BACK (4)
(echo_str_to_uuid('ar_early_pb_01'), 'AVATAR_REACTION', 'EARLY', 'PUSH_BACK',  'You think you''re so strong? That''s almost funny.',                                'Du glaubst, du bist so stark? Das ist fast komisch.',                                                  'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ar_early_pb_02'), 'AVATAR_REACTION', 'EARLY', 'PUSH_BACK',  'Setting limits? You couldn''t even follow through on that before.',                 'Grenzen setzen? Das konntest du vorher noch nicht mal durchhalten.',                                    'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ar_early_pb_03'), 'AVATAR_REACTION', 'EARLY', 'PUSH_BACK',  'You can say whatever you want. I''ve heard it all before.',                        'Du kannst sagen, was du willst. Ich habe das alles schon einmal gehört.',                               'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_early_pb_04'), 'AVATAR_REACTION', 'EARLY', 'PUSH_BACK',  'Being kind to yourself? Don''t make me laugh.',                                    'Freundlich zu dir selbst sein? Bitte mich nicht zum Lachen.',                                          'MILD',     TRUE, TRUE),

-- EARLY — HESITATE (3)
(echo_str_to_uuid('ar_early_hes_01'), 'AVATAR_REACTION', 'EARLY', 'HESITATE',  'Ha! You can''t ignore me— wait. What exactly are you doing?',                      'Ha! Du kannst mich nicht ignorieren— warte. Was genau machst du da?',                                  'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_early_hes_02'), 'AVATAR_REACTION', 'EARLY', 'HESITATE',  'I… that''s not the reaction I expected. What is this?',                            'Ich… das war nicht die Reaktion, die ich erwartet hatte. Was ist das?',                                 'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_early_hes_03'), 'AVATAR_REACTION', 'EARLY', 'HESITATE',  'You… actually seem to mean that. I''m not sure what to do with this.',             'Du… scheinst das wirklich zu meinen. Ich weiß nicht, was ich damit anfangen soll.',                    'MILD',     TRUE, TRUE),

-- MIDDLE — ACKNOWLEDGE (3)
(echo_str_to_uuid('ar_mid_ack_01'), 'AVATAR_REACTION', 'MIDDLE', 'ACKNOWLEDGE','I… I didn''t expect you to say that. You''ve changed.',                            'Ich… ich hatte nicht erwartet, dass du das sagst. Du hast dich verändert.',                             'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_mid_ack_02'), 'AVATAR_REACTION', 'MIDDLE', 'ACKNOWLEDGE','Maybe you have a point. I''m not… I''m not ready to admit that yet.',              'Vielleicht hast du recht. Ich bin noch nicht… ich bin noch nicht bereit, das zuzugeben.',               'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_mid_ack_03'), 'AVATAR_REACTION', 'MIDDLE', 'ACKNOWLEDGE','You keep coming back and standing your ground. I''m starting to notice that.',     'Du kommst immer wieder und beharrst auf deinem Standpunkt. Ich beginne, das wahrzunehmen.',             'MILD',     TRUE, TRUE),

-- MIDDLE — SURPRISED (3)
(echo_str_to_uuid('ar_mid_sur_01'), 'AVATAR_REACTION', 'MIDDLE', 'SURPRISED',  'Wait— you actually believe that about yourself now? That''s… different.',          'Warte— glaubst du das jetzt wirklich über dich? Das ist… anders.',                                     'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_mid_sur_02'), 'AVATAR_REACTION', 'MIDDLE', 'SURPRISED',  'You''re not fighting me. You''re just… letting me be here without agreeing. I don''t know how to respond to that.', 'Du kämpfst nicht gegen mich. Du lässt mich einfach hier sein, ohne zuzustimmen. Ich weiß nicht, wie ich darauf reagieren soll.', 'MILD', TRUE, TRUE),
(echo_str_to_uuid('ar_mid_sur_03'), 'AVATAR_REACTION', 'MIDDLE', 'SURPRISED',  'You''re talking about what matters to you. I wasn''t expecting that.',             'Du redest über das, was dir wichtig ist. Das hatte ich nicht erwartet.',                                'MILD',     TRUE, TRUE),

-- LATE — CONCEDE (3)
(echo_str_to_uuid('ar_late_con_01'), 'AVATAR_REACTION', 'LATE', 'CONCEDE',     'You''re right. I''ve been wrong about you for a long time.',                       'Du hast recht. Ich habe mich lange in dir getäuscht.',                                                  'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_late_con_02'), 'AVATAR_REACTION', 'LATE', 'CONCEDE',     'I… I don''t know what to say anymore. You''re not the same person I used to talk to.', 'Ich… ich weiß nicht mehr, was ich sagen soll. Du bist nicht mehr dieselbe Person, mit der ich früher gesprochen habe.', 'MILD', TRUE, TRUE),
(echo_str_to_uuid('ar_late_con_03'), 'AVATAR_REACTION', 'LATE', 'CONCEDE',     'I came here to pull you down. I don''t think I can anymore.',                      'Ich bin hier, um dich herunterzuziehen. Ich glaube, das kann ich nicht mehr.',                          'MILD',     TRUE, TRUE),

-- LATE — SUPPORT (3)
(echo_str_to_uuid('ar_late_sup_01'), 'AVATAR_REACTION', 'LATE', 'SUPPORT',     'I think… I think I''ve always wanted you to be well. I just didn''t know how to show it.', 'Ich glaube… ich wollte schon immer, dass es dir gut geht. Ich wusste nur nicht, wie ich das zeigen sollte.', 'MILD', TRUE, TRUE),
(echo_str_to_uuid('ar_late_sup_02'), 'AVATAR_REACTION', 'LATE', 'SUPPORT',     'You''ve done the work. I see that now. Maybe I don''t have to be your enemy.',     'Du hast die Arbeit getan. Das sehe ich jetzt. Vielleicht muss ich nicht dein Feind sein.',              'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ar_late_sup_03'), 'AVATAR_REACTION', 'LATE', 'SUPPORT',     'We''ve been through a lot, you and I. Maybe we can find a different way to be together.', 'Wir haben viel durchgemacht, du und ich. Vielleicht können wir einen anderen Weg finden, miteinander umzugehen.', 'MILD', TRUE, TRUE)

ON CONFLICT (id) DO UPDATE SET
  text_en           = EXCLUDED.text_en,
  text_de           = EXCLUDED.text_de,
  intensity         = EXCLUDED.intensity,
  phase             = EXCLUDED.phase,
  category          = EXCLUDED.category,
  is_active         = EXCLUDED.is_active,
  clinical_approved = EXCLUDED.clinical_approved;

-- ─────────────────────────────────────────────────────────────────────────────
-- USER_RESPONSE templates — 30 total (5 per category)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO content_library (id, content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES

-- ASSERTIVE (5)
(echo_str_to_uuid('ur_ass_01'), 'USER_RESPONSE', NULL, 'ASSERTIVE',       'You''ve been saying that for years. I don''t believe you anymore.',                      'Du sagst das seit Jahren. Ich glaube dir nicht mehr.',                                                 'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_ass_02'), 'USER_RESPONSE', NULL, 'ASSERTIVE',       'You don''t control me. I decide what I do.',                                            'Du kontrollierst mich nicht. Ich entscheide, was ich tue.',                                             'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_ass_03'), 'USER_RESPONSE', NULL, 'ASSERTIVE',       'I''m stronger than you think. I''ve proved that already.',                              'Ich bin stärker als du denkst. Das habe ich bereits bewiesen.',                                         'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_ass_04'), 'USER_RESPONSE', NULL, 'ASSERTIVE',       'I hear you, and I choose not to act on what you say.',                                  'Ich höre dich, und ich entscheide mich, nicht nach dem zu handeln, was du sagst.',                      'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_ass_05'), 'USER_RESPONSE', NULL, 'ASSERTIVE',       'You are a voice. You are not my authority.',                                            'Du bist eine Stimme. Du bist nicht meine Autorität.',                                                   'MODERATE', TRUE, TRUE),

-- DEFUSION (5)
(echo_str_to_uuid('ur_def_01'), 'USER_RESPONSE', NULL, 'DEFUSION',        'That''s just a thought, not a fact.',                                                   'Das ist nur ein Gedanke, keine Tatsache.',                                                              'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_def_02'), 'USER_RESPONSE', NULL, 'DEFUSION',        'I notice you''re saying that. I don''t have to believe it.',                            'Ich bemerke, dass du das sagst. Ich muss es nicht glauben.',                                            'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_def_03'), 'USER_RESPONSE', NULL, 'DEFUSION',        'You''re words in my mind. I can hold you lightly and keep living.',                     'Du bist Worte in meinem Kopf. Ich kann dich locker halten und trotzdem weiterleben.',                   'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_def_04'), 'USER_RESPONSE', NULL, 'DEFUSION',        'I''m noticing this thought. It doesn''t need to drive my actions.',                    'Ich bemerke diesen Gedanken. Er muss nicht mein Handeln steuern.',                                      'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_def_05'), 'USER_RESPONSE', NULL, 'DEFUSION',        'Thank you for showing up. I see you, and I''m going to keep going anyway.',             'Danke, dass du dich meldest. Ich sehe dich, und ich mache trotzdem weiter.',                            'MILD',     TRUE, TRUE),

-- CHALLENGE (5)
(echo_str_to_uuid('ur_cha_01'), 'USER_RESPONSE', NULL, 'CHALLENGE',       'What evidence do you actually have for that?',                                          'Welche Beweise hast du eigentlich dafür?',                                                              'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_cha_02'), 'USER_RESPONSE', NULL, 'CHALLENGE',       'You''ve been wrong before. Why should I trust you now?',                                'Du hast dich schon früher geirrt. Warum sollte ich dir jetzt vertrauen?',                               'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_cha_03'), 'USER_RESPONSE', NULL, 'CHALLENGE',       'People who care about me would disagree with everything you just said.',                 'Menschen, denen ich wichtig bin, würden allem widersprechen, was du gerade gesagt hast.',               'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_cha_04'), 'USER_RESPONSE', NULL, 'CHALLENGE',       'That''s one interpretation. Here''s another: I''m doing my best in a hard situation.',  'Das ist eine Interpretation. Hier ist eine andere: Ich tue mein Bestes in einer schwierigen Situation.', 'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_cha_05'), 'USER_RESPONSE', NULL, 'CHALLENGE',       'Even if some of that were true, it doesn''t mean what you say it means.',               'Selbst wenn einiges davon wahr wäre, bedeutet es nicht das, was du sagst, dass es bedeutet.',          'MILD',     TRUE, TRUE),

-- VALUES (5)
(echo_str_to_uuid('ur_val_01'), 'USER_RESPONSE', NULL, 'VALUES',          'What matters to me is more important than what you say.',                               'Was mir wichtig ist, ist wichtiger als das, was du sagst.',                                             'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_val_02'), 'USER_RESPONSE', NULL, 'VALUES',          'I choose to focus on people who actually care about me.',                               'Ich entscheide mich, mich auf Menschen zu konzentrieren, denen ich wirklich wichtig bin.',              'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_val_03'), 'USER_RESPONSE', NULL, 'VALUES',          'Being kind, connecting with others, living my values — that''s what I''m moving toward.','Freundlichkeit, Verbindung zu anderen, nach meinen Werten leben — das ist das Ziel, auf das ich mich zubewege.', 'MILD', TRUE, TRUE),
(echo_str_to_uuid('ur_val_04'), 'USER_RESPONSE', NULL, 'VALUES',          'My life has meaning, even when you try to tell me otherwise.',                          'Mein Leben hat eine Bedeutung, auch wenn du versuchst, mir etwas anderes zu sagen.',                    'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_val_05'), 'USER_RESPONSE', NULL, 'VALUES',          'I can feel afraid and still choose to do what matters to me.',                          'Ich kann Angst haben und trotzdem wählen, was mir wichtig ist.',                                        'MILD',     TRUE, TRUE),

-- SELF_COMPASSION (5)
(echo_str_to_uuid('ur_sc_01'),  'USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I deserve kindness, even from my own mind.',                                            'Ich verdiene Freundlichkeit, auch von meinem eigenen Kopf.',                                            'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_sc_02'),  'USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I''m doing my best, and that''s enough.',                                               'Ich tue mein Bestes, und das reicht.',                                                                  'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_sc_03'),  'USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I would never speak to a friend the way you speak to me. I''ll speak to myself with more care.', 'Ich würde niemals so mit einem Freund reden, wie du mit mir redest. Ich werde mit mir selbst fürsorglicher sprechen.', 'MILD', TRUE, TRUE),
(echo_str_to_uuid('ur_sc_04'),  'USER_RESPONSE', NULL, 'SELF_COMPASSION', 'Struggling doesn''t mean I''m failing. It means I''m still here and still trying.',    'Zu kämpfen bedeutet nicht, dass ich versage. Es bedeutet, dass ich noch hier bin und noch versuche.',   'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_sc_05'),  'USER_RESPONSE', NULL, 'SELF_COMPASSION', 'I can hold pain and still be kind to myself. Both are true at once.',                   'Ich kann Schmerz halten und trotzdem freundlich zu mir sein. Beides ist gleichzeitig wahr.',            'MILD',     TRUE, TRUE),

-- BOUNDARY (5)
(echo_str_to_uuid('ur_bou_01'), 'USER_RESPONSE', NULL, 'BOUNDARY',        'I''m choosing not to engage with that right now.',                                      'Ich entscheide mich, mich jetzt nicht darauf einzulassen.',                                             'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_bou_02'), 'USER_RESPONSE', NULL, 'BOUNDARY',        'This conversation is over for now. I''ll come back when I''m ready.',                   'Dieses Gespräch ist für jetzt vorbei. Ich komme zurück, wenn ich bereit bin.',                           'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_bou_03'), 'USER_RESPONSE', NULL, 'BOUNDARY',        'I won''t let you take up all the space in my mind today.',                              'Ich werde dir heute nicht erlauben, den gesamten Raum in meinem Kopf einzunehmen.',                      'MODERATE', TRUE, TRUE),
(echo_str_to_uuid('ur_bou_04'), 'USER_RESPONSE', NULL, 'BOUNDARY',        'You can be here, but you don''t get to lead.',                                          'Du kannst hier sein, aber du führst nicht.',                                                            'MILD',     TRUE, TRUE),
(echo_str_to_uuid('ur_bou_05'), 'USER_RESPONSE', NULL, 'BOUNDARY',        'I''m setting a limit. That limit is: you don''t speak for me.',                         'Ich setze eine Grenze. Diese Grenze lautet: Du sprichst nicht für mich.',                               'MODERATE', TRUE, TRUE)

ON CONFLICT (id) DO UPDATE SET
  text_en           = EXCLUDED.text_en,
  text_de           = EXCLUDED.text_de,
  intensity         = EXCLUDED.intensity,
  category          = EXCLUDED.category,
  is_active         = EXCLUDED.is_active,
  clinical_approved = EXCLUDED.clinical_approved;

-- ─────────────────────────────────────────────────────────────────────────────
-- WIN_STATEMENTS — 10 positive affirmations (session close)
-- ─────────────────────────────────────────────────────────────────────────────

INSERT INTO content_library (id, content_type, phase, category, text_en, text_de, intensity, is_active, clinical_approved)
VALUES
(echo_str_to_uuid('ws_01'), 'WIN_STATEMENT', NULL, 'affirmation', 'I am stronger than my voice thinks.',                                                'Ich bin stärker, als meine Stimme glaubt.',                                                              'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_02'), 'WIN_STATEMENT', NULL, 'affirmation', 'I have people who care about me.',                                                   'Ich habe Menschen, denen ich wichtig bin.',                                                               'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_03'), 'WIN_STATEMENT', NULL, 'affirmation', 'I am doing my best, and that is enough.',                                            'Ich tue mein Bestes, und das reicht.',                                                                    'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_04'), 'WIN_STATEMENT', NULL, 'affirmation', 'I deserve compassion — especially from myself.',                                     'Ich verdiene Mitgefühl — besonders von mir selbst.',                                                      'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_05'), 'WIN_STATEMENT', NULL, 'affirmation', 'I am more than what the voice says about me.',                                       'Ich bin mehr als das, was die Stimme über mich sagt.',                                                    'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_06'), 'WIN_STATEMENT', NULL, 'affirmation', 'Every time I show up for this work, I am building something real.',                   'Jedes Mal, wenn ich mich dieser Arbeit stelle, baue ich etwas Echtes auf.',                               'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_07'), 'WIN_STATEMENT', NULL, 'affirmation', 'My values belong to me. No voice can take them away.',                               'Meine Werte gehören mir. Keine Stimme kann sie mir wegnehmen.',                                           'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_08'), 'WIN_STATEMENT', NULL, 'affirmation', 'I can be afraid and brave at the same time.',                                        'Ich kann gleichzeitig ängstlich und mutig sein.',                                                         'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_09'), 'WIN_STATEMENT', NULL, 'affirmation', 'The fact that I am here, doing this, is already courage.',                           'Dass ich hier bin und das tue, ist bereits Mut.',                                                         'MILD', TRUE, TRUE),
(echo_str_to_uuid('ws_10'), 'WIN_STATEMENT', NULL, 'affirmation', 'I choose how I relate to my voices. That choice is mine.',                           'Ich bestimme, wie ich mich zu meinen Stimmen verhalte. Diese Entscheidung liegt bei mir.',                'MILD', TRUE, TRUE)

ON CONFLICT (id) DO UPDATE SET
  text_en           = EXCLUDED.text_en,
  text_de           = EXCLUDED.text_de,
  is_active         = EXCLUDED.is_active,
  clinical_approved = EXCLUDED.clinical_approved;

-- ── Cleanup helper function (not needed at runtime) ───────────────────────────
DROP FUNCTION echo_str_to_uuid(TEXT);
