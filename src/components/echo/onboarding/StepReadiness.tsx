"use client";

const EN = {
  title:          "Ready to Begin?",
  subtitle:       "Next, you'll create a visual avatar for your voice. It takes about 2 minutes.",
  createAvatar:   "Yes, let's create my avatar →",
  groundingFirst: "Show me grounding tools first",
  hint:           "You can always come back to create your avatar after grounding.",
};
const DE = {
  title:          "Bereit anzufangen?",
  subtitle:       "Als nächstes erstellst du einen visuellen Avatar für deine Stimme. Das dauert etwa 2 Minuten.",
  createAvatar:   "Ja, Avatar erstellen →",
  groundingFirst: "Zeig mir zuerst die Erdungsübungen",
  hint:           "Du kannst jederzeit zurückkommen, um deinen Avatar zu erstellen.",
};

interface StepReadinessProps {
  locale:          string;
  onCreateAvatar:  () => void;
  onGroundingFirst: () => void;
}

export default function StepReadiness({ locale, onCreateAvatar, onGroundingFirst }: StepReadinessProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div style={{ textAlign: "center", paddingTop: "8px" }}>
      <div style={{ fontSize: "64px", marginBottom: "24px" }} aria-hidden="true">🎭</div>

      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "28px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 12px 0",
        }}
      >
        {t.title}
      </h2>
      <p style={{ color: "#4A4A68", fontSize: "16px", lineHeight: 1.7, margin: "0 0 36px 0", maxWidth: "380px", marginLeft: "auto", marginRight: "auto" }}>
        {t.subtitle}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
        <button
          type="button"
          onClick={onCreateAvatar}
          style={{
            width:           "100%",
            maxWidth:        "360px",
            padding:         "15px 28px",
            backgroundColor: "#6B3FA0",
            color:           "#FFFFFF",
            border:          "none",
            borderRadius:    "12px",
            fontSize:        "17px",
            fontWeight:      "bold",
            cursor:          "pointer",
            minHeight:       "56px",
            fontFamily:      "inherit",
          }}
        >
          {t.createAvatar}
        </button>
        <button
          type="button"
          onClick={onGroundingFirst}
          style={{
            width:           "100%",
            maxWidth:        "360px",
            padding:         "14px 28px",
            backgroundColor: "#FFFFFF",
            color:           "#0B7B6F",
            border:          "2px solid #0B7B6F",
            borderRadius:    "12px",
            fontSize:        "16px",
            fontWeight:      "600",
            cursor:          "pointer",
            minHeight:       "52px",
            fontFamily:      "inherit",
          }}
        >
          🌿 {t.groundingFirst}
        </button>
      </div>

      <p style={{ marginTop: "20px", fontSize: "13px", color: "#9A9AB0", lineHeight: 1.5 }}>
        {t.hint}
      </p>
    </div>
  );
}
