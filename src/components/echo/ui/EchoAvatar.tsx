"use client";

import { useMemo } from "react";
import type { AvatarVisualConfig } from "@/types/echo";

export type AvatarSizeVariant = "sm" | "md" | "lg" | "xl";

interface EchoAvatarProps {
  visualConfig: AvatarVisualConfig;
  name?: string;
  speaking?: boolean;
  /** Pulse animation while speaking */
  size?: AvatarSizeVariant;
  className?: string;
}

const SIZE_PX: Record<AvatarSizeVariant, number> = {
  sm:  40,
  md:  64,
  lg:  96,
  xl: 128,
};

const ICON_MAP: Record<string, string> = {
  wave:   "🌊",
  storm:  "⚡",
  shield: "🛡",
  eye:    "👁",
  flame:  "🔥",
  cloud:  "☁",
  star:   "✦",
  spiral: "🌀",
};

// Generate a deterministic SVG pattern background based on personality colour
function PatternDefs({ id, color }: { id: string; color: string }) {
  return (
    <defs>
      <pattern id={id} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill={color} fillOpacity="0.18" />
        <circle cx="7" cy="7" r="1" fill={color} fillOpacity="0.12" />
      </pattern>
    </defs>
  );
}

function borderRadiusForShape(
  shape: AvatarVisualConfig["shape"]
): string {
  switch (shape) {
    case "circle":  return "50%";
    case "square":  return "20%";
    case "organic": return "42% 58% 55% 45% / 48% 44% 56% 52%";
  }
}

export default function EchoAvatar({
  visualConfig,
  name,
  speaking = false,
  size = "md",
}: EchoAvatarProps) {
  const px = SIZE_PX[size];
  const { shape, primaryColor, secondaryColor, iconKey } = visualConfig;
  const icon = ICON_MAP[iconKey] ?? "✦";
  const patternId = useMemo(
    () => `echo-av-pat-${primaryColor.replace("#", "")}`,
    [primaryColor]
  );
  const radius = borderRadiusForShape(shape);
  const iconFontSize = Math.round(px * 0.38);
  const ringOffset = Math.round(px * 0.07);
  const ringSize = px + ringOffset * 2;

  return (
    <div
      role="img"
      aria-label={name ? `Avatar: ${name}` : "Avatar"}
      style={{
        position: "relative",
        width: px,
        height: px,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Speaking ring — SVG so it animates the stroke-dashoffset cleanly */}
      {speaking && (
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -ringOffset,
            left: -ringOffset,
            width: ringSize,
            height: ringSize,
            pointerEvents: "none",
            overflow: "visible",
          }}
          viewBox={`0 0 ${ringSize} ${ringSize}`}
        >
          <style>{`
            @keyframes echo-avatar-ring {
              0%, 100% { opacity: 0.6; transform: scale(1); }
              50%       { opacity: 1;   transform: scale(1.04); }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes echo-avatar-ring { to {} }
            }
          `}</style>
          <rect
            x={2}
            y={2}
            width={ringSize - 4}
            height={ringSize - 4}
            rx={shape === "circle" ? ringSize / 2 : shape === "square" ? ringSize * 0.22 : ringSize * 0.44}
            fill="none"
            stroke={primaryColor}
            strokeWidth={3}
            strokeOpacity={0.55}
            style={{ animation: "echo-avatar-ring 1.4s ease-in-out infinite" }}
          />
        </svg>
      )}

      {/* Avatar face — SVG */}
      <svg
        aria-hidden="true"
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        style={{ display: "block", borderRadius: radius, overflow: "hidden" }}
      >
        <PatternDefs id={patternId} color={primaryColor} />

        {/* Base fill */}
        <rect width={px} height={px} fill={primaryColor} />

        {/* Subtle pattern overlay */}
        <rect width={px} height={px} fill={`url(#${patternId})`} />

        {/* Gradient sheen */}
        <defs>
          <linearGradient id={`echo-av-grad-${patternId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <rect
          width={px}
          height={px}
          fill={`url(#echo-av-grad-${patternId})`}
        />

        {/* Icon — rendered as foreignObject for emoji support */}
        <foreignObject x={0} y={0} width={px} height={px}>
          <div
            style={{
              width: px,
              height: px,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: iconFontSize,
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            {icon}
          </div>
        </foreignObject>
      </svg>
    </div>
  );
}
