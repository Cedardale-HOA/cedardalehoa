import type { SiteSetting, SanityEvent } from "@/types/sanity";
import Link from "next/link";

interface HeroSectionProps {
  settings: SiteSetting | null;
  nextEvent: SanityEvent | null;
}

function formatEventDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default function HeroSection({ nextEvent }: HeroSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "rgba(58, 97, 71, 1)",
        padding: "9rem 1.5rem 5rem",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background image overlay — applied via inline style so it only loads on desktop via CSS */}
      <style>{`
        @media (min-width: 901px) {
          .hero-bg {
            background-image: url('/images/downtown-knoxville.webp');
            background-size: cover;
            background-position: center;
          }
          .hero-bg::before {
            content: "";
            background-image: linear-gradient(to right, rgba(58,97,71,0.9) 50%, rgba(58,97,71,0.7) 75%, transparent);
            position: absolute;
            inset: 0;
          }
        }
      `}</style>

      <div
        className="hero-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          <style>{`
            @media (max-width: 900px) {
              .hero-grid { grid-template-columns: 1fr !important; }
              .hero-card-wrapper { display: none !important; }
            }
          `}</style>

          {/* Left: content */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", marginBottom: "1rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Knoxville, Tennessee
            </div>
            <h1 style={{ color: "#fff", marginBottom: "1rem", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 700, lineHeight: 1.25 }}>
              Cedardale Neighborhood HOA
            </h1>
            <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", marginBottom: "2rem", lineHeight: 1.6 }}>
              Your friendly community resource for neighborhood news, events, and HOA information. We&apos;re here to help make our neighborhood a wonderful place to live.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                href="/events"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius)",
                  background: "#fff",
                  color: "var(--green-dark)",
                  fontSize: "1rem",
                  transition: "background 0.2s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                View 2026 Events
              </Link>
              <Link
                href="/#dues"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.875rem 1.5rem",
                  fontWeight: 600,
                  borderRadius: "var(--radius)",
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.6)",
                  fontSize: "1rem",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Pay Your Annual Dues
              </Link>
            </div>
          </div>

          {/* Right: next event card */}
          <div className="hero-card-wrapper">
            {nextEvent ? (
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem",
                  color: "#fff",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  Coming Up Next
                </div>
                <div style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.3 }}>
                  {nextEvent.title}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.7 }}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {formatEventDate(nextEvent.date)}
                  </div>
                  {nextEvent.time && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.7 }}>
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {nextEvent.time}
                    </div>
                  )}
                  {nextEvent.location && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.7 }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {nextEvent.location}
                    </div>
                  )}
                </div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.15)", margin: "1.25rem 0" }} />
                <Link
                  href="/events"
                  style={{ fontSize: "0.875rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", display: "inline-flex", alignItems: "center", gap: "0.375rem" }}
                >
                  View all events
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.75rem",
                  color: "rgba(255,255,255,0.7)",
                  textAlign: "center",
                  fontSize: "0.95rem",
                }}
              >
                No upcoming events scheduled yet. Check back soon!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px" }}
      >
        <path fill="#fff" fillOpacity="1" d="M0,80L48,90C96,100,192,120,288,130C384,140,480,140,576,135C672,130,768,120,864,110C960,100,1056,90,1152,85C1248,80,1344,80,1392,80L1440,80L1440,300L1392,300C1344,300,1248,300,1152,300C1056,300,960,300,864,300C768,300,672,300,576,300C480,300,384,300,288,300C192,300,96,300,48,300L0,300Z" />
      </svg>
    </section>
  );
}
