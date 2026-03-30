import type { NextApiRequest, NextApiResponse } from "next";

/**
 * On-demand revalidation endpoint.
 * Called by a Sanity webhook whenever a post is published/updated/deleted.
 *
 * Sanity webhook payload shape (simplified):
 *   { _type: "post", slug: { current: "my-post-slug" } }
 *
 * Protect with a secret: set REVALIDATE_SECRET in Vercel env vars
 * and add ?secret=<same-value> to the webhook URL in Sanity.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST from Sanity webhook
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Validate secret token
  const secret = process.env.REVALIDATE_SECRET;
  if (secret && req.query.secret !== secret) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const body = req.body ?? {};
    const slug: string | undefined = body?.slug?.current;

    // Always revalidate the blog listing page
    await res.revalidate("/blog");
    await res.revalidate("/");

    // Also revalidate the specific post page if we have a slug
    if (slug) {
      await res.revalidate(`/blog/${slug}`);
    }

    return res.json({ revalidated: true, slug: slug ?? "all" });
  } catch (err) {
    // If revalidation fails, Next.js will serve the stale page until next request
    return res.status(500).json({ message: "Error revalidating", error: String(err) });
  }
}
