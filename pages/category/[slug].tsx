import type { GetStaticPaths, GetStaticProps } from "next";
import { posts as staticPosts, categories, type Post } from "@/data/posts";
import { fetchSanityPosts } from "@/lib/sanity";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

interface Props {
  categoryName: string;
  categorySlug: string;
  categoryPosts: Post[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: categories.map((c) => ({ params: { slug: c.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slugStr = typeof params?.slug === "string" ? params.slug : "";
  const category = categories.find((c) => c.slug === slugStr);

  const sanityPosts = await fetchSanityPosts();
  const allPosts = [...sanityPosts, ...staticPosts];
  const categoryPosts = allPosts.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === slugStr
  );

  return {
    props: {
      categoryName: category?.name ?? slugStr,
      categorySlug: slugStr,
      categoryPosts,
    },
    revalidate: 60,
  };
};

export default function Category({ categoryName, categorySlug, categoryPosts }: Props) {

  return (
    <PageTransition>
      <SEO title={categoryName} description={`Browse all ${categoryName} articles on AllblogsIdea.`} />
      <div className="container pt-32 pb-16">
        <div className="mb-10">
          <span className="category-pill mb-3 inline-block">{categoryName}</span>
          <h1 className="section-heading">{categoryName}</h1>
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
