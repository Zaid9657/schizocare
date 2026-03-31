// ─────────────────────────────────────────────────────────────────────────────
// ECHO Analytics — stub implementation
// In development: logs to console. In production: no-op until connected.
// Ready to wire up to Plausible / PostHog / Umami by swapping the body of
// trackEvent().
// ─────────────────────────────────────────────────────────────────────────────

export type EchoAnalyticsEvent =
  | "ECHO_ONBOARDING_STARTED"
  | "ECHO_ONBOARDING_COMPLETED"
  | "ECHO_AVATAR_CREATED"
  | "ECHO_SESSION_STARTED"
  | "ECHO_SESSION_COMPLETED"
  | "ECHO_STRESS_BUTTON_USED"
  | "ECHO_GROUNDING_ACCESSED"
  | "ECHO_CRISIS_RESOURCES_VIEWED";

/**
 * Track an analytics event.
 *
 * @example
 * trackEvent("ECHO_SESSION_STARTED", { locale: "en", avatarPersonality: "critical" });
 */
export function trackEvent(
  name: EchoAnalyticsEvent,
  properties?: Record<string, unknown>
): void {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log("[ECHO Analytics]", name, properties ?? {});
  }
  // Production: connect to your analytics provider here.
  // Example (Plausible):
  //   if (typeof window !== "undefined" && window.plausible) {
  //     window.plausible(name, { props: properties });
  //   }
}
