import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/#about", label: "About" },
  { href: "/#dues", label: "Pay Dues" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/board", label: "Board" },
  { href: "/#resources", label: "Resources" },
  { href: "/#contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--text)", color: "rgba(255,255,255,0.7)" }}>
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            padding: "2.5rem 0 2rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Image
              src="/images/cedardale-logo.png"
              alt="Cedardale HOA"
              width={150}
              height={38}
              style={{ filter: "brightness(0) invert(1)", opacity: 0.85 }}
            />
            <span style={{ fontSize: "0.9rem" }}>Knoxville, TN</span>
          </div>
          <nav style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.9rem",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "var(--radius)",
                  color: "rgba(255,255,255,0.6)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)")}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.25rem 0", fontSize: "0.875rem" }}>
          <p>&copy; <time dateTime={String(year)}>{year}</time> Cedardale Neighborhood HOA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
