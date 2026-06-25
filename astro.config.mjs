// @ts-check
import { defineConfig } from "astro/config";

// The artifact is a single self-contained page. Astro builds it to a static
// dist/index.html — the same monolithic file as before, just composed from
// per-chapter components. Stylesheets stay inlined so the output remains a
// single standalone HTML file, ready for Cloudflare (Workers/Pages) static
// asset hosting via wrangler.
export default defineConfig({
  output: "static",
  build: {
    inlineStylesheets: "always",
  },
});
