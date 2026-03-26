import { createClient } from "@sanity/client";
import type { Post } from "@/data/posts";

export const sanityClient = createClient({
  projectId: "e5hboz3o",
  dataset: "production",
  apiVersion: "2026-03-26",
  useCdn: true,
});

const AUTHOR_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop";

function formatDate(iso?: string): string {
  const d = iso ? new Date(iso) : new Date();
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function transformPost(raw: any, includeBody = false): Post {
  return {
    id: raw._id,
    slug: raw.slug?.current ?? raw._id,
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? "",
    content: "",
    ...(includeBody && raw.body ? { portableContent: raw.body } : {}),
    category: raw.category ?? "Technology",
    image: raw.mainImage ?? FALLBACK_IMAGE,
    author: {
      name: raw.author ?? "Neeraj",
      avatar: AUTHOR_AVATAR,
    },
    date: formatDate(raw.publishedAt),
    readTime: raw.readTime ?? "5 min read",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    featured: raw.featured ?? false,
  };
}

const LIST_FIELDS = `_id, title, slug, excerpt, mainImage, publishedAt, category, author, readTime, tags, featured`;

/** Fetch all published Sanity posts (without body — for listing pages) */
export async function fetchSanityPosts(): Promise<Post[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { ${LIST_FIELDS} }`;
    const raw: any[] = await sanityClient.fetch(query);
    return raw.map((p) => transformPost(p));
  } catch {
    return [];
  }
}

/** Fetch a single Sanity post by slug (includes PortableText body) */
export async function fetchSanityPostBySlug(slug: string): Promise<Post | null> {
  try {
    const query = `*[_type == "post" && slug.current == $slug][0] { ${LIST_FIELDS}, body }`;
    const raw = await sanityClient.fetch(query, { slug });
    if (!raw) return null;
    return transformPost(raw, true);
  } catch {
    return null;
  }
}

/** Fetch all slugs from Sanity (for getStaticPaths) */
export async function fetchSanitySlugs(): Promise<string[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current)].slug.current`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}
