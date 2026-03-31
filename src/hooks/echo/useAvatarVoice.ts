"use client";

// ─────────────────────────────────────────────────────────────────────────────
// useAvatarVoice — custom hook for avatar TTS speech
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect, useRef } from "react";
import { speakText, cancelSpeech, isTTSSupported } from "@/lib/echo/audio/tts-service";
import type { AvatarVoiceConfig } from "@/types/echo";
import type { VoiceTone } from "@/components/echo/avatar/VoiceSettings";

export interface UseAvatarVoiceOptions {
  voiceConfig: AvatarVoiceConfig;
  tone?: VoiceTone;
  locale?: string;
  /** Override: force text-only regardless of voiceConfig.useTextOnly */
  forceTextOnly?: boolean;
}

export interface UseAvatarVoiceReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  isSupported: boolean;
  /** Non-null when TTS failed; cleared on next speak() call */
  error: string | null;
}

export function useAvatarVoice({
  voiceConfig,
  tone,
  locale = "en",
  forceTextOnly = false,
}: UseAvatarVoiceOptions): UseAvatarVoiceReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(() => isTTSSupported());

  // Keep a ref to the in-flight promise cancel signal
  const abortRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortRef.current = true;
      cancelSpeech();
    };
  }, []);

  const stop = useCallback(() => {
    abortRef.current = true;
    cancelSpeech();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      if (forceTextOnly || voiceConfig.useTextOnly) return;
      if (!isSupported) return;

      // Reset abort flag and clear previous error
      abortRef.current = false;
      setError(null);
      setIsSpeaking(true);

      speakText(text, { voiceConfig, tone, locale })
        .then(() => {
          if (!abortRef.current) setIsSpeaking(false);
        })
        .catch((err: Error) => {
          if (!abortRef.current) {
            setIsSpeaking(false);
            // "interrupted" is normal (user navigated away, stop() called, etc.)
            if (err.message !== "interrupted") {
              setError(err.message);
            }
          }
        });
    },
    [voiceConfig, tone, locale, forceTextOnly, isSupported]
  );

  return { speak, stop, isSpeaking, isSupported, error };
}
