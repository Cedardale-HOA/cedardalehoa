import { client } from "@/sanity/client";
import { POSTS_QUERY } from "@/sanity/queries";
import type { SanityPost } from "@/types/sanity";
import BlogCard from "@/components/BlogCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Cedardale HOA",
  description: "News and updates from the Cedardale Neighborhood HOA in Knoxville, TN.",
};

const OPTIONS = { next: { revalidate: 60 } };

export default async function BlogPage() {
  const posts = await client.fetch<SanityPost[]>(POSTS_QUERY, {}, OPTIONS);

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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            Neighborhood News
          </div>
          <h1 style={{ color: "#fff", marginBottom: "0.5rem" }}>Blog</h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem" }}>
            Updates, announcements, and stories from our community.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1140px", margin: "0 auto", padding: "3.5rem 1.5rem 5rem" }}>
        {posts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            <p>No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
