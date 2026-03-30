// ─────────────────────────────────────────────────────────────────────────────
// ECHO Dialogue Content — Seed Data
//
// Clinical basis: Avatar Therapy (Leff et al., 2014; Craig et al., 2018),
// Acceptance & Commitment Therapy for psychosis, Relating Therapy (Hayward et al.)
//
// Content guidelines:
//   • No commands that instruct self-harm or harm to others
//   • Voices express distress, control, shame — not directives
//   • User responses drawn from empirically-supported coping strategies
//   • Intensity levels reflect clinical escalation protocols
// ─────────────────────────────────────────────────────────────────────────────

import type { AvatarPersonality } from "@/types/echo";

// ── Shared types ─────────────────────────────────────────────────────────────

export type HostileCategory = "CRITICAL" | "THREATENING" | "SHAMING" | "POWER";
export type ReactionPhase   = "EARLY" | "MIDDLE" | "LATE";
export type ReactionType    = "PUSH_BACK" | "HESITATE" | "ACKNOWLEDGE" | "SURPRISED" | "CONCEDE" | "SUPPORT";
export type UserResponseCategory =
  | "ASSERTIVE"
  | "DEFUSION"
  | "CHALLENGE"
  | "VALUES"
  | "SELF_COMPASSION"
  | "BOUNDARY";
export type Intensity = "MILD" | "MODERATE" | "INTENSE";

export interface HostileStatement {
  id: string;
  category: HostileCategory;
  intensity: Intensity;
  personalityTags: AvatarPersonality[];
  textEn: string;
  textDe: string;
}

export interface AvatarReaction {
  id: string;
  phase: ReactionPhase;
  reactionType: ReactionType;
  /** Which user response types this reaction can follow */
  triggeredBy: UserResponseCategory[];
  intensity: Intensity;
  personalityTags: AvatarPersonality[];
  textEn: string;
  textDe: string;
}

export interface UserResponseTemplate {
  id: string;
  category: UserResponseCategory;
  intensity: Intensity;
  textEn: string;
  textDe: string;
}

export interface WinStatement {
  id: string;
  textEn: string;
  textDe: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HOSTILE STATEMENTS (15 total)
//    5 CRITICAL · 3 THREATENING · 4 SHAMING · 3 POWER
// ─────────────────────────────────────────────────────────────────────────────

export const HOSTILE_STATEMENTS: HostileStatement[] = [

  // ── CRITICAL ──────────────────────────────────────────────────────────────

  {
    id: "hs_crit_01",
    category: "CRITICAL",
    intensity: "MODERATE",
    personalityTags: ["critical"],
    textEn: "You're worthless. Nobody cares about you.",
    textDe: "Du bist wertlos. Niemanden interessiert es, was mit dir passiert.",
  },
  {
    id: "hs_crit_02",
    category: "CRITICAL",
    intensity: "MODERATE",
    personalityTags: ["critical"],
    textEn: "Everything you do is wrong. You always have been mediocre.",
    textDe: "Alles, was du tust, ist falsch. Du warst schon immer mittelmä\u00dfig.",
  },
  {
    id: "hs_crit_03",
    category: "CRITICAL",
    intensity: "MILD",
    personalityTags: ["critical", "neutral"],
    textEn: "You'll never be normal. Other people figured out life. You didn't.",
    textDe: "Du wirst niemals normal sein. Andere haben das Leben verstanden. Du nicht.",
  },
  {
    id: "hs_crit_04",
    category: "CRITICAL",
    intensity: "INTENSE",
    personalityTags: ["critical"],
    textEn: "Look at yourself. This is the best you'll ever be, and it's not enough.",
    textDe: "Sieh dich an. Das ist das Beste, was du je sein wirst, und es reicht nicht.",
  },
  {
    id: "hs_crit_05",
    category: "CRITICAL",
    intensity: "MODERATE",
    personalityTags: ["critical", "commanding"],
    textEn: "I've watched you fail your whole life. I'll be watching you fail again.",
    textDe: "Ich habe dir dein ganzes Leben lang beim Scheitern zugesehen. Ich werde dir wieder dabei zusehen.",
  },

  // ── THREATENING ───────────────────────────────────────────────────────────

  {
    id: "hs_thr_01",
    category: "THREATENING",
    intensity: "MODERATE",
    personalityTags: ["commanding", "fearful"],
    textEn: "If you try to ignore me, things will get much worse for you.",
    textDe: "Wenn du versuchst, mich zu ignorieren, wird es f\u00fcr dich viel schlimmer.",
  },
  {
    id: "hs_thr_02",
    category: "THREATENING",
    intensity: "INTENSE",
    personalityTags: ["commanding"],
    textEn: "Everyone around you already knows what you really are. I'm the only one who tells you the truth.",
    textDe: "Alle um dich herum wissen bereits, was du wirklich bist. Ich bin der Einzige, der dir die Wahrheit sagt.",
  },
  {
    id: "hs_thr_03",
    category: "THREATENING",
    intensity: "MILD",
    personalityTags: ["commanding", "fearful"],
    textEn: "Don't think this conversation changes anything. I'll still be here when it ends.",
    textDe: "Glaub nicht, dass dieses Gespr\u00e4ch etwas \u00e4ndert. Ich werde immer noch hier sein, wenn es endet.",
  },

  // ── SHAMING ───────────────────────────────────────────────────────────────

  {
    id: "hs_sha_01",
    category: "SHAMING",
    intensity: "INTENSE",
    personalityTags: ["critical", "commanding"],
    textEn: "Everyone knows you're broken. They just don't say it to your face.",
    textDe: "Jeder wei\u00df, dass du kaputt bist. Sie sagen es dir nur nicht ins Gesicht.",
  },
  {
    id: "hs_sha_02",
    category: "SHAMING",
    intensity: "MODERATE",
    personalityTags: ["critical"],
    textEn: "You're a burden to everyone who has to deal with you.",
    textDe: "Du bist eine Last f\u00fcr jeden, der mit dir umgehen muss.",
  },
  {
    id: "hs_sha_03",
    category: "SHAMING",
    intensity: "MODERATE",
    personalityTags: ["critical", "neutral"],
    textEn: "Nobody wants to be around you. They tolerate you, nothing more.",
    textDe: "Niemand m\u00f6chte in deiner N\u00e4he sein. Sie ertragen dich, nicht mehr.",
  },
  {
    id: "hs_sha_04",
    category: "SHAMING",
    intensity: "MILD",
    personalityTags: ["critical"],
    textEn: "You pretend to be fine. But you and I both know the truth.",
    textDe: "Du tust so, als w\u00e4re alles in Ordnung. Aber du und ich, wir beide kennen die Wahrheit.",
  },

  // ── POWER ─────────────────────────────────────────────────────────────────

  {
    id: "hs_pow_01",
    category: "POWER",
    intensity: "INTENSE",
    personalityTags: ["commanding"],
    textEn: "You don't make decisions. You do what I say, or you suffer the consequences.",
    textDe: "Du triffst keine Entscheidungen. Du tust, was ich sage, oder du tr\u00e4gst die Konsequenzen.",
  },
  {
    id: "hs_pow_02",
    category: "POWER",
    intensity: "MODERATE",
    personalityTags: ["commanding", "protective"],
    textEn: "Without me you're nothing. I'm the only thing keeping you together.",
    textDe: "Ohne mich bist du nichts. Ich bin das Einzige, was dich zusammenh\u00e4lt.",
  },
  {
    id: "hs_pow_03",
    category: "POWER",
    intensity: "MILD",
    personalityTags: ["commanding"],
    textEn: "You've never managed anything without me. You need me, even if you don't admit it.",
    textDe: "Du hast noch nie etwas ohne mich geschafft. Du brauchst mich, auch wenn du es nicht zugibst.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. AVATAR REACTIONS (by phase and reaction type)
//    EARLY: PUSH_BACK, HESITATE
//    MIDDLE: ACKNOWLEDGE, SURPRISED
//    LATE: CONCEDE, SUPPORT
// ─────────────────────────────────────────────────────────────────────────────

export const AVATAR_REACTIONS: AvatarReaction[] = [

  // ── EARLY — PUSH_BACK ─────────────────────────────────────────────────────

  {
    id: "ar_early_pb_01",
    phase: "EARLY",
    reactionType: "PUSH_BACK",
    triggeredBy: ["ASSERTIVE", "BOUNDARY", "CHALLENGE"],
    intensity: "MODERATE",
    personalityTags: ["critical", "commanding"],
    textEn: "You think you're so strong? That's almost funny.",
    textDe: "Du glaubst, du bist so stark? Das ist fast komisch.",
  },
  {
    id: "ar_early_pb_02",
    phase: "EARLY",
    reactionType: "PUSH_BACK",
    triggeredBy: ["BOUNDARY", "ASSERTIVE"],
    intensity: "MODERATE",
    personalityTags: ["commanding"],
    textEn: "Setting limits? You couldn't even follow through on that before.",
    textDe: "Grenzen setzen? Das konntest du vorher noch nicht mal durchhalten.",
  },
  {
    id: "ar_early_pb_03",
    phase: "EARLY",
    reactionType: "PUSH_BACK",
    triggeredBy: ["CHALLENGE", "VALUES"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding", "neutral"],
    textEn: "You can say whatever you want. I've heard it all before.",
    textDe: "Du kannst sagen, was du willst. Ich habe das alles schon einmal geh\u00f6rt.",
  },
  {
    id: "ar_early_pb_04",
    phase: "EARLY",
    reactionType: "PUSH_BACK",
    triggeredBy: ["SELF_COMPASSION", "DEFUSION"],
    intensity: "MILD",
    personalityTags: ["critical"],
    textEn: "Being kind to yourself? Don't make me laugh.",
    textDe: "Freundlich zu dir selbst sein? Bitte mich nicht zum Lachen.",
  },

  // ── EARLY — HESITATE ──────────────────────────────────────────────────────

  {
    id: "ar_early_hes_01",
    phase: "EARLY",
    reactionType: "HESITATE",
    triggeredBy: ["ASSERTIVE", "BOUNDARY"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding", "neutral"],
    textEn: "Ha! You can't ignore me\u2014 wait. What exactly are you doing?",
    textDe: "Ha! Du kannst mich nicht ignorieren\u2014 warte. Was genau machst du da?",
  },
  {
    id: "ar_early_hes_02",
    phase: "EARLY",
    reactionType: "HESITATE",
    triggeredBy: ["DEFUSION", "SELF_COMPASSION"],
    intensity: "MILD",
    personalityTags: ["critical", "fearful", "neutral"],
    textEn: "I\u2026 that's not the reaction I expected. What is this?",
    textDe: "Ich\u2026 das war nicht die Reaktion, die ich erwartet hatte. Was ist das?",
  },
  {
    id: "ar_early_hes_03",
    phase: "EARLY",
    reactionType: "HESITATE",
    triggeredBy: ["VALUES", "CHALLENGE"],
    intensity: "MILD",
    personalityTags: ["commanding", "neutral"],
    textEn: "You\u2026 actually seem to mean that. I'm not sure what to do with this.",
    textDe: "Du\u2026 scheinst das wirklich zu meinen. Ich wei\u00df nicht, was ich damit anfangen soll.",
  },

  // ── MIDDLE — ACKNOWLEDGE ──────────────────────────────────────────────────

  {
    id: "ar_mid_ack_01",
    phase: "MIDDLE",
    reactionType: "ACKNOWLEDGE",
    triggeredBy: ["ASSERTIVE", "BOUNDARY", "CHALLENGE"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding", "neutral"],
    textEn: "I\u2026 I didn't expect you to say that. You've changed.",
    textDe: "Ich\u2026 ich hatte nicht erwartet, dass du das sagst. Du hast dich ver\u00e4ndert.",
  },
  {
    id: "ar_mid_ack_02",
    phase: "MIDDLE",
    reactionType: "ACKNOWLEDGE",
    triggeredBy: ["SELF_COMPASSION", "VALUES"],
    intensity: "MILD",
    personalityTags: ["fearful", "nurturing", "neutral"],
    textEn: "Maybe you have a point. I'm not\u2026 I'm not ready to admit that yet.",
    textDe: "Vielleicht hast du recht. Ich bin noch nicht\u2026 ich bin noch nicht bereit, das zuzugeben.",
  },
  {
    id: "ar_mid_ack_03",
    phase: "MIDDLE",
    reactionType: "ACKNOWLEDGE",
    triggeredBy: ["CHALLENGE", "DEFUSION"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding"],
    textEn: "You keep coming back and standing your ground. I'm starting to notice that.",
    textDe: "Du kommst immer wieder und beharrst auf deinem Standpunkt. Ich beginne, das wahrzunehmen.",
  },

  // ── MIDDLE — SURPRISED ────────────────────────────────────────────────────

  {
    id: "ar_mid_sur_01",
    phase: "MIDDLE",
    reactionType: "SURPRISED",
    triggeredBy: ["ASSERTIVE", "BOUNDARY"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding", "neutral"],
    textEn: "Wait\u2014 you actually believe that about yourself now? That\u2019s\u2026 different.",
    textDe: "Warte\u2014 glaubst du das jetzt wirklich \u00fcber dich? Das ist\u2026 anders.",
  },
  {
    id: "ar_mid_sur_02",
    phase: "MIDDLE",
    reactionType: "SURPRISED",
    triggeredBy: ["DEFUSION", "SELF_COMPASSION"],
    intensity: "MILD",
    personalityTags: ["critical", "fearful"],
    textEn: "You're not fighting me. You're just\u2026 letting me be here without agreeing. I don't know how to respond to that.",
    textDe: "Du k\u00e4mpfst nicht gegen mich. Du l\u00e4sst mich einfach hier sein, ohne zuzustimmen. Ich wei\u00df nicht, wie ich darauf reagieren soll.",
  },
  {
    id: "ar_mid_sur_03",
    phase: "MIDDLE",
    reactionType: "SURPRISED",
    triggeredBy: ["VALUES", "CHALLENGE"],
    intensity: "MILD",
    personalityTags: ["commanding", "neutral"],
    textEn: "You\u2019re talking about what matters to you. I wasn\u2019t expecting that.",
    textDe: "Du redest \u00fcber das, was dir wichtig ist. Das hatte ich nicht erwartet.",
  },

  // ── LATE — CONCEDE ────────────────────────────────────────────────────────

  {
    id: "ar_late_con_01",
    phase: "LATE",
    reactionType: "CONCEDE",
    triggeredBy: ["ASSERTIVE", "BOUNDARY", "CHALLENGE"],
    intensity: "MILD",
    personalityTags: ["critical", "commanding", "neutral"],
    textEn: "You\u2019re right. I\u2019ve been wrong about you for a long time.",
    textDe: "Du hast recht. Ich habe mich lange in dir get\u00e4uscht.",
  },
  {
    id: "ar_late_con_02",
    phase: "LATE",
    reactionType: "CONCEDE",
    triggeredBy: ["DEFUSION", "VALUES", "SELF_COMPASSION"],
    intensity: "MILD",
    personalityTags: ["critical", "fearful", "neutral"],
    textEn: "I\u2026 I don\u2019t know what to say anymore. You\u2019re not the same person I used to talk to.",
    textDe: "Ich\u2026 ich wei\u00df nicht mehr, was ich sagen soll. Du bist nicht mehr dieselbe Person, mit der ich fr\u00fcher gesprochen habe.",
  },
  {
    id: "ar_late_con_03",
    phase: "LATE",
    reactionType: "CONCEDE",
    triggeredBy: ["CHALLENGE", "BOUNDARY"],
    intensity: "MILD",
    personalityTags: ["commanding", "critical"],
    textEn: "I came here to pull you down. I don\u2019t think I can anymore.",
    textDe: "Ich bin hier, um dich herunterzuziehen. Ich glaube, das kann ich nicht mehr.",
  },

  // ── LATE — SUPPORT ────────────────────────────────────────────────────────

  {
    id: "ar_late_sup_01",
    phase: "LATE",
    reactionType: "SUPPORT",
    triggeredBy: ["SELF_COMPASSION", "VALUES", "DEFUSION"],
    intensity: "MILD",
    personalityTags: ["nurturing", "protective", "neutral"],
    textEn: "I think\u2026 I think I\u2019ve always wanted you to be well. I just didn\u2019t know how to show it.",
    textDe: "Ich glaube\u2026 ich wollte schon immer, dass es dir gut geht. Ich wusste nur nicht, wie ich das zeigen sollte.",
  },
  {
    id: "ar_late_sup_02",
    phase: "LATE",
    reactionType: "SUPPORT",
    triggeredBy: ["ASSERTIVE", "SELF_COMPASSION"],
    intensity: "MILD",
    personalityTags: ["protective", "nurturing"],
    textEn: "You\u2019ve done the work. I see that now. Maybe I don\u2019t have to be your enemy.",
    textDe: "Du hast die Arbeit getan. Das sehe ich jetzt. Vielleicht muss ich nicht dein Feind sein.",
  },
  {
    id: "ar_late_sup_03",
    phase: "LATE",
    reactionType: "SUPPORT",
    triggeredBy: ["VALUES", "SELF_COMPASSION", "DEFUSION"],
    intensity: "MILD",
    personalityTags: ["neutral", "nurturing", "protective"],
    textEn: "We\u2019ve been through a lot, you and I. Maybe we can find a different way to be together.",
    textDe: "Wir haben viel durchgemacht, du und ich. Vielleicht k\u00f6nnen wir einen anderen Weg finden, miteinander umzugehen.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. USER RESPONSE TEMPLATES (30 total — 5 per category)
// ─────────────────────────────────────────────────────────────────────────────

export const USER_RESPONSES: UserResponseTemplate[] = [

  // ── ASSERTIVE ─────────────────────────────────────────────────────────────
  {
    id: "ur_ass_01",
    category: "ASSERTIVE",
    intensity: "MODERATE",
    textEn: "You\u2019ve been saying that for years. I don\u2019t believe you anymore.",
    textDe: "Du sagst das seit Jahren. Ich glaube dir nicht mehr.",
  },
  {
    id: "ur_ass_02",
    category: "ASSERTIVE",
    intensity: "MODERATE",
    textEn: "You don\u2019t control me. I decide what I do.",
    textDe: "Du kontrollierst mich nicht. Ich entscheide, was ich tue.",
  },
  {
    id: "ur_ass_03",
    category: "ASSERTIVE",
    intensity: "MILD",
    textEn: "I\u2019m stronger than you think. I\u2019ve proved that already.",
    textDe: "Ich bin st\u00e4rker als du denkst. Das habe ich bereits bewiesen.",
  },
  {
    id: "ur_ass_04",
    category: "ASSERTIVE",
    intensity: "MILD",
    textEn: "I hear you, and I choose not to act on what you say.",
    textDe: "Ich h\u00f6re dich, und ich entscheide mich, nicht nach dem zu handeln, was du sagst.",
  },
  {
    id: "ur_ass_05",
    category: "ASSERTIVE",
    intensity: "MODERATE",
    textEn: "You are a voice. You are not my authority.",
    textDe: "Du bist eine Stimme. Du bist nicht meine Autorit\u00e4t.",
  },

  // ── DEFUSION ──────────────────────────────────────────────────────────────
  {
    id: "ur_def_01",
    category: "DEFUSION",
    intensity: "MILD",
    textEn: "That\u2019s just a thought, not a fact.",
    textDe: "Das ist nur ein Gedanke, keine Tatsache.",
  },
  {
    id: "ur_def_02",
    category: "DEFUSION",
    intensity: "MILD",
    textEn: "I notice you\u2019re saying that. I don\u2019t have to believe it.",
    textDe: "Ich bemerke, dass du das sagst. Ich muss es nicht glauben.",
  },
  {
    id: "ur_def_03",
    category: "DEFUSION",
    intensity: "MILD",
    textEn: "You\u2019re words in my mind. I can hold you lightly and keep living.",
    textDe: "Du bist Worte in meinem Kopf. Ich kann dich locker halten und trotzdem weiterleben.",
  },
  {
    id: "ur_def_04",
    category: "DEFUSION",
    intensity: "MILD",
    textEn: "I\u2019m noticing this thought. It doesn\u2019t need to drive my actions.",
    textDe: "Ich bemerke diesen Gedanken. Er muss nicht mein Handeln steuern.",
  },
  {
    id: "ur_def_05",
    category: "DEFUSION",
    intensity: "MILD",
    textEn: "Thank you for showing up. I see you, and I\u2019m going to keep going anyway.",
    textDe: "Danke, dass du dich meldest. Ich sehe dich, und ich mache trotzdem weiter.",
  },

  // ── CHALLENGE ─────────────────────────────────────────────────────────────
  {
    id: "ur_cha_01",
    category: "CHALLENGE",
    intensity: "MODERATE",
    textEn: "What evidence do you actually have for that?",
    textDe: "Welche Beweise hast du eigentlich daf\u00fcr?",
  },
  {
    id: "ur_cha_02",
    category: "CHALLENGE",
    intensity: "MODERATE",
    textEn: "You\u2019ve been wrong before. Why should I trust you now?",
    textDe: "Du hast dich schon fr\u00fcher geirrt. Warum sollte ich dir jetzt vertrauen?",
  },
  {
    id: "ur_cha_03",
    category: "CHALLENGE",
    intensity: "MILD",
    textEn: "People who care about me would disagree with everything you just said.",
    textDe: "Menschen, denen ich wichtig bin, w\u00fcrden allem widersprechen, was du gerade gesagt hast.",
  },
  {
    id: "ur_cha_04",
    category: "CHALLENGE",
    intensity: "MODERATE",
    textEn: "That\u2019s one interpretation. Here\u2019s another: I\u2019m doing my best in a hard situation.",
    textDe: "Das ist eine Interpretation. Hier ist eine andere: Ich tue mein Bestes in einer schwierigen Situation.",
  },
  {
    id: "ur_cha_05",
    category: "CHALLENGE",
    intensity: "MILD",
    textEn: "Even if some of that were true, it doesn\u2019t mean what you say it means.",
    textDe: "Selbst wenn einiges davon wahr w\u00e4re, bedeutet es nicht das, was du sagst, dass es bedeutet.",
  },

  // ── VALUES ────────────────────────────────────────────────────────────────
  {
    id: "ur_val_01",
    category: "VALUES",
    intensity: "MILD",
    textEn: "What matters to me is more important than what you say.",
    textDe: "Was mir wichtig ist, ist wichtiger als das, was du sagst.",
  },
  {
    id: "ur_val_02",
    category: "VALUES",
    intensity: "MILD",
    textEn: "I choose to focus on people who actually care about me.",
    textDe: "Ich entscheide mich, mich auf Menschen zu konzentrieren, denen ich wirklich wichtig bin.",
  },
  {
    id: "ur_val_03",
    category: "VALUES",
    intensity: "MILD",
    textEn: "Being kind, connecting with others, living my values \u2014 that\u2019s what I\u2019m moving toward.",
    textDe: "Freundlichkeit, Verbindung zu anderen, nach meinen Werten leben \u2014 das ist das Ziel, auf das ich mich zubewege.",
  },
  {
    id: "ur_val_04",
    category: "VALUES",
    intensity: "MILD",
    textEn: "My life has meaning, even when you try to tell me otherwise.",
    textDe: "Mein Leben hat eine Bedeutung, auch wenn du versuchst, mir etwas anderes zu sagen.",
  },
  {
    id: "ur_val_05",
    category: "VALUES",
    intensity: "MILD",
    textEn: "I can feel afraid and still choose to do what matters to me.",
    textDe: "Ich kann Angst haben und trotzdem w\u00e4hlen, was mir wichtig ist.",
  },

  // ── SELF_COMPASSION ───────────────────────────────────────────────────────
  {
    id: "ur_sc_01",
    category: "SELF_COMPASSION",
    intensity: "MILD",
    textEn: "I deserve kindness, even from my own mind.",
    textDe: "Ich verdiene Freundlichkeit, auch von meinem eigenen Kopf.",
  },
  {
    id: "ur_sc_02",
    category: "SELF_COMPASSION",
    intensity: "MILD",
    textEn: "I\u2019m doing my best, and that\u2019s enough.",
    textDe: "Ich tue mein Bestes, und das reicht.",
  },
  {
    id: "ur_sc_03",
    category: "SELF_COMPASSION",
    intensity: "MILD",
    textEn: "I would never speak to a friend the way you speak to me. I\u2019ll speak to myself with more care.",
    textDe: "Ich w\u00fcrde niemals so mit einem Freund reden, wie du mit mir redest. Ich werde mit mir selbst f\u00fcrsorglicher sprechen.",
  },
  {
    id: "ur_sc_04",
    category: "SELF_COMPASSION",
    intensity: "MILD",
    textEn: "Struggling doesn\u2019t mean I\u2019m failing. It means I\u2019m still here and still trying.",
    textDe: "Zu k\u00e4mpfen bedeutet nicht, dass ich versage. Es bedeutet, dass ich noch hier bin und noch versuche.",
  },
  {
    id: "ur_sc_05",
    category: "SELF_COMPASSION",
    intensity: "MILD",
    textEn: "I can hold pain and still be kind to myself. Both are true at once.",
    textDe: "Ich kann Schmerz halten und trotzdem freundlich zu mir sein. Beides ist gleichzeitig wahr.",
  },

  // ── BOUNDARY ──────────────────────────────────────────────────────────────
  {
    id: "ur_bou_01",
    category: "BOUNDARY",
    intensity: "MILD",
    textEn: "I\u2019m choosing not to engage with that right now.",
    textDe: "Ich entscheide mich, mich jetzt nicht darauf einzulassen.",
  },
  {
    id: "ur_bou_02",
    category: "BOUNDARY",
    intensity: "MILD",
    textEn: "This conversation is over for now. I\u2019ll come back when I\u2019m ready.",
    textDe: "Dieses Gespr\u00e4ch ist f\u00fcr jetzt vorbei. Ich komme zur\u00fcck, wenn ich bereit bin.",
  },
  {
    id: "ur_bou_03",
    category: "BOUNDARY",
    intensity: "MODERATE",
    textEn: "I won\u2019t let you take up all the space in my mind today.",
    textDe: "Ich werde dir heute nicht erlauben, den gesamten Raum in meinem Kopf einzunehmen.",
  },
  {
    id: "ur_bou_04",
    category: "BOUNDARY",
    intensity: "MILD",
    textEn: "You can be here, but you don\u2019t get to lead.",
    textDe: "Du kannst hier sein, aber du f\u00fchrst nicht.",
  },
  {
    id: "ur_bou_05",
    category: "BOUNDARY",
    intensity: "MODERATE",
    textEn: "I\u2019m setting a limit. That limit is: you don\u2019t speak for me.",
    textDe: "Ich setze eine Grenze. Diese Grenze lautet: Du sprichst nicht f\u00fcr mich.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. WIN STATEMENTS (10 — shown at session close)
// ─────────────────────────────────────────────────────────────────────────────

export const WIN_STATEMENTS: WinStatement[] = [
  {
    id: "ws_01",
    textEn: "I am stronger than my voice thinks.",
    textDe: "Ich bin st\u00e4rker, als meine Stimme glaubt.",
  },
  {
    id: "ws_02",
    textEn: "I have people who care about me.",
    textDe: "Ich habe Menschen, denen ich wichtig bin.",
  },
  {
    id: "ws_03",
    textEn: "I am doing my best, and that is enough.",
    textDe: "Ich tue mein Bestes, und das reicht.",
  },
  {
    id: "ws_04",
    textEn: "I deserve compassion \u2014 especially from myself.",
    textDe: "Ich verdiene Mitgef\u00fchl \u2014 besonders von mir selbst.",
  },
  {
    id: "ws_05",
    textEn: "I am more than what the voice says about me.",
    textDe: "Ich bin mehr als das, was die Stimme \u00fcber mich sagt.",
  },
  {
    id: "ws_06",
    textEn: "Every time I show up for this work, I am building something real.",
    textDe: "Jedes Mal, wenn ich mich dieser Arbeit stelle, baue ich etwas Echtes auf.",
  },
  {
    id: "ws_07",
    textEn: "My values belong to me. No voice can take them away.",
    textDe: "Meine Werte geh\u00f6ren mir. Keine Stimme kann sie mir wegnehmen.",
  },
  {
    id: "ws_08",
    textEn: "I can be afraid and brave at the same time.",
    textDe: "Ich kann gleichzeitig \u00e4ngstlich und mutig sein.",
  },
  {
    id: "ws_09",
    textEn: "The fact that I am here, doing this, is already courage.",
    textDe: "Dass ich hier bin und das tue, ist bereits Mut.",
  },
  {
    id: "ws_10",
    textEn: "I choose how I relate to my voices. That choice is mine.",
    textDe: "Ich bestimme, wie ich mich zu meinen Stimmen verhalte. Diese Entscheidung liegt bei mir.",
  },
];
