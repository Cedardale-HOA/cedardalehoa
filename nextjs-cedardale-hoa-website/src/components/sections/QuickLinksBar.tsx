"use client";
import type { SiteSetting } from "@/types/sanity";
import Link from "next/link";

interface QuickLinksBarProps {
  settings: SiteSetting | null;
}

export default function QuickLinksBar({ settings }: QuickLinksBarProps) {
  const hoaDocsUrl = settings?.hoaDocumentsUrl ?? "https://drive.google.com/drive/folders/1IsF9oFqw8tBmtP2yyxM6UI-R2-z4XSR-";
  const minutesUrl = settings?.meetingMinutesUrl ?? "https://drive.google.com/drive/folders/1v-zi6AaeOhzBXzvarMnHoxYMWsll7br6";
  const facebookUrl = settings?.facebookGroupUrl ?? "https://www.facebook.com/groups/690748179929570";
  const contactEmail = settings?.contactEmail ?? "admin@cedardalehoa.com";

  const links = [
    {
      href: hoaDocsUrl,
      label: "HOA Documents",
      external: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      href: minutesUrl,
      label: "Meeting Minutes",
      external: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      href: facebookUrl,
      label: "Facebook Group",
      external: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      href: `mailto:${contactEmail}`,
      label: "Email the Board",
      external: false,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: "var(--cream)", padding: "1.25rem 0", borderBottom: "1px solid var(--border-light)" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.125rem",
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                fontWeight: 500,
                fontSize: "0.9rem",
                color: "var(--text)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--green)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
              }}
            >
              <span style={{ color: "var(--green)" }}>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
