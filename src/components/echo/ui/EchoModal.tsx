"use client";

import {
  useEffect,
  useRef,
  useCallback,
  ReactNode,
  KeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

interface EchoModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  /** Dismiss when clicking the backdrop. Default true. */
  closeOnBackdrop?: boolean;
  /** Dismiss on Escape key. Default true. */
  closeOnEscape?: boolean;
  /** Max width of the dialog panel in px. Default 480. */
  maxWidth?: number;
  /** aria-label override when title is not provided */
  ariaLabel?: string;
}

const FOCUSABLE =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), button:not([disabled]), iframe, object, embed, ' +
  '[tabindex]:not([tabindex="-1"]), [contenteditable]';

export default function EchoModal({
  open,
  onClose,
  title,
  description,
  children,
  closeOnBackdrop = true,
  closeOnEscape = true,
  maxWidth = 480,
  ariaLabel,
}: EchoModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<Element | null>(null);

  // ── Focus trap ────────────────────────────────────────────────────────────

  const getFocusable = useCallback((): HTMLElement[] => {
    if (!panelRef.current) return [];
    return Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
    );
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape" && closeOnEscape) {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusable = getFocusable();
        if (focusable.length === 0) { e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [closeOnEscape, getFocusable, onClose]
  );

  // ── Open/close effects ────────────────────────────────────────────────────

  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      // Focus first focusable element after paint
      requestAnimationFrame(() => {
        const focusable = getFocusable();
        if (focusable.length > 0) focusable[0].focus();
        else panelRef.current?.focus();
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      if (previousFocusRef.current instanceof HTMLElement) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, getFocusable]);

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <style>{`
        @keyframes echo-modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes echo-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echo-modal-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes echo-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          backgroundColor: "rgba(26, 26, 46, 0.55)",
          backdropFilter: "blur(2px)",
          animation: "echo-backdrop-in 0.15s ease forwards",
        }}
      />

      {/* Scroll container */}
      <div
        role="presentation"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 201,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          overflowY: "auto",
        }}
        onClick={(e) => {
          if (closeOnBackdrop && e.target === e.currentTarget) onClose();
        }}
      >
        {/* Dialog panel */}
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel ?? title}
          aria-describedby={description ? "echo-modal-desc" : undefined}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          style={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            boxShadow: "0 8px 40px rgba(26, 26, 46, 0.18)",
            width: "100%",
            maxWidth: maxWidth,
            animation: "echo-modal-in 0.18s ease forwards",
            outline: "none",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid #E0DDD7",
              backgroundColor: "#F3F1ED",
              color: "#4A4A68",
              fontSize: "18px",
              lineHeight: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            ×
          </button>

          {/* Header */}
          {title && (
            <div
              style={{
                padding: "24px 52px 0 24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-fraunces), Georgia, serif",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#1A1A2E",
                  margin: 0,
                }}
              >
                {title}
              </h2>
              {description && (
                <p
                  id="echo-modal-desc"
                  style={{
                    fontSize: "14px",
                    color: "#7A7A96",
                    margin: "6px 0 0 0",
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Body */}
          <div style={{ padding: "20px 24px 24px" }}>
            {children}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
