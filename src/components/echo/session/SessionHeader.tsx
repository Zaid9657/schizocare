"use client";

import Link from "next/link";
import type { Avatar } from "@/types/echo";
import { PERSONALITY_CONFIG } from "@/lib/echo/constants";

interface SessionHeaderProps {
  avatar:        Avatar;
  exchangeCount: number;
  maxExchanges:  number;
  locale:        string;
  groundingHref: string;
}

export default function SessionHeader({
  avatar,
  exchangeCount,
  maxExchanges,
  locale,
  groundingHref,
}: SessionHeaderProps) {
  const pConf = PERSONALITY_CONFIG[avatar.personality];
  const label = locale === "de" ? "Austausch" : "Exchange";
  const groundLabel = locale === "de" ? "Erdung" : "Ground me";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "10px 16px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #E0DDD7",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      {/* Avatar identity */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            backgroundColor: pConf.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            flexShrink: 0,
            color: "#FFFFFF",
          }}
          aria-hidden="true"
        >
          {pConf.icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontWeight: "bold",
              color: "#1A1A2E",
              fontSize: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {avatar.name}
          </div>
          <div style={{ fontSize: "11px", color: pConf.color }}>
            {locale === "de" ? pConf.labelDe : pConf.labelEn}
          </div>
        </div>
      </div>

      {/* Exchange counter */}
      <div
        style={{
          fontSize: "13px",
          color: "#7A7A96",
          fontWeight: 500,
          flexShrink: 0,
        }}
        aria-label={`${label} ${exchangeCount} of ${maxExchanges}`}
      >
        {exchangeCount}
        <span style={{ color: "#C0B8D0" }}>/{maxExchanges}</span>
      </div>

      {/* Stress / grounding button — always visible */}
      <Link
        href={groundingHref}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          minHeight: "36px",
          padding: "0 12px",
          backgroundColor: "#E8F5F2",
          color: "#0B7B6F",
          fontWeight: "bold",
          borderRadius: "8px",
          textDecoration: "none",
          fontSize: "13px",
          border: "1px solid #0B7B6F",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
        aria-label={locale === "de" ? "Zur Erdung wechseln" : "Switch to grounding"}
      >
        <span aria-hidden="true">🌿</span>
        {groundLabel}
      </Link>
    </div>
  );
}
