"use client";
import type { SiteSetting } from "@/types/sanity";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

interface ResourcesSectionProps {
  settings: SiteSetting | null;
}

export default function ResourcesSection({ settings }: ResourcesSectionProps) {
  const hoaDocsUrl = settings?.hoaDocumentsUrl ?? "https://drive.google.com/drive/folders/1IsF9oFqw8tBmtP2yyxM6UI-R2-z4XSR-";
  const minutesUrl = settings?.meetingMinutesUrl ?? "https://drive.google.com/drive/folders/1v-zi6AaeOhzBXzvarMnHoxYMWsll7br6";
  const facebookUrl = settings?.facebookGroupUrl ?? "https://www.facebook.com/groups/690748179929570";
  const contactEmail = settings?.contactEmail ?? "admin@cedardalehoa.com";

  const resources = [
    {
      href: hoaDocsUrl,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title: "HOA Documents",
      desc: "Bylaws, covenants, restrictions, and community guidelines.",
      linkLabel: "Open in Google Drive",
      delay: 60,
    },
    {
      href: minutesUrl,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      title: "Board Meeting Minutes",
      desc: "Records from quarterly meetings, including decisions and discussions.",
      linkLabel: "Open in Google Drive",
      delay: 120,
    },
    {
      href: facebookUrl,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
      title: "Facebook Group",
      desc: "Connect with neighbors, share updates, and stay informed about news.",
      linkLabel: "Join the Group",
      delay: 180,
    },
  ];

  return (
    <section id="resources" style={{ padding: "5rem 0", background: "var(--cream)" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <AnimateOnScroll>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--green)", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Documents & Resources
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem" }}>HOA Information</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              Access important documents, meeting records, and community resources.
            </p>
          </div>
        </AnimateOnScroll>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem", marginBottom: "4rem" }}>
          {resources.map((r) => (
            <AnimateOnScroll key={r.title} delay={r.delay}>
              <Link
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.5rem",
                  gap: "1rem",
                  transition: "box-shadow 0.2s, transform 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                <div style={{ width: "48px", height: "48px", background: "var(--green-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "var(--green)" }}>{r.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 700, marginBottom: "0.375rem", color: "var(--text)" }}>{r.title}</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>{r.desc}</p>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--green)", display: "inline-flex", alignItems: "center", gap: "0.3rem" }}>
                    {r.linkLabel}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Contact subsection */}
        <div id="contact" style={{ paddingTop: "3rem", borderTop: "1px solid var(--border)" }}>
          <AnimateOnScroll>
            <div style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Contact the Board</h3>
              <p style={{ color: "var(--text-secondary)" }}>Have questions, concerns, or suggestions? We&apos;re here to help.</p>
            </div>
          </AnimateOnScroll>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            <AnimateOnScroll delay={60}>
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", background: "var(--green-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Email</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Best for general questions and non-urgent matters.</p>
                  <Link href={`mailto:${contactEmail}`} style={{ fontSize: "0.9rem", color: "var(--green)", fontWeight: 500 }}>{contactEmail}</Link>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={120}>
              <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "1.5rem", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ width: "44px", height: "44px", background: "var(--green-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Board Meetings</h4>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Attend a quarterly meeting to speak with the board in person.</p>
                  <Link href="/events" style={{ fontSize: "0.9rem", color: "var(--green)", fontWeight: 500 }}>View meeting schedule</Link>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
