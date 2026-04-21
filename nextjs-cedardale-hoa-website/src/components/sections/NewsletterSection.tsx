import type { SiteSetting } from "@/types/sanity";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

interface NewsletterSectionProps {
  settings: SiteSetting | null;
}

export default function NewsletterSection({ settings }: NewsletterSectionProps) {
  const url = settings?.newsletterUrl ?? "http://eepurl.com/jexX46";

  return (
    <section
      id="newsletter"
      style={{ padding: "5rem 0", background: "var(--green)" }}
    >
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <AnimateOnScroll>
          <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Stay Informed
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem", color: "#fff" }}>
              Get Email Updates
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", marginBottom: "2rem" }}>
              Subscribe to receive occasional emails about community events, important announcements, and HOA news. We won&apos;t spam you.
            </p>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.75rem",
                fontWeight: 600,
                borderRadius: "var(--radius)",
                background: "#fff",
                color: "var(--green-dark)",
                fontSize: "1rem",
                transition: "background 0.2s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Subscribe to Newsletter
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
