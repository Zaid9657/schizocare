// ─────────────────────────────────────────────────────────────────────────────
// ECHO Onboarding Service — localStorage-backed MVP
// ─────────────────────────────────────────────────────────────────────────────

const KEY_ONBOARDED     = "echo_onboarded_at";
const KEY_PROGRESS      = "echo_onboarding_progress";

export interface OnboardingProgress {
  step:              number;
  avatarCreated:     boolean;
  firstSessionDone:  boolean;
}

const DEFAULT_PROGRESS: OnboardingProgress = {
  step:             1,
  avatarCreated:    false,
  firstSessionDone: false,
};

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** Returns true if the user has completed onboarding. */
export function isOnboarded(_userId: string): boolean {
  return !!read<string | null>(KEY_ONBOARDED, null);
}

/** Marks onboarding as complete with a timestamp. */
export function markOnboarded(_userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_ONBOARDED, new Date().toISOString());
}

/** Returns current onboarding progress. */
export function getOnboardingProgress(_userId: string): OnboardingProgress {
  return read<OnboardingProgress>(KEY_PROGRESS, { ...DEFAULT_PROGRESS });
}

/** Saves onboarding progress (partial merge). */
export function saveOnboardingProgress(
  _userId: string,
  patch: Partial<OnboardingProgress>
): void {
  if (typeof window === "undefined") return;
  const current = getOnboardingProgress(_userId);
  localStorage.setItem(KEY_PROGRESS, JSON.stringify({ ...current, ...patch }));
}

/** Clears all onboarding state (used in testing / reset). */
export function resetOnboarding(_userId: string): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_ONBOARDED);
  localStorage.removeItem(KEY_PROGRESS);
}
