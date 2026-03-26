import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy, MessageCircle } from "lucide-react";
import { getPostBySlug, getRelatedPosts } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/SEO";
import PageTransition from "@/components/PageTransition";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="container pt-32 text-center">
        <h1 className="section-heading">Post not found</h1>
        <Link to="/blog" className="btn-gradient mt-6 inline-block py-3 px-8 text-sm">Back to Blog</Link>
      </div>
    );
  }

  const related = getRelatedPosts(post.slug, post.category);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareLinks = [
    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, label: "X" },
    { icon: MessageCircle, href: `https://wa.me/?text=${post.title} ${shareUrl}`, label: "WhatsApp" },
    { icon: Linkedin, href: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`, label: "LinkedIn" },
  ];

  return (
    <PageTransition>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        type="article"
        article={{ publishedTime: post.date, tags: post.tags }}
      />

      {/* Hero */}
      <div className="relative">
        <div className="aspect-[21/9] max-h-[500px] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container pb-10 pt-20">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="category-pill mb-4 block w-fit">{post.category}</span>
            <h1 className="font-heading text-3xl md:text-5xl font-bold leading-tight max-w-3xl mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1"><Calendar size={14} />{post.date}</div>
              <div className="flex items-center gap-1"><Clock size={14} />{post.readTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-5xl mx-auto">
          <article
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-strong:text-foreground prose-code:text-accent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {/* Share */}
              <div className="glass-card p-5 rounded-xl">
                <h4 className="font-heading text-sm font-semibold mb-4 flex items-center gap-2"><Share2 size={16} /> Share</h4>
                <div className="flex gap-2">
                  {shareLinks.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors">
                      <Icon size={16} />
                    </a>
                  ))}
                  <button
                    onClick={() => navigator.clipboard.writeText(shareUrl)}
                    className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="glass-card p-5 rounded-xl">
                <h4 className="font-heading text-sm font-semibold mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-secondary rounded-lg text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Author bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-16 glass-card p-6 rounded-xl flex gap-5 items-start"
        >
          <img src={post.author.avatar} alt={post.author.name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div>
            <h4 className="font-heading font-semibold mb-1">Written by {post.author.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Tech enthusiast, trader, and AI tools reviewer. Helping young Indian professionals make smarter decisions with technology and money.
            </p>
          </div>
        </motion.div>

        {/* Related */}
        {related.length > 0 && (
          <div className="max-w-5xl mx-auto mt-20">
            <h3 className="section-heading mb-8">Related Posts</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Newsletter />
    </PageTransition>
  );
}
