"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import type { Avatar, Exchange, UserResponseType, Session } from "@/types/echo";
import type { ContentItem } from "@/types/echo";
import type { ResponseOption } from "@/lib/echo/content";
import {
  getGreeting,
  getReflection,
  getContentById,
  RESPONSE_OPTIONS,
} from "@/lib/echo/content";
import { PERSONALITY_CONFIG, MOOD_LABELS, DISTRESS_GROUNDING_THRESHOLD, MAX_EXCHANGES_BEFORE_BREAK } from "@/lib/echo/constants";
import { generateId } from "@/lib/echo/utils";

// ── Locale strings ────────────────────────────────────────────────────────────

const EN = {
  moodBefore: "How are you feeling right now?",
  moodBeforeHint: "1 = very distressed, 10 = very good",
  btnStart: "Start the session",
  avatarSpeaks: "says",
  yourTurn: "How do you respond?",
  distressCheck: "This feels intense. How distressed are you right now?",
  distressHint: "1 = not at all, 10 = very much",
  groundingSuggest: "That sounds hard. Want to try a grounding exercise?",
  btnGrounding: "Yes, take me to grounding",
  btnContinue: "No, continue session",
  breakSuggest: "You've done a lot of work today. Consider taking a short break.",
  sessionEnd: "Session complete",
  moodAfter: "How are you feeling now, compared to before?",
  btnFinish: "Finish & save",
  saved: "Session saved. Well done.",
  btnNewSession: "Start another session",
  btnEchoHome: "\u2190 Back to ECHO",
  exchangeCount: (n: number) => `Exchange ${n}`,
  safetyNote: "If you are in distress, please reach out to a crisis line.",
  phaseLabel: "Introduction",
  skipConfirm: "Skipped",
};

const DE = {
  moodBefore: "Wie f\u00fchlst du dich gerade?",
  moodBeforeHint: "1 = sehr belastet, 10 = sehr gut",
  btnStart: "Sitzung starten",
  avatarSpeaks: "sagt",
  yourTurn: "Wie antwortest du?",
  distressCheck: "Das f\u00fchlt sich intensiv an. Wie belastet bist du gerade?",
  distressHint: "1 = \u00fcberhaupt nicht, 10 = sehr",
  groundingSuggest: "Das klingt schwer. M\u00f6chtest du eine Erdungs\u00fcbung ausprobieren?",
  btnGrounding: "Ja, zur Erdung",
  btnContinue: "Nein, weiter",
  breakSuggest: "Du hast heute viel gearbeitet. Mach eine kurze Pause.",
  sessionEnd: "Sitzung abgeschlossen",
  moodAfter: "Wie f\u00fchlst du dich jetzt im Vergleich zu vorher?",
  btnFinish: "Abschlie\u00dfen & speichern",
  saved: "Sitzung gespeichert. Gut gemacht.",
  btnNewSession: "Weitere Sitzung starten",
  btnEchoHome: "\u2190 Zur\u00fcck zu ECHO",
  exchangeCount: (n: number) => `Austausch ${n}`,
  safetyNote: "Wenn du in Not bist, wende dich bitte an eine Krisenhotline.",
  phaseLabel: "Einf\u00fchrung",
  skipConfirm: "\u00dcbersprungen",
};

// ── Avatar visual (reused from AvatarCreator pattern) ────────────────────────

const ICON_OPTIONS: Record<string, string> = {
  wave: "🌊", storm: "⚡", shield: "🛡\uFE0F", eye: "\uD83D\uDC41\uFE0F",
  flame: "🔥", cloud: "☁\uFE0F", star: "✦", spiral: "🌀",
};

function AvatarBubble({ avatar, speaking }: { avatar: Avatar; speaking: boolean }) {
  const { shape, primaryColor, iconKey } = avatar.visualConfig;
  const radius = shape === "circle" ? "50%" : shape === "square" ? "14px" : "40% 60% 55% 45% / 42% 48% 52% 58%";
  const icon = ICON_OPTIONS[iconKey] ?? "✦";

  return (
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: radius,
        backgroundColor: primaryColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        flexShrink: 0,
        boxShadow: speaking ? `0 0 0 3px ${primaryColor}44, 0 0 0 6px ${primaryColor}22` : "none",
        transition: "box-shadow 0.4s ease",
        animation: speaking ? "pulse-ring 1.6s ease-in-out infinite" : "none",
      }}
      aria-hidden="true"
    >
      {icon}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 3px ${primaryColor}44, 0 0 0 6px ${primaryColor}22; }
          50%       { box-shadow: 0 0 0 6px ${primaryColor}33, 0 0 0 12px ${primaryColor}11; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

// ── Mood slider ───────────────────────────────────────────────────────────────

function MoodSlider({
  value,
  onChange,
  locale,
}: {
  value: number;
  onChange: (v: number) => void;
  locale: string;
}) {
  const label = MOOD_LABELS[value];
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "8px",
          fontSize: "13px",
          color: "#7A7A96",
        }}
      >
        <span>1</span>
        <span
          style={{
            fontWeight: "bold",
            color: value <= 3 ? "#C03030" : value <= 6 ? "#9E6D1B" : "#2E7D50",
            fontSize: "15px",
          }}
        >
          {value} — {locale === "de" ? label?.de : label?.en}
        </span>
        <span>10</span>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#6B3FA0", cursor: "pointer" }}
        aria-label="Mood rating"
      />
    </div>
  );
}

// ── Session storage ───────────────────────────────────────────────────────────

const SESSIONS_KEY = "echo_sessions";

function saveSessions(sessions: Session[]) {
  try {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  } catch { /* quota exceeded — silent fail */ }
}

function loadSessions(): Session[] {
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch { return []; }
}

// ── Types ─────────────────────────────────────────────────────────────────────

type UIPhase =
  | "mood_before"
  | "dialogue"
  | "distress_check"
  | "grounding_suggest"
  | "break_suggest"
  | "mood_after"
  | "done";

// ── Main component ────────────────────────────────────────────────────────────

interface DialogueSessionProps {
  avatar: Avatar;
  locale: string;
  groundingHref: string;
  onSessionEnd?: (session: Session) => void;
}

export default function DialogueSession({
  avatar,
  locale,
  groundingHref,
  onSessionEnd,
}: DialogueSessionProps) {
  const c = locale === "de" ? DE : EN;
  const pConf = PERSONALITY_CONFIG[avatar.personality];

  const [uiPhase, setUiPhase] = useState<UIPhase>("mood_before");
  const [moodBefore, setMoodBefore] = useState(5);
  const [moodAfter, setMoodAfter] = useState(5);
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [currentStatement, setCurrentStatement] = useState<ContentItem | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pendingResponse, setPendingResponse] = useState<UserResponseType | null>(null);
  const [distressScore, setDistressScore] = useState(3);
  const [sessionSaved, setSessionSaved] = useState(false);
  const sessionId = useRef(generateId("session"));
  const startedAt = useRef(new Date().toISOString());
  const scrollRef = useRef<HTMLDivElement>(null);

  // ── Start dialogue ─────────────────────────────────────────────────────────

  function startDialogue() {
    const greeting = getGreeting(avatar.personality);
    setCurrentStatement(greeting);
    setIsSpeaking(true);
    setUiPhase("dialogue");
    setTimeout(() => setIsSpeaking(false), 1600);
  }

  // ── Handle user response ───────────────────────────────────────────────────

  const handleResponse = useCallback(
    (responseType: UserResponseType) => {
      if (!currentStatement) return;

      if (responseType === "grounding") {
        setUiPhase("grounding_suggest");
        return;
      }

      const exchange: Exchange = {
        id: generateId("ex"),
        sessionId: sessionId.current,
        sequence: exchanges.length + 1,
        avatarStatementId: currentStatement.id,
        avatarStatementText:
          locale === "de" ? currentStatement.textDe : currentStatement.textEn,
        userResponseType: responseType,
        userResponseText: null,
        durationSeconds: null,
        distressLevel: null,
        createdAt: new Date().toISOString(),
      };

      const updatedExchanges = [...exchanges, exchange];
      setExchanges(updatedExchanges);
      setPendingResponse(responseType);

      // Check for break threshold
      if (updatedExchanges.length >= MAX_EXCHANGES_BEFORE_BREAK) {
        setUiPhase("break_suggest");
        return;
      }

      // Check if statement flags grounding
      if (currentStatement.requiresGrounding && responseType !== "skip") {
        setTimeout(() => {
          setUiPhase("distress_check");
        }, 600);
        return;
      }

      // Advance to next statement
      advanceStatement(responseType, updatedExchanges.length);
    },
    [currentStatement, exchanges, locale]
  );

  function advanceStatement(
    responseType: UserResponseType,
    exchangeCount: number
  ) {
    if (!currentStatement) return;

    // Closing or final exchange
    if (currentStatement.category === "closing_statement" || exchangeCount >= MAX_EXCHANGES_BEFORE_BREAK) {
      setUiPhase("mood_after");
      return;
    }

    // Determine next content
    let next: ContentItem | undefined;

    if (currentStatement.category === "greeting" && responseType !== "skip") {
      // After greeting: show a personality-specific follow-up or reflection
      const followUps = currentStatement.followUpIds
        .map(getContentById)
        .filter(Boolean) as ContentItem[];
      const relevant = followUps.find((f) =>
        f.personalityTags.includes(avatar.personality)
      ) ?? followUps[0];
      next = relevant ?? getReflection(responseType, avatar.personality);
    } else if (
      currentStatement.category === "accusation" ||
      currentStatement.category === "demand" ||
      currentStatement.category === "fear_expression" ||
      currentStatement.category === "protective_statement"
    ) {
      next = getReflection(responseType, avatar.personality);
    } else if (currentStatement.category === "reflection_prompt") {
      // Follow up or move to deeper
      const followUps = currentStatement.followUpIds
        .map(getContentById)
        .filter(Boolean) as ContentItem[];
      next = followUps[0] ?? getContentById("closing_1");
    } else {
      next = getContentById("closing_1");
    }

    if (!next) {
      setUiPhase("mood_after");
      return;
    }

    setIsSpeaking(true);
    setTimeout(() => {
      setCurrentStatement(next!);
      setIsSpeaking(false);
      setPendingResponse(null);
    }, 700);
  }

  // ── After distress check ───────────────────────────────────────────────────

  function handleDistressSubmit() {
    if (distressScore >= DISTRESS_GROUNDING_THRESHOLD) {
      setUiPhase("grounding_suggest");
    } else {
      setUiPhase("dialogue");
      advanceStatement(pendingResponse ?? "skip", exchanges.length);
    }
  }

  function handleBreakContinue() {
    setUiPhase("mood_after");
  }

  // ── Save session ───────────────────────────────────────────────────────────

  function handleFinish() {
    const session: Session = {
      id: sessionId.current,
      avatarId: avatar.id,
      visitorId: "local",
      sessionType: "introduction",
      phase: "closing",
      status: "completed",
      locale: locale as "en" | "de",
      moodBefore: {
        score: moodBefore,
        label: MOOD_LABELS[moodBefore]?.[locale === "de" ? "de" : "en"] ?? "",
        timestamp: startedAt.current,
      },
      moodAfter: {
        score: moodAfter,
        label: MOOD_LABELS[moodAfter]?.[locale === "de" ? "de" : "en"] ?? "",
        timestamp: new Date().toISOString(),
      },
      startedAt: startedAt.current,
      completedAt: new Date().toISOString(),
      durationSeconds: Math.round(
        (Date.now() - new Date(startedAt.current).getTime()) / 1000
      ),
      exchangeCount: exchanges.length,
      therapistNotes: null,
      safetyFlagRaised: false,
    };

    const existing = loadSessions();
    saveSessions([...existing, session]);
    setSessionSaved(true);
    setUiPhase("done");
    onSessionEnd?.(session);
  }

  // ── Auto-scroll ────────────────────────────────────────────────────────────

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [uiPhase, currentStatement]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────

  const accentColor = pConf.color;

  return (
    <div style={{ maxWidth: "560px" }}>
      {/* Avatar header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "28px",
          padding: "16px",
          backgroundColor: "#FFFFFF",
          border: `2px solid ${accentColor}22`,
          borderRadius: "12px",
        }}
      >
        <AvatarBubble avatar={avatar} speaking={isSpeaking} />
        <div>
          <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "18px" }}>
            {avatar.name}
          </div>
          <div style={{ color: accentColor, fontSize: "13px", marginTop: "2px" }}>
            {pConf.icon} {locale === "de" ? pConf.labelDe : pConf.labelEn}
          </div>
          <div style={{ color: "#7A7A96", fontSize: "12px", marginTop: "2px" }}>
            {c.phaseLabel} · {c.exchangeCount(exchanges.length)}
          </div>
        </div>
      </div>

      {/* ── Phase: mood before ── */}
      {uiPhase === "mood_before" && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #EEECE8",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1A1A2E",
              margin: "0 0 6px 0",
            }}
          >
            {c.moodBefore}
          </h2>
          <p style={{ fontSize: "13px", color: "#7A7A96", margin: "0 0 20px 0" }}>
            {c.moodBeforeHint}
          </p>
          <MoodSlider value={moodBefore} onChange={setMoodBefore} locale={locale} />
          <button
            onClick={startDialogue}
            style={{
              marginTop: "24px",
              padding: "12px 28px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
              width: "100%",
            }}
          >
            {c.btnStart}
          </button>
        </div>
      )}

      {/* ── Phase: dialogue ── */}
      {uiPhase === "dialogue" && currentStatement && (
        <div>
          {/* Avatar statement bubble */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: `2px solid ${accentColor}33`,
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              position: "relative",
            }}
            role="status"
            aria-live="polite"
          >
            <div
              style={{
                fontSize: "12px",
                color: accentColor,
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: "10px",
              }}
            >
              {avatar.name} {c.avatarSpeaks}
            </div>
            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.7,
                color: "#1A1A2E",
                margin: 0,
              }}
            >
              {locale === "de"
                ? currentStatement.textDe
                : currentStatement.textEn}
            </p>
          </div>

          {/* User response options */}
          <div>
            <div
              style={{
                fontSize: "13px",
                color: "#7A7A96",
                fontWeight: "bold",
                marginBottom: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {c.yourTurn}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {RESPONSE_OPTIONS.map((opt: ResponseOption) => (
                <button
                  key={opt.type}
                  onClick={() => handleResponse(opt.type)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    minHeight: "52px",
                    borderRadius: "10px",
                    border:
                      opt.type === "grounding"
                        ? "2px solid #0B7B6F"
                        : opt.type === "skip"
                        ? "1px solid #E0DDD7"
                        : "2px solid #E0DDD7",
                    backgroundColor:
                      opt.type === "grounding"
                        ? "#E8F5F2"
                        : opt.type === "skip"
                        ? "transparent"
                        : "#FFFFFF",
                    color:
                      opt.type === "grounding"
                        ? "#0B7B6F"
                        : opt.type === "skip"
                        ? "#9A9AB0"
                        : "#1A1A2E",
                    fontSize: "15px",
                    fontWeight: opt.type === "skip" ? "normal" : 500,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "20px", flexShrink: 0 }} aria-hidden="true">
                    {opt.icon}
                  </span>
                  {locale === "de" ? opt.textDe : opt.textEn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Phase: distress check ── */}
      {uiPhase === "distress_check" && (
        <div
          style={{
            backgroundColor: "#FFF8E8",
            border: "2px solid #9E6D1B",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#7A4A10", margin: "0 0 6px 0", fontSize: "17px" }}>
            {c.distressCheck}
          </p>
          <p style={{ fontSize: "13px", color: "#9E6D1B", margin: "0 0 16px 0" }}>
            {c.distressHint}
          </p>
          <MoodSlider value={distressScore} onChange={setDistressScore} locale={locale} />
          <button
            onClick={handleDistressSubmit}
            style={{
              marginTop: "20px",
              padding: "11px 24px",
              backgroundColor: "#9E6D1B",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            {c.btnContinue}
          </button>
        </div>
      )}

      {/* ── Phase: grounding suggest ── */}
      {uiPhase === "grounding_suggest" && (
        <div
          style={{
            backgroundColor: "#E8F5F2",
            border: "2px solid #0B7B6F",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#0B5C53", margin: "0 0 20px 0", fontSize: "17px" }}>
            {c.groundingSuggest}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <Link
              href={groundingHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "11px 22px",
                backgroundColor: "#0B7B6F",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                textDecoration: "none",
                minHeight: "48px",
              }}
            >
              🌿 {c.btnGrounding}
            </Link>
            <button
              onClick={() => {
                setUiPhase("dialogue");
                advanceStatement(pendingResponse ?? "skip", exchanges.length);
              }}
              style={{
                padding: "11px 22px",
                backgroundColor: "#FFFFFF",
                color: "#0B7B6F",
                border: "2px solid #0B7B6F",
                borderRadius: "10px",
                fontSize: "15px",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              {c.btnContinue}
            </button>
          </div>
        </div>
      )}

      {/* ── Phase: break suggest ── */}
      {uiPhase === "break_suggest" && (
        <div
          style={{
            backgroundColor: "#F3F1ED",
            border: "2px solid #EEECE8",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 20px 0", fontSize: "17px" }}>
            {c.breakSuggest}
          </p>
          <button
            onClick={handleBreakContinue}
            style={{
              padding: "11px 24px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
            }}
          >
            {c.btnFinish}
          </button>
        </div>
      )}

      {/* ── Phase: mood after ── */}
      {uiPhase === "mood_after" && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #EEECE8",
            borderRadius: "12px",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#1A1A2E",
              margin: "0 0 6px 0",
            }}
          >
            {c.sessionEnd}
          </h2>
          <p style={{ fontSize: "15px", color: "#4A4A68", margin: "0 0 20px 0" }}>
            {c.moodAfter}
          </p>
          <MoodSlider value={moodAfter} onChange={setMoodAfter} locale={locale} />
          <button
            onClick={handleFinish}
            style={{
              marginTop: "24px",
              padding: "12px 28px",
              backgroundColor: "#2E7D50",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
              width: "100%",
            }}
          >
            {c.btnFinish}
          </button>
        </div>
      )}

      {/* ── Phase: done ── */}
      {uiPhase === "done" && (
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #2E7D50",
            borderRadius: "12px",
            padding: "28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }} aria-hidden="true">
            ✓
          </div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontSize: "22px",
              fontWeight: "bold",
              color: "#1A1A2E",
              margin: "0 0 8px 0",
            }}
          >
            {c.saved}
          </h2>

          {/* Mood delta */}
          {moodAfter > moodBefore && (
            <p style={{ color: "#2E7D50", fontWeight: "bold", margin: "0 0 20px 0" }}>
              +{moodAfter - moodBefore} mood improvement
            </p>
          )}
          {moodAfter <= moodBefore && (
            <p style={{ color: "#7A7A96", margin: "0 0 20px 0", fontSize: "14px" }}>
              {exchanges.length} exchange{exchanges.length !== 1 ? "s" : ""} completed.
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
            <button
              onClick={() => {
                // Reset for a new session
                setUiPhase("mood_before");
                setExchanges([]);
                setCurrentStatement(null);
                setMoodBefore(5);
                setMoodAfter(5);
                setSessionSaved(false);
                sessionId.current = generateId("session");
                startedAt.current = new Date().toISOString();
              }}
              style={{
                padding: "11px 22px",
                backgroundColor: "#6B3FA0",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "10px",
                fontSize: "15px",
                fontWeight: "bold",
                cursor: "pointer",
                minHeight: "48px",
              }}
            >
              {c.btnNewSession}
            </button>
            <Link
              href={`/${locale}/echo`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "11px 22px",
                backgroundColor: "#F3F1ED",
                color: "#4A4A68",
                border: "1px solid #E0DDD7",
                borderRadius: "10px",
                fontSize: "15px",
                textDecoration: "none",
                minHeight: "48px",
              }}
            >
              {c.btnEchoHome}
            </Link>
          </div>

          <p style={{ marginTop: "24px", fontSize: "13px", color: "#9A9AB0", lineHeight: 1.6 }}>
            {c.safetyNote}
          </p>
        </div>
      )}

      <div ref={scrollRef} />
    </div>
  );
}
