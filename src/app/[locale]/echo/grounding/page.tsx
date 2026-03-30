import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Grounding Tools — ECHO | SchizoCare",
  description: "Quick grounding exercises to help you feel safe and present.",
  robots: "noindex",
};

export default async function GroundingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const techniques = [
    {
      id: "five_senses",
      icon: "🌱",
      title: "5-4-3-2-1 Grounding",
      desc: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
      duration: "3 min",
      color: "#E8F5F2",
      border: "#0B7B6F",
    },
    {
      id: "box_breathing",
      icon: "🫁",
      title: "Box Breathing",
      desc: "Breathe in for 4 counts, hold for 4, out for 4, hold for 4. Repeat.",
      duration: "4 min",
      color: "#E8F0FA",
      border: "#4A90D9",
    },
    {
      id: "body_scan",
      icon: "🧘",
      title: "Body Scan",
      desc: "Slowly notice each part of your body from feet to head. No judgment.",
      duration: "5 min",
      color: "#F0EBF8",
      border: "#6B3FA0",
    },
    {
      id: "safe_place",
      icon: "🏡",
      title: "Safe Place Visualisation",
      desc: "Picture a place where you feel completely safe. Explore it slowly.",
      duration: "5 min",
      color: "#FBF3E3",
      border: "#9E6D1B",
    },
    {
      id: "cold_water",
      icon: "💧",
      title: "Cold Water Reset",
      desc: "Splash cold water on your face or hold ice. This activates the dive reflex and slows your heart rate quickly.",
      duration: "1 min",
      color: "#E8F5EC",
      border: "#2E7D50",
    },
  ];

  return (
    <div style={{ maxWidth: "720px" }}>
      <Link
        href={`/${locale}/echo`}
        style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", marginBottom: "24px" }}
      >
        ← Back to ECHO
      </Link>

      <span
        style={{
          display: "block",
          fontSize: "12px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#0B7B6F",
          marginBottom: "8px",
        }}
      >
        Grounding Tools
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 12px 0",
          lineHeight: 1.2,
        }}
      >
        Feel Safe Right Now
      </h1>

      <p style={{ color: "#4A4A68", lineHeight: 1.8, margin: "0 0 32px 0" }}>
        These exercises help bring you back to the present moment. Use them
        any time — before a session, during, or whenever you need them.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {techniques.map(({ id, icon, title, desc, duration, color, border }) => (
          <div
            key={id}
            style={{
              backgroundColor: color,
              border: `2px solid ${border}`,
              borderRadius: "12px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "flex-start",
              gap: "16px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                flexShrink: 0,
                marginTop: "2px",
              }}
              aria-hidden="true"
            >
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                <h2
                  style={{
                    fontWeight: "bold",
                    color: "#1A1A2E",
                    margin: 0,
                    fontSize: "17px",
                  }}
                >
                  {title}
                </h2>
                <span style={{ fontSize: "12px", color: "#7A7A96", fontWeight: 500 }}>
                  {duration}
                </span>
              </div>
              <p style={{ color: "#4A4A68", margin: "0 0 14px 0", lineHeight: 1.6, fontSize: "15px" }}>
                {desc}
              </p>
              <button
                type="button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "40px",
                  padding: "0 18px",
                  backgroundColor: border,
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontFamily: "inherit",
                }}
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          marginTop: "28px",
          fontSize: "14px",
          color: "#7A7A96",
          lineHeight: 1.6,
        }}
      >
        Guided audio and step-by-step instructions for each exercise are coming soon.
      </p>
    </div>
  );
}
