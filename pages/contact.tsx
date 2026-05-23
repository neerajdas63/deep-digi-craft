// CHANGED: SEO → next/SEO (next/head instead of react-helmet-async)
// No react-router imports — Contact page has no Link usage
import { useState } from "react";
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Could not send message.");
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Message sent. We'll get back to you soon.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Could not send message.");
    }
  };

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
              className="glass-card p-8 rounded-2xl space-y-5"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
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
                  required
                  placeholder="What's this about?"
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us more..."
                  className="w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-border focus:ring-primary transition-all resize-none"
                />
              </div>
              {statusMessage && (
                <p className={`text-sm ${status === "success" ? "text-green-400" : "text-red-400"}`}>
                  {statusMessage}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-gradient w-full py-3 text-sm inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Send size={16} /> {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </motion.form>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="glass-card p-6 rounded-xl">
                <h3 className="font-heading font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail size={16} className="text-primary flex-shrink-0" />
                    allblogsideas@gmail.com
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
