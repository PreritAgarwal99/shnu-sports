"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

/**
 * Sanity Studio config — the admin at /studio uses this.
 * `projectId` falls back to a placeholder so `next build` never crashes when
 * Sanity isn't configured yet; the Studio only works once a real id is set.
 */
export default defineConfig({
  name: "shnu-sports",
  title: "SHNU Sports — Admin",
  basePath: "/studio",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
