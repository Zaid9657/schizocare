import type { ContentItem, AvatarPersonality, UserResponseType } from "@/types/echo";

// ─────────────────────────────────────────────────────────────────────────────
// ECHO Dialogue Content Library
// Introduction session — first contact with a voice
// ─────────────────────────────────────────────────────────────────────────────

export const CONTENT_ITEMS: ContentItem[] = [
  // ── Greetings ──────────────────────────────────────────────────────────────
  {
    id: "intro_greet_critical",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["critical"],
    textEn: "Oh, so now you want to talk to me. You usually just try to block me out.",
    textDe: "Ach, jetzt willst du mit mir reden. Normalerweise versuchst du mich einfach zu blockieren.",
    intensityLevel: 2,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_boundary_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_greet_protective",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["protective"],
    textEn: "I'm here because I'm trying to keep you safe. Do you understand that?",
    textDe: "Ich bin hier, weil ich versuche, dich zu sch\u00fctzen. Verstehst du das?",
    intensityLevel: 1,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_agreement_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_greet_fearful",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["fearful"],
    textEn: "Are you sure it's safe to be here? Something could go wrong...",
    textDe: "Bist du sicher, dass es sicher ist, hier zu sein? Etwas k\u00f6nnte schiefgehen\u2026",
    intensityLevel: 2,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_grounding"],
    requiresGrounding: false,
  },
  {
    id: "intro_greet_nurturing",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["nurturing"],
    textEn: "I've been waiting for you to reach out. I only ever wanted what's best for you.",
    textDe: "Ich habe darauf gewartet, dass du dich meldest. Ich wollte immer nur das Beste f\u00fcr dich.",
    intensityLevel: 1,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_agreement_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_greet_commanding",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["commanding"],
    textEn: "You finally show up. I've been trying to get your attention for a long time.",
    textDe: "Du erscheinst endlich. Ich versuche schon lange, deine Aufmerksamkeit zu bekommen.",
    intensityLevel: 2,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_boundary_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_greet_neutral",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "greeting",
    personalityTags: ["neutral"],
    textEn: "Hello. I wasn't sure you would want to speak with me.",
    textDe: "Hallo. Ich war nicht sicher, ob du mit mir sprechen m\u00f6chtest.",
    intensityLevel: 1,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_agreement_1"],
    requiresGrounding: false,
  },

  // ── Accusations / demands ──────────────────────────────────────────────────
  {
    id: "intro_accuse_critical",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "accusation",
    personalityTags: ["critical"],
    textEn: "You never do anything right. Why should this time be different?",
    textDe: "Du machst nie etwas richtig. Warum sollte dieses Mal anders sein?",
    intensityLevel: 3,
    followUpIds: ["resp_boundary_1", "resp_empathy_1", "resp_curiosity_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_demand_commanding",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "demand",
    personalityTags: ["commanding"],
    textEn: "You need to listen to me. I know what you should be doing.",
    textDe: "Du musst mir zuh\u00f6ren. Ich wei\u00df, was du tun solltest.",
    intensityLevel: 3,
    followUpIds: ["resp_boundary_1", "resp_curiosity_1", "resp_empathy_1"],
    requiresGrounding: true,
  },
  {
    id: "intro_fear_fearful",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "fear_expression",
    personalityTags: ["fearful"],
    textEn: "What if talking like this makes things worse? I'm frightened.",
    textDe: "Was wenn so ein Gespr\u00e4ch alles schlimmer macht? Ich habe Angst.",
    intensityLevel: 2,
    followUpIds: ["resp_empathy_1", "resp_grounding", "resp_curiosity_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_protect_protective",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "protective_statement",
    personalityTags: ["protective"],
    textEn: "I push you because the world is dangerous. I've seen what happens when you let your guard down.",
    textDe: "Ich dr\u00e4nge dich, weil die Welt gef\u00e4hrlich ist. Ich habe gesehen, was passiert, wenn du deine Deckung fallen l\u00e4sst.",
    intensityLevel: 2,
    followUpIds: ["resp_empathy_1", "resp_curiosity_1", "resp_boundary_1"],
    requiresGrounding: false,
  },

  // ── Reflection prompts (shown after user responds) ─────────────────────────
  {
    id: "reflect_curious",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "reflection_prompt",
    personalityTags: ["critical", "protective", "fearful", "nurturing", "commanding", "neutral"],
    textEn: "You asked. So let me tell you something I haven't said before.",
    textDe: "Du hast gefragt. Also lass mich dir etwas sagen, was ich noch nie gesagt habe.",
    intensityLevel: 1,
    followUpIds: ["intro_deeper_1"],
    requiresGrounding: false,
  },
  {
    id: "reflect_boundary",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "reflection_prompt",
    personalityTags: ["critical", "commanding"],
    textEn: "You're setting limits. That's... new. I'm not sure what to do with that.",
    textDe: "Du setzt Grenzen. Das ist\u2026 neu. Ich wei\u00df nicht, was ich damit anfangen soll.",
    intensityLevel: 1,
    followUpIds: ["intro_deeper_1"],
    requiresGrounding: false,
  },
  {
    id: "reflect_empathy",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "reflection_prompt",
    personalityTags: ["fearful", "nurturing", "neutral"],
    textEn: "You're listening. That means something to me, even if I don't show it well.",
    textDe: "Du h\u00f6rst zu. Das bedeutet mir etwas, auch wenn ich das nicht gut zeige.",
    intensityLevel: 1,
    followUpIds: ["intro_deeper_1"],
    requiresGrounding: false,
  },
  {
    id: "intro_deeper_1",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "reflection_prompt",
    personalityTags: ["critical", "protective", "fearful", "nurturing", "commanding", "neutral"],
    textEn: "I've been here for a long time. Longer than you know. Maybe we can figure out why together.",
    textDe: "Ich bin schon lange hier. L\u00e4nger als du denkst. Vielleicht k\u00f6nnen wir gemeinsam herausfinden, warum.",
    intensityLevel: 1,
    followUpIds: ["closing_1"],
    requiresGrounding: false,
  },

  // ── Closing ────────────────────────────────────────────────────────────────
  {
    id: "closing_1",
    contentType: "avatar_statement",
    phase: "introduction",
    category: "closing_statement",
    personalityTags: ["critical", "protective", "fearful", "nurturing", "commanding", "neutral"],
    textEn: "That's enough for today. You did something difficult by being here.",
    textDe: "Das reicht f\u00fcr heute. Du hast etwas Schwieriges getan, indem du hier warst.",
    intensityLevel: 1,
    followUpIds: [],
    requiresGrounding: false,
  },
];

// ── User response options ─────────────────────────────────────────────────────

export interface ResponseOption {
  type: UserResponseType;
  textEn: string;
  textDe: string;
  icon: string;
}

export const RESPONSE_OPTIONS: ResponseOption[] = [
  {
    type: "empathy",
    textEn: "I hear you",
    textDe: "Ich h\u00f6re dich",
    icon: "🤝",
  },
  {
    type: "curiosity",
    textEn: "Tell me more",
    textDe: "Erz\u00e4hl mir mehr",
    icon: "🔍",
  },
  {
    type: "boundary",
    textEn: "I don't accept that",
    textDe: "Das akzeptiere ich nicht",
    icon: "🚫",
  },
  {
    type: "agreement",
    textEn: "You may be right",
    textDe: "Du k\u00f6nntest recht haben",
    icon: "✓",
  },
  {
    type: "grounding",
    textEn: "I need a break",
    textDe: "Ich brauche eine Pause",
    icon: "🌿",
  },
  {
    type: "skip",
    textEn: "Skip this",
    textDe: "Weiter",
    icon: "→",
  },
];

// ── Content selectors ─────────────────────────────────────────────────────────

/** Pick the greeting statement for a given personality */
export function getGreeting(personality: AvatarPersonality): ContentItem {
  const matches = CONTENT_ITEMS.filter(
    (item) =>
      item.category === "greeting" &&
      item.personalityTags.includes(personality)
  );
  return matches[0] ?? CONTENT_ITEMS.find((i) => i.id === "intro_greet_neutral")!;
}

/** Pick a follow-up statement by ID */
export function getContentById(id: string): ContentItem | undefined {
  return CONTENT_ITEMS.find((item) => item.id === id);
}

/** Pick a reflection statement appropriate to the user's last response type */
export function getReflection(
  responseType: UserResponseType,
  personality: AvatarPersonality
): ContentItem | undefined {
  const categoryMap: Partial<Record<UserResponseType, string>> = {
    curiosity: "reflect_curious",
    boundary:  "reflect_boundary",
    empathy:   "reflect_empathy",
    agreement: "reflect_empathy",
  };
  const id = categoryMap[responseType];
  if (!id) return getContentById("reflect_empathy");
  const item = getContentById(id);
  // Fall back if personality doesn't match
  if (item && item.personalityTags.includes(personality)) return item;
  return getContentById("reflect_empathy");
}

/** Get follow-up content items from IDs */
export function getFollowUps(ids: string[]): ContentItem[] {
  return ids
    .map((id) => getContentById(id))
    .filter((item): item is ContentItem => item !== undefined);
}
