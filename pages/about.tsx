// CHANGED: Link to= → Link href= (next/link)
// CHANGED: SEO → next/SEO
// REMOVED: import { Link } from "react-router-dom"
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, TrendingUp, Code, Smartphone, Lightbulb, Zap } from "lucide-react";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const timeline = [
  { year: "2022", title: "Started exploring AI tools", desc: "Began reviewing early AI assistants and sharing findings online." },
  { year: "2023", title: "Launched AllblogsIdea", desc: "Created the blog to share honest, in-depth reviews and guides." },
  { year: "2024", title: "10K+ monthly readers", desc: "Grew organically through quality content and community trust." },
  { year: "2025", title: "Expanded to Finance & Trading", desc: "Added coverage of fintech tools and trading platforms for Indian users." },
  { year: "2026", title: "10K newsletter subscribers", desc: "Built a thriving community of tech-savvy professionals." },
];

const topics = [
  { icon: Bot, name: "AI Tools" },
  { icon: TrendingUp, name: "Finance" },
  { icon: Code, name: "Developer Tools" },
  { icon: Smartphone, name: "Tech Gadgets" },
  { icon: Lightbulb, name: "Productivity" },
  { icon: Zap, name: "Automation" },
];

export default function About() {
  return (
    <PageTransition>
      <SEO title="About" description="Learn about AllblogsIdea — your source for honest AI tool reviews, tech insights, and finance tips." />
      <div className="container pt-32 pb-16">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="category-pill mb-4 inline-block">About AllblogsIdea</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
              Honest Reviews for the <span className="gradient-text">Modern Professional</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground leading-relaxed mb-6">
              AllblogsIdea was born from a simple frustration: most tech and tool reviews are either sponsored fluff or surface-level listicles. We go deeper — testing every tool ourselves and sharing what actually works for Indian professionals.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              {/* CHANGED: Link to= → Link href= */}
              <Link href="/blog" className="btn-gradient inline-flex items-center gap-2 py-3 px-8 text-sm">
                Read Our Articles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <div className="glass-card p-8 rounded-2xl">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div><p className="font-heading text-3xl font-bold gradient-text">200+</p><p className="text-xs text-muted-foreground mt-1">Articles</p></div>
                <div><p className="font-heading text-3xl font-bold gradient-text">10K+</p><p className="text-xs text-muted-foreground mt-1">Readers</p></div>
                <div><p className="font-heading text-3xl font-bold gradient-text">50+</p><p className="text-xs text-muted-foreground mt-1">Tools Reviewed</p></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="section-heading text-center mb-12">Our Journey</h2>
          <div className="max-w-2xl mx-auto space-y-0">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 relative pb-8 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {item.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pb-2">
                  <h3 className="font-heading font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Topics */}
        <div className="mb-20">
          <h2 className="section-heading text-center mb-10">Topics We Cover</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map(({ icon: Icon, name }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card-hover flex items-center gap-3 px-5 py-3 rounded-full"
              >
                <Icon size={18} className="text-primary" />
                <span className="text-sm font-medium">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center glass-card p-12 rounded-2xl">
          <h2 className="section-heading mb-4">Got a question or collaboration idea?</h2>
          <p className="text-muted-foreground mb-8">We'd love to hear from you.</p>
          {/* CHANGED: Link to= → Link href= */}
          <Link href="/contact" className="btn-gradient inline-flex items-center gap-2 py-3 px-8 text-sm">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
