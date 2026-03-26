import { useParams } from "react-router-dom";
import { posts, categories } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

export default function Category() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const categoryPosts = posts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <PageTransition>
      <SEO title={category?.name || "Category"} description={`Browse all ${category?.name || ""} articles on TechPulse.`} />
      <div className="container pt-32 pb-16">
        <div className="mb-10">
          <span className="category-pill mb-3 inline-block">{category?.name || slug}</span>
          <h1 className="section-heading">{category?.name || "Category"}</h1>
          <p className="text-muted-foreground mt-2">{categoryPosts.length} article{categoryPosts.length !== 1 ? "s" : ""}</p>
        </div>

        {categoryPosts.length === 0 ? (
          <p className="text-muted-foreground">No posts in this category yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
      <Newsletter />
    </PageTransition>
  );
}
