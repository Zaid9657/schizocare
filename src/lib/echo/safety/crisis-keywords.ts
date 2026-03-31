// ─────────────────────────────────────────────────────────────────────────────
// ECHO Crisis Keyword Detection
// Uses partial word matching to catch common variations.
// Intentionally conservative: false positives are safer than false negatives.
// ─────────────────────────────────────────────────────────────────────────────

export const CRISIS_KEYWORDS_EN: string[] = [
  "suicide",
  "kill myself",
  "end it all",
  "don't want to live",
  "dont want to live",
  "want to die",
  "hurt myself",
  "self harm",
  "self-harm",
  "cut myself",
  "overdose",
  "end my life",
  "no reason to live",
  "not worth living",
  "rather be dead",
  "better off dead",
];

export const CRISIS_KEYWORDS_DE: string[] = [
  "selbstmord",
  "umbringen",
  "nicht mehr leben",
  "mich verletzen",
  "selbstverletzung",
  "überdosis",
  "überdosierung",
  "sterben wollen",
  "kein grund zu leben",
  "nicht mehr da sein",
  "alles beenden",
  "mich töten",
];

export interface CrisisCheckResult {
  detected: boolean;
  keyword?: string;
}

/**
 * Checks a piece of user text for crisis keywords.
 * Normalises to lowercase, then checks for substring matches.
 */
export function checkForCrisis(text: string, locale: string): CrisisCheckResult {
  if (!text || !text.trim()) return { detected: false };

  const normalised = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics for de
    .trim();

  const keywords = locale === "de"
    ? [...CRISIS_KEYWORDS_DE, ...CRISIS_KEYWORDS_EN]
    : [...CRISIS_KEYWORDS_EN];

  for (const kw of keywords) {
    const normKw = kw.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalised.includes(normKw)) {
      return { detected: true, keyword: kw };
    }
  }

  return { detected: false };
}
