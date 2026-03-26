import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container relative text-center max-w-xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
          <Mail size={16} /> Newsletter
        </div>
        <h2 className="section-heading mb-4">Get Weekly AI Tool Reviews</h2>
        <p className="text-muted-foreground mb-8">
          Join <span className="text-foreground font-medium">10,000+</span> readers who get our curated insights every Friday.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-secondary rounded-xl px-5 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
          />
          <button type="submit" className="btn-gradient py-3 px-8 whitespace-nowrap">Subscribe</button>
        </form>
      </motion.div>
    </section>
  );
}
