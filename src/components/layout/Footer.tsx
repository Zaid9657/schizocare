"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer style={{ backgroundColor: "#F9F8F6", borderTop: "1px solid #E0DDD7" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "48px 16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px", marginBottom: "32px" }} className="footer-grid">
          {/* Brand + Crisis */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "40px", backgroundColor: "#0B7B6F", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "13px" }} aria-hidden="true">
                SC
              </div>
              <span style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "bold", color: "#1A1A2E" }}>SchizoCare</span>
            </div>
            <p style={{ color: "#4A4A68", fontSize: "14px", marginBottom: "16px" }}>{t("tagline")}</p>
            <div style={{ backgroundColor: "#FDECEC", borderRadius: "12px", padding: "16px" }}>
              <p style={{ fontWeight: "bold", color: "#C03030", fontSize: "14px", margin: "0 0 4px 0" }}>{t("crisisTitle")}</p>
              <p style={{ color: "#C03030", fontSize: "14px", margin: 0 }}>{t("crisisText")}</p>
            </div>
          </div>

          {/* For You */}
          <div>
            <h3 style={{ fontWeight: "bold", color: "#1A1A2E", marginBottom: "16px" }}>{t("forYouTitle")}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t("link1"), t("link2"), t("link3"), t("link4")].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: "#4A4A68", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", minHeight: "44px", fontSize: "15px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0B7B6F"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A4A68"; }}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h3 style={{ fontWeight: "bold", color: "#1A1A2E", marginBottom: "16px" }}>{t("forDoctorsTitle")}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t("link5"), t("link6"), t("link7")].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: "#4A4A68", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", minHeight: "44px", fontSize: "15px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0B7B6F"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A4A68"; }}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn More */}
          <div>
            <h3 style={{ fontWeight: "bold", color: "#1A1A2E", marginBottom: "16px" }}>{t("learnTitle")}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[t("link8"), t("link9"), t("link10")].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    style={{ color: "#4A4A68", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", minHeight: "44px", fontSize: "15px" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#0B7B6F"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#4A4A68"; }}
                  >{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: "24px", borderTop: "1px solid #E0DDD7", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <p style={{ color: "#7A7A96", fontSize: "14px", margin: 0 }}>© 2024 {t("copyright")}</p>
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { icon: "🔒", label: t("badgePrivate") },
              { icon: "👨‍⚕️", label: t("badgeDoctors") },
              { icon: "💚", label: t("badgeFree") },
            ].map(({ icon, label }) => (
              <span key={label} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", color: "#4A4A68", fontWeight: 500 }}>
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
