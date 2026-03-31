"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Avatar } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";

const EN = {
  title:       "Start a Session",
  subtitle:    "Choose a voice to work with.",
  noAvatars:   "You haven't created any voices yet.",
  createFirst: "Create a voice first",
  groundFirst: "Ground yourself first",
  begin:       "Begin Session",
  sessionTypes: [
    { id: "guided",    labelEn: "Guided",      icon: "🧭", hintEn: "Coaching tips shown after each exchange." },
    { id: "free",      labelEn: "Free",         icon: "🌊", hintEn: "No coaching — just the dialogue." },
    { id: "quick",     labelEn: "Quick",        icon: "⚡", hintEn: "3 exchanges, then a win statement." },
    { id: "skill",     labelEn: "Skill Focus",  icon: "🎯", hintEn: "Focus on one response type." },
  ],
};
const DE = {
  title:       "Sitzung starten",
  subtitle:    "Wähle eine Stimme aus.",
  noAvatars:   "Du hast noch keine Stimmen erstellt.",
  createFirst: "Zuerst eine Stimme erstellen",
  groundFirst: "Erst zur Erdung",
  begin:       "Sitzung beginnen",
  sessionTypes: [
    { id: "guided",    labelEn: "Geführt",      icon: "🧭", hintEn: "Nach jedem Austausch erscheinen Coaching-Tipps." },
    { id: "free",      labelEn: "Frei",          icon: "🌊", hintEn: "Kein Coaching — nur der Dialog." },
    { id: "quick",     labelEn: "Schnell",       icon: "⚡", hintEn: "3 Austausche, dann ein Siegessatz." },
    { id: "skill",     labelEn: "Skill-Fokus",   icon: "🎯", hintEn: "Konzentriere dich auf einen Antworttyp." },
  ],
};

function loadAvatars(): Avatar[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("echo_avatars");
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch { return []; }
}

export default function NewSessionSetup({ locale }: { locale: string }) {
  const t = locale === "de" ? DE : EN;
  const router = useRouter();

  const [avatars, setAvatars]         = useState<Avatar[]>([]);
  const [mounted, setMounted]         = useState(false);
  const [selectedId, setSelectedId]   = useState<string | null>(null);
  const [sessionType, setSessionType] = useState("guided");

  useEffect(() => {
    const avs = loadAvatars();
    setAvatars(avs);
    if (avs.length === 1) setSelectedId(avs[0].id);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const groundingHref = `/${locale}/echo/grounding`;
  const createHref    = `/${locale}/echo/avatar/create`;
  const avatar        = avatars.find((a) => a.id === selectedId);
  const canBegin      = !!avatar;

  function handleBegin() {
    if (!avatar) return;
    // Store setup choices for the active session page to pick up
    localStorage.setItem("echo_pending_session", JSON.stringify({
      avatarId:    avatar.id,
      sessionType,
      locale,
    }));
    router.push(`/${locale}/echo/session/${Date.now()}`);
  }

  if (avatars.length === 0) {
    return (
      <div style={{ maxWidth: "480px" }}>
        <div style={{ backgroundColor: "#F0EBF8", border: "2px solid #6B3FA0", borderRadius: "12px", padding: "28px", textAlign: "center" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }} aria-hidden="true">🎭</div>
          <p style={{ fontWeight: "bold", color: "#4A2A7A", margin: "0 0 20px 0", fontSize: "17px" }}>{t.noAvatars}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
            <Link href={createHref} style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#6B3FA0", color: "#FFFFFF", borderRadius: "10px", textDecoration: "none", fontWeight: "bold", fontSize: "15px", minHeight: "48px" }}>
              {t.createFirst}
            </Link>
            <Link href={groundingHref} style={{ fontSize: "14px", color: "#0B7B6F", textDecoration: "none" }}>
              🌿 {t.groundFirst}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "520px" }}>
      <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "28px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 6px 0" }}>
        {t.title}
      </h1>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 28px 0" }}>{t.subtitle}</p>

      {/* Avatar picker */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {avatars.map((av) => {
          const pConf = PERSONALITY_CONFIG[av.personality];
          const sel   = selectedId === av.id;
          return (
            <button
              key={av.id}
              type="button"
              onClick={() => setSelectedId(av.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                minHeight: "64px",
                borderRadius: "12px",
                border: sel ? `2px solid ${pConf.color}` : "2px solid #E0DDD7",
                backgroundColor: sel ? `${pConf.color}0D` : "#FFFFFF",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "inherit",
              }}
              role="radio"
              aria-checked={sel}
            >
              <div style={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: pConf.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#FFFFFF", flexShrink: 0 }} aria-hidden="true">
                {pConf.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "16px" }}>{av.name}</div>
                <div style={{ color: pConf.color, fontSize: "13px" }}>{locale === "de" ? pConf.labelDe : pConf.labelEn}</div>
              </div>
              {sel && <span style={{ color: pConf.color, fontSize: "18px" }} aria-hidden="true">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Session type */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ fontWeight: "bold", color: "#1A1A2E", marginBottom: "10px" }}>
          {locale === "de" ? "Sitzungsart" : "Session type"}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          {t.sessionTypes.map((st) => {
            const sel = sessionType === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSessionType(st.id)}
                style={{
                  padding: "12px 14px",
                  minHeight: "64px",
                  borderRadius: "10px",
                  border: sel ? "2px solid #6B3FA0" : "2px solid #E0DDD7",
                  backgroundColor: sel ? "#F0EBF8" : "#FFFFFF",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
                role="radio"
                aria-checked={sel}
              >
                <div style={{ fontSize: "20px", marginBottom: "4px" }} aria-hidden="true">{st.icon}</div>
                <div style={{ fontWeight: sel ? "bold" : "normal", color: sel ? "#4A2A7A" : "#1A1A2E", fontSize: "14px" }}>{st.labelEn}</div>
                <div style={{ fontSize: "11px", color: "#7A7A96", marginTop: "2px", lineHeight: 1.4 }}>{st.hintEn}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Begin button */}
      <button
        type="button"
        disabled={!canBegin}
        onClick={handleBegin}
        style={{
          width: "100%",
          padding: "15px 28px",
          backgroundColor: canBegin ? "#6B3FA0" : "#C0B8D0",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: canBegin ? "pointer" : "not-allowed",
          minHeight: "56px",
          marginBottom: "16px",
          fontFamily: "inherit",
        }}
      >
        {t.begin}
      </button>

      <Link href={groundingHref} style={{ display: "block", textAlign: "center", color: "#0B7B6F", fontSize: "14px", textDecoration: "none" }}>
        🌿 {t.groundFirst}
      </Link>
    </div>
  );
}
