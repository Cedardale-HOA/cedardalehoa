import { client } from "@/sanity/client";
import { POST_QUERY, POSTS_QUERY } from "@/sanity/queries";
import type { SanityPost } from "@/types/sanity";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const OPTIONS = { next: { revalidate: 60 } };

export async function generateStaticParams() {
  const posts = await client.fetch<SanityPost[]>(POSTS_QUERY, {}, OPTIONS);
  return posts.map((post) => ({ slug: post.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(POST_QUERY, { slug }, OPTIONS);
  if (!post) return {};
  return {
    title: `${post.title} | Cedardale HOA Blog`,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client.fetch<SanityPost | null>(POST_QUERY, { slug }, OPTIONS);

  if (!post) notFound();

  const imageUrl = post.image ? urlFor(post.image)?.width(1200).height(630).url() : null;

  return (
    <>
      {/* Hero */}
      <div
        style={{
          background: "var(--green-dark)",
          color: "#fff",
          padding: "8rem 1.5rem 3rem",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.375rem",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.75)",
              marginBottom: "1.5rem",
              fontWeight: 500,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </Link>
          <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.75rem" }}>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            {post.author && ` · ${post.author}`}
          </p>
          <h1 style={{ color: "#fff", lineHeight: 1.25 }}>{post.title}</h1>
          {post.excerpt && (
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: 1.6 }}>
              {post.excerpt}
            </p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Featured image */}
        {imageUrl && (
          <div
            style={{
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              marginBottom: "2.5rem",
              boxShadow: "var(--shadow)",
              position: "relative",
              aspectRatio: "16/9",
            }}
          >
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </div>
        )}

        {/* Body */}
        {Array.isArray(post.body) && (
          <article
            className="prose prose-lg max-w-none"
            style={{
              // Override prose link colors to match brand
              "--tw-prose-links": "var(--green)",
              "--tw-prose-headings": "var(--text)",
            } as React.CSSProperties}
          >
            <PortableText value={post.body} />
          </article>
        )}

        {/* Back link */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border-light)" }}>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontWeight: 600,
              color: "var(--green)",
              fontSize: "0.9rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </>
  );
}
