import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Name",
      type: "string",
      description: "Used as the suffix on every page title (e.g. 'AllblogsIdea').",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO",
      type: "seo",
      description: "SEO & social settings for the homepage.",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
    prepare({ title }) {
      return { title: title ?? "Site Settings" };
    },
  },
});
