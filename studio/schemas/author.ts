import { defineType, defineField } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "avatar",
      title: "Avatar URL",
      type: "url",
      description:
        "Upload your photo to Cloudinary, copy the URL (https://res.cloudinary.com/...) and paste it here.",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3,
      description: "Short author bio shown at the bottom of every post.",
    }),
  ],
});
