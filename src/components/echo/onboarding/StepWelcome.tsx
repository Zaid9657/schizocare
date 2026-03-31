"use client";

const EN = {
  title:    "Welcome to ECHO",
  subtitle: "Practice talking back to difficult thoughts",
  body:     "ECHO helps you build a different relationship with the voices you hear — one where you set the terms. Each session is guided, safe, and always ends on a positive note.",
  begin:    "Let's get started",
};
const DE = {
  title:    "Willkommen bei ECHO",
  subtitle: "Übe, schwierigen Gedanken zu antworten",
  body:     "ECHO hilft dir, eine andere Beziehung zu den Stimmen aufzubauen, die du hörst — eine, bei der du die Bedingungen festlegst. Jede Sitzung ist geführt, sicher und endet immer positiv.",
  begin:    "Lass uns anfangen",
};

interface StepWelcomeProps {
  locale:  string;
  onNext:  () => void;
}

export default function StepWelcome({ locale, onNext }: StepWelcomeProps) {
  const t = locale === "de" ? DE : EN;

  return (
    <div style={{ textAlign: "center", paddingTop: "8px" }}>
      {/* Illustration */}
      <div
        aria-hidden="true"
        style={{
          fontSize:        "72px",
          lineHeight:      1,
          marginBottom:    "24px",
          animation:       "echoPulse 3s ease-in-out infinite",
        }}
      >
        🌀
      </div>
      <style>{`
        @keyframes echoPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echoPulse { from { } to { } }
        }
      `}</style>

      <h1
        style={{
          fontFamily:  "var(--font-fraunces), Georgia, serif",
          fontSize:    "32px",
          fontWeight:  "bold",
          color:       "#1A1A2E",
          margin:      "0 0 10px 0",
          lineHeight:  1.2,
        }}
      >
        {t.title}
      </h1>

      <p
        style={{
          fontSize:   "18px",
          fontWeight: "600",
          color:      "#6B3FA0",
          margin:     "0 0 20px 0",
          lineHeight: 1.4,
        }}
      >
        {t.subtitle}
      </p>

      <p
        style={{
          fontSize:   "16px",
          color:      "#4A4A68",
          lineHeight: 1.8,
          margin:     "0 0 40px 0",
          maxWidth:   "420px",
          marginLeft: "auto",
          marginRight:"auto",
        }}
      >
        {t.body}
      </p>

      <button
        type="button"
        onClick={onNext}
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
        {t.begin}
      </button>
    </div>
  );
}
