"use client";

const EN = {
  title:      "What ECHO Does",
  points: [
    { icon: "🗣️", text: "Practice responding to your voice" },
    { icon: "💪", text: "Build skills you can use anytime" },
    { icon: "📊", text: "Track your progress over time" },
  ],
  disclaimer: "This supports your recovery — it doesn't replace professional care.",
};
const DE = {
  title:      "Was ECHO macht",
  points: [
    { icon: "🗣️", text: "Übe, deiner Stimme zu antworten" },
    { icon: "💪", text: "Baue Fähigkeiten auf, die du jederzeit nutzen kannst" },
    { icon: "📊", text: "Verfolge deinen Fortschritt über die Zeit" },
  ],
  disclaimer: "Dies unterstützt deine Genesung — es ersetzt keine professionelle Behandlung.",
};

interface StepExpectationsProps {
  locale: string;
}

export default function StepExpectations({ locale }: StepExpectationsProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "28px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 28px 0",
        }}
      >
        {t.title}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "32px" }}>
        {t.points.map(({ icon, text }) => (
          <div
            key={text}
            style={{
              display:         "flex",
              alignItems:      "center",
              gap:             "16px",
              padding:         "18px 20px",
              backgroundColor: "#FFFFFF",
              border:          "2px solid #EEECE8",
              borderRadius:    "12px",
              minHeight:       "68px",
            }}
          >
            <span style={{ fontSize: "28px", flexShrink: 0 }} aria-hidden="true">{icon}</span>
            <span style={{ fontSize: "17px", color: "#1A1A2E", fontWeight: "500", lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#F0EBF8",
          border:          "1px solid #6B3FA040",
          borderRadius:    "10px",
          padding:         "14px 18px",
          display:         "flex",
          gap:             "10px",
          alignItems:      "flex-start",
        }}
      >
        <span aria-hidden="true" style={{ fontSize: "18px", flexShrink: 0, marginTop: "1px" }}>ℹ️</span>
        <p style={{ margin: 0, fontSize: "14px", color: "#4A2A7A", lineHeight: 1.6 }}>
          {t.disclaimer}
        </p>
      </div>
    </div>
  );
}
