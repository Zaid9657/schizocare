"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon:  string;
  labelEn: string;
  labelDe: string;
  href:  string;
  matchSegment: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "🏠", labelEn: "Home",      labelDe: "Start",     href: "",           matchSegment: "" },
  { icon: "🧘", labelEn: "Ground",    labelDe: "Erdung",    href: "/grounding", matchSegment: "/grounding" },
  { icon: "💬", labelEn: "Community", labelDe: "Community", href: "#",          matchSegment: "/community" },
  { icon: "📊", labelEn: "Journey",   labelDe: "Reise",     href: "#",          matchSegment: "/progress" },
];

interface BottomNavProps {
  locale: string;
}

export default function BottomNav({ locale }: BottomNavProps) {
  const pathname  = usePathname();
  const echoBase  = `/${locale}/echo`;

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .echo-bottom-nav { display: none !important; }
        }
      `}</style>
      <nav
        className="echo-bottom-nav"
        aria-label={locale === "de" ? "Navigation" : "Navigation"}
        style={{
          position:        "fixed",
          bottom:          0,
          left:            0,
          right:           0,
          zIndex:          60,
          backgroundColor: "#FFFFFF",
          borderTop:       "1px solid #E0DDD7",
          display:         "flex",
          alignItems:      "center",
          height:          "64px",
          paddingBottom:   "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {NAV_ITEMS.map((item) => {
          const href   = item.href === "#" ? "#" : `${echoBase}${item.href}`;
          const active = item.matchSegment === ""
            ? pathname === echoBase || pathname === `${echoBase}/`
            : pathname.startsWith(`${echoBase}${item.matchSegment}`);
          const label  = locale === "de" ? item.labelDe : item.labelEn;

          return (
            <Link
              key={item.labelEn}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              style={{
                flex:           1,
                display:        "flex",
                flexDirection:  "column",
                alignItems:     "center",
                justifyContent: "center",
                gap:            "3px",
                minHeight:      "48px",
                textDecoration: "none",
                color:          active ? "#0B7B6F" : "#9A9AB0",
              }}
            >
              <span style={{ fontSize: "22px", lineHeight: 1 }} aria-hidden="true">{item.icon}</span>
              <span
                style={{
                  fontSize:   "10px",
                  fontWeight: active ? "bold" : "500",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
              {active && (
                <div
                  aria-hidden="true"
                  style={{
                    position:        "absolute",
                    bottom:          0,
                    width:           "24px",
                    height:          "3px",
                    backgroundColor: "#0B7B6F",
                    borderRadius:    "2px 2px 0 0",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
      {/* Spacer so content isn't hidden behind the nav bar */}
      <div className="echo-bottom-nav" style={{ height: "64px" }} aria-hidden="true" />
    </>
  );
}
