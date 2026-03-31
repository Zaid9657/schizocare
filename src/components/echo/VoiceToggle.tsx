"use client";

// ─────────────────────────────────────────────────────────────────────────────
// VoiceToggle — user preference: enable / disable TTS for all avatars.
// Persists via avatar-service (updates voiceConfig.useTextOnly on each avatar).
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { isTTSSupported } from "@/lib/echo/audio/tts-service";
import { listAvatars, updateAvatar } from "@/lib/echo/avatar/avatar-service";

const PREF_KEY = "echo_voice_enabled";

function readPref(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(PREF_KEY);
  // Default: if TTS is supported, default to enabled
  return stored === null ? isTTSSupported() : stored === "true";
}

function writePref(enabled: boolean) {
  localStorage.setItem(PREF_KEY, String(enabled));
}

interface VoiceToggleProps {
  locale?: string;
}

const EN = {
  label:      "Avatar voice",
  on:         "On",
  off:        "Off",
  unsupported:"Voice not supported in this browser",
  hint:       "When on, the avatar speaks aloud during sessions.",
};
const DE = {
  label:      "Avatar-Stimme",
  on:         "An",
  off:        "Aus",
  unsupported:"Sprachausgabe wird in diesem Browser nicht unterstützt",
  hint:       "Wenn aktiviert, spricht der Avatar während der Sitzungen.",
};

export default function VoiceToggle({ locale = "en" }: VoiceToggleProps) {
  const t = locale === "de" ? DE : EN;
  const supported = isTTSSupported();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readPref());
  }, []);

  async function handleToggle(next: boolean) {
    setEnabled(next);
    writePref(next);
    // Sync useTextOnly across all saved avatars
    try {
      const avatars = await listAvatars("local");
      await Promise.all(
        avatars.map((av) =>
          updateAvatar(av.id, {
            voiceConfig: { ...av.voiceConfig, useTextOnly: !next },
          })
        )
      );
    } catch {
      // Non-critical: pref is already saved; avatars will pick it up next load
    }
  }

  if (!supported) {
    return (
      <p style={{ fontSize: "14px", color: "#9A9AB0", margin: 0 }}>
        {t.unsupported}
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px" }}>
          {t.label}
        </span>
        {/* Toggle button */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => handleToggle(!enabled)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            width: "52px",
            height: "28px",
            borderRadius: "14px",
            backgroundColor: enabled ? "#6B3FA0" : "#C0B8D0",
            border: "none",
            padding: "3px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
            position: "relative",
          }}
          aria-label={`${t.label}: ${enabled ? t.on : t.off}`}
        >
          <span
            style={{
              display: "block",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              transform: enabled ? "translateX(24px)" : "translateX(0)",
              transition: "transform 0.2s ease",
              boxShadow: "0 1px 3px #00000033",
            }}
          />
        </button>
        <span style={{ fontSize: "14px", color: enabled ? "#6B3FA0" : "#9A9AB0", fontWeight: "bold" }}>
          {enabled ? t.on : t.off}
        </span>
      </div>
      <p style={{ margin: 0, fontSize: "13px", color: "#9A9AB0" }}>{t.hint}</p>
    </div>
  );
}
