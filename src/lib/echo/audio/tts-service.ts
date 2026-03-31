// ─────────────────────────────────────────────────────────────────────────────
// ECHO TTS Service — Web Speech API (SpeechSynthesis)
// Resolves when speech ends, rejects on error or unsupported.
// ─────────────────────────────────────────────────────────────────────────────

import type { AvatarVoiceConfig } from "@/types/echo";
import type { VoiceTone } from "@/components/echo/avatar/VoiceSettings";

// ── Tone pitch/rate modifiers ─────────────────────────────────────────────────

const TONE_MOD: Record<VoiceTone, { pitch: number; rate: number }> = {
  harsh:      { pitch: -0.2, rate:  0.0 },
  sneering:   { pitch:  0.0, rate:  0.0 },
  cold:       { pitch: -0.1, rate:  0.0 },
  mocking:    { pitch: +0.1, rate:  0.0 },
  aggressive: { pitch: -0.3, rate: +0.1 },
};

export interface SpeakOptions {
  voiceConfig: AvatarVoiceConfig;
  tone?: VoiceTone;
  /** BCP-47 locale, e.g. "en-US" or "de-DE" */
  locale?: string;
}

/** True if the current environment has SpeechSynthesis available. */
export function isTTSSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/**
 * Cancel any in-progress speech immediately.
 * Safe to call even if nothing is playing.
 */
export function cancelSpeech(): void {
  if (isTTSSupported()) window.speechSynthesis.cancel();
}

/**
 * Speak `text` using the Web Speech API.
 * Returns a Promise that resolves when the utterance ends,
 * or rejects if TTS is unsupported or an error occurs.
 *
 * Edge-case: on some mobile browsers speechSynthesis.speak() is
 * silently ignored unless triggered by a user-gesture. The promise
 * will reject with code "not-allowed" in that case.
 */
export function speakText(text: string, opts: SpeakOptions): Promise<void> {
  if (!isTTSSupported()) {
    return Promise.reject(new Error("tts-unsupported"));
  }

  if (!opts.voiceConfig.volume || opts.voiceConfig.useTextOnly) {
    // useTextOnly mode: skip audio, resolve immediately.
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    // Cancel whatever is playing first.
    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(text);

    // Apply base config
    const toneMod = opts.tone ? TONE_MOD[opts.tone] : { pitch: 0, rate: 0 };
    utt.pitch  = clamp(opts.voiceConfig.pitch + toneMod.pitch, 0.1, 2.0);
    utt.rate   = clamp(opts.voiceConfig.rate  + toneMod.rate,  0.1, 10.0);
    utt.volume = clamp(opts.voiceConfig.volume, 0.0, 1.0);

    // Pick a voice matching the locale (best-effort)
    if (opts.locale) {
      utt.lang = localeToLang(opts.locale);
      const match = pickVoice(utt.lang);
      if (match) utt.voice = match;
    }

    utt.onend   = () => resolve();
    utt.onerror = (ev) => reject(new Error(ev.error ?? "tts-error"));

    window.speechSynthesis.speak(utt);

    // Chromium workaround: speechSynthesis pauses after ~15 s of no user
    // interaction. Keep it alive by resuming every 10 s.
    const keepAlive = setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 10_000);

    utt.onend = () => { clearInterval(keepAlive); resolve(); };
    utt.onerror = (ev) => { clearInterval(keepAlive); reject(new Error(ev.error ?? "tts-error")); };
  });
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number): number {
  return Math.min(Math.max(v, min), max);
}

/** Map app locale → BCP-47 language tag */
function localeToLang(locale: string): string {
  if (locale.startsWith("de")) return "de-DE";
  return "en-US";
}

/**
 * Find the best available SpeechSynthesisVoice for a given BCP-47 lang.
 * Returns null if none found (browser will use its default).
 */
function pickVoice(lang: string): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  // Exact match first
  const exact = voices.find((v) => v.lang === lang);
  if (exact) return exact;
  // Language-prefix match (e.g. "de" in "de-AT")
  const prefix = lang.split("-")[0];
  return voices.find((v) => v.lang.startsWith(prefix)) ?? null;
}
