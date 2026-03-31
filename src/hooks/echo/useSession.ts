"use client";

import { useContext } from "react";
import { SessionContext } from "@/context/echo/SessionContext";
import type { SessionContextValue } from "@/context/echo/SessionContext";

/**
 * Access the active ECHO session context.
 * Must be used inside <SessionProvider>.
 */
export function useSession(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return ctx;
}
