import { createClient } from "@sanity/client";
import type { Post } from "@/data/posts";

export const sanityClient = createClient({
  projectId: "e5hboz3o",
  dataset: "production",
  apiVersion: "2026-03-26",
  useCdn: false, // always fetch fresh — CDN delays new posts from appearing
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
  // Support both old string `author` field and new reference `author->{name,avatar,bio}`
  const authorName: string = raw.authorName ?? raw.author ?? "Neeraj";
  const authorAvatar: string = raw.authorAvatar ?? AUTHOR_AVATAR;
  const authorBio: string | undefined = raw.authorBio ?? undefined;

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
      name: authorName,
      avatar: authorAvatar,
      bio: authorBio,
    },
    date: formatDate(raw.publishedAt),
    readTime: raw.readTime ?? "5 min read",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    featured: raw.featured ?? false,
    faqs: Array.isArray(raw.faqs)
      ? raw.faqs
          .filter((faq: any) => faq?.question && faq?.answer)
          .map((faq: any) => ({
            question: String(faq.question),
            answer: String(faq.answer),
          }))
      : [],
    ...(raw.seo ? { seo: raw.seo } : {}),
  };
}

const SEO_FIELDS = `seo { metaTitle, metaDescription, focusKeyword, canonicalUrl, noIndex, noFollow, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage }`;

const LIST_FIELDS = `
  _id, title, slug, excerpt, mainImage, publishedAt, category, readTime, tags, featured, faqs,
  ${SEO_FIELDS},
  "authorName": coalesce(author->name, author),
  "authorAvatar": author->avatar,
  "authorBio": author->bio
`.trim();

/** Fetch all published Sanity posts (without body — for listing pages) */
export async function fetchSanityPosts(): Promise<Post[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) { ${LIST_FIELDS} }`;
    const raw: any[] = await sanityClient.fetch(query);
    return raw.map((p) => transformPost(p));
  } catch {
    return [];
  }
}

/** Fetch a single Sanity post by slug (includes PortableText body) */
export async function fetchSanityPostBySlug(slug: string): Promise<Post | null> {
  try {
    const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] { ${LIST_FIELDS}, body, "authorBio": author->bio }`;
    const raw = await sanityClient.fetch(query, { slug });
    if (!raw) return null;
    return transformPost(raw, true);
  } catch {
    return null;
  }
}

export interface SiteSEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface SiteSettings {
  siteTitle: string;
  seo?: SiteSEO;
}

/** Fetch the singleton siteSettings document */
export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  try {
    const query = `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0] {
      siteTitle,
      seo { metaTitle, metaDescription, focusKeyword, canonicalUrl, noIndex, noFollow, ogTitle, ogDescription, ogImage, twitterTitle, twitterDescription, twitterImage }
    }`;
    const raw = await sanityClient.fetch(query);
    if (!raw) return null;
    return raw as SiteSettings;
  } catch {
    return null;
  }
}

/** Fetch all slugs from Sanity (for getStaticPaths) */
export async function fetchSanitySlugs(): Promise<string[]> {
  try {
    const query = `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`;
    return await sanityClient.fetch(query);
  } catch {
    return [];
  }
}
