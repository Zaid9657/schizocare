// ─────────────────────────────────────────────────────────────────────────────
// ECHO Feature Flags
// Uses NEXT_PUBLIC_* env vars so values are inlined at build time.
// ─────────────────────────────────────────────────────────────────────────────

/** True when the ECHO feature is enabled. Defaults to true in development. */
export function isEchoEnabled(): boolean {
  const env = process.env.NEXT_PUBLIC_ECHO_ENABLED;
  if (env === undefined || env === "") {
    // Default: enabled in development, disabled in production until explicitly set
    return process.env.NODE_ENV === "development";
  }
  return env === "true" || env === "1";
}

/** True when the community feed feature is enabled (Phase 2). */
export function isEchoCommunityEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ECHO_COMMUNITY_ENABLED === "true";
}
