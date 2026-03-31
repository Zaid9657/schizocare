"use client";

import Link from "next/link";
import EchoProgressBar from "@/components/echo/ui/EchoProgressBar";
import type { ReactionPhase } from "@/lib/echo/content/seed-data";
import type { EchoPhase } from "@/components/echo/ui/EchoProgressBar";

const PHASE_LABEL: Record<ReactionPhase, { en: string; de: string }> = {
  EARLY:  { en: "Early",  de: "Früh" },
  MIDDLE: { en: "Middle", de: "Mitte" },
  LATE:   { en: "Late",   de: "Spät" },
};

const EN = {
  sessions: "Sessions",
  streak:   "Streak",
  mood:     "Avg Mood",
  phase:    "Phase",
  days:     "days",
  na:       "—",
};
const DE = {
  sessions: "Sitzungen",
  streak:   "Serie",
  mood:     "Ø Stimmung",
  phase:    "Phase",
  days:     "Tage",
  na:       "—",
};

interface DashboardStatsProps {
  totalSessions:      number;
  currentStreak:      number;
  avgMoodImprovement: number | null;
  currentPhase:       ReactionPhase;
  locale:             string;
  progressHref:       string;
}

interface StatTileProps {
  icon:     string;
  value:    string;
  label:    string;
  sub?:     React.ReactNode;
  href:     string;
}

function StatTile({ icon, value, label, sub, href }: StatTileProps) {
  return (
    <Link
      href={href}
      style={{
        flex:            "1 1 0",
        minWidth:        "72px",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        gap:             "4px",
        padding:         "14px 8px",
        backgroundColor: "#FFFFFF",
        border:          "2px solid #EEECE8",
        borderRadius:    "12px",
        textDecoration:  "none",
        textAlign:       "center",
        transition:      "border-color 0.12s",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#6B3FA040"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#EEECE8"; }}
    >
      <span aria-hidden="true" style={{ fontSize: "20px", lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: "20px", fontWeight: "bold", color: "#1A1A2E", lineHeight: 1.1 }}>{value}</span>
      <span style={{ fontSize: "11px", color: "#7A7A96", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      {sub && <div style={{ width: "100%", marginTop: "2px" }}>{sub}</div>}
    </Link>
  );
}

export default function DashboardStats({
  totalSessions,
  currentStreak,
  avgMoodImprovement,
  currentPhase,
  locale,
  progressHref,
}: DashboardStatsProps) {
  const t = locale === "de" ? DE : EN;

  const moodStr = avgMoodImprovement === null
    ? t.na
    : `${avgMoodImprovement >= 0 ? "+" : ""}${avgMoodImprovement}`;

  return (
    <div
      style={{ display: "flex", gap: "8px", marginBottom: "20px" }}
      role="region"
      aria-label={locale === "de" ? "Statistiken" : "Stats"}
    >
      <StatTile
        icon="💬"
        value={String(totalSessions)}
        label={t.sessions}
        href={progressHref}
      />
      <StatTile
        icon="🔥"
        value={currentStreak > 0 ? String(currentStreak) : "0"}
        label={t.streak}
        sub={currentStreak > 0 ? (
          <span style={{ fontSize: "11px", color: "#9E6D1B" }}>{t.days}</span>
        ) : undefined}
        href={progressHref}
      />
      <StatTile
        icon="📈"
        value={moodStr}
        label={t.mood}
        href={progressHref}
      />
      <StatTile
        icon="🗺️"
        value={PHASE_LABEL[currentPhase][locale === "de" ? "de" : "en"]}
        label={t.phase}
        sub={
          <EchoProgressBar
            percent={0}
            phase={currentPhase as EchoPhase}
            locale={locale}
            height={4}
          />
        }
        href={progressHref}
      />
    </div>
  );
}
