"use client";

// ─────────────────────────────────────────────────────────────────────────────
// ActiveSession — orchestrates the full session flow via SessionContext
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Avatar } from "@/types/echo";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import { SessionProvider } from "@/context/echo/SessionContext";
import { useSession } from "@/hooks/echo/useSession";
import { MIN_EXCHANGES_TO_END } from "@/lib/echo/dialogue/session-controller";
import SessionHeader       from "@/components/echo/session/SessionHeader";
import PreSessionCheckIn   from "@/components/echo/session/PreSessionCheckIn";
import DialogueView        from "@/components/echo/session/DialogueView";
import AvatarReactionView  from "@/components/echo/session/AvatarReactionView";
import WinStatementSelector from "@/components/echo/session/WinStatementSelector";
import PostSession         from "@/components/echo/session/PostSession";

// ── Pending session config (written by NewSessionSetup) ───────────────────────

interface PendingSession {
  avatarId:    string;
  sessionType: string;
  locale:      string;
}

function loadPending(): PendingSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("echo_pending_session");
    return raw ? (JSON.parse(raw) as PendingSession) : null;
  } catch { return null; }
}

function loadAvatars(): Avatar[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("echo_avatars");
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch { return []; }
}

// ── Inner component (uses SessionContext) ─────────────────────────────────────

type DialogueSub = "statement" | "reaction";

function SessionInner({ locale, sessionType }: { locale: string; sessionType: string }) {
  const { state, init, setMoodBefore, beginSession, respond, respondText,
          dismissBreak, goToWinStatement, setSpeaking, setMoodAfter, finishSession, abort } = useSession();
  const router = useRouter();
  const [mounted, setMounted]           = useState(false);
  const [dialogueSub, setDialogueSub]   = useState<DialogueSub>("statement");
  const [skillFocus, setSkillFocus]     = useState<UserResponseCategory | null>(null);
  const [winText, setWinText]           = useState("");

  const groundingHref = `/${locale}/echo/grounding`;
  const echoHref      = `/${locale}/echo`;

  // ── Mount: load avatar and initialise context ──────────────────────────────
  useEffect(() => {
    const pending = loadPending();
    const avatars = loadAvatars();
    if (!pending) { router.replace(`/${locale}/echo/session/new`); return; }
    const avatar = avatars.find((a) => a.id === pending.avatarId);
    if (!avatar) { router.replace(`/${locale}/echo/session/new`); return; }
    init(avatar, locale);
    setMounted(true);
    localStorage.removeItem("echo_pending_session");
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Aborted → grounding ───────────────────────────────────────────────────
  useEffect(() => {
    if (state.phase === "aborted") {
      router.push(groundingHref);
    }
  }, [state.phase]);  // eslint-disable-line react-hooks/exhaustive-deps

  // ── Response handling ─────────────────────────────────────────────────────
  const handleRespond = useCallback((cat: UserResponseCategory) => {
    respond(cat);
    setDialogueSub("reaction");
  }, [respond]);

  const handleRespondText = useCallback((text: string) => {
    respondText(text);
    setDialogueSub("reaction");
  }, [respondText]);

  const handleContinue = useCallback(() => {
    setDialogueSub("statement");
  }, []);

  // ── Win statement chosen ──────────────────────────────────────────────────
  function handleWinChosen(text: string) {
    setWinText(text);
    // Transition to summary handled by finishSession() after mood-after
    // We store the text and move to summary phase
    finishSession();
  }

  if (!mounted || !state.avatar) return null;

  const avatar       = state.avatar;
  const canEnd       = (state.engineCtx?.exchangeCount ?? 0) >= MIN_EXCHANGES_TO_END;
  const maxExchanges = 8;

  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>

      {/* Break reminder modal */}
      {state.showBreakReminder && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#00000066",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
            padding: "16px",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={locale === "de" ? "Pause-Erinnerung" : "Break reminder"}
        >
          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: "380px",
              width: "100%",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "12px" }} aria-hidden="true">☕</div>
            <p style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "17px", margin: "0 0 8px 0" }}>
              {locale === "de" ? "Du hast viel gearbeitet." : "You've done a lot of work."}
            </p>
            <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 20px 0" }}>
              {locale === "de"
                ? "Möchtest du eine kurze Pause machen?"
                : "Would you like to take a short break?"}
            </p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => { dismissBreak(); goToWinStatement(); }}
                style={{ padding: "11px 20px", backgroundColor: "#F3F1ED", color: "#4A4A68", border: "1px solid #E0DDD7", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}
              >
                {locale === "de" ? "Ja, beenden" : "Yes, end here"}
              </button>
              <button
                type="button"
                onClick={dismissBreak}
                style={{ padding: "11px 20px", backgroundColor: "#6B3FA0", color: "#FFFFFF", border: "none", borderRadius: "10px", cursor: "pointer", fontFamily: "inherit", fontSize: "14px", fontWeight: "bold" }}
              >
                {locale === "de" ? "Weiter" : "Keep going"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── check-in phase ── */}
      {state.phase === "check-in" && (
        <PreSessionCheckIn
          mood={state.moodBefore}
          onMoodChange={setMoodBefore}
          skillFocus={skillFocus}
          onSkillChange={setSkillFocus}
          onReady={beginSession}
          locale={locale}
          groundingHref={groundingHref}
        />
      )}

      {/* ── dialogue phase ── */}
      {state.phase === "dialogue" && (
        <>
          <SessionHeader
            avatar={avatar}
            exchangeCount={state.engineCtx?.exchangeCount ?? 0}
            maxExchanges={maxExchanges}
            locale={locale}
            groundingHref={groundingHref}
          />

          {dialogueSub === "statement" && (
            <DialogueView
              avatar={avatar}
              statementText={state.currentStatementText}
              lastTurn={state.lastTurn}
              waitingForUser={true}
              onRespond={handleRespond}
              onRespondText={handleRespondText}
              onEndSession={goToWinStatement}
              canEnd={canEnd}
              locale={locale}
              skillFocus={skillFocus}
              isSpeaking={state.isSpeaking}
              onSpeakingChange={setSpeaking}
            />
          )}

          {dialogueSub === "reaction" && state.lastTurn && state.engineCtx && (
            <AvatarReactionView
              turn={state.lastTurn}
              engineCtx={state.engineCtx}
              onContinue={handleContinue}
              onEndSession={goToWinStatement}
              locale={locale}
            />
          )}
        </>
      )}

      {/* ── win-statement phase ── */}
      {state.phase === "win-statement" && (
        <WinStatementSelector
          onComplete={handleWinChosen}
          locale={locale}
        />
      )}

      {/* ── summary phase ── */}
      {state.phase === "summary" && state.summary && (
        <PostSession
          summary={state.summary}
          moodAfter={state.moodAfter}
          onMoodAfter={setMoodAfter}
          onFinish={() => {/* already saved in finishSession() */}}
          locale={locale}
          echoHref={echoHref}
        />
      )}
    </div>
  );
}

// ── Exported wrapper: provides context ───────────────────────────────────────

export default function ActiveSession({
  locale,
  sessionType = "guided",
}: {
  locale:       string;
  sessionType?: string;
}) {
  return (
    <SessionProvider>
      <SessionInner locale={locale} sessionType={sessionType} />
    </SessionProvider>
  );
}
