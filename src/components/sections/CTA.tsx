import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function CTA() {
  const t = useTranslations("cta");

  return (
    <section id="cta" style={{ padding: "56px 16px", backgroundColor: "#FFFFFF" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "#E8F5F2", borderRadius: "16px", padding: "60px 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "32px", fontWeight: "bold", color: "#1A1A2E", margin: "0 0 12px 0" }}>
            {t("sectionTitle")}
          </h2>
          <p style={{ color: "#4A4A68", maxWidth: "55ch", margin: "0 auto 32px auto", lineHeight: 1.7 }}>
            {t("sectionDesc")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <Button href="#" variant="primary" size="large">
              <span aria-hidden="true">✓</span> {t("ctaPrimary")}
            </Button>
            <Button href="#" variant="outline" size="large">
              {t("ctaDoctor")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
