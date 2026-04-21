"use client";
import type { SanityEvent } from "@/types/sanity";
import EventCard from "@/components/EventCard";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

interface EventsPreviewSectionProps {
  events: SanityEvent[];
}

export default function EventsPreviewSection({ events }: EventsPreviewSectionProps) {
  return (
    <section id="events" style={{ padding: "5rem 0", background: "#fff" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <AnimateOnScroll>
          <div style={{ marginBottom: "2.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--green)", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              2026 Calendar
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem" }}>Upcoming Events</h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              Mark your calendar for community gatherings and HOA meetings. All residents are welcome to attend board meetings.
            </p>
          </div>
        </AnimateOnScroll>

        {events.length === 0 ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem 0" }}>No upcoming events. Check back soon!</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {events.map((event, i) => (
              <AnimateOnScroll key={event._id} delay={i * 60}>
                <EventCard event={event} />
              </AnimateOnScroll>
            ))}
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.75rem",
              fontWeight: 600,
              borderRadius: "var(--radius)",
              background: "var(--green)",
              color: "#fff",
              fontSize: "1rem",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--green-dark)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--green)")}
          >
            View Full Event Calendar
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
