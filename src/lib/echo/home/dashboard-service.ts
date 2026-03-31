// ─────────────────────────────────────────────────────────────────────────────
// ECHO Dashboard Service
// Aggregates data from localStorage services for the home dashboard.
// ─────────────────────────────────────────────────────────────────────────────

import type { Avatar, Session } from "@/types/echo";
import type { ReactionPhase } from "@/lib/echo/content/seed-data";
import { getOnboardingProgress } from "@/lib/echo/onboarding/onboarding-service";
import { loadPersistedSessions } from "@/lib/echo/dialogue/session-controller";
import { getUserPhase } from "@/lib/echo/dialogue/phase-manager";

export interface DashboardData {
  daysSinceOnboarding: number;
  totalSessions:       number;
  currentStreak:       number;
  avgMoodImprovement:  number | null;
  currentPhase:        ReactionPhase;
  activeAvatar:        Avatar | null;
  recentSessions:      Session[];
}

function readAvatars(): Avatar[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("echo_avatars");
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch { return []; }
}

function readOnboardedAt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("echo_onboarded_at");
}

/** Returns the number of calendar days since a given ISO date string. */
function daysSince(isoDate: string): number {
  const ms = Date.now() - new Date(isoDate).getTime();
  return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

/**
 * Computes the current consecutive-day streak of completed sessions.
 * A day is a calendar day (UTC).
 */
function computeStreak(sessions: Session[]): number {
  const completed = sessions
    .filter((s) => s.status === "completed" && s.completedAt)
    .map((s) => new Date(s.completedAt!).toISOString().slice(0, 10))
    .sort()
    .reverse();

  if (completed.length === 0) return 0;

  const unique = [...new Set(completed)];
  let streak = 0;
  const today = new Date().toISOString().slice(0, 10);
  let cursor = today;

  for (const day of unique) {
    if (day === cursor) {
      streak++;
      const d = new Date(cursor);
      d.setUTCDate(d.getUTCDate() - 1);
      cursor = d.toISOString().slice(0, 10);
    } else if (day < cursor) {
      break;
    }
  }

  return streak;
}

/** Returns the average mood improvement across completed sessions. */
function avgMoodImprovement(sessions: Session[]): number | null {
  const withMood = sessions.filter(
    (s) => s.status === "completed" && s.moodBefore && s.moodAfter
  );
  if (withMood.length === 0) return null;
  const total = withMood.reduce(
    (sum, s) => sum + (s.moodAfter!.score - s.moodBefore!.score),
    0
  );
  return Math.round((total / withMood.length) * 10) / 10;
}

export async function getDashboardData(_userId: string): Promise<DashboardData> {
  const sessions     = loadPersistedSessions();
  const avatars      = readAvatars();
  const onboardedAt  = readOnboardedAt();
  const phase        = getUserPhase(_userId);
  const activeAvatar = avatars.find((a) => a.isActive) ?? avatars[0] ?? null;
  const completed    = sessions.filter((s) => s.status === "completed");

  return {
    daysSinceOnboarding: onboardedAt ? daysSince(onboardedAt) : 1,
    totalSessions:       completed.length,
    currentStreak:       computeStreak(sessions),
    avgMoodImprovement:  avgMoodImprovement(sessions),
    currentPhase:        phase,
    activeAvatar,
    recentSessions:      completed.slice(-5).reverse(),
  };
}

/** Synchronous variant for client components that cannot await. */
export function getDashboardDataSync(_userId: string): DashboardData {
  const sessions     = loadPersistedSessions();
  const avatars      = readAvatars();
  const onboardedAt  = readOnboardedAt();
  const phase        = getUserPhase(_userId);
  const activeAvatar = avatars.find((a) => a.isActive) ?? avatars[0] ?? null;
  const completed    = sessions.filter((s) => s.status === "completed");

  return {
    daysSinceOnboarding: onboardedAt ? daysSince(onboardedAt) : 1,
    totalSessions:       completed.length,
    currentStreak:       computeStreak(sessions),
    avgMoodImprovement:  avgMoodImprovement(sessions),
    currentPhase:        phase,
    activeAvatar,
    recentSessions:      completed.slice(-5).reverse(),
  };
}
