// ─────────────────────────────────────────────────────────────────────────────
// ECHO Crisis Resources
// ─────────────────────────────────────────────────────────────────────────────

export interface CrisisResource {
  id:       string;
  name:     string;
  phone:    string;
  website?: string;
  hours:    string;
  /** BCP-47 locale tag this resource is primarily for */
  locale:   string;
  /** Short description */
  descEn:   string;
  descDe:   string;
}

export const CRISIS_RESOURCES: CrisisResource[] = [
  // ── Germany ──────────────────────────────────────────────────────────────
  {
    id:      "de_tss_1",
    name:    "Telefonseelsorge",
    phone:   "0800 111 0 111",
    website: "https://www.telefonseelsorge.de",
    hours:   "24/7",
    locale:  "de",
    descEn:  "Free telephone counselling service in Germany.",
    descDe:  "Kostenlose Telefonseelsorge in Deutschland.",
  },
  {
    id:      "de_tss_2",
    name:    "Telefonseelsorge (alternate)",
    phone:   "0800 111 0 222",
    website: "https://www.telefonseelsorge.de",
    hours:   "24/7",
    locale:  "de",
    descEn:  "Second free line of the German telephone counselling service.",
    descDe:  "Zweite kostenlose Leitung der Telefonseelsorge.",
  },
  {
    id:      "de_crisis_sms",
    name:    "Krisentelefon (SMS/Chat)",
    phone:   "0800 111 0 333",
    website: "https://www.onlineberatung-telefonseelsorge.de",
    hours:   "24/7",
    locale:  "de",
    descEn:  "Online chat and email counselling in German.",
    descDe:  "Online-Chat und E-Mail-Beratung auf Deutsch.",
  },
  // ── United States ─────────────────────────────────────────────────────────
  {
    id:      "us_988",
    name:    "988 Suicide & Crisis Lifeline",
    phone:   "988",
    website: "https://988lifeline.org",
    hours:   "24/7",
    locale:  "en",
    descEn:  "Call or text 988 in the US for free, confidential support.",
    descDe:  "Ruf 988 in den USA an für kostenlose, vertrauliche Unterstützung.",
  },
  {
    id:      "us_crisis_text",
    name:    "Crisis Text Line",
    phone:   "Text HOME to 741741",
    website: "https://www.crisistextline.org",
    hours:   "24/7",
    locale:  "en",
    descEn:  "Text-based crisis support in the US.",
    descDe:  "Text-basierte Krisenunterstützung in den USA.",
  },
  // ── International ─────────────────────────────────────────────────────────
  {
    id:      "intl_befrienders",
    name:    "Befrienders Worldwide",
    phone:   "",
    website: "https://www.befrienders.org",
    hours:   "Varies by country",
    locale:  "en",
    descEn:  "Find local crisis support anywhere in the world.",
    descDe:  "Lokale Krisenunterstützung weltweit finden.",
  },
  {
    id:      "intl_findahelpline",
    name:    "Find A Helpline",
    phone:   "",
    website: "https://findahelpline.com",
    hours:   "24/7",
    locale:  "en",
    descEn:  "Directory of crisis lines worldwide.",
    descDe:  "Verzeichnis von Krisentelefonen weltweit.",
  },
];

/** Returns resources for the given locale, with international lines appended. */
export function getCrisisResources(locale: string): CrisisResource[] {
  const localResources = CRISIS_RESOURCES.filter((r) => r.locale === locale);
  const international  = CRISIS_RESOURCES.filter((r) => r.locale !== "de" && r.locale !== locale);
  return localResources.length > 0
    ? [...localResources, ...international]
    : CRISIS_RESOURCES;
}

/** Returns the primary (first) local crisis line. */
export function getPrimaryCrisisLine(locale: string): CrisisResource {
  const local = CRISIS_RESOURCES.find((r) => r.locale === locale);
  return local ?? CRISIS_RESOURCES[3]; // fallback: 988
}
