"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function EchoLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = (params.locale as string) ?? "en";

  const exitHref    = `/${locale}`;
  const groundingHref = `/${locale}/echo/grounding`;
  const crisisHref    = `/${locale}/echo/crisis`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F9F8F6",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ECHO Top Bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E0DDD7",
          padding: "0 16px",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            height: "56px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          {/* ECHO wordmark */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#6B3FA0",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontWeight: "bold",
                fontSize: "13px",
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              E
            </div>
            <span
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: "bold",
                color: "#1A1A2E",
                fontSize: "17px",
              }}
            >
              ECHO
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#7A7A96",
                marginLeft: "2px",
              }}
            >
              Voice Dialogue
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Crisis help */}
            <Link
              href={crisisHref}
              style={{
                display:     "inline-flex",
                alignItems:  "center",
                gap:         "4px",
                minHeight:   "40px",
                padding:     "0 12px",
                backgroundColor: "#FFF0F0",
                color:       "#C03030",
                fontWeight:  "bold",
                borderRadius:"8px",
                textDecoration: "none",
                fontSize:    "13px",
                border:      "1px solid #C03030",
              }}
              aria-label="Crisis help resources"
            >
              🆘 {locale === "de" ? "Hilfe" : "Crisis Help"}
            </Link>

            {/* Grounding quick-access */}
            <Link
              href={groundingHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                minHeight: "40px",
                padding: "0 14px",
                backgroundColor: "#E8F5F2",
                color: "#0B7B6F",
                fontWeight: "bold",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                border: "1px solid #0B7B6F",
              }}
            >
              <span aria-hidden="true">🌿</span>
              Grounding
            </Link>

            {/* Exit */}
            <Link
              href={exitHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                minHeight: "40px",
                padding: "0 14px",
                backgroundColor: "#FFFFFF",
                color: "#4A4A68",
                fontWeight: "bold",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "14px",
                border: "1px solid #E0DDD7",
              }}
            >
              <span aria-hidden="true">←</span>
              Exit
            </Link>
          </div>
        </div>
      </div>

      {/* Page content */}
      <main
        id="echo-main"
        style={{
          flex: 1,
          maxWidth: "960px",
          width: "100%",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        {children}
      </main>

      {/* ECHO Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "16px",
          fontSize: "13px",
          color: "#7A7A96",
          borderTop: "1px solid #E0DDD7",
          backgroundColor: "#FFFFFF",
        }}
      >
        ECHO is part of SchizoCare. It is not a replacement for professional therapy.{" "}
        <Link href={`/${locale}#faq`} style={{ color: "#0B7B6F", textDecoration: "none" }}>
          Learn more
        </Link>
      </footer>
    </div>
  );
}
