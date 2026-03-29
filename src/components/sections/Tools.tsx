"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const TOOLS = [
  { key: "tool1", icon: "📊", iconBg: "#E8F0FA" },
  { key: "tool2", icon: "💊", iconBg: "#E8F5F2" },
  { key: "tool3", icon: "🧠", iconBg: "#FBF3E3" },
  { key: "tool4", icon: "💬", iconBg: "#E8F5EC" },
  { key: "tool5", icon: "🚨", iconBg: "#FDECEC" },
  { key: "tool6", icon: "🔗", iconBg: "#F0EBF8" },
];

export function Tools() {
  const t = useTranslations("tools");

  return (
    <section id="tools" style={{ padding: "56px 16px", backgroundColor: "#F9F8F6" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px" }}>
          <SectionHeader
            icon="🛠️"
            label={t("sectionLabel")}
            title={t("sectionTitle")}
            description={t("sectionDesc")}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="tools-grid">
          {TOOLS.map(({ key, icon, iconBg }) => (
            <Card
              key={key}
              icon={icon}
              iconBg={iconBg}
              title={t(`${key}Title` as Parameters<typeof t>[0])}
              description={t(`${key}Desc` as Parameters<typeof t>[0])}
              tag={t("tagFree")}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .tools-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
