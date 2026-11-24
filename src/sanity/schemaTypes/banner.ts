import { defineField, defineType } from "sanity";

export const banner = defineType({
  name: "banner",
  title: "Hero Banner",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),
    defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subheading", title: "Subheading", type: "string" }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string", description: "e.g. /cricket or /product/pro-english-willow-bat" }),
    defineField({ name: "order", title: "Order", type: "number", initialValue: 0 }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  orderings: [{ name: "order", title: "Order", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "heading", media: "image", active: "active" },
    prepare: ({ title, media, active }) => ({ title, subtitle: active ? "Active" : "Hidden", media }),
  },
});
