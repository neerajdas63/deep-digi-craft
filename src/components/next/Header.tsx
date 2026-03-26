// Next.js version of Header — uses next/link + next/router instead of react-router-dom
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/data/posts";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // CHANGED: useLocation() → useRouter()
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // CHANGED: depends on router.pathname instead of location
  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [router.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-background/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* CHANGED: to= → href= */}
        <Link href="/" className="gradient-text font-heading text-xl font-bold tracking-tight">
          AllblogsIdea
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                // CHANGED: location.pathname → router.pathname
                router.pathname === link.path ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.name}
              {router.pathname === link.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                  style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))" }}
                />
              )}
            </Link>
          ))}

          {/* Categories dropdown */}
          <div className="relative">
            <button
              onClick={() => setCatOpen(!catOpen)}
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors hover:text-foreground ${
                router.pathname.startsWith("/category") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Categories <ChevronDown size={14} className={`transition-transform ${catOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full left-0 mt-2 w-48 glass-card p-2 rounded-xl"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-3 py-2 text-sm rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <Search size={18} />
          </button>
          <Link href="/blog" className="hidden sm:inline-flex btn-gradient text-sm py-2 px-5">
            Subscribe
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="container overflow-hidden"
          >
            <div className="py-3">
              <input
                autoFocus
                type="text"
                placeholder="Search articles..."
                className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-72 bg-background/95 backdrop-blur-xl border-l border-border p-6 pt-20 z-40"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    router.pathname === link.path
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-border my-2 pt-2">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Categories</p>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
