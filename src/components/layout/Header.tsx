"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export function Header() {
  const t = useTranslations("nav");
  const params = useParams();
  const locale = params.locale as string;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/schizophrenia`, label: t("learn"),      icon: "📖", badge: null  },
    { href: `/${locale}#tools`,         label: t("tools"),      icon: "🛠️", badge: null  },
    { href: `/${locale}#therapies`,     label: t("therapies"),  icon: "🧠", badge: null  },
    { href: `/${locale}#doctors`,       label: t("doctors"),    icon: "👨‍⚕️", badge: null  },
    { href: `/${locale}#community`,     label: t("community"),  icon: "💬", badge: null  },
    { href: `/${locale}/echo`,          label: "ECHO",          icon: "🎭", badge: "NEW" },
  ];

  const otherLocale = locale === "en" ? "de" : "en";

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0DDD7" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", height: "64px", gap: "16px" }}>
        {/* Logo */}
        <Link href={`/${locale}`} style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0, textDecoration: "none" }}>
          <div style={{ width: "42px", height: "42px", backgroundColor: "#0B7B6F", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold", fontSize: "14px" }} aria-hidden="true">
            SC
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontWeight: "bold", color: "#1A1A2E", lineHeight: 1 }}>SchizoCare</div>
            <div style={{ fontSize: "11px", color: "#7A7A96", lineHeight: 1, marginTop: "2px" }}>{t("subtitle")}</div>
          </div>
        </Link>

        {/* Desktop Nav — hidden on mobile */}
        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1, justifyContent: "center" }} className="hidden-mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "0 12px", minHeight: "48px", borderRadius: "8px", color: "#4A4A68", textDecoration: "none", fontSize: "15px", fontWeight: 500, transition: "background-color 0.15s, color 0.15s", whiteSpace: "nowrap", position: "relative" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#F3F1ED"; (e.currentTarget as HTMLElement).style.color = "#1A1A2E"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ""; (e.currentTarget as HTMLElement).style.color = "#4A4A68"; }}
            >
              <span aria-hidden="true">{link.icon}</span>
              {link.label}
              {link.badge && (
                <span style={{ backgroundColor: "#6B3FA0", color: "#FFFFFF", fontSize: "9px", fontWeight: "bold", padding: "1px 5px", borderRadius: "6px", letterSpacing: "0.04em", marginLeft: "2px", verticalAlign: "middle" }}>
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0, marginLeft: "auto" }}>
          {/* Language toggle */}
          <div style={{ display: "flex" }} role="group" aria-label={t("language")}>
            <Link
              href="/en"
              style={{
                minHeight: "48px", padding: "0 12px", display: "flex", alignItems: "center",
                fontSize: "13px", fontWeight: "bold", borderRadius: "8px 0 0 8px",
                border: "1px solid #E0DDD7",
                backgroundColor: locale === "en" ? "#0B7B6F" : "#FFFFFF",
                color: locale === "en" ? "#FFFFFF" : "#4A4A68",
                textDecoration: "none",
                transition: "background-color 0.15s",
              }}
              aria-current={locale === "en" ? "true" : undefined}
            >
              EN
            </Link>
            <Link
              href="/de"
              style={{
                minHeight: "48px", padding: "0 12px", display: "flex", alignItems: "center",
                fontSize: "13px", fontWeight: "bold", borderRadius: "0 8px 8px 0",
                border: "1px solid #E0DDD7", borderLeft: "none",
                backgroundColor: locale === "de" ? "#0B7B6F" : "#FFFFFF",
                color: locale === "de" ? "#FFFFFF" : "#4A4A68",
                textDecoration: "none",
                transition: "background-color 0.15s",
              }}
              aria-current={locale === "de" ? "true" : undefined}
            >
              DE
            </Link>
          </div>

          {/* Get Started button */}
          <Link
            href={`/${locale}#cta`}
            style={{
              alignItems: "center", minHeight: "48px", padding: "0 16px",
              backgroundColor: "#0B7B6F", color: "white", fontWeight: "bold",
              borderRadius: "8px", textDecoration: "none", fontSize: "14px",
              transition: "background-color 0.15s",
            }}
            className="get-started-desktop"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#096B60"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = "#0B7B6F"; }}
          >
            {t("getStarted")}
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            style={{ width: "48px", height: "48px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}
            className="mobile-hamburger"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid #E0DDD7", padding: "12px 16px" }} className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 12px", minHeight: "48px", borderRadius: "8px", color: "#4A4A68", textDecoration: "none", fontWeight: 500 }}
                onClick={() => setMenuOpen(false)}
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
                {link.badge && (
                  <span style={{ backgroundColor: "#6B3FA0", color: "#FFFFFF", fontSize: "9px", fontWeight: "bold", padding: "1px 5px", borderRadius: "6px", letterSpacing: "0.04em", marginLeft: "auto" }}>
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <Link
              href={`/${locale}#cta`}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "48px", padding: "0 16px", marginTop: "8px", backgroundColor: "#0B7B6F", color: "white", fontWeight: "bold", borderRadius: "8px", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {t("getStarted")}
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile-nav { display: flex !important; }
          .mobile-hamburger { display: none !important; }
          .mobile-menu { display: none; }
          .get-started-desktop { display: flex !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile-nav { display: none !important; }
          .get-started-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}
