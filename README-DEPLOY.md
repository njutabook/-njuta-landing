# njuta site + blog — deploy package (Jitzu as vector graphics)

## What's here
- index.html — Claude Design export, visually identical. Jitzu headlines are
  now vector SVGs (assets/jitzu/) rendered from the real Jitzu glyphs — license
  compliant (flattened graphics are permitted; raw woff2 hosting is not).
  Each has alt text so Google reads every headline. SEO meta/OG/canonical
  added; journal link → /blog/.
- assets/ — covers, walkthrough screens, photos, jitzu/ SVGs, blog.css
- _config.yml, _layouts/, _posts/, blog/ — the Jekyll blog at /blog/

## Deploy (github.com)
1. Repo → Add file → Upload files → drag EVERYTHING here → commit
2. Delete `.nojekyll` if the repo has one
3. Check after ~1 min: njutabook.com · /blog/ · /sitemap.xml · /privacy · /terms
4. One-time: Search Console → verify domain (DNS TXT at Name.com) → submit sitemap.xml

## Note for future edits
Changing any Jitzu headline text = regenerating its SVG (ask Claude — 1 min).
