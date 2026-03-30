// ─────────────────────────────────────────────────────────────────────────────
// Grounding exercise configuration — all local, no API calls
// ─────────────────────────────────────────────────────────────────────────────

export interface GroundingExercise {
  id: string;
  href: string;           // sub-path relative to /echo/grounding
  icon: string;
  color: string;          // card background
  borderColor: string;
  durationLabel: { en: string; de: string };
  title: { en: string; de: string };
  description: { en: string; de: string };
}

export const GROUNDING_EXERCISES: GroundingExercise[] = [
  {
    id: "breathing",
    href: "breathing",
    icon: "🫁",
    color: "#E8F0FA",
    borderColor: "#4A7FC1",
    durationLabel: { en: "4 min", de: "4 Min." },
    title: { en: "Box Breathing", de: "Box-Atmung" },
    description: {
      en: "Breathe in for 4, hold for 4, out for 4, hold for 4. Calms the nervous system quickly.",
      de: "4 Sekunden einatmen, 4 halten, 4 ausatmen, 4 halten. Beruhigt das Nervensystem schnell.",
    },
  },
  {
    id: "senses",
    href: "senses",
    icon: "🌱",
    color: "#E8F5F2",
    borderColor: "#0B7B6F",
    durationLabel: { en: "3 min", de: "3 Min." },
    title: { en: "5-4-3-2-1 Grounding", de: "5-4-3-2-1 Erdung" },
    description: {
      en: "Anchor yourself in the present by naming things you can see, hear, touch, smell, and taste.",
      de: "Verankere dich im Jetzt, indem du Dinge benennst, die du siehst, hörst, fühlst, riechst und schmeckst.",
    },
  },
  {
    id: "safe-place",
    href: "safe-place",
    icon: "🏡",
    color: "#FBF3E3",
    borderColor: "#9E6D1B",
    durationLabel: { en: "5 min", de: "5 Min." },
    title: { en: "Safe Place", de: "Sicherer Ort" },
    description: {
      en: "A guided visualisation to a place where you feel completely safe and calm.",
      de: "Eine geführte Visualisierung zu einem Ort, an dem du dich völlig sicher und ruhig fühlst.",
    },
  },
  {
    id: "cold-water",
    href: "#cold-water",   // inline tip — no sub-page needed
    icon: "💧",
    color: "#E8F5EC",
    borderColor: "#2E7D50",
    durationLabel: { en: "1 min", de: "1 Min." },
    title: { en: "Cold Water Reset", de: "Kaltwasser-Reset" },
    description: {
      en: "Splash cold water on your face or hold ice. Activates the dive reflex and slows your heart rate fast.",
      de: "Spritz kaltes Wasser ins Gesicht oder halte Eis. Aktiviert den Tauchreflex und senkt schnell die Herzfrequenz.",
    },
  },
];

// ── Box breathing phases ───────────────────────────────────────────────────────

export type BreathPhase = "in" | "hold-in" | "out" | "hold-out";

export interface BreathPhaseConfig {
  phase: BreathPhase;
  durationSeconds: number;
  label: { en: string; de: string };
  instruction: { en: string; de: string };
}

export const BOX_BREATH_PHASES: BreathPhaseConfig[] = [
  {
    phase: "in",
    durationSeconds: 4,
    label:       { en: "Breathe in",  de: "Einatmen" },
    instruction: { en: "Breathe in slowly through your nose…", de: "Atme langsam durch die Nase ein…" },
  },
  {
    phase: "hold-in",
    durationSeconds: 4,
    label:       { en: "Hold",  de: "Halten" },
    instruction: { en: "Hold your breath gently…", de: "Atem sanft anhalten…" },
  },
  {
    phase: "out",
    durationSeconds: 4,
    label:       { en: "Breathe out", de: "Ausatmen" },
    instruction: { en: "Breathe out slowly through your mouth…", de: "Atme langsam durch den Mund aus…" },
  },
  {
    phase: "hold-out",
    durationSeconds: 4,
    label:       { en: "Hold",  de: "Halten" },
    instruction: { en: "Hold, then begin again…", de: "Halten, dann wieder von vorn…" },
  },
];

export const BOX_BREATH_TOTAL_CYCLES = 4;

// ── 5-4-3-2-1 senses steps ───────────────────────────────────────────────────

export interface SensesStep {
  count: number;
  sense: string;
  icon: string;
  color: string;
  prompt: { en: string; de: string };
  hint:   { en: string; de: string };
}

export const SENSES_STEPS: SensesStep[] = [
  {
    count: 5, sense: "see", icon: "👀", color: "#4A7FC1",
    prompt: { en: "Name 5 things you can SEE",   de: "Nenne 5 Dinge, die du SIEHST" },
    hint:   { en: "Look around slowly. Notice colours, shapes, light.",
               de: "Schau dich langsam um. Bemerke Farben, Formen, Licht." },
  },
  {
    count: 4, sense: "hear", icon: "👂", color: "#0B7B6F",
    prompt: { en: "Name 4 things you can HEAR",   de: "Nenne 4 Dinge, die du HÖRST" },
    hint:   { en: "Close your eyes if comfortable. Listen for near and far sounds.",
               de: "Schließ die Augen, wenn es sich gut anfühlt. Höre auf nahe und ferne Geräusche." },
  },
  {
    count: 3, sense: "touch", icon: "🤲", color: "#6B3FA0",
    prompt: { en: "Name 3 things you can TOUCH",  de: "Nenne 3 Dinge, die du BERÜHRST" },
    hint:   { en: "Feel textures — your clothes, the chair, the floor under your feet.",
               de: "Spüre Texturen — deine Kleidung, den Stuhl, den Boden unter deinen Füßen." },
  },
  {
    count: 2, sense: "smell", icon: "👃", color: "#9E6D1B",
    prompt: { en: "Name 2 things you can SMELL",  de: "Nenne 2 Dinge, die du RIECHST" },
    hint:   { en: "Breathe in gently. Notice any faint smells in the air around you.",
               de: "Atme sanft ein. Bemerke leichte Gerüche in der Luft um dich herum." },
  },
  {
    count: 1, sense: "taste", icon: "👅", color: "#2E7D50",
    prompt: { en: "Name 1 thing you can TASTE",   de: "Nenne 1 Ding, das du SCHMECKST" },
    hint:   { en: "Notice any taste in your mouth right now.",
               de: "Bemerke jeden Geschmack, der gerade in deinem Mund ist." },
  },
];

// ── Safe place visualisation steps ───────────────────────────────────────────

export interface SafePlaceStep {
  id: string;
  icon: string;
  color: string;
  title: { en: string; de: string };
  body:  { en: string; de: string };
  cta:   { en: string; de: string };
}

export const SAFE_PLACE_STEPS: SafePlaceStep[] = [
  {
    id: "settle",
    icon: "🌿",
    color: "#0B7B6F",
    title: { en: "Find a comfortable position", de: "Finde eine bequeme Position" },
    body: {
      en: "Sit or lie in a way that feels comfortable. You don't need to close your eyes — but you can if you'd like. Take one slow breath in, and let it out gently.",
      de: "Setz oder leg dich so, dass es sich wohl anfühlt. Du musst die Augen nicht schließen — aber du kannst, wenn du möchtest. Atme einmal langsam ein und lass die Luft sanft heraus.",
    },
    cta: { en: "I'm ready", de: "Ich bin bereit" },
  },
  {
    id: "arrive",
    icon: "🏡",
    color: "#9E6D1B",
    title: { en: "Imagine a safe place", de: "Stell dir einen sicheren Ort vor" },
    body: {
      en: "Think of a place — real or imagined — where you feel completely safe and calm. It could be a room, a garden, a beach, a forest, or anywhere at all. Let the image come to you gently.",
      de: "Denke an einen Ort — echt oder vorgestellt — wo du dich vollkommen sicher und ruhig fühlst. Es könnte ein Zimmer, ein Garten, ein Strand, ein Wald oder irgendein anderer Ort sein. Lass das Bild sanft kommen.",
    },
    cta: { en: "I can see it", de: "Ich kann es sehen" },
  },
  {
    id: "explore-see",
    icon: "👀",
    color: "#4A7FC1",
    title: { en: "What do you see?", de: "Was siehst du?" },
    body: {
      en: "Look around this place in your mind. What colours do you notice? Is it indoors or outdoors? Light or dim? Take your time to take it all in.",
      de: "Schau dich in diesem Ort in deinem Kopf um. Welche Farben nimmst du wahr? Ist es drinnen oder draußen? Hell oder dämmerig? Nimm dir die Zeit, alles aufzunehmen.",
    },
    cta: { en: "Continue", de: "Weiter" },
  },
  {
    id: "explore-feel",
    icon: "🤲",
    color: "#6B3FA0",
    title: { en: "What does it feel like?", de: "Wie fühlt es sich an?" },
    body: {
      en: "Notice the temperature. Is it warm, cool, or just right? Feel the ground or surface beneath you. Is there a breeze? Notice how your body feels in this place — safe, held, at ease.",
      de: "Bemerke die Temperatur. Ist es warm, kühl oder genau richtig? Spüre den Boden oder die Fläche unter dir. Gibt es eine Brise? Bemerke, wie sich dein Körper an diesem Ort anfühlt — sicher, geborgen, entspannt.",
    },
    cta: { en: "Continue", de: "Weiter" },
  },
  {
    id: "explore-sound",
    icon: "👂",
    color: "#2E7D50",
    title: { en: "What do you hear?", de: "Was hörst du?" },
    body: {
      en: "Listen to the sounds in your safe place. It might be silence, water, birds, or gentle music. Let the sounds wrap around you like a soft blanket.",
      de: "Höre auf die Geräusche an deinem sicheren Ort. Es könnte Stille, Wasser, Vögel oder sanfte Musik sein. Lass die Klänge dich wie eine weiche Decke umhüllen.",
    },
    cta: { en: "Continue", de: "Weiter" },
  },
  {
    id: "rest",
    icon: "✨",
    color: "#1A1A2E",
    title: { en: "Rest here for a moment", de: "Ruhe hier einen Moment" },
    body: {
      en: "You are safe here. Nothing can harm you in this place. Stay as long as you'd like. When you're ready, take a slow breath, gently open your eyes, and notice how you feel.",
      de: "Du bist hier sicher. Nichts kann dir an diesem Ort schaden. Bleib so lange, wie du möchtest. Wenn du bereit bist, atme langsam ein, öffne sanft die Augen und bemerke, wie du dich fühlst.",
    },
    cta: { en: "I'm ready to return", de: "Ich bin bereit zurückzukehren" },
  },
];
