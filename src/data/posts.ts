export interface PostSEO {
  metaTitle?: string;
  metaDescription?: string;
  focusKeyword?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export interface PostFAQ {
  question: string;
  answer: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  /** PortableText blocks — present only for posts fetched from Sanity */
  portableContent?: any[];
  category: string;
  image: string;
  author: { name: string; avatar: string; bio?: string };
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  faqs?: PostFAQ[];
  /** Full RankMath-style SEO fields — set in Sanity Studio */
  seo?: PostSEO;
}

export const categories = [
  { name: "AI Tools", slug: "ai-tools", icon: "Bot", count: 4 },
  { name: "Finance", slug: "finance", icon: "TrendingUp", count: 2 },
  { name: "Trading", slug: "trading", icon: "BarChart3", count: 2 },
  { name: "Tech Gadgets", slug: "tech-gadgets", icon: "Cpu", count: 1 },
  { name: "Productivity", slug: "productivity", icon: "Zap", count: 1 },
  { name: "Business", slug: "business", icon: "Briefcase", count: 1 },
  { name: "Entertainment", slug: "entertainment", icon: "Briefcase", count: 1 },
  { name: "Technology", slug: "technology", icon: "Cpu", count: 0 },
];

const author = {
  name: "Neeraj",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
};

export const posts: Post[] = [
  {
    id: "1",
    slug: "best-ai-coding-assistants-2026",
    title: "The 7 Best AI Coding Assistants in 2026 — Ranked & Reviewed",
    excerpt: "From GitHub Copilot to Cursor, we tested every major AI coding tool so you don't have to. Here's what actually ships faster.",
    content: `<p>The landscape of AI coding assistants has evolved dramatically. What started as simple autocomplete has become full-blown pair programming. We spent 3 months testing every major tool.</p>
<h2>1. Cursor — The New Standard</h2>
<p>Cursor has redefined what an AI-first IDE looks like. With its codebase-aware context window and multi-file editing, it feels like having a senior developer on call 24/7.</p>
<blockquote>Cursor isn't just an AI tool — it's a new way of thinking about software development.</blockquote>
<h2>2. GitHub Copilot X</h2>
<p>The OG of AI coding. Copilot X now includes workspace agents, PR summaries, and deep integration with the GitHub ecosystem. If you're already in the Microsoft stack, this is a no-brainer.</p>
<h2>3. Lovable — Build Full Apps From Prompts</h2>
<p>Lovable takes a fundamentally different approach. Instead of assisting line-by-line, it generates entire applications from natural language descriptions. Perfect for MVPs and rapid prototyping.</p>
<h2>Key Takeaways</h2>
<p>The best AI coding assistant depends on your workflow. For solo developers, Cursor excels. For teams, Copilot X integrates seamlessly. For non-technical founders, Lovable is revolutionary.</p>`,
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
    author,
    date: "Mar 20, 2026",
    readTime: "8 min read",
    tags: ["AI", "Coding", "Developer Tools"],
    featured: true,
  },
  {
    id: "2",
    slug: "chatgpt-vs-claude-vs-gemini",
    title: "ChatGPT vs Claude vs Gemini: The Ultimate 2026 Comparison",
    excerpt: "We put all three models through 50 real-world tasks. The results might surprise you.",
    content: `<p>In the battle of AI chatbots, there's no single winner. Each model excels in different areas. Here's our comprehensive comparison after months of testing.</p>
<h2>Reasoning & Analysis</h2>
<p>Claude leads in nuanced reasoning and following complex instructions. Its ability to maintain context across long conversations is unmatched.</p>
<h2>Creative Writing</h2>
<p>ChatGPT still edges ahead for creative tasks, with more natural-sounding prose and better understanding of tone and style.</p>
<h2>Multimodal Tasks</h2>
<p>Gemini dominates here with its native multimodal capabilities, especially in image understanding and generation.</p>`,
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1684487747720-1ba29cda82c8?w=800&h=450&fit=crop",
    author,
    date: "Mar 18, 2026",
    readTime: "12 min read",
    tags: ["AI", "ChatGPT", "Claude", "Gemini"],
  },
  {
    id: "3",
    slug: "best-trading-platforms-india-2026",
    title: "Best Trading Platforms in India for 2026: Zero Brokerage to Pro Tools",
    excerpt: "From Zerodha to Groww, we compare the top platforms for Indian traders and investors.",
    content: `<p>India's trading landscape has matured significantly. With SEBI's new regulations and the rise of retail trading, choosing the right platform matters more than ever.</p>
<h2>Zerodha Kite</h2>
<p>Still the gold standard for active traders. The charting tools, API access, and ecosystem (Varsity, Console) make it unbeatable for serious traders.</p>
<h2>Groww</h2>
<p>The best option for beginners. Clean interface, mutual fund integration, and a growing stock trading platform.</p>
<h2>Angel One</h2>
<p>Best for those who want AI-powered recommendations alongside their trading platform.</p>`,
    category: "Trading",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=450&fit=crop",
    author,
    date: "Mar 15, 2026",
    readTime: "10 min read",
    tags: ["Trading", "India", "Stocks"],
  },
  {
    id: "4",
    slug: "ai-tools-save-10-hours-weekly",
    title: "10 AI Tools That Will Save You 10 Hours Every Week",
    excerpt: "Stop doing repetitive tasks manually. These AI tools automate the boring stuff so you can focus on what matters.",
    content: `<p>Time is the most valuable resource. These tools have genuinely transformed how I work, saving at least 10 hours weekly.</p>
<h2>1. Notion AI</h2>
<p>Automatic summaries, action items from meetings, and smart templates. Notion AI turns your workspace into an intelligent assistant.</p>
<h2>2. Otter.ai</h2>
<p>Never take manual meeting notes again. Otter transcribes, summarizes, and even assigns action items automatically.</p>
<h2>3. Grammarly</h2>
<p>Beyond grammar checking — it now rewrites entire paragraphs, adjusts tone, and ensures your writing is professional.</p>`,
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    author,
    date: "Mar 12, 2026",
    readTime: "7 min read",
    tags: ["AI", "Productivity", "Automation"],
  },
  {
    id: "5",
    slug: "sip-vs-lumpsum-2026-analysis",
    title: "SIP vs Lump Sum in 2026: Data-Driven Analysis for Indian Investors",
    excerpt: "We analyzed 20 years of Nifty 50 data to settle the debate once and for all.",
    content: `<p>The SIP vs Lump Sum debate resurfaces every market cycle. Instead of opinions, let's look at the data.</p>
<h2>The Data Speaks</h2>
<p>Over any 10-year period since 2000, lump sum investing outperformed SIP roughly 65% of the time. But that stat alone is misleading.</p>
<h2>Risk-Adjusted Returns</h2>
<p>When we factor in volatility and drawdown risk, SIP provides a significantly smoother ride. For most salaried professionals, SIP remains the practical choice.</p>
<h2>The Hybrid Approach</h2>
<p>The smartest strategy? Regular SIPs with tactical lump sum additions during market corrections of 10%+ from recent highs.</p>`,
    category: "Finance",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&h=450&fit=crop",
    author,
    date: "Mar 10, 2026",
    readTime: "9 min read",
    tags: ["Finance", "SIP", "Investing", "India"],
  },
  {
    id: "6",
    slug: "midjourney-v7-review",
    title: "Midjourney V7 Review: Is AI Art Finally Indistinguishable from Reality?",
    excerpt: "The latest Midjourney update blurs the line between AI-generated and real photography. Here's our deep dive.",
    content: `<p>Midjourney V7 represents a quantum leap in AI image generation. The photorealism is genuinely unsettling in the best way possible.</p>
<h2>What's New</h2>
<p>Native video generation, 3D model export, and a new "style memory" feature that learns your aesthetic preferences over time.</p>
<h2>Quality Comparison</h2>
<p>Side-by-side with DALL-E 3 and Stable Diffusion XL, Midjourney V7 produces consistently more photorealistic results with better composition.</p>`,
    category: "AI Tools",
    image: "https://images.unsplash.com/photo-1686191128892-3261aee6c5f5?w=800&h=450&fit=crop",
    author,
    date: "Mar 8, 2026",
    readTime: "6 min read",
    tags: ["AI", "Midjourney", "Art"],
  },
  {
    id: "7",
    slug: "iphone-17-pro-worth-it",
    title: "iPhone 17 Pro: Is Apple's AI Phone Worth ₹1,49,900?",
    excerpt: "Apple's latest flagship promises on-device AI that actually works. We tested every feature for 2 weeks.",
    content: `<p>The iPhone 17 Pro is Apple's most ambitious phone yet, with a dedicated Neural Engine chip and on-device large language model.</p>
<h2>Apple Intelligence 2.0</h2>
<p>Siri is finally useful. The on-device LLM handles complex tasks, writes emails, and manages your calendar with genuine intelligence.</p>
<h2>Camera System</h2>
<p>The 48MP periscope telephoto is extraordinary. Night mode at 10x zoom produces usable shots — something unthinkable two years ago.</p>
<h2>Should You Buy It?</h2>
<p>At ₹1,49,900, it's expensive even by Apple standards. But if you're coming from an iPhone 14 or earlier, the leap is transformative.</p>`,
    category: "Tech Gadgets",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=450&fit=crop",
    author,
    date: "Mar 5, 2026",
    readTime: "11 min read",
    tags: ["Apple", "iPhone", "Gadgets"],
  },
  {
    id: "8",
    slug: "options-trading-beginners-india",
    title: "Options Trading for Beginners: A No-BS Guide for Indian Traders",
    excerpt: "Everything you need to know about Nifty options before you blow up your account. Practical strategies included.",
    content: `<p>Options trading is where fortunes are made and lost in Indian markets. This guide cuts through the jargon and gives you actionable knowledge.</p>
<h2>Understanding the Basics</h2>
<p>An option is a contract that gives you the right (not obligation) to buy or sell an underlying asset. In India, Nifty 50 and Bank Nifty options are the most liquid.</p>
<h2>Your First Strategy: Bull Call Spread</h2>
<p>Buy an ATM call, sell an OTM call. This limits both your risk and reward, making it perfect for beginners. Max loss = premium paid.</p>
<h2>Risk Management</h2>
<p>Never risk more than 2% of your capital on a single trade. Use stop losses religiously. Paper trade for at least 3 months before going live.</p>`,
    category: "Trading",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=450&fit=crop",
    author,
    date: "Mar 2, 2026",
    readTime: "14 min read",
    tags: ["Trading", "Options", "Beginners"],
  },
  {
    id: "9",
    slug: "building-saas-with-ai-2026",
    title: "How to Build a SaaS Product in 2026 Using Only AI Tools",
    excerpt: "From idea to paying customers — a step-by-step guide using Lovable, Cursor, and GPT-4 to build and launch a SaaS.",
    content: `<p>Building a SaaS product no longer requires a team of developers. With the right AI tools, a solo founder can go from idea to revenue in weeks.</p>
<h2>Step 1: Validate Your Idea</h2>
<p>Use ChatGPT to analyze market gaps, generate landing page copy, and create a waitlist. Tools like Lovable can build your landing page in minutes.</p>
<h2>Step 2: Build the MVP</h2>
<p>Lovable handles the frontend beautifully. For backend logic, use Supabase for auth and database, and Cursor for any custom code.</p>
<h2>Step 3: Launch & Iterate</h2>
<p>Ship fast, get feedback, iterate. The AI tools let you move at 10x speed compared to traditional development.</p>`,
    category: "Business",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    author,
    date: "Feb 28, 2026",
    readTime: "13 min read",
    tags: ["SaaS", "Business", "AI"],
  },
  {
    id: "10",
    slug: "personal-finance-apps-india",
    title: "5 Personal Finance Apps Every Indian Should Use in 2026",
    excerpt: "Track expenses, automate investments, and build wealth with these must-have apps.",
    content: `<p>Managing personal finances doesn't have to be complicated. These 5 apps cover everything from expense tracking to tax optimization.</p>
<h2>1. Fi Money</h2>
<p>The best neobank for young professionals. Smart deposits, automated savings, and a beautiful interface.</p>
<h2>2. Kuvera</h2>
<p>Direct mutual fund investing with zero commission. The goal-based planning feature is exceptional.</p>
<h2>3. Wint Wealth</h2>
<p>Fixed income investing made accessible. Bonds and NCDs with returns better than FDs.</p>`,
    category: "Finance",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=450&fit=crop",
    author,
    date: "Feb 25, 2026",
    readTime: "6 min read",
    tags: ["Finance", "Apps", "India"],
  },
];

export const getPostsByCategory = (category: string) =>
  posts.filter((p) => p.category.toLowerCase().replace(/\s+/g, "-") === category);

export const getPostBySlug = (slug: string) =>
  posts.find((p) => p.slug === slug);

export const getFeaturedPost = () =>
  posts.find((p) => p.featured) || posts[0];

export const getRelatedPosts = (currentSlug: string, category: string) =>
  posts.filter((p) => p.slug !== currentSlug && p.category === category).slice(0, 3);
