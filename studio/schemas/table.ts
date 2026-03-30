import { defineType, defineField, defineArrayMember } from "sanity";
import { TableInput } from "../components/TableInput";

/**
 * Table block — uses a custom spreadsheet-style grid editor.
 * First row is the header row; subsequent rows are data rows.
 */
export default defineType({
  name: "table",
  title: "Table",
  type: "object",
  components: {
    input: TableInput,
  },
  fields: [
    defineField({
      name: "caption",
      title: "Caption (optional)",
      type: "string",
      description: "Shown above the table. Leave blank if not needed.",
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      hidden: true, // managed entirely by TableInput UI above
      of: [
        defineArrayMember({
          name: "tableRow",
          title: "Row",
          type: "object",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { caption: "caption", rows: "rows" },
    prepare({ caption, rows }: { caption?: string; rows?: any[] }) {
      const cols = rows?.[0]?.cells?.length ?? 0;
      const rowCount = rows?.length ?? 0;
      return {
        title: caption || "Table",
        subtitle:
          rowCount > 0
            ? `${rowCount} row${rowCount !== 1 ? "s" : ""} × ${cols} col${cols !== 1 ? "s" : ""}`
            : "Empty table",
      };
    },
  },
});
