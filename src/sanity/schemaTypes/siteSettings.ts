import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton: there is only ever one of these (the Studio hides the "create new").
  fields: [
    defineField({ name: "storeName", title: "Store name", type: "string", initialValue: "SHNU Sports" }),
    defineField({ name: "tagline", title: "Tagline", type: "string", description: "Short line shown under the logo / in the hero." }),
    defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "phone", title: "Phone number", type: "string", description: "Display format, e.g. +91 98765 43210" }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", description: "Digits only with country code, e.g. 919876543210" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "address", title: "Store address", type: "text", rows: 3 }),
    defineField({ name: "about", title: "About the store", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "shippingNote", title: "Shipping / returns note", type: "text", rows: 3 }),
    defineField({
      name: "social",
      title: "Social links",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: "instagram", title: "Instagram URL", type: "url" },
        { name: "facebook", title: "Facebook URL", type: "url" },
        { name: "youtube", title: "YouTube URL", type: "url" },
        { name: "x", title: "X / Twitter URL", type: "url" },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
