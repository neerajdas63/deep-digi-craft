import { defineType, defineField } from "sanity";

/**
 * Reusable SEO object — mirrors RankMath's field set.
 * Add it to any document with:
 *   defineField({ name: "seo", title: "SEO", type: "seo" })
 */
export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  groups: [
    { name: "basic",   title: "Basic SEO",    default: true },
    { name: "social",  title: "Social (OG/Twitter)" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    // ── Basic SEO ─────────────────────────────────────────────────
    defineField({
      name: "focusKeyword",
      title: "Focus Keyword",
      type: "string",
      group: "basic",
      description:
        "Primary keyword you want this page to rank for (e.g. 'best AI tools 2026').",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      group: "basic",
      description:
        "Shown in browser tab & search results. 50–60 characters recommended. Leave blank to use the post/page title.",
      validation: (Rule) =>
        Rule.max(60).warning("SEO title is most effective at 50–60 characters."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      group: "basic",
      description:
        "Shown under the title in search results. 120–160 characters recommended. Leave blank to use the excerpt.",
      validation: (Rule) =>
        Rule.max(160).warning("Meta description is most effective at 120–160 characters."),
    }),

    // ── Social ─────────────────────────────────────────────────────
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      group: "social",
      description:
        "Title shown when shared on Facebook / LinkedIn. Defaults to SEO title.",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 2,
      group: "social",
      description: "Description shown when shared on Facebook / LinkedIn. Defaults to meta description.",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image URL",
      type: "url",
      group: "social",
      description: "Image shown in social previews. Recommended: 1200×630 px.",
    }),
    defineField({
      name: "twitterTitle",
      title: "Twitter Title",
      type: "string",
      group: "social",
      description: "Overrides OG title for Twitter/X cards.",
    }),
    defineField({
      name: "twitterDescription",
      title: "Twitter Description",
      type: "text",
      rows: 2,
      group: "social",
      description: "Overrides OG description for Twitter/X cards.",
    }),
    defineField({
      name: "twitterImage",
      title: "Twitter Image URL",
      type: "url",
      group: "social",
      description: "Overrides OG image for Twitter/X cards.",
    }),

    // ── Advanced ───────────────────────────────────────────────────
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      group: "advanced",
      description:
        "Set a custom canonical URL to avoid duplicate content issues. Leave blank to use the page URL.",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      group: "advanced",
      description: "Tell search engines NOT to index this page.",
      initialValue: false,
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      group: "advanced",
      description: "Tell search engines NOT to follow links on this page.",
      initialValue: false,
    }),
  ],
});
