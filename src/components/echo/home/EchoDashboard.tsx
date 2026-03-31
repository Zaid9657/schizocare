"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isOnboarded } from "@/lib/echo/onboarding/onboarding-service";
import { getDashboardDataSync, type DashboardData } from "@/lib/echo/home/dashboard-service";
import DashboardGreeting from "./DashboardGreeting";
import DashboardStats    from "./DashboardStats";
import StartSessionCard  from "./StartSessionCard";
import QuickActions      from "./QuickActions";
import ActiveAvatarCard  from "./ActiveAvatarCard";
import RecentVictories   from "./RecentVictories";
import BottomNav         from "./BottomNav";

interface EchoDashboardProps {
  locale: string;
}

export default function EchoDashboard({ locale }: EchoDashboardProps) {
  const router = useRouter();

  const [data, setData]       = useState<DashboardData | null>(null);
  const [mounted, setMounted] = useState(false);

  const load = useCallback(() => {
    setData(getDashboardDataSync("local"));
  }, []);

  useEffect(() => {
    // Redirect first-time users to onboarding
    if (!isOnboarded("local")) {
      router.replace(`/${locale}/echo/onboarding`);
      return;
    }
    load();
    setMounted(true);

    // Reload on tab focus (data may have changed in another tab)
    function onVisible() {
      if (document.visibilityState === "visible") load();
    }
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [locale, router, load]);

  if (!mounted || !data) return null;

  const sessionHref  = `/${locale}/echo/session`;
  const avatarHref   = `/${locale}/echo/avatar`;
  const groundHref   = `/${locale}/echo/grounding`;
  const progressHref = `/${locale}/echo/progress`;

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto", paddingBottom: "80px" }}>

      {/* Header row: greeting + avatar */}
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-start",
          gap:            "16px",
          marginBottom:   "20px",
        }}
      >
        <DashboardGreeting
          locale={locale}
          daysSinceOnboarding={data.daysSinceOnboarding}
        />
        <div style={{ flexShrink: 0, minWidth: "140px" }}>
          <ActiveAvatarCard
            avatar={data.activeAvatar}
            locale={locale}
            avatarHref={avatarHref}
          />
        </div>
      </div>

      {/* Stats row */}
      <DashboardStats
        totalSessions={data.totalSessions}
        currentStreak={data.currentStreak}
        avgMoodImprovement={data.avgMoodImprovement}
        currentPhase={data.currentPhase}
        locale={locale}
        progressHref={progressHref}
      />

      {/* Primary CTA */}
      <StartSessionCard
        avatar={data.activeAvatar}
        locale={locale}
        sessionHref={sessionHref}
        avatarHref={avatarHref}
      />

      {/* Quick Actions */}
      <QuickActions
        locale={locale}
        groundHref={groundHref}
        avatarHref={avatarHref}
        progressHref={progressHref}
      />

      {/* Recent activity */}
      <RecentVictories
        sessions={data.recentSessions}
        locale={locale}
        progressHref={progressHref}
      />

      {/* Mobile bottom nav */}
      <BottomNav locale={locale} />
    </div>
  );
}
