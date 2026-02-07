// Centralized configuration for ActBlue donation links
// Uses a public env var so it can be safely consumed in client components.

export const ACTBLUE_BASE_URL =
  process.env.NEXT_PUBLIC_ACTBLUE_URL || "#";

// Default donation amounts shown in the donate section and modal.
export const DONATION_AMOUNTS = [5, 10, 25, 50, 100, 250] as const;

/**
 * Build an ActBlue URL with an optional pre-filled amount.
 * Mirrors the behavior described in the MVP scope (Claire Valdez-style flow).
 */
export const buildActBlueUrl = (amount?: number): string => {
  if (!amount || ACTBLUE_BASE_URL === "#") {
    return ACTBLUE_BASE_URL;
  }

  try {
    const url = new URL(ACTBLUE_BASE_URL);
    url.searchParams.set("amount", amount.toString());
    return url.toString();
  } catch {
    // Fallback if base URL is not a valid URL string
    const separator = ACTBLUE_BASE_URL.includes("?") ? "&" : "?";
    return `${ACTBLUE_BASE_URL}${separator}amount=${amount}`;
  }
};

