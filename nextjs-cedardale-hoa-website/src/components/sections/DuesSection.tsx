"use client";
import type { SiteSetting } from "@/types/sanity";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

interface DuesSectionProps {
  settings: SiteSetting | null;
}

export default function DuesSection({ settings }: DuesSectionProps) {
  const amount = settings?.duesAmount ?? "$42";
  const tagline = settings?.duesTagline ?? "less than $4 a month";
  const dueDate = settings?.dueDate ?? "March 31";
  const billing = settings?.billingPeriod ?? "Jan 1 – Dec 31";
  const contactEmail = settings?.contactEmail ?? "admin@cedardalehoa.com";

  return (
    <section id="dues" style={{ padding: "5rem 0", background: "var(--sand)" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <AnimateOnScroll>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--green)", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Annual Dues Payment
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Pay Your HOA Dues</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              Annual dues help maintain our beautiful common areas and support community activities. Your contribution makes a real difference.
            </p>
          </div>
        </AnimateOnScroll>

        <div
          className="dues-grid"
          style={{ display: "grid", gap: "3rem", alignItems: "start" }}
        >
          <style>{`
            .dues-grid { grid-template-columns: 1fr 1.3fr; }
            @media (max-width: 800px) { .dues-grid { grid-template-columns: 1fr; } }
          `}</style>

          {/* Dues card */}
          <AnimateOnScroll>
            <div style={{ background: "#fff", borderRadius: "var(--radius-lg)", padding: "2rem", boxShadow: "var(--shadow)" }}>
              <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border-light)" }}>
                <small style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginBottom: "0.25rem" }}>({tagline})</small>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                  <span style={{ fontSize: "3rem", fontWeight: 700, color: "var(--green)", lineHeight: 1 }}>{amount}</span>
                  <span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>per household, per year</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Due Date", value: dueDate },
                  { label: "Billing Period", value: billing },
                  { label: "Questions?", value: null, email: contactEmail },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: "1px solid var(--border-light)" }}
                  >
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{row.label}</span>
                    {row.email ? (
                      <Link href={`mailto:${row.email}`} style={{ fontSize: "0.9rem", color: "var(--green)", fontWeight: 500 }}>Contact the Board</Link>
                    ) : (
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Payment methods */}
          <AnimateOnScroll delay={80}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem" }}>How to Pay</h3>

            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
                title: "Zelle (Recommended)",
                subtitle: "Fast and free through your bank",
                details: [
                  <><strong key="1">Send to:</strong> {contactEmail}</>,
                  "Include your street address in the memo so we can credit your account.",
                ],
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                ),
                title: "Check",
                subtitle: "Mail or hand-deliver",
                details: [
                  <><strong key="1">Make check payable to:</strong> Cedardale HOA</>,
                  "Contact the board for the mailing address or to arrange drop-off.",
                ],
              },
            ].map((opt) => (
              <div
                key={opt.title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "1.25rem",
                  marginBottom: "1rem",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--green)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.875rem" }}>
                  <div style={{ width: "44px", height: "44px", background: "var(--green-light)", borderRadius: "var(--radius)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "var(--green)" }}>{opt.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: "var(--text)" }}>{opt.title}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{opt.subtitle}</div>
                  </div>
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {opt.details.map((d, i) => <p key={i} style={{ marginBottom: i < opt.details.length - 1 ? "0.25rem" : 0 }}>{d}</p>)}
                </div>
              </div>
            ))}
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
