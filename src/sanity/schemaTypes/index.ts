import type { SchemaTypeDefinition } from "sanity";

import { siteSettings } from "./siteSettings";
import { banner } from "./banner";
import { sport } from "./sport";
import { category } from "./category";
import { brand } from "./brand";
import { product } from "./product";

export const schemaTypes = [siteSettings, banner, sport, category, brand, product];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
};
