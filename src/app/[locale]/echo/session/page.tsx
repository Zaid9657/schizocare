import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Session — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function SessionPage({
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
        Session
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
          🚧 <strong>Session module coming soon.</strong> The guided dialogue
          session will launch here. Grounding tools are available now.
        </p>
      </div>
    </div>
  );
}
