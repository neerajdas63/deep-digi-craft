// Next.js version of SEO — uses next/head instead of react-helmet-async
// REMOVED: import { Helmet } from "react-helmet-async"
// ADDED:   import Head from "next/head"
import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  article?: { publishedTime?: string; tags?: string[] };
}

export default function SEO({ title, description, image, url, type = "website", article }: SEOProps) {
  const siteName = "AllblogsIdea";
  const fullTitle = `${title} | ${siteName}`;
  const defaultImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop";
  // REMOVED: window.location.href (not safe in SSR) — url prop with fallback used instead
  const canonicalUrl = url || "";

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
      {article?.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
    </Head>
  );
}
