// Next.js version of SEO — uses next/head instead of react-helmet-async
import Head from "next/head";
import { useRouter } from "next/router";

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  article?: { publishedTime?: string; tags?: string[] };
  // RankMath-equivalent overrides
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  appendSiteName?: boolean;
}

export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  article,
  ogTitle,
  ogDescription,
  ogImage,
  twitterTitle,
  twitterDescription,
  twitterImage,
  canonicalUrl,
  noIndex = false,
  noFollow = false,
  appendSiteName = true,
}: SEOProps) {
  const router = useRouter();
  const siteName = "AllblogsIdea";
  const siteUrl = "https://allblogsidea.com";
  const fullTitle = appendSiteName ? `${title} | ${siteName}` : title;
  const defaultImage = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop";

  const path = router.asPath?.split("?")[0] || "/";
  const resolvedCanonical = canonicalUrl || url || `${siteUrl}${path}`;
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgImage = ogImage || image || defaultImage;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage = twitterImage || resolvedOgImage;

  const robotsContent = [noIndex ? "noindex" : "index", noFollow ? "nofollow" : "follow"].join(", ");

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="bm-site-verification" content="f72e8a16babd00f1d5bb8c9d52787dde61d0a575" />
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={resolvedCanonical} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      <meta name="twitter:image" content={resolvedTwitterImage} />

      {/* Article-specific */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Head>
  );
}
