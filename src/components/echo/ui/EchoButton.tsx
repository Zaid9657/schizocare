"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";

export type EchoButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type EchoButtonSize = "sm" | "md" | "lg";

interface EchoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: EchoButtonVariant;
  size?: EchoButtonSize;
  loading?: boolean;
  /** Fills the container width */
  fullWidth?: boolean;
}

const VARIANT_STYLES: Record<EchoButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: "#0B7B6F",
    color: "#FFFFFF",
    border: "2px solid transparent",
  },
  secondary: {
    backgroundColor: "#FFFFFF",
    color: "#0B7B6F",
    border: "2px solid #0B7B6F",
  },
  danger: {
    backgroundColor: "#C03030",
    color: "#FFFFFF",
    border: "2px solid transparent",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "#4A4A68",
    border: "2px solid #E0DDD7",
  },
};

const VARIANT_HOVER: Record<EchoButtonVariant, React.CSSProperties> = {
  primary:   { backgroundColor: "#095F55" },
  secondary: { backgroundColor: "#E8F5F2" },
  danger:    { backgroundColor: "#A02020" },
  ghost:     { backgroundColor: "#F3F1ED" },
};

const SIZE_STYLES: Record<EchoButtonSize, React.CSSProperties> = {
  sm: { minHeight: "40px", padding: "0 14px", fontSize: "14px", borderRadius: "8px", gap: "6px" },
  md: { minHeight: "48px", padding: "0 20px", fontSize: "16px", borderRadius: "8px", gap: "8px" },
  lg: { minHeight: "56px", padding: "0 28px", fontSize: "18px", borderRadius: "8px", gap: "10px" },
};

function Spinner({ size }: { size: EchoButtonSize }) {
  const dim = size === "sm" ? 14 : size === "md" ? 16 : 20;
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: dim,
        height: dim,
        border: "2px solid currentColor",
        borderTopColor: "transparent",
        borderRadius: "50%",
        flexShrink: 0,
        animation: "echo-spin 0.7s linear infinite",
      }}
    />
  );
}

const EchoButton = forwardRef<HTMLButtonElement, EchoButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      disabled,
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <>
        <style>{`
          @keyframes echo-spin {
            to { transform: rotate(360deg); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes echo-spin { to { transform: none; } }
          }
        `}</style>
        <button
          ref={ref}
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={loading}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
            fontWeight: "bold",
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled && !loading ? 0.5 : 1,
            transition: "background-color 0.15s ease, opacity 0.15s ease",
            width: fullWidth ? "100%" : undefined,
            textDecoration: "none",
            flexShrink: 0,
            ...VARIANT_STYLES[variant],
            ...SIZE_STYLES[size],
            ...style,
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) {
              Object.assign(e.currentTarget.style, VARIANT_HOVER[variant]);
            }
            onMouseEnter?.(e);
          }}
          onMouseLeave={(e) => {
            if (!isDisabled) {
              Object.assign(e.currentTarget.style, VARIANT_STYLES[variant]);
            }
            onMouseLeave?.(e);
          }}
          {...rest}
        >
          {loading && <Spinner size={size} />}
          {children}
        </button>
      </>
    );
  }
);
EchoButton.displayName = "EchoButton";

export default EchoButton;
