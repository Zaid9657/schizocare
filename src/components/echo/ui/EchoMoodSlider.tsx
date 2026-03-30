"use client";

const FACES = ["😔", "😕", "😐", "🙂", "😊"] as const;

const LABELS_EN = [
  "Very distressed",
  "Somewhat distressed",
  "Neutral",
  "Fairly good",
  "Very good",
] as const;

const LABELS_DE = [
  "Sehr belastet",
  "Etwas belastet",
  "Neutral",
  "Ziemlich gut",
  "Sehr gut",
] as const;

const TRACK_COLORS = ["#C03030", "#D4601A", "#9E6D1B", "#2E7D50", "#0B7B6F"] as const;

interface EchoMoodSliderProps {
  value: number; // 1–5
  onChange: (value: number) => void;
  locale?: string;
  id?: string;
  label?: string;
  /** Show numeric value next to emoji */
  showNumeric?: boolean;
}

export default function EchoMoodSlider({
  value,
  onChange,
  locale = "en",
  id = "echo-mood-slider",
  label,
  showNumeric = true,
}: EchoMoodSliderProps) {
  const index = Math.min(Math.max(value - 1, 0), 4);
  const face = FACES[index];
  const labelText = locale === "de" ? LABELS_DE[index] : LABELS_EN[index];
  const trackColor = TRACK_COLORS[index];
  const fillPercent = ((value - 1) / 4) * 100;

  return (
    <div>
      <style>{`
        #${id}::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${trackColor};
          border: 3px solid #FFFFFF;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }
        #${id}::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${trackColor};
          border: 3px solid #FFFFFF;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        #${id}:focus-visible {
          outline: 3px solid ${trackColor};
          outline-offset: 4px;
          border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          #${id}::-webkit-slider-thumb { transition: none; }
          #${id}::-moz-range-thumb { transition: none; }
        }
      `}</style>

      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            fontWeight: "bold",
            color: "#1A1A2E",
            fontSize: "16px",
            marginBottom: "14px",
            fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
          }}
        >
          {label}
        </label>
      )}

      {/* Emoji face + label display */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span
          style={{ fontSize: "40px", lineHeight: 1, transition: "font-size 0.15s ease" }}
          aria-hidden="true"
        >
          {face}
        </span>
        <div>
          <div
            style={{
              fontWeight: "bold",
              color: trackColor,
              fontSize: "16px",
              transition: "color 0.2s ease",
              fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            }}
          >
            {showNumeric && (
              <span style={{ marginRight: "6px" }} aria-hidden="true">
                {value}/5
              </span>
            )}
            {labelText}
          </div>
        </div>
      </div>

      {/* Slider track with gradient fill */}
      <div style={{ position: "relative", marginBottom: "12px" }}>
        {/* Background track */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "6px",
            borderRadius: "3px",
            backgroundColor: "#E0DDD7",
            transform: "translateY(-50%)",
            pointerEvents: "none",
          }}
        />
        {/* Filled portion */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: `${fillPercent}%`,
            height: "6px",
            borderRadius: "3px",
            backgroundColor: trackColor,
            transform: "translateY(-50%)",
            pointerEvents: "none",
            transition: "width 0.2s ease, background-color 0.2s ease",
          }}
        />
        <input
          id={id}
          type="range"
          min={1}
          max={5}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label ?? (locale === "de" ? "Stimmungsbewertung" : "Mood rating")}
          aria-valuetext={`${value} – ${labelText}`}
          aria-valuemin={1}
          aria-valuemax={5}
          aria-valuenow={value}
          style={{
            position: "relative",
            width: "100%",
            appearance: "none",
            backgroundColor: "transparent",
            height: "44px",
            cursor: "pointer",
            margin: 0,
            padding: 0,
            display: "block",
          }}
        />
      </div>

      {/* Scale labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "20px",
          paddingTop: "2px",
        }}
        aria-hidden="true"
      >
        {FACES.map((f, i) => (
          <span
            key={i}
            style={{
              opacity: i === index ? 1 : 0.35,
              transition: "opacity 0.2s ease",
              cursor: "pointer",
              lineHeight: 1,
            }}
            onClick={() => onChange(i + 1)}
          >
            {f}
          </span>
        ))}
      </div>
    </div>
  );
}
