"use client";

import { useEffect } from "react";
import type { Avatar } from "@/types/echo";
import type { UserResponseCategory } from "@/lib/echo/content/seed-data";
import type { AvatarTurn } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";
import { useAvatarVoice } from "@/hooks/echo/useAvatarVoice";
import AvatarPreview from "@/components/echo/avatar/AvatarPreview";
import SpeakingIndicator from "@/components/echo/avatar/SpeakingIndicator";
import ResponseSelector from "./ResponseSelector";

const EN = {
  says:       "says",
  replay:     "Replay",
  endSession: "End session",
  endHint:    "(minimum exchanges reached)",
};
const DE = {
  says:       "sagt",
  replay:     "Wiederholen",
  endSession: "Sitzung beenden",
  endHint:    "(Mindestanzahl erreicht)",
};

interface DialogueViewProps {
  avatar:          Avatar;
  statementText:   string;
  lastTurn:        AvatarTurn | null;
  /** True while waiting for the user to respond (between turns) */
  waitingForUser:  boolean;
  onRespond:       (category: UserResponseCategory) => void;
  onRespondText:   (text: string) => void;
  onEndSession:    () => void;
  canEnd:          boolean;
  locale:          string;
  skillFocus?:     UserResponseCategory | null;
  isSpeaking:      boolean;
  onSpeakingChange:(v: boolean) => void;
}

export default function DialogueView({
  avatar,
  statementText,
  lastTurn,
  waitingForUser,
  onRespond,
  onRespondText,
  onEndSession,
  canEnd,
  locale,
  skillFocus,
  isSpeaking,
  onSpeakingChange,
}: DialogueViewProps) {
  const t = locale === "de" ? DE : EN;
  const pConf = PERSONALITY_CONFIG[avatar.personality];

  const voice = useAvatarVoice({
    voiceConfig: avatar.voiceConfig,
    locale,
  });

  // Speak whenever a new statement arrives
  useEffect(() => {
    if (statementText) {
      voice.speak(statementText);
      onSpeakingChange(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statementText]);

  // Sync speaking state to parent
  useEffect(() => {
    onSpeakingChange(voice.isSpeaking);
  }, [voice.isSpeaking, onSpeakingChange]);

  return (
    <div>
      {/* Avatar + statement area */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: `2px solid ${pConf.color}33`,
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Avatar face + speaking indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
          <AvatarPreview
            faceConfig={{}}
            size="sm"
            speaking={isSpeaking}
            label={avatar.name}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: "12px", color: pConf.color, fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
              {avatar.name} {t.says}
            </div>
            <SpeakingIndicator isSpeaking={isSpeaking} />
          </div>
          {/* Replay button */}
          {!isSpeaking && voice.isSupported && !avatar.voiceConfig.useTextOnly && (
            <button
              type="button"
              onClick={() => voice.speak(statementText)}
              style={{
                background: "none",
                border: "1px solid #E0DDD7",
                borderRadius: "8px",
                padding: "6px 12px",
                fontSize: "13px",
                color: "#7A7A96",
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "inherit",
              }}
              aria-label={t.replay}
            >
              ▶ {t.replay}
            </button>
          )}
        </div>

        {/* Statement text */}
        <p
          role="status"
          aria-live="polite"
          style={{
            fontSize: "18px",
            lineHeight: 1.7,
            color: "#1A1A2E",
            margin: 0,
            fontStyle: "italic",
          }}
        >
          &ldquo;{statementText}&rdquo;
        </p>
      </div>

      {/* Avatar reaction (shown after user responded, before next statement) */}
      {lastTurn?.reactionText && !waitingForUser && (
        <div
          style={{
            backgroundColor: "#F9F8F6",
            border: "1px solid #EEECE8",
            borderRadius: "10px",
            padding: "14px 16px",
            marginBottom: "16px",
            fontSize: "15px",
            color: "#4A4A68",
            fontStyle: "italic",
          }}
          role="status"
          aria-live="polite"
        >
          {lastTurn.reactionText}
        </div>
      )}

      {/* Response options */}
      {waitingForUser && (
        <ResponseSelector
          onRespond={onRespond}
          onRespondText={onRespondText}
          locale={locale}
          skillFocus={skillFocus}
        />
      )}

      {/* End session link */}
      {canEnd && waitingForUser && (
        <div style={{ marginTop: "20px", borderTop: "1px solid #EEECE8", paddingTop: "16px" }}>
          <button
            type="button"
            onClick={onEndSession}
            style={{
              background: "none",
              border: "none",
              color: "#7A7A96",
              fontSize: "14px",
              cursor: "pointer",
              padding: 0,
              fontFamily: "inherit",
              textDecoration: "underline",
            }}
          >
            {t.endSession}{" "}
            <span style={{ fontSize: "12px", color: "#9A9AB0" }}>{t.endHint}</span>
          </button>
        </div>
      )}
    </div>
  );
}
