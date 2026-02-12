# Locus Amoenus (Astro)

SEO-first one-page product site + Markdown blog powered by Astro.

## Stack

- Astro (static generation)
- Astro Content Collections for blog authoring
- Netlify Forms for waitlist capture

## Project layout

- `src/pages/index.astro` - landing page
- `src/pages/blog/index.astro` - blog listing
- `src/pages/blog/[slug].astro` - blog post route
- `src/content/blog/*.md` - blog posts (easy writing/editing)
- `src/content/config.ts` - blog schema
- `src/pages/sitemap.xml.ts` - generated sitemap
- `src/pages/robots.txt.ts` - robots output
- `src/pages/rss.xml.ts` - RSS feed for sharing/subscription
- `src/pages/thanks.astro` - waitlist success page
- `public/bg_video.mp4`, `public/og-cover.png` - static assets
- `netlify.toml` - build settings + legacy blog URL redirects

## Blog authoring workflow

1. Create a new Markdown file in `src/content/blog/`.
2. Add frontmatter:
   - `title`
   - `description`
   - `pubDate` (YYYY-MM-DD)
   - optional `updatedDate`, `tags`, `draft`
3. Write content in Markdown.
4. Build/deploy. The post automatically appears at `/blog/` and gets a permalink at `/blog/<slug>/`.

## Waitlist storage

Waitlist submissions use Netlify Forms (`name=\"waitlist\"` in landing page form).  
This gives dashboard entries + CSV export without extra backend setup.

Included attribution fields:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```
