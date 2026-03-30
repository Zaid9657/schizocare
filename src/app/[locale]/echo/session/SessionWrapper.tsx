"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Avatar } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";
import DialogueSession from "@/components/echo/DialogueSession";

const ICON_OPTIONS: Record<string, string> = {
  wave: "🌊", storm: "⚡", shield: "🛡\uFE0F", eye: "\uD83D\uDC41\uFE0F",
  flame: "🔥", cloud: "☁\uFE0F", star: "✦", spiral: "🌀",
};

const EN = {
  pickTitle: "Choose a voice to talk with",
  pickHint: "Select which voice you want to work with in this session.",
  noAvatars: "You haven't created any voices yet.",
  btnCreate: "Create a voice first",
  btnStart: "Start session",
};

const DE = {
  pickTitle: "W\u00e4hle eine Stimme zum Gespr\u00e4ch",
  pickHint: "W\u00e4hle die Stimme, mit der du in dieser Sitzung arbeiten m\u00f6chtest.",
  noAvatars: "Du hast noch keine Stimmen erstellt.",
  btnCreate: "Zuerst eine Stimme erstellen",
  btnStart: "Sitzung starten",
};

function loadAvatars(): Avatar[] {
  try {
    const raw = localStorage.getItem("echo_avatars");
    return raw ? (JSON.parse(raw) as Avatar[]) : [];
  } catch { return []; }
}

export default function SessionWrapper({ locale }: { locale: string }) {
  const c = locale === "de" ? DE : EN;
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [selected, setSelected] = useState<Avatar | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const avs = loadAvatars();
    setAvatars(avs);
    if (avs.length === 1) setSelected(avs[0]);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // ── No avatars ──
  if (avatars.length === 0) {
    return (
      <div style={{ maxWidth: "560px" }}>
        <div
          style={{
            backgroundColor: "#F0EBF8",
            border: "2px solid #6B3FA0",
            borderRadius: "12px",
            padding: "28px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "12px" }} aria-hidden="true">
            🎭
          </div>
          <p style={{ fontWeight: "bold", color: "#4A2A7A", margin: "0 0 16px 0", fontSize: "17px" }}>
            {c.noAvatars}
          </p>
          <Link
            href={`/${locale}/echo/avatar`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              backgroundColor: "#6B3FA0",
              color: "#FFFFFF",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "15px",
              minHeight: "48px",
            }}
          >
            {c.btnCreate}
          </Link>
        </div>
      </div>
    );
  }

  // ── Active session ──
  if (sessionStarted && selected) {
    return (
      <DialogueSession
        avatar={selected}
        locale={locale}
        groundingHref={`/${locale}/echo/grounding`}
      />
    );
  }

  // ── Avatar picker ──
  return (
    <div style={{ maxWidth: "560px" }}>
      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "26px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 6px 0",
        }}
      >
        {c.pickTitle}
      </h1>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>
        {c.pickHint}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {avatars.map((av) => {
          const pConf = PERSONALITY_CONFIG[av.personality];
          const icon = ICON_OPTIONS[av.visualConfig.iconKey] ?? "✦";
          const isSelected = selected?.id === av.id;
          return (
            <button
              key={av.id}
              onClick={() => setSelected(av)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "14px 16px",
                minHeight: "64px",
                borderRadius: "12px",
                border: isSelected
                  ? `2px solid ${pConf.color}`
                  : "2px solid #E0DDD7",
                backgroundColor: isSelected ? `${pConf.color}0D` : "#FFFFFF",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* Mini avatar visual */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius:
                    av.visualConfig.shape === "circle"
                      ? "50%"
                      : av.visualConfig.shape === "square"
                      ? "10px"
                      : "40% 60% 55% 45% / 42% 48% 52% 58%",
                  backgroundColor: av.visualConfig.primaryColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  flexShrink: 0,
                  boxShadow: isSelected
                    ? `0 0 0 3px ${pConf.color}44`
                    : "none",
                }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontWeight: "bold",
                    color: "#1A1A2E",
                    fontSize: "16px",
                  }}
                >
                  {av.name}
                </div>
                <div
                  style={{
                    color: pConf.color,
                    fontSize: "13px",
                    marginTop: "2px",
                  }}
                >
                  {pConf.icon}{" "}
                  {locale === "de" ? pConf.labelDe : pConf.labelEn}
                </div>
              </div>
              {isSelected && (
                <span
                  style={{
                    color: pConf.color,
                    fontSize: "20px",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        disabled={!selected}
        onClick={() => setSessionStarted(true)}
        style={{
          padding: "14px 32px",
          backgroundColor: selected ? "#6B3FA0" : "#C0B8D0",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "10px",
          fontSize: "17px",
          fontWeight: "bold",
          cursor: selected ? "pointer" : "not-allowed",
          minHeight: "52px",
          width: "100%",
        }}
      >
        {c.btnStart}
      </button>
    </div>
  );
}
