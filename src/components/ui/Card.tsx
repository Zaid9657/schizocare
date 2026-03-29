import { ReactNode, CSSProperties } from "react";

interface CardProps {
  icon?: string;
  iconBg?: string;
  title: string;
  description: string;
  tag?: string;
  children?: ReactNode;
  className?: string;
}

export function Card({ icon, iconBg, title, description, tag, className }: CardProps) {
  const cardStyle: CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "2px solid #EEECE8",
    borderRadius: "12px",
    padding: "24px",
    transition: "border-color 0.15s",
  };

  return (
    <div
      style={cardStyle}
      className={className}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#E0DDD7"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#EEECE8"; }}
    >
      {icon && (
        <div
          style={{
            width: "48px",
            height: "48px",
            backgroundColor: iconBg || "#E8F5F2",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            marginBottom: "16px",
          }}
          aria-hidden="true"
        >
          {icon}
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px", marginBottom: "8px" }}>
        <h3 style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "18px", lineHeight: 1.3, margin: 0 }}>{title}</h3>
        {tag && (
          <span style={{ flexShrink: 0, fontSize: "12px", fontWeight: "bold", backgroundColor: "#E8F5F2", color: "#0B7B6F", padding: "4px 10px", borderRadius: "9999px" }}>
            {tag}
          </span>
        )}
      </div>
      <p style={{ color: "#4A4A68", lineHeight: 1.7, margin: 0 }}>{description}</p>
    </div>
  );
}
