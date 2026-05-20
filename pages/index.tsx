import { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, TrendingUp, BarChart3, Cpu, Zap, Briefcase } from "lucide-react";
import { posts as staticPosts, categories, type Post } from "@/data/posts";
import { fetchSanityPosts, fetchSiteSettings, type SiteSettings } from "@/lib/sanity";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const iconMap: Record<string, React.ElementType> = { Bot, TrendingUp, BarChart3, Cpu, Zap, Briefcase };

const typewriterWords = ["AI Tools", "Finance Tips", "Tech Reviews", "Trading Strategies"];

function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(word.slice(0, charIdx + 1));
          if (charIdx + 1 === word.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx(charIdx + 1);
          }
        } else {
          setText(word.slice(0, charIdx));
          if (charIdx === 0) {
            setDeleting(false);
            setWordIdx((wordIdx + 1) % words.length);
          } else {
            setCharIdx(charIdx - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return text;
}

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
  const typedText = useTypewriter(typewriterWords);

  return (
    <PageTransition>
      <SEO
        title={siteSettings?.seo?.metaTitle || "Home"}
        description={siteSettings?.seo?.metaDescription || "Discover the best AI tools, tech reviews, and finance tips for young Indian professionals."}
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
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-glow-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container relative pt-32 pb-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6 text-balance break-words">
                Discover Tools That{" "}
                <span className="gradient-text">Actually Work</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8"
            >
              Your go-to source for{" "}
              <span className="text-foreground font-medium">{typedText}</span>
              <span className="animate-pulse text-primary">|</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {/* CHANGED: Link to= → Link href= */}
              <Link href="/blog" className="btn-gradient py-3 px-6 sm:px-8 text-sm inline-flex items-center gap-2">
                Explore Articles <ArrowRight size={16} />
              </Link>
              <a href="#featured" className="btn-outline-glow py-3 px-6 sm:px-8 text-sm">
                Watch Reviews
              </a>
            </motion.div>
          </div>

          {/* Floating preview cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-80 space-y-4"
          >
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
          </motion.div>
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
          {categories.map((cat, i) => {
            const Icon = iconMap[cat.icon] || Bot;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
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
              </motion.div>
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
