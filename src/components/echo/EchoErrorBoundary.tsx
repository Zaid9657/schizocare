"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
  children:     ReactNode;
  locale?:      string;
  groundingHref?: string;
  homeHref?:    string;
}

interface State {
  hasError: boolean;
  error:    Error | null;
}

const EN = {
  title:      "Something went wrong",
  message:    "An unexpected error occurred. This has been noted.",
  grounding:  "🌿 Go to grounding",
  home:       "← Return to SchizoCare",
  retry:      "Try again",
};
const DE = {
  title:      "Etwas ist schiefgelaufen",
  message:    "Ein unerwarteter Fehler ist aufgetreten. Dies wurde notiert.",
  grounding:  "🌿 Zur Erdung",
  home:       "← Zurück zu SchizoCare",
  retry:      "Erneut versuchen",
};

export default class EchoErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error("[ECHO Error Boundary]", error, info.componentStack);
    // Sentry-ready:
    // if (typeof Sentry !== "undefined") Sentry.captureException(error, { extra: info });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const locale      = this.props.locale ?? "en";
    const t           = locale === "de" ? DE : EN;
    const groundHref  = this.props.groundingHref ?? `/${locale}/echo/grounding`;
    const homeHref    = this.props.homeHref      ?? `/${locale}`;

    return (
      <div
        style={{
          maxWidth:        "480px",
          margin:          "40px auto",
          padding:         "32px 28px",
          backgroundColor: "#FFFFFF",
          border:          "2px solid #EEECE8",
          borderRadius:    "16px",
          textAlign:       "center",
        }}
        role="alert"
        aria-live="assertive"
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }} aria-hidden="true">⚠️</div>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontSize:   "22px",
            fontWeight: "bold",
            color:      "#1A1A2E",
            margin:     "0 0 10px 0",
          }}
        >
          {t.title}
        </h2>

        <p style={{ color: "#4A4A68", fontSize: "15px", lineHeight: 1.7, margin: "0 0 28px 0" }}>
          {t.message}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
          <a
            href={groundHref}
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              justifyContent:  "center",
              padding:         "13px 28px",
              backgroundColor: "#0B7B6F",
              color:           "#FFFFFF",
              borderRadius:    "10px",
              textDecoration:  "none",
              fontWeight:      "bold",
              fontSize:        "15px",
              minHeight:       "50px",
              width:           "100%",
              maxWidth:        "280px",
            }}
          >
            {t.grounding}
          </a>

          <button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              padding:         "11px 24px",
              backgroundColor: "#F3F1ED",
              color:           "#4A4A68",
              border:          "1px solid #E0DDD7",
              borderRadius:    "10px",
              cursor:          "pointer",
              fontSize:        "14px",
              fontFamily:      "inherit",
              minHeight:       "48px",
              width:           "100%",
              maxWidth:        "280px",
            }}
          >
            {t.retry}
          </button>

          <a
            href={homeHref}
            style={{ color: "#7A7A96", fontSize: "13px", textDecoration: "underline" }}
          >
            {t.home}
          </a>
        </div>
      </div>
    );
  }
}
