import type { StructureResolver } from "sanity/structure";

/**
 * Custom desk so "Site Settings" is a single editable document (not a list),
 * and the catalog types are grouped sensibly for the admin.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("banner").title("Hero Banners"),
      S.divider(),
      S.documentTypeListItem("sport").title("Sports"),
      S.documentTypeListItem("category").title("Gear Categories"),
      S.documentTypeListItem("brand").title("Brands"),
      S.documentTypeListItem("product").title("Products"),
    ]);
