"use client";

import type { AvatarTurn } from "@/types/echo";
import type { ReactionType } from "@/lib/echo/content/seed-data";
import { canEndSession } from "@/lib/echo/dialogue/session-controller";
import type { EngineContext } from "@/lib/echo/dialogue/context-manager";

// ── Coaching feedback messages ────────────────────────────────────────────────

const COACHING: Record<
  ReactionType,
  { en: string; de: string; icon: string }
> = {
  PUSH_BACK:   { icon: "🛡️", en: "The voice pushed back — that's normal. Keep going.",       de: "Die Stimme wehrt sich — das ist normal. Weiter." },
  HESITATE:    { icon: "👀", en: "The voice hesitated. Your response had an impact.",          de: "Die Stimme zögert. Deine Antwort hat Wirkung." },
  ACKNOWLEDGE: { icon: "💡", en: "The voice is starting to acknowledge you. Good work.",       de: "Die Stimme beginnt, dich anzuerkennen. Gut gemacht." },
  SURPRISED:   { icon: "✨", en: "You surprised the voice. That shows real growth.",           de: "Du hast die Stimme überrascht. Das zeigt echtes Wachstum." },
  CONCEDE:     { icon: "🏆", en: "The voice conceded. You've made real progress today.",       de: "Die Stimme gibt nach. Du hast heute echten Fortschritt gemacht." },
  SUPPORT:     { icon: "🌱", en: "The voice offered support. This is a significant shift.",    de: "Die Stimme bietet Unterstützung an. Das ist eine bedeutende Veränderung." },
};

function getReactionType(reactionId: string): ReactionType | null {
  // IDs follow pattern: ar_{phase}_{type}_nn
  if (reactionId.includes("_pb_"))   return "PUSH_BACK";
  if (reactionId.includes("_hes_"))  return "HESITATE";
  if (reactionId.includes("_ack_"))  return "ACKNOWLEDGE";
  if (reactionId.includes("_sur_"))  return "SURPRISED";
  if (reactionId.includes("_con_"))  return "CONCEDE";
  if (reactionId.includes("_sup_"))  return "SUPPORT";
  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

const EN = {
  avatarReacts: "The voice reacts:",
  coaching:     "Coaching note",
  continueBtn:  "Continue",
  endSession:   "End session",
};
const DE = {
  avatarReacts: "Die Stimme reagiert:",
  coaching:     "Coaching-Hinweis",
  continueBtn:  "Weiter",
  endSession:   "Sitzung beenden",
};

interface AvatarReactionViewProps {
  turn:         AvatarTurn;
  engineCtx:    EngineContext;
  onContinue:   () => void;
  onEndSession: () => void;
  locale:       string;
}

export default function AvatarReactionView({
  turn,
  engineCtx,
  onContinue,
  onEndSession,
  locale,
}: AvatarReactionViewProps) {
  const t = locale === "de" ? DE : EN;
  const reactionType = getReactionType(turn.reactionId);
  const coaching = reactionType ? COACHING[reactionType] : null;
  const canEnd = canEndSession(engineCtx);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Reaction bubble */}
      {turn.reactionText && (
        <div
          role="status"
          aria-live="polite"
          style={{
            backgroundColor: "#FFFFFF",
            border: "2px solid #EEECE8",
            borderRadius: "12px",
            padding: "18px 20px",
          }}
        >
          <div style={{ fontSize: "12px", color: "#7A7A96", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "8px" }}>
            {t.avatarReacts}
          </div>
          <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.7, color: "#4A4A68", fontStyle: "italic" }}>
            &ldquo;{turn.reactionText}&rdquo;
          </p>
        </div>
      )}

      {/* Coaching feedback */}
      {coaching && (
        <div
          style={{
            backgroundColor: "#F0EBF8",
            border: "1px solid #C0A8E0",
            borderRadius: "10px",
            padding: "12px 16px",
            display: "flex",
            gap: "10px",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "20px", flexShrink: 0 }} aria-hidden="true">{coaching.icon}</span>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "bold", color: "#6B3FA0", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>
              {t.coaching}
            </div>
            <p style={{ margin: 0, fontSize: "14px", color: "#4A2A7A", lineHeight: 1.5 }}>
              {locale === "de" ? coaching.de : coaching.en}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        {turn.nextStatementText && (
          <button
            type="button"
            onClick={onContinue}
            style={{
              padding: "12px 28px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              minHeight: "48px",
              fontFamily: "inherit",
            }}
          >
            {t.continueBtn} →
          </button>
        )}

        {(canEnd || !turn.nextStatementText) && (
          <button
            type="button"
            onClick={onEndSession}
            style={{
              padding: "12px 20px",
              backgroundColor: "transparent",
              color: "#7A7A96",
              border: "1px solid #E0DDD7",
              borderRadius: "10px",
              fontSize: "14px",
              cursor: "pointer",
              minHeight: "48px",
              fontFamily: "inherit",
            }}
          >
            {t.endSession}
          </button>
        )}
      </div>
    </div>
  );
}
