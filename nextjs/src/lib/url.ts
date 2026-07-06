const FALLBACK_NEWSLETTER_URL = "https://eepurl.com/jexX46";

export function safeExternalUrl(candidate: string | null | undefined, fallback: string): string {
  if (!candidate) return fallback;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:") return fallback;
    return parsed.toString();
  } catch {
    return fallback;
  }
}

export function safeNewsletterUrl(candidate: string | null | undefined): string {
  return safeExternalUrl(candidate, FALLBACK_NEWSLETTER_URL);
}
