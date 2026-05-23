import { defineType, defineArrayMember, defineField } from "sanity";

/**
 * Rich-text body used in posts.
 * Supports: H2, H3, blockquote, bold, italic, code, links, and inline images.
 */
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Heading 4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
          { title: "Underline", value: "underline" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              defineField({
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }),
              }),
              defineField({
                title: "No Follow",
                name: "noFollow",
                type: "boolean",
                description: "Add rel=\"nofollow\" to this specific link.",
                initialValue: false,
              }),
              defineField({
                title: "Sponsored",
                name: "sponsored",
                type: "boolean",
                description: "Use for affiliate, paid, or sponsored links.",
                initialValue: false,
              }),
            ],
          },
        ],
      },
    }),
    // Inline images inside the post body
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "imageUrl",
          type: "url",
          title: "Cloudinary / External Image URL",
          description: "Paste a Cloudinary image URL here instead of uploading.",
        }),
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative Text",
          description: "Required for accessibility.",
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
        }),
      ],
    }),
    // Table block
    defineArrayMember({
      type: "table",
    }),
  ],
});
