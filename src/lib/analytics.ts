// Analytics utilities for Plausible Analytics

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, unknown> }
    ) => void;
  }
}

/**
 * Track a custom event with Plausible Analytics
 * @param eventName - Name of the event to track
 * @param props - Optional properties to attach to the event
 */
export function trackEvent(
  eventName: string,
  props?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.plausible) {
    window.plausible(eventName, { props });
  }

  // Log to console in development mode
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] Event:", eventName, props || {});
  }
}

/**
 * Track a pageview (Plausible handles this automatically, but useful for SPA navigation)
 * @param url - URL of the pageview
 */
export function trackPageview(url: string) {
  // Plausible automatically tracks pageviews, but we can log for development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics] Pageview:", url);
  }
}
