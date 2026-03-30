import type { Metadata } from "next";
import Link from "next/link";
import GroundingCard from "@/components/echo/grounding/GroundingCard";
import { GROUNDING_EXERCISES } from "@/lib/echo/grounding";

export const metadata: Metadata = {
  title: "Grounding Tools — ECHO | SchizoCare",
  description: "Quick grounding exercises to help you feel safe and present. Works offline.",
  robots: "noindex",
};

const CRISIS_EN = {
  title: "If you are in crisis",
  body: "These exercises are not a substitute for emergency care. If you are in immediate danger, please contact a crisis line.",
  us: "988 Suicide & Crisis Lifeline (US): call or text 988",
  de: "Telefonseelsorge (Germany): 0800 111 0 111",
  link: "More crisis resources",
};

const CRISIS_DE = {
  title: "Wenn du in einer Krise bist",
  body: "Diese Übungen ersetzen keine Notfallversorgung. Wenn du in unmittelbarer Gefahr bist, wende dich bitte an eine Krisenhotline.",
  us: "988 Suicide & Crisis Lifeline (USA): Anruf oder SMS an 988",
  de: "Telefonseelsorge (Deutschland): 0800 111 0 111",
  link: "Weitere Krisenressourcen",
};

export default async function GroundingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isDE = locale === "de";
  const crisis = isDE ? CRISIS_DE : CRISIS_EN;
  const basePath = `/${locale}/echo/grounding`;

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Back link */}
      <Link
        href={`/${locale}/echo`}
        style={{
          color: "#0B7B6F",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "14px",
          display: "inline-flex",
          alignItems: "center",
          gap: "4px",
          marginBottom: "24px",
        }}
      >
        ← {isDE ? "Zurück zu ECHO" : "Back to ECHO"}
      </Link>

      {/* Header */}
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
        {isDE ? "Erdungsübungen" : "Grounding Tools"}
      </span>

      <h1
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize: "34px",
          fontWeight: "bold",
          color: "#1A1A2E",
          margin: "0 0 10px 0",
          lineHeight: 1.2,
        }}
      >
        {isDE ? "Komm ins Hier und Jetzt" : "Feel Safe Right Now"}
      </h1>

      <p
        style={{
          color: "#4A4A68",
          lineHeight: 1.8,
          margin: "0 0 32px 0",
          fontSize: "17px",
          maxWidth: "560px",
        }}
      >
        {isDE
          ? "Diese Übungen helfen dir, in den gegenwärtigen Moment zurückzukehren. Nutze sie jederzeit — vor einer Sitzung, während einer oder wann immer du sie brauchst."
          : "These exercises help bring you back to the present moment. Use them any time — before a session, during one, or whenever you need them."}
      </p>

      {/* Exercise cards */}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}
      >
        {GROUNDING_EXERCISES.map((exercise) => (
          <GroundingCard
            key={exercise.id}
            exercise={exercise}
            locale={locale}
            basePath={basePath}
          />
        ))}
      </div>

      {/* Cold water inline tip */}
      <div
        id="cold-water"
        style={{
          backgroundColor: "#E8F5EC",
          border: "2px solid #2E7D50",
          borderRadius: "12px",
          padding: "20px 22px",
          marginBottom: "40px",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "17px", marginBottom: "8px" }}>
          💧 {isDE ? "Kaltwasser-Reset — Anleitung" : "Cold Water Reset — How to do it"}
        </div>
        <ol style={{ margin: "0", padding: "0 0 0 20px", color: "#2E5A38", lineHeight: 2 }}>
          {isDE ? (
            <>
              <li>Geh zu einem Waschbecken oder hol eine Schüssel mit kaltem Wasser.</li>
              <li>Tauche dein Gesicht für 30 Sekunden ein, oder spritz kaltes Wasser auf deine Stirn und Wangen.</li>
              <li>Falls verfügbar: Halte einen Eiswürfel in deiner Hand, bis er sich unangenehm anfühlt.</li>
              <li>Nimm dir eine Minute, um zu bemerken, wie sich dein Körper anfühlt.</li>
            </>
          ) : (
            <>
              <li>Go to a sink or get a bowl of cold water.</li>
              <li>Submerge your face for 30 seconds, or splash cold water on your forehead and cheeks.</li>
              <li>If available: hold an ice cube in your hand until it feels uncomfortable.</li>
              <li>Take a moment to notice how your body feels afterwards.</li>
            </>
          )}
        </ol>
        <p style={{ margin: "12px 0 0 0", fontSize: "13px", color: "#4A6B52" }}>
          {isDE
            ? "Dies aktiviert den Tauchreflex und kann die Herzfrequenz innerhalb von Sekunden senken."
            : "This activates the mammalian dive reflex and can lower heart rate within seconds."}
        </p>
      </div>

      {/* Crisis resources */}
      <div
        style={{
          backgroundColor: "#FFF5F5",
          border: "2px solid #C03030",
          borderRadius: "12px",
          padding: "20px 22px",
        }}
      >
        <h2
          style={{
            fontWeight: "bold",
            color: "#8B1A1A",
            fontSize: "16px",
            margin: "0 0 10px 0",
            fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
          }}
        >
          🆘 {crisis.title}
        </h2>
        <p style={{ color: "#4A2A2A", fontSize: "15px", lineHeight: 1.65, margin: "0 0 12px 0" }}>
          {crisis.body}
        </p>
        <ul style={{ margin: 0, padding: "0 0 0 20px", color: "#4A2A2A", lineHeight: 2, fontSize: "15px" }}>
          <li>{crisis.us}</li>
          <li>{crisis.de}</li>
        </ul>
        <Link
          href={`/${locale}#faq`}
          style={{
            display: "inline-block",
            marginTop: "14px",
            color: "#C03030",
            fontWeight: "bold",
            fontSize: "14px",
            textDecoration: "underline",
          }}
        >
          {crisis.link} →
        </Link>
      </div>
    </div>
  );
}
