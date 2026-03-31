"use client";

import { useState } from "react";
import { getCrisisResources } from "@/lib/echo/safety/crisis-resources";

const EN = {
  title:    "Support Resources",
  notAlone: "You're not alone. Help is available 24/7.",
  copy:     "Copy number",
  copied:   "Copied!",
  hours:    "Hours",
  visit:    "Visit website →",
};
const DE = {
  title:    "Unterstützungsressourcen",
  notAlone: "Du bist nicht allein. Hilfe ist rund um die Uhr verfügbar.",
  copy:     "Nummer kopieren",
  copied:   "Kopiert!",
  hours:    "Zeiten",
  visit:    "Website besuchen →",
};

interface CrisisResourcesProps {
  locale: string;
}

export default function CrisisResources({ locale }: CrisisResourcesProps) {
  const t         = locale === "de" ? DE : EN;
  const resources = getCrisisResources(locale);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function handleCopy(id: string, phone: string) {
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      // Fallback: select text manually on old browsers
    });
  }

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-fraunces), Georgia, serif",
          fontSize:   "24px",
          fontWeight: "bold",
          color:      "#1A1A2E",
          margin:     "0 0 8px 0",
        }}
      >
        {t.title}
      </h2>

      {/* Reassuring message */}
      <div
        style={{
          backgroundColor: "#E8F5EF",
          border:          "2px solid #2E7D50",
          borderRadius:    "10px",
          padding:         "14px 18px",
          marginBottom:    "20px",
          fontSize:        "16px",
          fontWeight:      "600",
          color:           "#1A4A2E",
          display:         "flex",
          alignItems:      "center",
          gap:             "10px",
        }}
        role="status"
      >
        <span aria-hidden="true" style={{ fontSize: "20px" }}>💚</span>
        {t.notAlone}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {resources.map((resource) => {
          const desc = locale === "de" ? resource.descDe : resource.descEn;
          return (
            <div
              key={resource.id}
              style={{
                backgroundColor: "#FFFFFF",
                border:          "2px solid #EEECE8",
                borderRadius:    "12px",
                padding:         "16px 18px",
              }}
            >
              <div style={{ fontWeight: "bold", color: "#1A1A2E", fontSize: "16px", marginBottom: "4px" }}>
                {resource.name}
              </div>
              <div style={{ fontSize: "14px", color: "#4A4A68", lineHeight: 1.5, marginBottom: "8px" }}>
                {desc}
              </div>

              {resource.phone && (
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                  <a
                    href={`tel:${resource.phone.replace(/\s/g, "")}`}
                    style={{
                      display:         "inline-flex",
                      alignItems:      "center",
                      gap:             "6px",
                      padding:         "8px 16px",
                      backgroundColor: "#C03030",
                      color:           "#FFFFFF",
                      borderRadius:    "8px",
                      textDecoration:  "none",
                      fontWeight:      "bold",
                      fontSize:        "15px",
                      minHeight:       "40px",
                    }}
                  >
                    📞 {resource.phone}
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(resource.id, resource.phone)}
                    style={{
                      padding:         "8px 14px",
                      backgroundColor: copiedId === resource.id ? "#E8F5EF" : "#F3F1ED",
                      color:           copiedId === resource.id ? "#2E7D50" : "#4A4A68",
                      border:          `1px solid ${copiedId === resource.id ? "#2E7D50" : "#E0DDD7"}`,
                      borderRadius:    "8px",
                      fontSize:        "13px",
                      cursor:          "pointer",
                      minHeight:       "40px",
                      fontFamily:      "inherit",
                    }}
                  >
                    {copiedId === resource.id ? `✓ ${t.copied}` : t.copy}
                  </button>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "13px", color: "#7A7A96" }}>
                  🕐 {t.hours}: {resource.hours}
                </span>
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "13px", color: "#0B7B6F", fontWeight: "500" }}
                  >
                    {t.visit}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
