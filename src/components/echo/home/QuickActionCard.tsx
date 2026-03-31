"use client";

import Link from "next/link";

interface QuickActionCardProps {
  icon:    string;
  label:   string;
  href:    string;
  badge?:  string;
  color?:  string;
}

export default function QuickActionCard({
  icon,
  label,
  href,
  badge,
  color = "#0B7B6F",
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      style={{
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "center",
        justifyContent:  "center",
        gap:             "8px",
        padding:         "20px 12px",
        backgroundColor: "#FFFFFF",
        border:          "2px solid #EEECE8",
        borderRadius:    "14px",
        textDecoration:  "none",
        minHeight:       "96px",
        position:        "relative",
        textAlign:       "center",
        transition:      "border-color 0.12s ease, background-color 0.12s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = `${color}60`;
        el.style.backgroundColor = `${color}08`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.borderColor = "#EEECE8";
        el.style.backgroundColor = "#FFFFFF";
      }}
    >
      {badge && (
        <span
          style={{
            position:        "absolute",
            top:             "8px",
            right:           "8px",
            backgroundColor: color,
            color:           "#FFFFFF",
            fontSize:        "10px",
            fontWeight:      "bold",
            padding:         "2px 6px",
            borderRadius:    "8px",
            textTransform:   "uppercase",
            letterSpacing:   "0.05em",
          }}
        >
          {badge}
        </span>
      )}
      <span style={{ fontSize: "28px", lineHeight: 1 }} aria-hidden="true">{icon}</span>
      <span style={{ fontSize: "13px", fontWeight: "bold", color: "#1A1A2E", lineHeight: 1.3 }}>{label}</span>
    </Link>
  );
}
