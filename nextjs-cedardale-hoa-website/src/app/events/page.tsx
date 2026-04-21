import { client } from "@/sanity/client";
import { EVENTS_QUERY } from "@/sanity/queries";
import type { SanityEvent } from "@/types/sanity";
import EventCard from "@/components/EventCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Cedardale HOA",
  description: "All community events for Cedardale Neighborhood HOA in Knoxville, TN.",
};

const OPTIONS = { next: { revalidate: 60 } };

export default async function EventsPage() {
  const events = await client.fetch<SanityEvent[]>(EVENTS_QUERY, {}, OPTIONS);

  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.status !== "past" && e.date >= today);
  const past = events.filter((e) => e.status === "past" || e.date < today).reverse();

  return (
    <>
      {/* Page header */}
      <div
        style={{
          background: "var(--green-dark)",
          color: "#fff",
          padding: "8rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "1140px", margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: "0.75rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Community Calendar
          </div>
          <h1 style={{ color: "#fff", marginBottom: "0.5rem" }}>Events</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            All Cedardale neighborhood events. Everyone is welcome!
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 1.5rem 5rem" }}>
        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "2px solid var(--green-light)",
              }}
            >
              Upcoming Events
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {upcoming.map((event) => (
                <EventCard key={event._id} event={event} showDetails />
              ))}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            <p>No events have been added yet. Check back soon!</p>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "1.5rem",
                paddingBottom: "0.75rem",
                borderBottom: "2px solid var(--border-light)",
              }}
            >
              Past Events
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {past.map((event) => (
                <EventCard key={event._id} event={event} showDetails />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
