import { client } from "@/sanity/client";
import { BOARD_MEMBERS_QUERY } from "@/sanity/queries";
import type { SanityBoardMember } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Board Members | Cedardale HOA",
  description: "Meet the current board members and officers of the Cedardale Neighborhood HOA.",
};

const OPTIONS = { next: { revalidate: 60 } };

export default async function BoardPage() {
  const members = await client.fetch<SanityBoardMember[]>(BOARD_MEMBERS_QUERY, {}, OPTIONS);

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
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Your HOA Leadership
          </div>
          <h1 style={{ color: "#fff", marginBottom: "0.5rem" }}>Board Members</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            Meet the volunteers who serve our Cedardale community.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 1.5rem 5rem" }}>
        {members.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            <p>Board member information coming soon.</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "2rem",
            }}
          >
            {members.map((member) => {
              const imageUrl = member.image
                ? urlFor(member.image)?.width(400).height(400).fit("crop").url()
                : null;
              return (
                <div
                  key={member._id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  {/* Photo */}
                  {imageUrl ? (
                    <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
                      <Image
                        src={imageUrl}
                        alt={member.name}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 280px"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        background: "var(--green-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}

                  {/* Info */}
                  <div style={{ padding: "1.5rem" }}>
                    <div
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        color: "var(--green)",
                        background: "var(--green-light)",
                        borderRadius: "999px",
                        padding: "0.2rem 0.75rem",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {member.role}
                    </div>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
                      {member.name}
                    </h3>
                    {member.bio && (
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        {member.bio}
                      </p>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          marginTop: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "var(--green)",
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Contact the board CTA */}
        <div
          style={{
            marginTop: "4rem",
            background: "var(--green-light)",
            borderRadius: "var(--radius-lg)",
            padding: "2.5rem",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>
            Questions for the Board?
          </h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            We&apos;re happy to help. Reach out by email or attend a quarterly meeting.
          </p>
          <a
            href="mailto:admin@cedardalehoa.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.875rem 1.5rem",
              background: "var(--green)",
              color: "#fff",
              borderRadius: "var(--radius)",
              fontWeight: 600,
              fontSize: "1rem",
              transition: "background 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Email the Board
          </a>
        </div>
      </div>
    </>
  );
}
