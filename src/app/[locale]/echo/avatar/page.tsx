import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Avatar — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function AvatarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div style={{ maxWidth: "640px" }}>
      <Link
        href={`/${locale}/echo`}
        style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "14px", display: "inline-block", marginBottom: "24px" }}
      >
        ← Back to ECHO
      </Link>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "32px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 16px 0",
        }}
      >
        Your Voices
      </h1>

      <div
        style={{
          backgroundColor: "#F0EBF8",
          border: "2px solid #6B3FA0",
          borderRadius: "12px",
          padding: "24px",
          color: "#4A2A7A",
        }}
      >
        <p style={{ margin: 0, lineHeight: 1.7 }}>
          🚧 <strong>Avatar creation coming soon.</strong> You will be able to
          give each voice a name, personality, and visual avatar so you can work
          with them in structured dialogue sessions.
        </p>
      </div>
    </div>
  );
}
