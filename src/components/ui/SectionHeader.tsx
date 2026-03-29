interface SectionHeaderProps {
  icon?: string;
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  icon,
  label,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div style={{ maxWidth: "600px", textAlign: centered ? "center" : "left", margin: centered ? "0 auto" : "0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", justifyContent: centered ? "center" : "flex-start" }}>
        {icon && <span aria-hidden="true">{icon}</span>}
        <span style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0B7B6F" }}>
          {label}
        </span>
      </div>
      <h2 style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: "30px", fontWeight: "bold", color: "#1A1A2E", lineHeight: 1.2, margin: "0 0 12px 0" }}>
        {title}
      </h2>
      {description && (
        <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0 }}>{description}</p>
      )}
    </div>
  );
}
