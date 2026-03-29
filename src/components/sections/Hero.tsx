"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");

  const moodData = [7, 6, 8, 5, 7, 8, 9, 7, 6, 8, 7, 5, 8, 9];

  function getBarColor(val: number) {
    if (val >= 7) return "#0B7B6F";
    if (val >= 5) return "#9E6D1B";
    return "#7A7A96";
  }

  return (
    <section style={{ padding: "56px 16px" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }} className="hero-grid">
          {/* Left column */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#E8F5F2", color: "#0B7B6F", fontSize: "14px", fontWeight: "bold", padding: "8px 16px", borderRadius: "9999px", marginBottom: "24px" }}>
              <span aria-hidden="true">✓</span>
              {t("badge")}
            </div>

            <h1 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "38px", fontWeight: "bold", color: "#1A1A2E", marginBottom: "24px", lineHeight: 1.2 }}>
              {t("title")}{" "}
              <em style={{ fontStyle: "normal", color: "#0B7B6F" }}>{t("titleHighlight")}</em>
            </h1>

            <p style={{ color: "#4A4A68", lineHeight: 1.7, marginBottom: "32px", maxWidth: "55ch" }}>
              {t("description")}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "32px" }}>
              <Button href="#cta" variant="primary" size="large">
                <span aria-hidden="true">✓</span> {t("ctaPrimary")}
              </Button>
              <Button href="#tools" variant="outline" size="large">
                {t("ctaSecondary")}
              </Button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              {[
                { icon: "🔒", label: t("trustPrivate") },
                { icon: "👨‍⚕️", label: t("trustDoctors") },
                { icon: "💚", label: t("trustFree") },
              ].map(({ icon, label }) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "#4A4A68", fontWeight: 500 }}>
                  <span aria-hidden="true">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — Dashboard Mock */}
          <div style={{ backgroundColor: "#F9F8F6", border: "2px solid #EEECE8", borderRadius: "16px", overflow: "hidden" }} role="img" aria-label="Dashboard preview showing mood tracking and statistics">
            {/* Dashboard header */}
            <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #EEECE8", padding: "16px 20px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span aria-hidden="true">📊</span>
              <span style={{ fontWeight: "bold", color: "#1A1A2E" }}>{t("dashboardTitle")}</span>
            </div>

            <div style={{ padding: "20px" }}>
              <p style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 4px 0" }}>{t("dashboardGreeting")}</p>
              <p style={{ fontSize: "14px", color: "#7A7A96", margin: "0 0 20px 0" }}>{t("dashboardDay")}</p>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "20px" }}>
                {[
                  { value: t("stat1Value"), label: t("stat1Label"), bg: "#E8F5F2", color: "#0B7B6F" },
                  { value: t("stat2Value"), label: t("stat2Label"), bg: "#E8F0FA", color: "#1A1A2E" },
                  { value: t("stat3Value"), label: t("stat3Label"), bg: "#FBF3E3", color: "#9E6D1B" },
                ].map(({ value, label, bg, color }) => (
                  <div key={label} style={{ backgroundColor: bg, borderRadius: "10px", padding: "12px 8px", textAlign: "center" }}>
                    <div style={{ fontWeight: "bold", fontSize: "20px", color }}>{value}</div>
                    <div style={{ fontSize: "11px", color: "#7A7A96", marginTop: "4px" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <p style={{ fontSize: "13px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 10px 0" }}>{t("chartTitle")}</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "60px", marginBottom: "10px" }} role="presentation">
                {moodData.map((val, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${(val / 10) * 100}%`,
                      backgroundColor: getBarColor(val),
                      borderRadius: "2px 2px 0 0",
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: "flex", gap: "16px" }}>
                {[
                  { color: "#0B7B6F", label: t("legendGood") },
                  { color: "#9E6D1B", label: t("legendOkay") },
                  { color: "#7A7A96", label: t("legendHard") },
                ].map(({ color, label }) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#7A7A96" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "2px", backgroundColor: color, display: "inline-block" }} aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
