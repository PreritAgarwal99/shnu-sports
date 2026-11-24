import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "details", title: "Details" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({ name: "name", title: "Name", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sport",
      title: "Sport",
      type: "reference",
      to: [{ type: "sport" }],
      group: "main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Gear category",
      type: "reference",
      to: [{ type: "category" }],
      group: "main",
      // Only categories belonging to the selected sport.
      options: {
        filter: ({ document }) => {
          const sportRef = (document as { sport?: { _ref?: string } })?.sport?._ref;
          if (!sportRef) return { filter: "", params: {} };
          return { filter: "sport._ref == $sportRef", params: { sportRef } };
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "brand", title: "Brand", type: "reference", to: [{ type: "brand" }], group: "main" }),

    defineField({
      name: "images",
      title: "Images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
      validation: (r) => r.min(1).error("Add at least one image"),
    }),

    defineField({ name: "price", title: "Price (₹)", type: "number", group: "main", validation: (r) => r.required().min(0) }),
    defineField({ name: "mrp", title: "MRP (₹)", type: "number", group: "main", description: "Original price. If higher than Price, a discount badge shows." }),
    defineField({ name: "inStock", title: "In stock", type: "boolean", group: "main", initialValue: true }),
    defineField({ name: "featured", title: "Featured", type: "boolean", group: "main", initialValue: false }),

    defineField({ name: "shortDescription", title: "Short description", type: "text", rows: 3, group: "main" }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
      group: "details",
      description: "Key selling points shown as bullets.",
    }),
    defineField({
      name: "specs",
      title: "Specifications",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "value", title: "Value", type: "string" },
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({ name: "richDescription", title: "Full description", type: "array", of: [{ type: "block" }], group: "details" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" }, group: "details" }),
  ],
  orderings: [
    { name: "priceAsc", title: "Price (low → high)", by: [{ field: "price", direction: "asc" }] },
    { name: "priceDesc", title: "Price (high → low)", by: [{ field: "price", direction: "desc" }] },
  ],
  preview: {
    select: { title: "name", media: "images.0", price: "price", category: "category.name" },
    prepare: ({ title, media, price, category }) => ({
      title,
      subtitle: [category, price != null ? `₹${price}` : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
