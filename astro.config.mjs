import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [lit()],
  output: "server",
  adapter: netlify(),
});
