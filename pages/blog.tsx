// CHANGED: BlogCard → next/BlogCard (next/link internally)
// CHANGED: SEO → next/SEO (next/head internally)
// No react-router imports needed — Next.js handles routing via file system
import { useState } from "react";
import { posts } from "@/data/posts";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const filters = ["All", "AI Tools", "Finance", "Trading", "Tech Gadgets", "Productivity", "Business"];
const sortOptions = ["Latest", "Popular", "Trending"];

export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = activeFilter === "All" ? posts : posts.filter((p) => p.category === activeFilter);

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

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(0, visibleCount).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

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
