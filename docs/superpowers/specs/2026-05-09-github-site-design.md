# GitHub Pages Site Design

## Overview

Personal site at `dnf0.github.io` with a data engineering / geospatial focus. Serves dual audience: fellow engineers/potential collaborators, and hiring managers/recruiters. Content centers on project showcases and case studies.

## Tech Stack

- **Framework**: Next.js with static export (`output: "export"`)
- **Content**: MDX for blog posts and project case studies
- **Styling**: Tailwind CSS with custom topographic-inspired theme
- **Deployment**: GitHub Actions → `gh-pages` branch
- **CV**: LaTeX compiled to PDF, served from `public/cv/`

## Visual Style — Topographic

Clean and minimal with subtle geospatial motifs. Slate grays, warm earth accents, generous whitespace. Syntax highlighting with a muted dark theme for code blocks. Tags displayed as understated chips. The "topographic" feel comes through subtle texture/pattern accents and a palette rooted in stone, slate, and earth tones — never literal contour lines everywhere, just the suggestion of maps through color and spacing.

## Project Structure

```
dnf0.github.io/
├── next.config.ts
├── content/
│   ├── blog/               # MDX blog posts
│   └── projects/           # MDX project case studies
├── public/
│   ├── cv/
│   │   ├── fisher-cv.pdf
│   │   └── fisher-cv.tex
│   └── images/
├── src/
│   ├── app/                # App Router
│   │   ├── layout.tsx      # Root: nav, footer, metadata
│   │   ├── page.tsx        # Homepage (split layout)
│   │   ├── blog/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx    # Index with tag filter
│   │   │   └── [slug]/page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── cv/page.tsx     # PDF embed + download
│   ├── components/
│   │   ├── PostCard.tsx
│   │   ├── TagChip.tsx
│   │   ├── Callout.tsx     # MDX-embeddable insight box
│   │   ├── MapEmbed.tsx    # Leaflet/Deck.gl wrapper
│   │   └── CodeBlock.tsx   # Syntax-highlighted with filename
│   └── lib/
│       ├── posts.ts        # Read/parse MDX from content/
│       └── types.ts
├── .github/workflows/
│   └── deploy.yml
└── package.json
```

## Pages

### Homepage (`/`) — Clean Split

Left column: short bio, name, tagline ("Data Engineering & Geospatial"), 2-3 sentence description. Right column: recent posts list (title, date, tags). Navigation bar at top with: Blog, Projects, CV.

### Blog Index (`/blog`)

List of all blog posts as cards (title, date, tags, optional short description). Tag filter at top — clicking a tag filters the list. Posts ordered by date descending.

### Blog Post (`/blog/[slug]`)

Classic article layout: centered single column, max-width ~680px. Title, date, tags at top. Body renders MDX with embedded components (Callout, MapEmbed, CodeBlock). Tags at bottom as hashtag-style links.

### Projects Index (`/projects`)

Same structure as blog index. Projects are longer-form case studies, distinct from blog posts but share the same MDX engine and tag system.

### Project Page (`/projects/[slug]`)

Same layout as blog post. Difference is in content conventions: projects emphasize narrative, problem/solution, results with visuals.

### CV (`/cv`)

Embedded PDF viewer (iframe or `<object>`) showing `fisher-cv.pdf`. Download button below. Optionally link to the `.tex` source.

## Content Model

### Frontmatter Schema

```yaml
title: "Processing 100M GPS Pings with DuckDB"
date: 2026-05-09
tags: [data-engineering, geospatial, sql]
description: "How we used DuckDB's spatial extension..."
```

Posts and projects use identical frontmatter. The `description` field populates `<meta>` tags and PostCard summaries.

### Tags

Flat, no hierarchy. Common tags: `data-engineering`, `geospatial`, `sql`, `python`, `gcp`, `visualization`, `duckdb`, `postgis`, `pipeline`, `deck-gl`. Each post gets 2-4 tags. Tag pages are not a v1 requirement — tags on the blog index filter client-side.

### MDX Components

Available in all posts and projects:
- **Callout** — styled insight/callout box (amber accent, left border)
- **MapEmbed** — wrapper for embedding interactive maps (Leaflet or Deck.gl)
- **CodeBlock** — syntax-highlighted code with optional filename header

## Deployment

GitHub Action triggers on push to `main`:
1. Checkout repo
2. Setup Node, install deps
3. `next build` (static export to `out/`)
4. Deploy `out/` to `gh-pages` branch

Site served at `https://dnf0.github.io`. Custom domain can be added later by setting CNAME in `public/`.

## Out of Scope (v1)

- Comments / analytics
- RSS feed (can add later trivially)
- Tag pages (tag filtering is client-side on index pages)
- Search
- Custom domain
- Dark/light mode toggle (topographic theme is light-only for now)
