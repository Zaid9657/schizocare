"use client";

import QuickActionCard from "./QuickActionCard";

const EN = {
  title:     "Quick Actions",
  grounding: "Grounding",
  responses: "Responses",
  avatar:    "My Avatar",
  progress:  "Journey",
};
const DE = {
  title:     "Schnellaktionen",
  grounding: "Erdung",
  responses: "Antworten",
  avatar:    "Mein Avatar",
  progress:  "Reise",
};

interface QuickActionsProps {
  locale:       string;
  groundHref:   string;
  avatarHref:   string;
  progressHref: string;
}

export default function QuickActions({
  locale,
  groundHref,
  avatarHref,
  progressHref,
}: QuickActionsProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          fontSize:      "12px",
          fontWeight:    "bold",
          color:         "#7A7A96",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom:  "12px",
        }}
      >
        {t.title}
      </div>
      <div
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "10px",
        }}
      >
        <QuickActionCard icon="🧘" label={t.grounding} href={groundHref}     color="#0B7B6F" />
        <QuickActionCard icon="💬" label={t.responses} href="#"              color="#9E6D1B" badge="Soon" />
        <QuickActionCard icon="👤" label={t.avatar}    href={avatarHref}     color="#6B3FA0" />
        <QuickActionCard icon="📊" label={t.progress}  href={progressHref}   color="#2E7D50" badge="Soon" />
      </div>
    </div>
  );
}
