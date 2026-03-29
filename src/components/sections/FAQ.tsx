"use client";

import { useTranslations } from "next-intl";
import * as Accordion from "@radix-ui/react-accordion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FaqItem } from "@/components/ui/FaqItem";

export function FAQ() {
  const t = useTranslations("faq");

  const items = [
    { q: t("q1"), a: t("a1"), value: "item-1" },
    { q: t("q2"), a: t("a2"), value: "item-2" },
    { q: t("q3"), a: t("a3"), value: "item-3" },
    { q: t("q4"), a: t("a4"), value: "item-4" },
  ];

  return (
    <section id="faq" style={{ padding: "56px 16px", backgroundColor: "#F9F8F6" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <SectionHeader
            icon="❓"
            label={t("sectionLabel")}
            title={t("sectionTitle")}
          />
        </div>

        <p style={{ color: "#4A4A68", marginBottom: "24px", fontWeight: 500 }}>{t("instruction")}</p>

        <div style={{ maxWidth: "720px", backgroundColor: "#FFFFFF", borderRadius: "12px", border: "2px solid #EEECE8", padding: "8px" }}>
          <Accordion.Root type="single" collapsible>
            {items.map((item) => (
              <FaqItem
                key={item.value}
                question={item.q}
                answer={item.a}
                value={item.value}
              />
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
