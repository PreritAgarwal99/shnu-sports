import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./src/sanity/env";

/** Lets you run the Sanity CLI (e.g. `npx sanity dataset import`) from this repo. */
export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
