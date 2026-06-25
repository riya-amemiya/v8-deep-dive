# v8-deep-dive

A single-page technical artifact explaining the internals of the V8 JavaScript
engine. The content was originally authored as one ~17,000-line `index.html`.
This repository now builds that same monolithic page from per-chapter
components using **Astro + Bun**, deployable to **Cloudflare**.

## Why this layout

The artifact is one long document made of five books (V8 Internals, Memory
Management, Torque, Arrays, `Array.prototype.flat`) wrapped by a shared
sidebar, prologue and epilogue. Editing a 1.1 MB HTML file is painful, so the
source is split into components — but the build output is still a single
self-contained `dist/index.html`, identical in content to the original.

Each chapter is sliced **verbatim** out of the original HTML and injected with
`set:html`, so nothing is rewritten. The C++/Torque code blocks contain braces
that would clash with Astro's expression syntax; injecting raw fragments keeps
the markup byte-faithful and side-steps that entirely. Link/route splitting is
intentionally left for a later step — for now this is purely a component split.

## Structure

```
src/
  pages/index.astro          # composes the whole page
  layouts/BaseLayout.astro   # <head>, inline CSS, inline sidebar script
  styles/global.css          # the original <style> block, verbatim
  scripts/sidebar.js         # the original inline <script>, verbatim
  components/
    matter/                  # Sidebar, Hero, Prologue, Epilogue, Footer
    bridges/                 # bridge1..bridge5 (transitions between books)
    internals/  Internals.astro + ch01..ch12   # Book 1
    memory/     Memory.astro    + front/intro/part1..5/appendix/conclusion
    torque/     Torque.astro    + ch01..ch12 + appendix-a/b
    arrays/     Arrays.astro     + ch01..ch17
    flat/       Flat.astro       + s01..s15 + references
```

Each `*.html` file under `components/` is a raw chapter fragment; the matching
`*.astro` component wires the fragments of one book into its `<article>`.

## Commands

```sh
bun install        # install dependencies
bun run dev        # local dev server
bun run build      # emit dist/index.html (the monolithic artifact)
bun run preview    # serve the built output
bun run deploy     # deploy dist/ to Cloudflare via wrangler
```

The original monolithic `index.html` is kept at the repository root as the
reference source the components were sliced from; the build regenerates the
same page into `dist/`.
