import { defineType, defineField } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image URL",
      type: "url",
      description:
        "Upload to Cloudinary → copy URL (https://res.cloudinary.com/...) → paste here. Recommended size: 1200×630 px.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI Tools", value: "AI Tools" },
          { title: "Finance", value: "Finance" },
          { title: "Trading", value: "Trading" },
          { title: "Tech Gadgets", value: "Tech Gadgets" },
          { title: "Productivity", value: "Productivity" },
          { title: "Business", value: "Business" },
          { title: "Entertainment", value: "Entertainment" },
          { title: "Technology", value: "Technology" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary shown on listing pages (120–160 characters).",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time",
      type: "string",
      placeholder: "e.g. 5 min read",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "featured",
      title: "Featured Post",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      description: "Search engine & social media optimisation settings for this post.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      subtitle: "category",
    },
    prepare({ title, author, subtitle }) {
      return {
        title,
        subtitle: [author ? `by ${author}` : "", subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
