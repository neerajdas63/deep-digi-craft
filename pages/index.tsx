import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, TrendingUp, BarChart3, Cpu, Zap, Briefcase } from "lucide-react";
import { posts as staticPosts, categories, type Post } from "@/data/posts";
import { fetchSanityPosts, fetchSiteSettings, type SiteSettings } from "@/lib/sanity";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const iconMap: Record<string, React.ElementType> = { Bot, TrendingUp, BarChart3, Cpu, Zap, Briefcase };

const homeSeoTitle = "AllblogsIdea - AI Tools, Tech Reviews & Finance Tips";
const homeSeoDescription =
  "Read honest AI tool reviews, tech guides, trading insights, and finance tips for Indian professionals on AllblogsIdea.";

interface Props { allPosts: Post[]; siteSettings: SiteSettings | null }

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [sanityPosts, siteSettings] = await Promise.all([
    fetchSanityPosts(),
    fetchSiteSettings(),
  ]);
  // Sanity posts come first so newest CMS content appears at the top
  const allPosts = [...sanityPosts, ...staticPosts];
  return { props: { allPosts, siteSettings }, revalidate: 60 };
};

export default function Home({ allPosts, siteSettings }: Props) {
  const featured = allPosts.find((p) => p.featured) ?? allPosts[0];
  const latestPosts = allPosts.slice(0, 6);

  return (
    <PageTransition>
      <SEO
        title={siteSettings?.seo?.metaTitle || homeSeoTitle}
        description={siteSettings?.seo?.metaDescription || homeSeoDescription}
        appendSiteName={false}
        ogTitle={siteSettings?.seo?.ogTitle}
        ogDescription={siteSettings?.seo?.ogDescription}
        ogImage={siteSettings?.seo?.ogImage}
        twitterTitle={siteSettings?.seo?.twitterTitle}
        twitterDescription={siteSettings?.seo?.twitterDescription}
        twitterImage={siteSettings?.seo?.twitterImage}
        canonicalUrl={siteSettings?.seo?.canonicalUrl}
        noIndex={siteSettings?.seo?.noIndex}
        noFollow={siteSettings?.seo?.noFollow}
      />

      {/* Hero */}
      <section className="relative min-h-[85svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="container relative pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-balance break-words">
              Discover Tools That{" "}
              <span className="gradient-text">Actually Work</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your go-to source for{" "}
              <span className="text-foreground font-medium">AI tools, tech reviews, trading strategies, and finance tips.</span>
            </p>

            <div className="flex flex-wrap gap-4">
              {/* CHANGED: Link to= → Link href= */}
              <Link href="/blog" className="btn-gradient py-3 px-6 sm:px-8 text-sm inline-flex items-center gap-2">
                Explore Articles <ArrowRight size={16} />
              </Link>
              <a href="#featured" className="btn-outline-glow py-3 px-6 sm:px-8 text-sm">
                Watch Reviews
              </a>
            </div>
          </div>

          {/* Floating preview cards */}
          <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 space-y-4">
            {allPosts.slice(0, 3).map((post, i) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block glass-card-hover p-4 transition-transform hover:-translate-y-1"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-3">
                  <Image src={post.image} alt={post.title} width={64} height={64} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-primary font-medium">{post.category}</span>
                    <p className="text-sm font-medium leading-snug line-clamp-2">{post.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="container py-16">
        <BlogCard post={featured} featured />
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {allPosts.slice(1, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/blog" className="btn-outline-glow inline-flex items-center gap-2 py-3 px-8 text-sm">
            View All Posts <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="section-heading text-center mb-10">Explore by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || Bot;
            return (
              <div key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className="glass-card-hover flex flex-col items-center gap-3 p-6 text-center group"
                >
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon size={22} />
                  </div>
                  <span className="text-sm font-medium">{cat.name}</span>
                  <span className="text-xs text-muted-foreground">{cat.count} posts</span>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Latest */}
      <section className="container py-16">
        <h2 className="section-heading text-center mb-10">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <Newsletter />
    </PageTransition>
  );
}
