// Next.js version of Footer — uses next/link instead of react-router-dom Link
import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Write for Us", path: "/write-for-us" },
  { name: "Contact", path: "/contact" },
];

const categoryLinks = [
  { name: "AI Tools", path: "/category/ai-tools" },
  { name: "Finance", path: "/category/finance" },
  { name: "Trading", path: "/category/trading" },
  { name: "Tech Gadgets", path: "/category/tech-gadgets" },
  { name: "Productivity", path: "/category/productivity" },
  { name: "Business", path: "/category/business" },
  { name: "Entertainment", path: "/category/entertainment" },
];

const socials = [
  { icon: Twitter, href: "https://x.com/", label: "Follow AllblogsIdea on X" },
  { icon: Youtube, href: "https://www.youtube.com/", label: "Follow AllblogsIdea on YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "Follow AllblogsIdea on LinkedIn" },
  { icon: Github, href: "https://github.com/", label: "Follow AllblogsIdea on GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20" style={{ borderImage: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent))) 1" }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="gradient-text font-heading text-xl font-bold">AllblogsIdea</span>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Honest reviews, sharp insights, and actionable advice on AI tools, tech, and finance for the modern Indian professional.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — CHANGED: Link to= → Link href= */}
          <div>
            <p className="font-heading text-sm font-semibold mb-4">Quick Links</p>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories — CHANGED: Link to= → Link href= */}
          <div>
            <p className="font-heading text-sm font-semibold mb-4">Categories</p>
            <ul className="space-y-2">
              {categoryLinks.map((l) => (
                <li key={l.path}>
                  <Link href={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <p className="font-heading text-sm font-semibold mb-4">Stay Updated</p>
            <p className="text-sm text-muted-foreground mb-3">Get the latest AI tool reviews delivered weekly.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all min-w-0"
              />
              <button type="submit" className="btn-gradient text-sm py-2 px-4 whitespace-nowrap">Go</button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 AllblogsIdea. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
