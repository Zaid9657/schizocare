"use client";

const EN = {
  morning:   "Good morning",
  afternoon: "Good afternoon",
  evening:   "Good evening",
  welcome:   "Welcome back",
  journeyDay: (n: number) => n === 1 ? "Day 1 of your journey" : `Day ${n} of your journey`,
};
const DE = {
  morning:   "Guten Morgen",
  afternoon: "Guten Tag",
  evening:   "Guten Abend",
  welcome:   "Willkommen zurück",
  journeyDay: (n: number) => n === 1 ? "Tag 1 deiner Reise" : `Tag ${n} deiner Reise`,
};

interface DashboardGreetingProps {
  locale:              string;
  daysSinceOnboarding: number;
}

function getGreeting(locale: string): string {
  const t = locale === "de" ? DE : EN;
  const hour = new Date().getHours();
  if (hour < 12) return t.morning;
  if (hour < 18) return t.afternoon;
  return t.evening;
}

export default function DashboardGreeting({ locale, daysSinceOnboarding }: DashboardGreetingProps) {
  const t       = locale === "de" ? DE : EN;
  const greeting = getGreeting(locale);

  return (
    <div style={{ marginBottom: "4px" }}>
      <h1
        style={{
          fontFamily:  "var(--font-fraunces), Georgia, serif",
          fontSize:    "26px",
          fontWeight:  "bold",
          color:       "#1A1A2E",
          margin:      "0 0 4px 0",
          lineHeight:  1.2,
        }}
      >
        {greeting}
      </h1>
      <p style={{ margin: 0, fontSize: "14px", color: "#0B7B6F", fontWeight: "600" }}>
        {t.journeyDay(daysSinceOnboarding)}
      </p>
    </div>
  );
}
