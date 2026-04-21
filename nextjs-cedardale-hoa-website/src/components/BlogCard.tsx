"use client";

import Image from "next/image";
import Link from "next/link";
import type { SanityPost } from "@/types/sanity";
import { urlFor } from "@/sanity/image";

export default function BlogCard({ post }: { post: SanityPost }) {
  const imageUrl = post.image ? urlFor(post.image)?.width(640).height(360).url() : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
        transition: "box-shadow 0.2s, transform 0.2s",
        color: "var(--text)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = "var(--shadow-sm)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "none";
      }}
    >
      {imageUrl ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            background: "var(--green-light)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
      )}

      <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.author && ` · ${post.author}`}
        </p>
        <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", flex: 1, lineHeight: 1.6 }}>
            {post.excerpt}
          </p>
        )}
        <span
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
          Read more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
