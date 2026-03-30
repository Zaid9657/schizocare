"use client";

import { forwardRef, HTMLAttributes, ReactNode } from "react";

export type EchoCardVariant = "default" | "selectable" | "highlighted";

interface EchoCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: EchoCardVariant;
  selected?: boolean;
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  accentColor?: string;
}

const EchoCard = forwardRef<HTMLDivElement, EchoCardProps>(
  (
    {
      variant = "default",
      selected = false,
      icon,
      title,
      description,
      action,
      accentColor = "#0B7B6F",
      children,
      style,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref
  ) => {
    const isSelectable = variant === "selectable";
    const isHighlighted = variant === "highlighted";

    const borderColor = selected
      ? accentColor
      : isHighlighted
      ? `${accentColor}44`
      : "#EEECE8";

    const bgColor = selected
      ? `${accentColor}0D`
      : isHighlighted
      ? `${accentColor}07`
      : "#FFFFFF";

    return (
      <div
        ref={ref}
        role={isSelectable ? "button" : undefined}
        aria-pressed={isSelectable ? selected : undefined}
        tabIndex={isSelectable ? 0 : undefined}
        style={{
          backgroundColor: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: "12px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          cursor: isSelectable ? "pointer" : "default",
          transition: "border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease",
          outline: "none",
          ...style,
        }}
        onMouseEnter={(e) => {
          if (isSelectable && !selected) {
            e.currentTarget.style.borderColor = `${accentColor}88`;
            e.currentTarget.style.boxShadow = `0 2px 8px ${accentColor}1A`;
          }
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          if (isSelectable && !selected) {
            e.currentTarget.style.borderColor = "#EEECE8";
            e.currentTarget.style.boxShadow = "none";
          }
          onMouseLeave?.(e);
        }}
        onKeyDown={(e) => {
          if (isSelectable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            e.currentTarget.click();
          }
        }}
        {...rest}
      >
        {/* Icon + Title row */}
        {(icon || title) && (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            {icon && (
              <div
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: `${accentColor}18`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
                aria-hidden="true"
              >
                {icon}
              </div>
            )}
            {title && (
              <div
                style={{
                  fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
                  fontWeight: "bold",
                  fontSize: "17px",
                  color: "#1A1A2E",
                  lineHeight: 1.3,
                  flex: 1,
                  paddingTop: icon ? "8px" : "0",
                }}
              >
                {title}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: "15px",
              color: "#4A4A68",
              lineHeight: 1.7,
            }}
          >
            {description}
          </div>
        )}

        {/* Custom children */}
        {children}

        {/* Action slot */}
        {action && (
          <div style={{ marginTop: "4px" }}>
            {action}
          </div>
        )}

        {/* Selected indicator */}
        {isSelectable && selected && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: accentColor,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
            aria-hidden="true"
          >
            ✓
          </div>
        )}
      </div>
    );
  }
);
EchoCard.displayName = "EchoCard";

export default EchoCard;
