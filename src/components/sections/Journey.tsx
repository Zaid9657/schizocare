import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STEPS = [
  { key: "step1", icon: "🌅", num: 1 },
  { key: "step2", icon: "🛠️", num: 2 },
  { key: "step3", icon: "🌿", num: 3 },
  { key: "step4", icon: "🌟", num: 4 },
];

export function Journey() {
  const t = useTranslations("journey");

  return (
    <section id="journey" style={{ padding: "56px 16px", backgroundColor: "#FFFFFF" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader
            icon="🌿"
            label={t("sectionLabel")}
            title={t("sectionTitle")}
            description={t("sectionDesc")}
            centered
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }} className="journey-grid">
          {STEPS.map(({ key, icon, num }) => (
            <div key={key} style={{ backgroundColor: "#FFFFFF", border: "2px solid #EEECE8", borderRadius: "12px", padding: "24px", textAlign: "center" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }} aria-hidden="true">{icon}</div>
              <div style={{ fontSize: "11px", fontWeight: "bold", color: "#7A7A96", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                Step {num}
              </div>
              <h3 style={{ fontWeight: "bold", color: "#1A1A2E", margin: "0 0 8px 0" }}>
                {t(`${key}Title` as Parameters<typeof t>[0])}
              </h3>
              <p style={{ color: "#4A4A68", fontSize: "15px", lineHeight: 1.6, margin: 0 }}>
                {t(`${key}Desc` as Parameters<typeof t>[0])}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .journey-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 500px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
