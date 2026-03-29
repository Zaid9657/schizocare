"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui/SectionHeader";

const THERAPIES = [
  { key: "therapy1", badge: "badgeNew", badgeColor: "#6B3FA0", badgeBg: "#F0EBF8", tags: ["therapy1Tag1", "therapy1Tag2", "therapy1Tag3"] },
  { key: "therapy2", badge: "badgeNew", badgeColor: "#6B3FA0", badgeBg: "#F0EBF8", tags: ["therapy2Tag1", "therapy2Tag2", "therapy2Tag3"] },
  { key: "therapy3", badge: "badgeProven", badgeColor: "#2E7D50", badgeBg: "#E8F5EC", tags: ["therapy3Tag1", "therapy3Tag2", "therapy3Tag3"] },
  { key: "therapy4", badge: "badgeNew", badgeColor: "#6B3FA0", badgeBg: "#F0EBF8", tags: ["therapy4Tag1", "therapy4Tag2", "therapy4Tag3"] },
];

export function Therapies() {
  const t = useTranslations("therapies");

  return (
    <section id="therapies" style={{ padding: "56px 16px", backgroundColor: "#F3F1ED" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader
            icon="🧠"
            label={t("sectionLabel")}
            title={t("sectionTitle")}
            description={t("sectionDesc")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "720px" }}>
          {THERAPIES.map(({ key, badge, badgeColor, badgeBg, tags }) => (
            <div key={key} style={{ backgroundColor: "#FFFFFF", border: "2px solid #EEECE8", borderRadius: "12px", padding: "24px" }}>
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "12px", fontWeight: "bold", padding: "4px 12px", borderRadius: "9999px", color: badgeColor, backgroundColor: badgeBg }}>
                  {t(badge as Parameters<typeof t>[0])}
                </span>
              </div>
              <h3 style={{ fontWeight: "bold", fontSize: "18px", color: "#1A1A2E", margin: "0 0 8px 0" }}>
                {t(`${key}Title` as Parameters<typeof t>[0])}
              </h3>
              <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: "0 0 16px 0" }}>
                {t(`${key}Desc` as Parameters<typeof t>[0])}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {tags.map((tagKey) => (
                  <span key={tagKey} style={{ fontSize: "13px", fontWeight: 500, backgroundColor: "#F3F1ED", color: "#4A4A68", padding: "4px 12px", borderRadius: "9999px" }}>
                    {t(tagKey as Parameters<typeof t>[0])}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
