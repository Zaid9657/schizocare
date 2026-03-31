"use client";

import Link from "next/link";
import type { Avatar } from "@/types/echo";
import EchoAvatar from "@/components/echo/ui/EchoAvatar";

const EN = {
  title:        "Start a Session",
  subtitle:     "Practice dialogue with your avatar",
  noAvatar:     "Create your avatar to get started",
  noAvatarCta:  "Create Avatar →",
};
const DE = {
  title:        "Sitzung starten",
  subtitle:     "Übe den Dialog mit deinem Avatar",
  noAvatar:     "Erstelle deinen Avatar, um zu beginnen",
  noAvatarCta:  "Avatar erstellen →",
};

interface StartSessionCardProps {
  avatar:       Avatar | null;
  locale:       string;
  sessionHref:  string;
  avatarHref:   string;
}

export default function StartSessionCard({
  avatar,
  locale,
  sessionHref,
  avatarHref,
}: StartSessionCardProps) {
  const t = locale === "de" ? DE : EN;

  if (!avatar) {
    return (
      <Link
        href={`${avatarHref}/create`}
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             "16px",
          padding:         "22px 24px",
          backgroundColor: "#F9F8F6",
          border:          "2px dashed #C0B8D0",
          borderRadius:    "16px",
          textDecoration:  "none",
          marginBottom:    "20px",
        }}
      >
        <span style={{ fontSize: "36px" }} aria-hidden="true">🎭</span>
        <div>
          <div style={{ fontWeight: "bold", color: "#4A4A68", fontSize: "16px" }}>{t.noAvatar}</div>
          <div style={{ color: "#6B3FA0", fontSize: "14px", marginTop: "4px", fontWeight: "600" }}>{t.noAvatarCta}</div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`${sessionHref}/new`}
      style={{
        display:         "flex",
        alignItems:      "center",
        gap:             "18px",
        padding:         "22px 24px",
        background:      "linear-gradient(135deg, #6B3FA0 0%, #4A2A7A 100%)",
        borderRadius:    "16px",
        textDecoration:  "none",
        marginBottom:    "20px",
        minHeight:       "88px",
        position:        "relative",
        overflow:        "hidden",
      }}
    >
      {/* Subtle pattern overlay */}
      <div
        aria-hidden="true"
        style={{
          position:        "absolute",
          inset:           0,
          backgroundImage: "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          pointerEvents:   "none",
        }}
      />

      <EchoAvatar visualConfig={avatar.visualConfig} name={avatar.name} size="md" />

      <div style={{ flex: 1, minWidth: 0, zIndex: 1 }}>
        <div
          style={{
            fontFamily:  "var(--font-fraunces), Georgia, serif",
            fontSize:    "22px",
            fontWeight:  "bold",
            color:       "#FFFFFF",
            lineHeight:  1.2,
            marginBottom:"4px",
          }}
        >
          {t.title}
        </div>
        <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{t.subtitle}</div>
      </div>

      <span
        aria-hidden="true"
        style={{ fontSize: "24px", color: "rgba(255,255,255,0.7)", flexShrink: 0, zIndex: 1 }}
      >
        →
      </span>
    </Link>
  );
}
