import type { Metadata } from "next";
import Link from "next/link";
import CrisisResources from "@/components/echo/safety/CrisisResources";

export const metadata: Metadata = {
  title: "Crisis Support — ECHO | SchizoCare",
  robots: "noindex",
};

export default async function CrisisPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const echoHref      = `/${locale}/echo`;
  const groundingHref = `/${locale}/echo/grounding`;

  const backEn = "← Back to ECHO";
  const backDe = "← Zurück zu ECHO";
  const groundEn = "🌿 Grounding Tools";
  const groundDe = "🌿 Erdungsübungen";

  return (
    <div style={{ maxWidth: "600px" }}>
      {/* Navigation links */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
        <Link
          href={echoHref}
          style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}
        >
          {locale === "de" ? backDe : backEn}
        </Link>
        <Link
          href={groundingHref}
          style={{ color: "#0B7B6F", textDecoration: "none", fontWeight: "bold", fontSize: "14px" }}
        >
          {locale === "de" ? groundDe : groundEn}
        </Link>
      </div>

      {/* Main resources component (client component) */}
      <CrisisResources locale={locale} />

      {/* Footer note */}
      <p
        style={{
          marginTop:  "32px",
          fontSize:   "13px",
          color:      "#7A7A96",
          lineHeight: 1.6,
        }}
      >
        {locale === "de"
          ? "ECHO ist kein Ersatz für professionelle psychiatrische Behandlung. Wenn du dich in einer Krise befindest, wende dich bitte an einen der obigen Dienste."
          : "ECHO is not a substitute for professional psychiatric care. If you are in crisis, please reach out to one of the services above."}
      </p>
    </div>
  );
}
