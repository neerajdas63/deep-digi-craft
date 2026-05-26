import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileText,
  Lightbulb,
  Mail,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import SEO from "@/components/next/SEO";
import PageTransition from "@/components/PageTransition";

const topics = [
  "AI tools and automation workflows",
  "SaaS, productivity, and business software",
  "Fintech, personal finance, and trading platforms",
  "Tech gadgets, apps, and digital work tools",
  "Practical tutorials, comparisons, and implementation guides",
];

const standards = [
  "Original content only, written for AllblogsIdea readers.",
  "Clear examples, practical steps, and honest limitations.",
  "No thin AI-generated rewrites, spun content, or copied research.",
  "Neutral, useful recommendations instead of promotional fluff.",
  "Proper attribution for claims, statistics, screenshots, and quotes.",
];

const submissionChecklist = [
  "Suggested title and target keyword",
  "Short author bio",
  "Article draft or outline",
  "Relevant screenshots or image links, if any",
  "Disclosure of any brand, affiliate, or sponsorship connection",
];

export default function WriteForUs() {
  return (
    <PageTransition>
      <SEO
        title="Write for Us"
        description="Write for AllblogsIdea. Submit original guest posts about AI tools, technology, finance, trading, productivity, SaaS, and digital workflows."
      />

      <div className="container pt-32 pb-16">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <span className="category-pill mb-4 inline-block">Contribute</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight mb-6">
            Write for <span className="gradient-text">AllblogsIdea</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Share practical, well-researched articles with readers who care about AI tools,
            technology, finance, productivity, and digital business decisions.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:allblogsideas@gmail.com?subject=Guest%20Post%20Submission%20for%20AllblogsIdea"
              className="btn-gradient inline-flex items-center gap-2 py-3 px-7 text-sm"
            >
              Pitch an Article <Mail size={16} />
            </a>
            <Link href="/contact" className="btn-outline-glow inline-flex items-center gap-2 py-3 px-7 text-sm">
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <div className="glass-card p-6 rounded-xl">
            <Lightbulb className="text-primary mb-4" size={24} />
            <h2 className="font-heading text-lg font-semibold mb-2">Useful Ideas</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We prefer articles that solve a real reader problem, compare options, or explain a workflow clearly.
            </p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <SearchCheck className="text-primary mb-4" size={24} />
            <h2 className="font-heading text-lg font-semibold mb-2">Search Friendly</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Strong submissions have clear intent, helpful headings, examples, FAQs, and accurate sources.
            </p>
          </div>
          <div className="glass-card p-6 rounded-xl">
            <ShieldCheck className="text-primary mb-4" size={24} />
            <h2 className="font-heading text-lg font-semibold mb-2">Editorial Quality</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We edit for clarity, accuracy, originality, and reader trust before anything goes live.
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 max-w-5xl mx-auto">
          <main className="space-y-8">
            <section className="glass-card p-6 sm:p-8 rounded-xl">
              <div className="flex items-center gap-3 mb-5">
                <FileText className="text-primary" size={22} />
                <h2 className="font-heading text-2xl font-bold">Topics We Accept</h2>
              </div>
              <ul className="space-y-3">
                {topics.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm text-muted-foreground">
                    <BadgeCheck size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-card p-6 sm:p-8 rounded-xl">
              <h2 className="font-heading text-2xl font-bold mb-5">Editorial Guidelines</h2>
              <ul className="space-y-3">
                {standards.map((standard) => (
                  <li key={standard} className="flex gap-3 text-sm text-muted-foreground">
                    <BadgeCheck size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    <span>{standard}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-card p-6 sm:p-8 rounded-xl">
              <h2 className="font-heading text-2xl font-bold mb-4">How to Submit</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Send your pitch or draft to our editorial inbox. Keep the subject line clear and include the details
                below so we can review it faster.
              </p>
              <ul className="space-y-3">
                {submissionChecklist.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <BadgeCheck size={16} className="mt-0.5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </main>

          <aside className="space-y-6">
            <div className="glass-card p-6 rounded-xl sticky top-28">
              <h2 className="font-heading text-xl font-bold mb-3">Quick Pitch Format</h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Subject:</strong> Guest Post Pitch - Your Topic</p>
                <p><strong className="text-foreground">Include:</strong> title, outline, target keyword, and author bio.</p>
                <p><strong className="text-foreground">Email:</strong> allblogsideas@gmail.com</p>
              </div>
              <a
                href="mailto:allblogsideas@gmail.com?subject=Guest%20Post%20Pitch%20-%20AllblogsIdea"
                className="btn-gradient mt-5 inline-flex w-full items-center justify-center gap-2 py-3 text-sm"
              >
                Send Pitch <Mail size={16} />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
