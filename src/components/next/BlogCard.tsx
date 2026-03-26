// Next.js version of BlogCard — uses next/link instead of react-router-dom Link
import Link from "next/link";
import { motion } from "framer-motion";
import type { Post } from "@/data/posts";

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* CHANGED: Link to= → Link href= */}
        <Link href={`/blog/${post.slug}`} className="group block glass-card-hover overflow-hidden">
          <div className="relative aspect-[21/9] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <span className="category-pill mb-3 inline-block">{post.category}</span>
              <h2 className="font-heading text-2xl md:text-4xl font-bold leading-tight mb-3 text-foreground">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                <span>{post.author.name}</span>
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* CHANGED: Link to= → Link href= */}
      <Link href={`/blog/${post.slug}`} className="group block glass-card-hover overflow-hidden h-full">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="category-pill text-[11px]">{post.category}</span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-heading text-base font-semibold leading-snug mb-2 text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <img src={post.author.avatar} alt={post.author.name} className="w-5 h-5 rounded-full object-cover" />
            <span>{post.author.name}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
