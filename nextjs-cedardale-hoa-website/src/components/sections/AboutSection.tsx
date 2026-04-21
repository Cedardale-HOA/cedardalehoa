import type { SiteSetting } from "@/types/sanity";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { urlFor } from "@/sanity/image";

interface AboutSectionProps {
  settings: SiteSetting | null;
}

export default function AboutSection({ settings }: AboutSectionProps) {
  const heading = settings?.aboutHeading ?? "Welcome to Cedardale";
  const body = settings?.aboutBody ?? "The Cedardale Homeowners Association is here to support a welcoming and well-maintained neighborhood where everyone can thrive. We organize community events and maintain shared spaces to enhance our quality of life.";
  const aboutImageUrl = settings?.aboutImage
    ? urlFor(settings.aboutImage)?.width(500).height(281).url()
    : "/images/cedardale-front-banner.webp";

  return (
    <section id="about" style={{ padding: "5rem 0", background: "#fff" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{ display: "grid", gap: "4rem", alignItems: "center" }}
          className="about-grid"
        >
          <style>{`
            .about-grid { grid-template-columns: 1fr 1fr; }
            @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; } }
          `}</style>

          <div>
            <AnimateOnScroll>
              <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--green)", marginBottom: "0.75rem" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  About Our Community
                </div>
                <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem" }}>{heading}</h2>
                <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>{body}</p>
              </div>
            </AnimateOnScroll>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  ),
                  title: "Quarterly Board Meetings",
                  desc: "Open to all residents. A great opportunity to connect and share ideas.",
                  delay: 60,
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                  title: "Community Events",
                  desc: "Yard sales, block parties, and holiday gatherings throughout the year.",
                  delay: 120,
                },
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  ),
                  title: "Transparent Records",
                  desc: "Meeting minutes and HOA documents available online for easy access.",
                  delay: 180,
                },
              ].map((item) => (
                <AnimateOnScroll key={item.title} delay={item.delay}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", padding: "1.25rem", background: "var(--green-light)", borderRadius: "var(--radius)" }}>
                    <div style={{ width: "44px", height: "44px", background: "#fff", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "var(--shadow-sm)" }}>
                      <span style={{ color: "var(--green)" }}>{item.icon}</span>
                    </div>
                    <div>
                      <strong style={{ display: "block", marginBottom: "0.25rem", color: "var(--text)" }}>{item.title}</strong>
                      <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{item.desc}</span>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <AnimateOnScroll delay={100}>
            <div style={{ borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
              {aboutImageUrl && (
                <Image
                  src={aboutImageUrl}
                  alt="Cedardale neighborhood"
                  width={500}
                  height={281}
                  style={{ width: "100%", height: "auto" }}
                />
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
