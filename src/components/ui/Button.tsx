"use client";

import Link from "next/link";
import { ReactNode, CSSProperties } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
  size?: "default" | "large";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "default",
  href,
  onClick,
  className,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "700",
    borderRadius: "8px",
    transition: "background-color 0.15s, color 0.15s, border-color 0.15s",
    cursor: "pointer",
    textDecoration: "none",
    border: "2px solid transparent",
    fontFamily: "inherit",
    lineHeight: 1.2,
    minHeight: size === "large" ? "56px" : "48px",
    padding: size === "large" ? "14px 28px" : "10px 20px",
    fontSize: size === "large" ? "18px" : "16px",
  };

  const primaryStyle: CSSProperties = {
    ...base,
    backgroundColor: "#0B7B6F",
    color: "#FFFFFF",
    borderColor: "#0B7B6F",
  };

  const outlineStyle: CSSProperties = {
    ...base,
    backgroundColor: "transparent",
    color: "#0B7B6F",
    borderColor: "#0B7B6F",
  };

  const style = variant === "primary" ? primaryStyle : outlineStyle;

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#096B60";
    } else {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#E8F5F2";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === "primary") {
      (e.currentTarget as HTMLElement).style.backgroundColor = "#0B7B6F";
    } else {
      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
    }
  };

  if (href) {
    return (
      <Link
        href={href}
        style={style}
        className={className}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={className}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
