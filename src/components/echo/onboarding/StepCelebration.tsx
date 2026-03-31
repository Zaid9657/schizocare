"use client";

const EN = {
  title:       "You Did It! 🎉",
  subtitle:    "You're ready to continue on your own.",
  accomplishments: [
    "Created your avatar",
    "Completed your first practice",
    "Learned the grounding tools",
  ],
  goHome:      "Go to ECHO Home",
};
const DE = {
  title:       "Geschafft! 🎉",
  subtitle:    "Du bist bereit, alleine weiterzumachen.",
  accomplishments: [
    "Avatar erstellt",
    "Erste Übung abgeschlossen",
    "Erdungsübungen kennengelernt",
  ],
  goHome:      "Zur ECHO-Startseite",
};

interface StepCelebrationProps {
  locale:               string;
  avatarCreated:        boolean;
  firstSessionDone:     boolean;
  onComplete:           () => void;
}

export default function StepCelebration({
  locale,
  avatarCreated,
  firstSessionDone,
  onComplete,
}: StepCelebrationProps) {
  const t = locale === "de" ? DE : EN;

  const accomplishmentDone = [
    avatarCreated,
    firstSessionDone,
    true, // grounding is always shown in onboarding
  ];

  return (
    <div style={{ textAlign: "center", paddingTop: "8px" }}>
      <div
        aria-hidden="true"
        style={{ fontSize: "72px", lineHeight: 1, marginBottom: "20px" }}
      >
        🎉
      </div>

      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "30px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 10px 0",
        }}
      >
        {t.title}
      </h2>
      <p style={{ color: "#0B7B6F", fontSize: "17px", fontWeight: "600", margin: "0 0 32px 0" }}>
        {t.subtitle}
      </p>

      {/* Accomplishments */}
      <div
        style={{
          display:         "flex",
          flexDirection:   "column",
          gap:             "10px",
          marginBottom:    "36px",
          textAlign:       "left",
          maxWidth:        "340px",
          marginLeft:      "auto",
          marginRight:     "auto",
        }}
      >
        {t.accomplishments.map((item, i) => (
          <div
            key={item}
            style={{
              display:         "flex",
              alignItems:      "center",
              gap:             "12px",
              padding:         "14px 18px",
              backgroundColor: accomplishmentDone[i] ? "#EAF5EF" : "#F9F8F6",
              border:          `2px solid ${accomplishmentDone[i] ? "#2E7D50" : "#E0DDD7"}`,
              borderRadius:    "10px",
              opacity:         accomplishmentDone[i] ? 1 : 0.6,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize:   "20px",
                color:      accomplishmentDone[i] ? "#2E7D50" : "#C0B8D0",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              {accomplishmentDone[i] ? "✓" : "○"}
            </span>
            <span style={{ fontSize: "16px", color: "#1A1A2E", fontWeight: "500" }}>{item}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onComplete}
        style={{
          padding:         "15px 48px",
          backgroundColor: "#6B3FA0",
          color:           "#FFFFFF",
          border:          "none",
          borderRadius:    "12px",
          fontSize:        "18px",
          fontWeight:      "bold",
          cursor:          "pointer",
          minHeight:       "56px",
          fontFamily:      "inherit",
        }}
      >
        {t.goHome}
      </button>
    </div>
  );
}
