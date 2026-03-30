"use client";

import Link from "next/link";
import type { GroundingExercise } from "@/lib/echo/grounding";

interface GroundingCardProps {
  exercise: GroundingExercise;
  locale: string;
  basePath: string;
}

export default function GroundingCard({
  exercise,
  locale,
  basePath,
}: GroundingCardProps) {
  const title = locale === "de" ? exercise.title.de : exercise.title.en;
  const desc  = locale === "de" ? exercise.description.de : exercise.description.en;
  const dur   = locale === "de" ? exercise.durationLabel.de : exercise.durationLabel.en;
  const startLabel = locale === "de" ? "Starten" : "Start";

  // Inline tip exercises (cold-water) use anchor, others use real route
  const isInline = exercise.href.startsWith("#");
  const href = isInline ? exercise.href : `${basePath}/${exercise.href}`;

  return (
    <div
      style={{
        backgroundColor: exercise.color,
        border: `2px solid ${exercise.borderColor}`,
        borderRadius: "12px",
        padding: "20px 22px",
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: "28px",
          flexShrink: 0,
          marginTop: "3px",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        {exercise.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "10px",
            marginBottom: "5px",
            flexWrap: "wrap",
          }}
        >
          <h2
            style={{
              fontWeight: "bold",
              color: "#1A1A2E",
              margin: 0,
              fontSize: "17px",
              fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            }}
          >
            {title}
          </h2>
          <span
            style={{
              fontSize: "12px",
              color: "#7A7A96",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {dur}
          </span>
        </div>
        <p
          style={{
            color: "#4A4A68",
            margin: "0 0 14px 0",
            lineHeight: 1.65,
            fontSize: "15px",
          }}
        >
          {desc}
        </p>

        {isInline ? (
          /* Cold water — no dedicated page, just a tip */
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "40px",
              padding: "0 18px",
              backgroundColor: exercise.borderColor,
              color: "#FFFFFF",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            }}
          >
            {locale === "de" ? "Jetzt probieren" : "Try it now"}
          </span>
        ) : (
          <Link
            href={href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "40px",
              padding: "0 18px",
              backgroundColor: exercise.borderColor,
              color: "#FFFFFF",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "14px",
              textDecoration: "none",
              fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            }}
          >
            {startLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
