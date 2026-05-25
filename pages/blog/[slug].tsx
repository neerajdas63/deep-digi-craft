import type { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Linkedin, Copy, MessageCircle } from "lucide-react";
import { posts as staticPosts, type Post } from "@/data/posts";
import { fetchSanitySlugs, fetchSanityPostBySlug, fetchSanityPosts } from "@/lib/sanity";
import BlogCard from "@/components/next/BlogCard";
import Newsletter from "@/components/Newsletter";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

interface Props {
  post: Post;
  related: Post[];
}

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .trim();

const slugifyHeading = (value: string, counts: Record<string, number>) => {
  const base =
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") || "section";
  const safeBase = /^[a-z]/.test(base) ? base : `section-${base}`;
  counts[safeBase] = (counts[safeBase] ?? 0) + 1;
  return counts[safeBase] === 1 ? safeBase : `${safeBase}-${counts[safeBase]}`;
};

const getPortableText = (block: any) =>
  (block?.children ?? [])
    .map((child: any) => child?.text ?? "")
    .join("")
    .trim();

const preparePostContent = (post: Post) => {
  const counts: Record<string, number> = {};
  const tocItems: TocItem[] = [];
  const portableHeadingIds = new Map<string, string>();

  if (post.portableContent) {
    post.portableContent.forEach((block: any) => {
      if (block?._type !== "block" || (block.style !== "h2" && block.style !== "h3")) return;
      const text = getPortableText(block);
      if (!text) return;
      const id = slugifyHeading(text, counts);
      tocItems.push({ id, text, level: block.style === "h3" ? 3 : 2 });
      if (block._key) portableHeadingIds.set(block._key, id);
    });

    return { tocItems, portableHeadingIds, content: post.content };
  }

  const content = post.content.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level: string, attrs: string, inner: string) => {
      const text = stripHtml(inner);
      if (!text) return match;

      const idMatch = attrs.match(/\sid=(["'])(.*?)\1/i);
      const id = idMatch?.[2] || slugifyHeading(text, counts);
      tocItems.push({ id, text, level: level === "3" ? 3 : 2 });

      const nextAttrs = idMatch ? attrs : `${attrs} id="${id}"`;
      return `<h${level}${nextAttrs}>${inner}</h${level}>`;
    }
  );

  return { tocItems, portableHeadingIds, content };
};

function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="glass-card p-5 rounded-xl" aria-label="Table of contents">
      <h4 className="font-heading text-sm font-semibold mb-4">Table of Contents</h4>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${item.id}`}
              className="block text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const sanitySlugs = await fetchSanitySlugs();
  const staticSlugs = staticPosts.map((p) => p.slug);
  const allSlugs = [...new Set([...sanitySlugs, ...staticSlugs])];
  return {
    paths: allSlugs.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";

  // Try Sanity first, then fall back to static posts
  const sanityPost = await fetchSanityPostBySlug(slug);
  const post = sanityPost ?? staticPosts.find((p) => p.slug === slug) ?? null;

  if (!post) return { notFound: true };

  // Related posts: prefer Sanity posts in same category, then static
  const sanityAll = await fetchSanityPosts();
  const allPosts = [...sanityAll, ...staticPosts];
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return { props: { post, related }, revalidate: 60 };
};

export default function BlogPost({ post, related }: Props) {
  const { tocItems, portableHeadingIds, content } = preparePostContent(post);

  const shareUrl = post.seo?.canonicalUrl || `https://allblogsidea.com/blog/${post.slug}`;
  const shareLinks = [
    { icon: Twitter, href: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`, label: "X" },
    { icon: MessageCircle, href: `https://wa.me/?text=${post.title} ${shareUrl}`, label: "WhatsApp" },
    { icon: Linkedin, href: `https://linkedin.com/sharing/share-offsite/?url=${shareUrl}`, label: "LinkedIn" },
  ];

  const portableTextComponents = {
    // Map each block style to the correct HTML element with spacing
    block: {
      normal: ({ children }: any) => (
        <p className="text-muted-foreground leading-relaxed mb-5">{children}</p>
      ),
      h2: ({ children, value }: any) => (
        <h2 id={value?._key ? portableHeadingIds.get(value._key) : undefined} className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-12 mb-4 scroll-mt-28">{children}</h2>
      ),
      h3: ({ children, value }: any) => (
        <h3 id={value?._key ? portableHeadingIds.get(value._key) : undefined} className="font-heading text-xl md:text-2xl font-bold text-foreground mt-10 mb-3 scroll-mt-28">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="font-heading text-lg font-bold text-foreground mt-8 mb-2">{children}</h4>
      ),
      blockquote: ({ children }: any) => (
        <blockquote className="my-8 border-l-4 border-primary pl-6 text-lg font-semibold italic leading-relaxed text-primary">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc list-outside pl-6 mb-5 space-y-2 text-muted-foreground">{children}</ul>
      ),
      number: ({ children }: any) => (
        <ol className="list-decimal list-outside pl-6 mb-5 space-y-2 text-muted-foreground">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
      number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-foreground">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      code: ({ children }: any) => (
        <code className="bg-secondary text-accent px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
      ),
      underline: ({ children }: any) => <span className="underline">{children}</span>,
      link: ({ value, children }: any) => (
        <a
          href={value?.href}
          target={value?.href?.startsWith("http") ? "_blank" : undefined}
          rel={[
            value?.href?.startsWith("http") ? "noopener noreferrer" : "",
            value?.noFollow ? "nofollow" : "",
            value?.sponsored ? "sponsored" : "",
          ].filter(Boolean).join(" ") || undefined}
          className="text-primary underline hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      ),
    },
    types: {
      table: ({ value }: any) => (
        <div className="overflow-x-auto my-8 not-prose">
          {value.caption && (
            <p className="text-xs text-muted-foreground mb-2 text-center">{value.caption}</p>
          )}
          <table className="w-full border-collapse text-sm">
            <tbody>
              {(value.rows ?? []).map((row: any, ri: number) => (
                <tr
                  key={row._key ?? ri}
                  className={
                    ri === 0
                      ? "bg-primary/10"
                      : "border-b border-border hover:bg-muted/20 transition-colors"
                  }
                >
                  {(row.cells ?? []).map((cell: string, ci: number) =>
                    ri === 0 ? (
                      <th
                        key={ci}
                        className="px-4 py-3 text-left font-semibold border border-border text-foreground whitespace-nowrap"
                      >
                        {cell}
                      </th>
                    ) : (
                      <td key={ci} className="px-4 py-3 border border-border text-muted-foreground">
                        {cell}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
      image: ({ value }: any) => {
        const src = value.imageUrl ?? value.asset?.url;
        if (!src) return null;
        return (
          <figure className="my-8 not-prose">
            <img src={src} alt={value.alt ?? ""} className="w-full rounded-xl object-cover" />
            {value.caption && (
              <figcaption className="text-center text-xs text-muted-foreground mt-2">{value.caption}</figcaption>
            )}
          </figure>
        );
      },
    },
  };

  return (
    <PageTransition>
      <SEO
        title={post.seo?.metaTitle || post.title}
        description={post.seo?.metaDescription || post.excerpt}
        image={post.image}
        type="article"
        article={{ publishedTime: post.date, tags: post.tags }}
        ogTitle={post.seo?.ogTitle}
        ogDescription={post.seo?.ogDescription}
        ogImage={post.seo?.ogImage}
        twitterTitle={post.seo?.twitterTitle}
        twitterDescription={post.seo?.twitterDescription}
        twitterImage={post.seo?.twitterImage}
        canonicalUrl={post.seo?.canonicalUrl}
        noIndex={post.seo?.noIndex}
        noFollow={post.seo?.noFollow}
      />

      {/* Hero */}
      <div className="relative">
        <div className="relative aspect-[4/3] max-h-[500px] overflow-hidden sm:aspect-[16/9] md:aspect-[21/9]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="relative bg-background md:absolute md:bottom-0 md:left-0 md:right-0 md:bg-transparent">
          <div className="container pb-8 pt-6 md:pb-10 md:pt-20">
            {/* CHANGED: Link to= → Link href= */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="category-pill mb-4 block w-fit">{post.category}</span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-3xl mb-4 break-words">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Image src={post.author.avatar} alt={post.author.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1"><Calendar size={14} />{post.date}</div>
              <div className="flex items-center gap-1"><Clock size={14} />{post.readTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-10 md:py-12">
        <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-5xl mx-auto">
          <article className="max-w-none">
            <div className="mb-8 lg:hidden">
              <TableOfContents items={tocItems} />
            </div>
            {post.portableContent ? (
              <PortableText value={post.portableContent} components={portableTextComponents} />
            ) : (
              <div
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-heading prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-28
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:my-8 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:text-lg prose-blockquote:font-semibold prose-blockquote:italic prose-blockquote:leading-relaxed prose-blockquote:text-primary
                  prose-strong:text-foreground prose-code:text-accent"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              <TableOfContents items={tocItems} />

              {/* Share */}
              <div className="glass-card p-5 rounded-xl">
                <h4 className="font-heading text-sm font-semibold mb-4 flex items-center gap-2"><Share2 size={16} /> Share</h4>
                <div className="flex gap-2">
                  {shareLinks.map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} aria-label={`Share on ${label}`} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors">
                      <Icon size={16} />
                    </a>
                  ))}
                  <button
                    type="button"
                    aria-label="Copy post link"
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
          className="max-w-3xl mx-auto mt-16 glass-card p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row gap-5 items-start"
        >
          <Image src={post.author.avatar} alt={post.author.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
          <div>
            <h4 className="font-heading font-semibold mb-1">Written by {post.author.name}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {post.author.bio ?? "Tech enthusiast, trader, and AI tools reviewer. Helping young Indian professionals make smarter decisions with technology and money."}
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
