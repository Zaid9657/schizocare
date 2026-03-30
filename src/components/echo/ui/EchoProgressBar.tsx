"use client";

export type EchoPhase = "EARLY" | "MIDDLE" | "LATE";

interface EchoProgressBarProps {
  /** 0–100 */
  percent: number;
  label?: string;
  /** Show current value as text inside/below the bar */
  showValue?: boolean;
  /** Phase variant uses fixed segments instead of freeform fill */
  phase?: EchoPhase;
  locale?: string;
  /** px height of the bar */
  height?: number;
  accentColor?: string;
}

const PHASE_CONFIG: Record<
  EchoPhase,
  { labelEn: string; labelDe: string; percent: number; color: string }
> = {
  EARLY:  { labelEn: "Early",  labelDe: "Früh",   percent: 33,  color: "#0B7B6F" },
  MIDDLE: { labelEn: "Middle", labelDe: "Mitte",   percent: 66,  color: "#6B3FA0" },
  LATE:   { labelEn: "Late",   labelDe: "Spät",    percent: 100, color: "#2E7D50" },
};

export default function EchoProgressBar({
  percent,
  label,
  showValue = false,
  phase,
  locale = "en",
  height = 10,
  accentColor = "#0B7B6F",
}: EchoProgressBarProps) {
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const isPhase = !!phase;

  const barColor = phase ? PHASE_CONFIG[phase].color : accentColor;
  const fillPercent = phase ? PHASE_CONFIG[phase].percent : clampedPercent;
  const phaseLabel =
    phase
      ? locale === "de"
        ? PHASE_CONFIG[phase].labelDe
        : PHASE_CONFIG[phase].labelEn
      : null;

  return (
    <div style={{ width: "100%" }}>
      {/* Label row */}
      {(label || showValue || phaseLabel) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "8px",
          }}
        >
          {label && (
            <span
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#1A1A2E",
                fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
              }}
            >
              {label}
            </span>
          )}
          <span
            style={{
              fontSize: "13px",
              color: barColor,
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            {phaseLabel ?? (showValue ? `${Math.round(clampedPercent)}%` : null)}
          </span>
        </div>
      )}

      {/* Track */}
      <div
        role="progressbar"
        aria-valuenow={isPhase ? fillPercent : clampedPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? phaseLabel ?? "Progress"}
        style={{
          position: "relative",
          width: "100%",
          height: height,
          backgroundColor: "#E0DDD7",
          borderRadius: height / 2,
          overflow: "hidden",
        }}
      >
        {/* Phase mode: 3 coloured segments */}
        {isPhase ? (
          <>
            {(["EARLY", "MIDDLE", "LATE"] as EchoPhase[]).map((p, i) => {
              const isActive = p === phase;
              const isPast =
                (phase === "MIDDLE" && p === "EARLY") ||
                (phase === "LATE" && (p === "EARLY" || p === "MIDDLE"));
              return (
                <div
                  key={p}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${i * 33.33}%`,
                    width: i === 2 ? "33.34%" : "33.33%",
                    height: "100%",
                    backgroundColor:
                      isActive || isPast
                        ? PHASE_CONFIG[p].color
                        : "transparent",
                    opacity: isPast ? 0.45 : 1,
                    transition: "background-color 0.3s ease",
                    borderRight: i < 2 ? "2px solid #E0DDD7" : "none",
                  }}
                />
              );
            })}
          </>
        ) : (
          /* Freeform fill */
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${fillPercent}%`,
              height: "100%",
              backgroundColor: barColor,
              borderRadius: height / 2,
              transition: "width 0.4s ease",
            }}
          >
            <style>{`
              @media (prefers-reduced-motion: reduce) {
                * { transition: none !important; }
              }
            `}</style>
          </div>
        )}
      </div>

      {/* Phase dots */}
      {isPhase && (
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "6px",
          }}
        >
          {(["EARLY", "MIDDLE", "LATE"] as EchoPhase[]).map((p) => {
            const isActive = p === phase;
            const isPast =
              (phase === "MIDDLE" && p === "EARLY") ||
              (phase === "LATE" && (p === "EARLY" || p === "MIDDLE"));
            return (
              <span
                key={p}
                style={{
                  fontSize: "11px",
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive
                    ? PHASE_CONFIG[p].color
                    : isPast
                    ? "#7A7A96"
                    : "#C0BDB8",
                }}
              >
                {locale === "de" ? PHASE_CONFIG[p].labelDe : PHASE_CONFIG[p].labelEn}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
