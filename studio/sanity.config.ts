import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "deep-digi-craft",
  title: "Deep Digi Craft",

  projectId: "e5hboz3o",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  // Move the Delete action to the top of the toolbar so it's always visible
  document: {
    actions: (prev) =>
      prev.sort((a, b) => {
        // Put delete first so it's not buried in the "..." overflow menu
        if (a.action === "delete") return -1;
        if (b.action === "delete") return 1;
        return 0;
      }),
  },
});
