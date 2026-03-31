"use client";

import type { Session } from "@/types/echo";

const EN = {
  title:    "Recent Activity",
  empty:    "Complete a session to see your progress here",
  seeAll:   "See all",
  session:  "Session",
  mood:     "Mood",
  improved: "improved",
  same:     "unchanged",
  lower:    "lower",
  exchanges: "exchanges",
};
const DE = {
  title:    "Letzte Aktivität",
  empty:    "Schließe eine Sitzung ab, um deinen Fortschritt hier zu sehen",
  seeAll:   "Alle anzeigen",
  session:  "Sitzung",
  mood:     "Stimmung",
  improved: "verbessert",
  same:     "unverändert",
  lower:    "gesunken",
  exchanges: "Austausche",
};

interface RecentVictoriesProps {
  sessions:     Session[];
  locale:       string;
  progressHref: string;
}

function moodDelta(session: Session): number {
  if (!session.moodBefore || !session.moodAfter) return 0;
  return session.moodAfter.score - session.moodBefore.score;
}

function formatDate(isoDate: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === "de" ? "de-DE" : "en-GB", {
      day:   "numeric",
      month: "short",
    }).format(new Date(isoDate));
  } catch {
    return isoDate.slice(0, 10);
  }
}

export default function RecentVictories({ sessions, locale, progressHref }: RecentVictoriesProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div style={{ marginBottom: "24px" }}>
      <div
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "baseline",
          marginBottom:   "12px",
        }}
      >
        <div
          style={{
            fontSize:      "12px",
            fontWeight:    "bold",
            color:         "#7A7A96",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {t.title}
        </div>
        {sessions.length > 0 && (
          <span style={{ fontSize: "13px", color: "#C0B8D0" }}>{t.seeAll}</span>
        )}
      </div>

      {sessions.length === 0 ? (
        <div
          style={{
            padding:         "24px 20px",
            backgroundColor: "#F9F8F6",
            border:          "2px dashed #E0DDD7",
            borderRadius:    "12px",
            textAlign:       "center",
            color:           "#9A9AB0",
            fontSize:        "15px",
            lineHeight:      1.6,
          }}
        >
          {t.empty}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {sessions.slice(0, 3).map((session, i) => {
            const delta = moodDelta(session);
            const deltaColor = delta > 0 ? "#2E7D50" : delta < 0 ? "#C03030" : "#7A7A96";
            const deltaLabel = delta > 0 ? `+${delta} ${t.improved}` : delta < 0 ? `${delta} ${t.lower}` : t.same;
            const dateStr = session.completedAt ? formatDate(session.completedAt, locale) : "";

            return (
              <div
                key={session.id}
                style={{
                  display:         "flex",
                  alignItems:      "center",
                  gap:             "14px",
                  padding:         "14px 16px",
                  backgroundColor: "#FFFFFF",
                  border:          "2px solid #EEECE8",
                  borderRadius:    "10px",
                  animation:       `echoFadeIn 0.2s ease both`,
                  animationDelay:  `${i * 40}ms`,
                }}
              >
                <div
                  style={{
                    width:           "36px",
                    height:          "36px",
                    borderRadius:    "50%",
                    backgroundColor: delta > 0 ? "#E8F5EF" : "#F9F8F6",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    fontSize:        "16px",
                    flexShrink:      0,
                  }}
                  aria-hidden="true"
                >
                  {delta > 0 ? "✓" : "💬"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A2E" }}>
                    {t.session} · {session.exchangeCount} {t.exchanges}
                  </div>
                  <div style={{ fontSize: "12px", color: deltaColor, marginTop: "2px", fontWeight: "500" }}>
                    {t.mood} {deltaLabel}
                  </div>
                </div>
                <span style={{ fontSize: "12px", color: "#9A9AB0", flexShrink: 0 }}>{dateStr}</span>
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes echoFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echoFadeIn { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
    </div>
  );
}
