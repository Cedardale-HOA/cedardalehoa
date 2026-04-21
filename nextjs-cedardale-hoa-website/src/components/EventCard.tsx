"use client";
import type { SanityEvent } from "@/types/sanity";

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function getMonthAbbr(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
}

function getDay(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.getDate();
}

const badgeColors: Record<string, { bg: string; color: string }> = {
  upcoming: { bg: "#e8f5ec", color: "#2e7d4f" },
  past: { bg: "#f0f0f0", color: "#666" },
  tentative: { bg: "#fff8e1", color: "#8a6400" },
};

interface EventCardProps {
  event: SanityEvent;
  showDetails?: boolean;
}

export default function EventCard({ event, showDetails = false }: EventCardProps) {
  const badge = badgeColors[event.status] ?? badgeColors.upcoming;

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.2s, transform 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {/* Date block */}
        <div
          style={{
            minWidth: "52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "var(--green-light)",
            borderRadius: "var(--radius)",
            padding: "0.5rem",
            textAlign: "center",
          }}
        >
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--green)", textTransform: "uppercase" }}>
            {getMonthAbbr(event.date)}
          </span>
          <span style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1, color: "var(--text)" }}>
            {getDay(event.date)}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.4rem" }}>
            <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", lineHeight: 1.3 }}>
              {event.title}
            </h4>
            <span
              style={{
                flexShrink: 0,
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                background: badge.bg,
                color: badge.color,
                textTransform: "capitalize",
              }}
            >
              {event.status}
            </span>
          </div>

          {event.time && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {event.time}
            </div>
          )}

          {event.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6, flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {event.location}
            </div>
          )}
        </div>
      </div>

      {showDetails && event.details && (
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", borderTop: "1px solid var(--border-light)", paddingTop: "0.75rem", margin: 0 }}>
          {event.details}
        </p>
      )}

      {!showDetails && (
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0, display: "none" }}>
          {formatDate(event.date)}
        </p>
      )}
    </div>
  );
}

export { formatDate };
