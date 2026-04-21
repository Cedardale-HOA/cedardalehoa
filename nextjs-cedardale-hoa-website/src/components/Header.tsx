"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#dues", label: "Pay Dues" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/board", label: "Board" },
  { href: "/#resources", label: "Resources" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change / escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(8px)",
          zIndex: 1000,
          borderBottom: "1px solid var(--border-light)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1140px",
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 0",
            }}
          >
            <Link href="/" aria-label="Cedardale HOA Home">
              <Image
                src="/images/cedardale-logo.png"
                alt="Cedardale Neighborhood HOA"
                width={168}
                height={43}
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontWeight: 500,
                    color: "var(--text-secondary)",
                    padding: "0.5rem 1rem",
                    borderRadius: "var(--radius)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "var(--green-light)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--text)" }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        role="dialog"
        aria-label="Navigation menu"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 0,
          right: menuOpen ? 0 : "-100%",
          width: "300px",
          height: "100vh",
          background: "var(--white)",
          zIndex: 1001,
          padding: "1.5rem",
          transition: "right 0.3s ease",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid var(--border-light)",
          }}
        >
          <span style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Menu
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", color: "var(--text)" }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile navigation" style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "1.1rem",
                fontWeight: 500,
                padding: "0.875rem 1rem",
                borderRadius: "var(--radius)",
                color: "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--green-light)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--green)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1000,
          }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
