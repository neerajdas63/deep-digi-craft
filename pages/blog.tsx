import { useState } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { posts as staticPosts, type Post } from "@/data/posts";
import { fetchSanityPosts } from "@/lib/sanity";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const filters = ["All", "AI Tools", "Finance", "Trading", "Tech Gadgets", "Productivity", "Business", "Entertainment", "Technology"];
const sortOptions = ["Latest", "Popular", "Trending"];

interface Props { allPosts: Post[] }

export const getStaticProps: GetStaticProps<Props> = async () => {
  const sanityPosts = await fetchSanityPosts();
  const allPosts = [...sanityPosts, ...staticPosts];
  return { props: { allPosts }, revalidate: 60 };
};

export default function Blog({ allPosts }: Props) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const rawQuery = router.query.q;
  const searchQuery = typeof rawQuery === "string" ? rawQuery.trim().toLowerCase() : "";
  const categoryFiltered = activeFilter === "All" ? allPosts : allPosts.filter((p) => p.category === activeFilter);
  const filtered = searchQuery
    ? categoryFiltered.filter((post) =>
        [post.title, post.excerpt, post.category, ...post.tags]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery)
      )
    : categoryFiltered;

  return (
    <PageTransition>
      <SEO title="Blog" description="Read the latest articles on AI tools, finance, trading, and tech." />
      <div className="container pt-32 pb-16">
        <h1 className="section-heading mb-2">All Articles</h1>
        <p className="text-muted-foreground mb-8">In-depth reviews, guides, and insights.</p>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => { setActiveFilter(f); setVisibleCount(6); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            {sortOptions.map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  sortBy === s ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {searchQuery && (
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              Search results for <span className="text-foreground font-medium">{rawQuery}</span>
            </span>
            <button
              onClick={() => router.push("/blog")}
              className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary/80 transition-colors"
            >
              Clear
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice(0, visibleCount).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/30 p-8 text-center text-muted-foreground">
            No articles found.
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button onClick={() => setVisibleCount((c) => c + 6)} className="btn-outline-glow py-3 px-8 text-sm">
              Load More
            </button>
          </div>
        )}
      </div>
      <Newsletter />
    </PageTransition>
  );
}
