"use client";

const EN = {
  title:        "Your First Practice",
  subtitle:     "Let's try a quick practice session.",
  what: [
    { icon: "⚡", text: "Just 3 exchanges to get the feel" },
    { icon: "💡", text: "Coaching tips shown after each response" },
    { icon: "🧘", text: "Gentle content — no pressure" },
    { icon: "✓",  text: "Ends with a win statement you choose" },
  ],
  noAvatar:     "No avatar yet — you'll need to create one first.",
  startBtn:     "Start Practice Session →",
};
const DE = {
  title:        "Deine erste Übung",
  subtitle:     "Lass uns eine kurze Übungssitzung ausprobieren.",
  what: [
    { icon: "⚡", text: "Nur 3 Austausche zum Kennenlernen" },
    { icon: "💡", text: "Coaching-Tipps nach jeder Antwort" },
    { icon: "🧘", text: "Sanfte Inhalte — kein Druck" },
    { icon: "✓",  text: "Endet mit einem Siegessatz deiner Wahl" },
  ],
  noAvatar:     "Noch kein Avatar — du musst zuerst einen erstellen.",
  startBtn:     "Übungssitzung starten →",
};

interface StepFirstSessionProps {
  locale:       string;
  avatarCreated: boolean;
  onStart:      () => void;
}

export default function StepFirstSession({ locale, avatarCreated, onStart }: StepFirstSessionProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "28px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 8px 0",
        }}
      >
        {t.title}
      </h2>
      <p style={{ color: "#7A7A96", fontSize: "15px", margin: "0 0 24px 0" }}>
        {t.subtitle}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
        {t.what.map(({ icon, text }) => (
          <div
            key={text}
            style={{
              display:     "flex",
              gap:         "14px",
              alignItems:  "center",
              padding:     "14px 18px",
              backgroundColor: "#F9F8F6",
              border:      "1px solid #EEECE8",
              borderRadius:"10px",
              minHeight:   "52px",
            }}
          >
            <span style={{ fontSize: "22px", flexShrink: 0 }} aria-hidden="true">{icon}</span>
            <span style={{ fontSize: "15px", color: "#1A1A2E", lineHeight: 1.4 }}>{text}</span>
          </div>
        ))}
      </div>

      {!avatarCreated && (
        <div
          style={{
            backgroundColor: "#FFF8E8",
            border:          "1px solid #C08000",
            borderRadius:    "10px",
            padding:         "12px 16px",
            marginBottom:    "20px",
            fontSize:        "14px",
            color:           "#4A3A00",
          }}
        >
          ⚠️ {t.noAvatar}
        </div>
      )}

      <button
        type="button"
        onClick={onStart}
        disabled={!avatarCreated}
        style={{
          width:           "100%",
          padding:         "15px 28px",
          backgroundColor: avatarCreated ? "#6B3FA0" : "#C0B8D0",
          color:           "#FFFFFF",
          border:          "none",
          borderRadius:    "12px",
          fontSize:        "17px",
          fontWeight:      "bold",
          cursor:          avatarCreated ? "pointer" : "not-allowed",
          minHeight:       "56px",
          fontFamily:      "inherit",
        }}
      >
        {t.startBtn}
      </button>
    </div>
  );
}
