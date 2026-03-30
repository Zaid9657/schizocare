"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: string;
  variant: ToastVariant;
  message: string;
  /** ms before auto-dismiss. 0 = no auto-dismiss. Default: 4000 */
  duration?: number;
}

// ── Config ────────────────────────────────────────────────────────────────────

const VARIANT_CONFIG: Record<
  ToastVariant,
  { icon: string; bg: string; border: string; text: string }
> = {
  success: { icon: "✓",  bg: "#E8F5F2", border: "#0B7B6F", text: "#0B5C53" },
  error:   { icon: "✕",  bg: "#FDEAEA", border: "#C03030", text: "#8B1A1A" },
  info:    { icon: "ℹ",  bg: "#F0EBF8", border: "#6B3FA0", text: "#3F1A78" },
};

// ── Context ───────────────────────────────────────────────────────────────────

interface ToastContextValue {
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

// ── Individual Toast item ─────────────────────────────────────────────────────

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const cfg = VARIANT_CONFIG[toast.variant];
  const duration = toast.duration ?? 4000;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => onRemove(toast.id), duration);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [duration, toast.id, onRemove]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "14px 16px",
        backgroundColor: cfg.bg,
        border: `2px solid ${cfg.border}`,
        borderRadius: "12px",
        boxShadow: "0 4px 16px rgba(26,26,46,0.12)",
        animation: "echo-toast-in 0.2s ease forwards",
        maxWidth: "380px",
        width: "100%",
        pointerEvents: "auto",
      }}
    >
      <style>{`
        @keyframes echo-toast-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes echo-toast-in { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>

      {/* Icon */}
      <span
        aria-hidden="true"
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          backgroundColor: cfg.border,
          color: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
          flexShrink: 0,
          marginTop: "1px",
        }}
      >
        {cfg.icon}
      </span>

      {/* Message */}
      <span
        style={{
          flex: 1,
          fontSize: "15px",
          color: cfg.text,
          lineHeight: 1.5,
          fontFamily: "var(--font-atkinson), 'Atkinson Hyperlegible', sans-serif",
        }}
      >
        {toast.message}
      </span>

      {/* Dismiss */}
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          color: cfg.text,
          fontSize: "18px",
          cursor: "pointer",
          padding: "0",
          lineHeight: 1,
          flexShrink: 0,
          opacity: 0.6,
          minWidth: "24px",
          minHeight: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ×
      </button>
    </div>
  );
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {mounted &&
        createPortal(
          <div
            aria-label="Notifications"
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 300,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              pointerEvents: "none",
            }}
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

// ── Standalone (non-provider) usage ──────────────────────────────────────────
// For cases where ToastProvider isn't available, render inline.

interface StandaloneToastProps extends Omit<Toast, "id"> {
  onDismiss: () => void;
}

export function EchoToast({ variant, message, duration, onDismiss }: StandaloneToastProps) {
  return (
    <ToastItem
      toast={{ id: "standalone", variant, message, duration }}
      onRemove={onDismiss}
    />
  );
}
