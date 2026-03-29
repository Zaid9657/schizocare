import { useTranslations } from "next-intl";

export function CrisisBanner() {
  const t = useTranslations("crisis");

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{ backgroundColor: "#FDECEC", borderBottom: "1px solid rgba(192,48,48,0.2)", padding: "12px 16px", textAlign: "center" }}
    >
      <p style={{ color: "#C03030", fontWeight: "bold", fontSize: "15px", margin: 0 }}>
        {t("text")}{" "}
        <a
          href="tel:988"
          style={{ color: "#C03030", textDecoration: "underline" }}
        >
          {t("us")}
        </a>{" "}
        {t("de")}{" "}
        <a
          href="tel:08001110111"
          style={{ color: "#C03030", textDecoration: "underline" }}
        >
          0800 111 0 111
        </a>
      </p>
    </div>
  );
}
