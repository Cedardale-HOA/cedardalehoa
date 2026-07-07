"use client";
import { useEffect, useRef } from "react";
import type { SiteSetting } from "@/types/sanity";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Link from "next/link";

interface DuesSectionProps {
  settings: SiteSetting | null;
}

const ZEFFY_SCRIPT_SRC = "https://www.zeffy.com/embed/v2/zeffy-embed.js";
const ZEFFY_INIT_CHECK_DELAY_MS = 500;
const ZEFFY_FALLBACK_TIMEOUT_MS = 12000;

type ZeffyWindow = Window & {
  Zeffy?: {
    embed?: {
      init?: () => void;
    };
  };
};

let zeffyScriptReadyPromise: Promise<void> | null = null;

function canInitZeffy() {
  return typeof window !== "undefined" && !!(window as ZeffyWindow).Zeffy?.embed?.init;
}

function ensureZeffyScript(): Promise<void> {
  if (canInitZeffy()) {
    return Promise.resolve();
  }

  if (zeffyScriptReadyPromise) {
    return zeffyScriptReadyPromise;
  }

  zeffyScriptReadyPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${ZEFFY_SCRIPT_SRC}"]`
    );

    const script = existing ?? document.createElement("script");

    const onLoad = () => resolve();
    const onError = () => {
      zeffyScriptReadyPromise = null;
      reject(new Error("Failed to load Zeffy embed script"));
    };

    if (existing) {
      if (canInitZeffy()) {
        resolve();
        return;
      }
      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    script.src = ZEFFY_SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.body.appendChild(script);
  });

  return zeffyScriptReadyPromise;
}

export default function DuesSection({ settings }: DuesSectionProps) {
  const embedRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    const embedContainer = embedRef.current;
    const fallbackContainer = fallbackRef.current;
    if (!embedContainer || !fallbackContainer) return;

    const showFallback = () => {
      fallbackContainer.style.display = "block";
    };

    const hideFallback = () => {
      fallbackContainer.style.display = "none";
    };

    const hasPrimaryIframe = () => !!embedContainer.querySelector("iframe");

    const safeInit = () => {
      (window as ZeffyWindow).Zeffy?.embed?.init?.();
    };

    hideFallback();

    const fallbackTimeout = window.setTimeout(() => {
      if (cancelled || hasPrimaryIframe()) return;
      showFallback();
    }, ZEFFY_FALLBACK_TIMEOUT_MS);

    ensureZeffyScript()
      .then(() => {
        if (cancelled) return;
        safeInit();

        window.setTimeout(() => {
          if (cancelled) return;
          if (hasPrimaryIframe()) {
            hideFallback();
            return;
          }
          showFallback();
        }, ZEFFY_INIT_CHECK_DELAY_MS);
      })
      .catch(() => {
        if (!cancelled) {
          showFallback();
        }
      });

    return () => {
      cancelled = true;
      window.clearTimeout(fallbackTimeout);
    };
  }, []);

  const amount = settings?.duesAmount ?? "$42";
  const tagline = settings?.duesTagline ?? "less than $4 a month";
  const dueDate = settings?.dueDate ?? "March 31";
  const billing = settings?.billingPeriod ?? "Jan 1 – Dec 31";
  const contactEmail = settings?.contactEmail ?? "admin@cedardalehoa.com";

  return (
    <section id="dues" style={{ padding: "5rem 0", background: "var(--sand)" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "1140px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <AnimateOnScroll>
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--green)",
                marginBottom: "0.75rem",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Annual Dues Payment
            </div>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                fontWeight: 700,
                marginBottom: "0.75rem",
              }}
            >
              Pay Your HOA Dues
            </h2>
            <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)" }}>
              Annual dues help maintain our beautiful common areas and support
              community activities. Your contribution makes a real difference.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Main grid: dues info card + online payment form */}
        <div
          className="dues-grid"
          style={{ display: "grid", gap: "2.5rem", alignItems: "start" }}
        >
          <style>{`
            .dues-grid { grid-template-columns: 1fr 1.4fr; }
            @media (max-width: 800px) { .dues-grid { grid-template-columns: 1fr; } }
          `}</style>

          {/* Dues info card */}
          <AnimateOnScroll>
            <div
              style={{
                background: "#fff",
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "var(--shadow)",
              }}
            >
              <div
                style={{
                  marginBottom: "1.5rem",
                  paddingBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-light)",
                }}
              >
                <small
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    display: "block",
                    marginBottom: "0.25rem",
                  }}
                >
                  ({tagline})
                </small>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "3rem",
                      fontWeight: 700,
                      color: "var(--green)",
                      lineHeight: 1,
                    }}
                  >
                    {amount}
                  </span>
                  <span
                    style={{ fontSize: "1rem", color: "var(--text-secondary)" }}
                  >
                    per household, per year
                  </span>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "0" }}
              >
                {[
                  { label: "Due Date", value: dueDate },
                  { label: "Billing Period", value: billing },
                  { label: "Questions?", value: null, email: contactEmail },
                ].map((row) => (
                  <div
                    key={row.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.75rem 0",
                      borderBottom: "1px solid var(--border-light)",
                    }}
                  >
                    <span
                      style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                    >
                      {row.label}
                    </span>
                    {row.email ? (
                      <Link
                        href={`mailto:${row.email}`}
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--green)",
                          fontWeight: 500,
                        }}
                      >
                        Contact the Board
                      </Link>
                    ) : (
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--text)",
                        }}
                      >
                        {row.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Online payment — Zeffy (primary featured method) */}
          <AnimateOnScroll delay={80}>
            <div>
              <div
                ref={embedRef}
                data-testid="zeffy-embed-container"
                data-zeffy-embed
                data-form-url="/embed/ticketing/cedardale-hoas-memberships-2"
              ></div>
              <div
                ref={fallbackRef}
                data-testid="zeffy-embed-fallback"
                style={{ display: "none" }}
              >
                {" "}
                <div style={{ position: "relative", overflow: "hidden", height: "450px", width: "100%", paddingTop: "450px" }}>
                  <iframe
                    title="Donation form powered by Zeffy"
                    style={{ position: "absolute", border: "0", top: "0", left: "0", bottom: "0", right: "0", width: "100%", height: "100%" }}
                    src="https://www.zeffy.com/embed/ticketing/cedardale-hoas-memberships-2"
                    allowFullScreen
                    allow="payment"
                  ></iframe>
                </div>{" "}
              </div>{" "}

            </div>
          </AnimateOnScroll>
        </div>

        {/* Secondary payment methods */}
        <AnimateOnScroll delay={120}>
          <div style={{ marginTop: "2.5rem" }}>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "var(--text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "1rem",
              }}
            >
              Prefer a different method?
            </p>
            <div
              className="alt-methods-grid"
              style={{ display: "grid", gap: "1rem" }}
            >
              <style>{`
                .alt-methods-grid { grid-template-columns: 1fr 1fr; }
                @media (max-width: 600px) { .alt-methods-grid { grid-template-columns: 1fr; } }
              `}</style>
              {[
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  ),
                  title: "Zelle",
                  subtitle: "Fast and free through your bank",
                  details: [
                    <>
                      <strong key="1">Send to:</strong> {contactEmail}
                    </>,
                    "Include your street address in the memo.",
                  ],
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  ),
                  title: "Check",
                  subtitle: "Mail or hand-deliver",
                  details: [
                    <>
                      <strong key="1">Payable to:</strong> Cedardale HOA
                    </>,
                    "Contact the board for the mailing address.",
                  ],
                },
              ].map((opt) => (
                <div
                  key={opt.title}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    padding: "1rem 1.25rem",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--green)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--border)")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      marginBottom: "0.625rem",
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        background: "var(--green-light)",
                        borderRadius: "var(--radius)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: "var(--green)" }}>{opt.icon}</span>
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          color: "var(--text)",
                        }}
                      >
                        {opt.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                        }}
                      >
                        {opt.subtitle}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {opt.details.map((d, i) => (
                      <p
                        key={i}
                        style={{
                          marginBottom:
                            i < opt.details.length - 1 ? "0.2rem" : 0,
                        }}
                      >
                        {d}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
