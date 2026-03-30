import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECHO — Voice Dialogue Therapy | SchizoCare",
  description:
    "ECHO helps you have a structured, therapeutic dialogue with the voices you hear. Coming soon to SchizoCare.",
  robots: "noindex",
};

export default async function EchoHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const groundingHref = `/${locale}/echo/grounding`;

  return (
    <div style={{ maxWidth: "640px" }}>
      {/* Badge */}
      <span
        style={{
          display: "inline-block",
          backgroundColor: "#6B3FA0",
          color: "#FFFFFF",
          fontSize: "12px",
          fontWeight: "bold",
          padding: "5px 12px",
          borderRadius: "9999px",
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Coming Soon
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "38px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 16px 0",
          lineHeight: 1.15,
        }}
      >
        ECHO
      </h1>

      <p
        style={{
          fontSize: "20px",
          color: "#4A4A68",
          lineHeight: 1.7,
          margin: "0 0 12px 0",
        }}
      >
        Voice Dialogue Therapy
      </p>

      <p
        style={{
          color: "#4A4A68",
          lineHeight: 1.8,
          margin: "0 0 32px 0",
          maxWidth: "560px",
        }}
      >
        ECHO is a guided therapy tool that helps you have a structured,
        therapeutic dialogue with the voices you hear. Instead of fighting
        them, you learn a new way to relate to them — reducing distress and
        building confidence.
      </p>

      {/* Feature list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginBottom: "36px",
        }}
      >
        {[
          { icon: "🎭", label: "Create a visual avatar for each voice" },
          { icon: "💬", label: "Guided dialogue sessions at your own pace" },
          { icon: "🌿", label: "Grounding tools always one tap away" },
          { icon: "📈", label: "Track how your relationship with voices changes" },
          { icon: "🔒", label: "Fully private — no account required" },
        ].map(({ icon, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              backgroundColor: "#FFFFFF",
              border: "2px solid #EEECE8",
              borderRadius: "10px",
              color: "#1A1A2E",
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: "22px" }} aria-hidden="true">
              {icon}
            </span>
            {label}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        <Link
          href={groundingHref}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            minHeight: "52px",
            padding: "0 28px",
            backgroundColor: "#0B7B6F",
            color: "#FFFFFF",
            fontWeight: "bold",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "17px",
          }}
        >
          🌿 Try Grounding Tools Now
        </Link>
      </div>

      {/* Note */}
      <p
        style={{
          marginTop: "32px",
          fontSize: "14px",
          color: "#7A7A96",
          lineHeight: 1.6,
          maxWidth: "500px",
        }}
      >
        ECHO is being developed with input from people with lived experience
        and mental health professionals. Grounding tools are available now
        while the full feature is completed.
      </p>
    </div>
  );
}
