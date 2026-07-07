import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

export default function NewsletterSection() {
  const url = "https://www.zeffy.com/en-US/embed/newsletter-form/sign-up-for-the-cedardale-hoa-newsletter";

  return (
    <section
      id="newsletter"
      style={{ padding: "5rem 0", background: "var(--green)" }}
    >
      <div style={{ width: "100%", maxWidth: "1140px", margin: "0 auto", padding: "0 1.5rem" }}>
        <AnimateOnScroll>
          <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            <style>{`
              .newsletter-embed-frame {
                height: 700px;
              }

              @media (max-width: 900px) {
                .newsletter-embed-frame {
                  height: 780px;
                }
              }

              @media (max-width: 640px) {
                .newsletter-embed-frame {
                  height: 920px;
                }
              }
            `}</style>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", marginBottom: "0.75rem" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Stay Informed
            </div>
            <h2 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)", fontWeight: 700, marginBottom: "0.75rem", color: "#fff" }}>
              Get Email Updates
            </h2>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", marginBottom: "2rem" }}>
              Subscribe to receive occasional emails about community events, important announcements, and HOA news. We won&apos;t spam you.
            </p>
            <div
              className="newsletter-embed-frame"
              style={{
                position: "relative",
                width: "100%",
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.35)",
                boxShadow: "var(--shadow)",
              }}
            >
              <iframe
                title="Signup form powered by Zeffy"
                style={{ position: "absolute", border: 0, top: 0, left: 0, bottom: 0, right: 0, width: "100%", height: "100%" }}
                src={url}
                loading="lazy"
              />
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
              If the form does not load, use{" "}
              <Link href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", fontWeight: 700, textDecoration: "underline" }}>
                this direct signup link
              </Link>
              .
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
