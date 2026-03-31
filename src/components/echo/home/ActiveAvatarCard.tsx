"use client";

import Link from "next/link";
import type { Avatar } from "@/types/echo";
import EchoAvatar from "@/components/echo/ui/EchoAvatar";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";

const EN = {
  noAvatar:     "No avatar yet",
  createCta:    "Create Your Avatar →",
  edit:         "Edit",
  yourAvatar:   "Your Avatar",
};
const DE = {
  noAvatar:     "Noch kein Avatar",
  createCta:    "Avatar erstellen →",
  edit:         "Bearbeiten",
  yourAvatar:   "Dein Avatar",
};

interface ActiveAvatarCardProps {
  avatar:     Avatar | null;
  locale:     string;
  avatarHref: string;
}

export default function ActiveAvatarCard({ avatar, locale, avatarHref }: ActiveAvatarCardProps) {
  const t = locale === "de" ? DE : EN;

  if (!avatar) {
    return (
      <Link
        href={`${avatarHref}/create`}
        style={{
          display:         "flex",
          alignItems:      "center",
          gap:             "14px",
          padding:         "16px 18px",
          backgroundColor: "#F0EBF8",
          border:          "2px dashed #6B3FA060",
          borderRadius:    "12px",
          textDecoration:  "none",
        }}
      >
        <div
          style={{
            width:           "44px",
            height:          "44px",
            borderRadius:    "50%",
            backgroundColor: "#6B3FA020",
            display:         "flex",
            alignItems:      "center",
            justifyContent:  "center",
            fontSize:        "22px",
            flexShrink:      0,
          }}
          aria-hidden="true"
        >
          🎭
        </div>
        <div>
          <div style={{ fontWeight: "bold", color: "#4A2A7A", fontSize: "14px" }}>{t.noAvatar}</div>
          <div style={{ color: "#6B3FA0", fontSize: "13px", marginTop: "2px" }}>{t.createCta}</div>
        </div>
      </Link>
    );
  }

  const pConf = PERSONALITY_CONFIG[avatar.personality];

  return (
    <div
      style={{
        display:         "flex",
        alignItems:      "center",
        gap:             "14px",
        padding:         "14px 18px",
        backgroundColor: "#FFFFFF",
        border:          "2px solid #EEECE8",
        borderRadius:    "12px",
      }}
    >
      <EchoAvatar visualConfig={avatar.visualConfig} name={avatar.name} size="sm" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "15px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {avatar.name || t.yourAvatar}
        </div>
        <div style={{ fontSize: "12px", color: pConf.color, fontWeight: "600", marginTop: "2px" }}>
          {pConf.icon} {locale === "de" ? pConf.labelDe : pConf.labelEn}
        </div>
      </div>
      <Link
        href={avatarHref}
        style={{ color: "#7A7A96", fontSize: "13px", textDecoration: "none", fontWeight: "500", flexShrink: 0 }}
      >
        {t.edit}
      </Link>
    </div>
  );
}
