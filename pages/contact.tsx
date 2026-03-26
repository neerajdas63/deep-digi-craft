// CHANGED: SEO → next/SEO (next/head instead of react-helmet-async)
// No react-router imports — Contact page has no Link usage
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Twitter, Linkedin, Youtube, Github } from "lucide-react";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const socials = [
  { icon: Twitter, name: "Twitter / X", href: "#" },
  { icon: Linkedin, name: "LinkedIn", href: "#" },
  { icon: Youtube, name: "YouTube", href: "#" },
  { icon: Github, name: "GitHub", href: "#" },
];

export default function Contact() {
  return (
    <PageTransition>
      <SEO title="Contact" description="Get in touch with AllblogsIdea. We'd love to hear from you." />
      <div className="container pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="category-pill mb-4 inline-block">Contact</span>
            <h1 className="section-heading mb-4">Let's Connect</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have a question, partnership idea, or just want to say hi? Drop us a message.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-10">
            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="glass-card p-8 rounded-2xl space-y-5"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all resize-none"
                />
              </div>
              <button type="submit" className="btn-gradient w-full py-3 text-sm inline-flex items-center justify-center gap-2">
                <Send size={16} /> Send Message
              </button>
            </motion.form>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-heading font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    hello@techpulse.blog
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin size={16} className="text-primary flex-shrink-0" />
                    New Delhi, India
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
                <div className="space-y-2">
                  {socials.map(({ icon: Icon, name, href }) => (
                    <a
                      key={name}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <Icon size={16} /> {name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
