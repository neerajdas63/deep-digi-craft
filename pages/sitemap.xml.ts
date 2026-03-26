import { GetServerSideProps } from "next";
import { categories } from "@/data/posts";

const BASE_URL = "https://allblogsidea.com";

function buildSitemapXml(urls: { loc: string; lastmod: string }[]): string {
  const urlEntries = urls
    .map(
      ({ loc, lastmod }) => `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const today = new Date().toISOString().split("T")[0];

  const staticPages: { loc: string; lastmod: string }[] = [
    { loc: `${BASE_URL}/`, lastmod: today },
    { loc: `${BASE_URL}/blog`, lastmod: today },
    { loc: `${BASE_URL}/about`, lastmod: today },
    { loc: `${BASE_URL}/contact`, lastmod: today },
  ];

  const categoryPages = categories.map(({ slug }) => ({
    loc: `${BASE_URL}/category/${slug}`,
    lastmod: today,
  }));

  const allUrls = [...staticPages, ...categoryPages];
  const sitemap = buildSitemapXml(allUrls);

  res.setHeader("Content-Type", "application/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return { props: {} };
};

// Component is never rendered — response is handled entirely in getServerSideProps
export default function SitemapXml() {
  return null;
}
