# GitHub Pages Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal GitHub Pages site at dnf0.github.io with data engineering / geospatial focus, MDX blog, project case studies, and LaTeX CV.

**Architecture:** Next.js App Router with static export to `out/`. MDX content lives in `content/blog/` and `content/projects/`, parsed by `gray-matter` and compiled by `next-mdx-remote/rsc`. Dynamic routes use `generateStaticParams`. Tailwind CSS with topographic-inspired earth-and-slate palette. GitHub Action deploys to `gh-pages` branch.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, next-mdx-remote, gray-matter, rehype-pretty-code, date-fns

---

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "dnf0.github.io",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "next-mdx-remote": "^5.0.0",
    "gray-matter": "^4.0.3",
    "rehype-pretty-code": "^0.14.0",
    "shiki": "^3.0.0",
    "date-fns": "^4.1.0"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@types/react": "^19.1.0",
    "@types/react-dom": "^19.1.0",
    "typescript": "^5.8.0",
    "@tailwindcss/postcss": "^4.1.0",
    "tailwindcss": "^4.1.0"
  }
}
```

- [ ] **Step 2: Create `next.config.ts`**

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx"],
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules/
.next/
out/
.superpowers/
```

- [ ] **Step 6: Install dependencies and verify scaffold**

Run: `npm install`
Expected: Installs without errors

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs .gitignore
git commit -m "scaffold: Next.js project with TypeScript and Tailwind"
```

---

### Task 2: Types and MDX loader utility

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/posts.ts`

- [ ] **Step 1: Create `src/lib/types.ts`**

```typescript
export interface PostFrontmatter {
  title: string;
  date: string;
  tags: string[];
  description: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
}

export type ContentType = "blog" | "projects";
```

- [ ] **Step 2: Create `src/lib/posts.ts`**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Post, PostFrontmatter, ContentType } from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

export function getAllPosts(type: ContentType): Post[] {
  const dir = path.join(contentRoot, type);
  const files = readDir(dir);

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);
      const frontmatter = data as PostFrontmatter;
      return {
        slug: file.replace(/\.mdx$/, ""),
        frontmatter,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPostSlugs(type: ContentType): string[] {
  return readDir(path.join(contentRoot, type)).map((f) =>
    f.replace(/\.mdx$/, "")
  );
}

export function getPostBySlug(type: ContentType, slug: string): Post | null {
  const dir = path.join(contentRoot, type);
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    slug,
    frontmatter: data as PostFrontmatter,
  };
}

export async function compilePost(
  type: ContentType,
  slug: string,
  components: Record<string, React.ComponentType<any>> = {}
) {
  const dir = path.join(contentRoot, type);
  const filePath = path.join(dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return compileMDX<PostFrontmatter>({
    source: raw,
    options: { parseFrontmatter: true },
    components,
  });
}

export function getAllTags(type: ContentType): string[] {
  const posts = getAllPosts(type);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts src/lib/posts.ts
git commit -m "feat: add Post types and MDX loader utilities"
```

---

### Task 3: Tailwind config and root layout

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Create `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-topo-stone: #f5f3f0;
  --color-topo-sand: #faf7f2;
  --color-topo-earth: #8b7355;
  --color-topo-dark: #3d3226;
  --color-topo-accent: #b45309;
  --color-topo-slate: #1e293b;
  --color-topo-muted: #64748b;
}
```

- [ ] **Step 2: Create `src/app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s — Daniel Fisher",
    default: "Daniel Fisher — Data Engineering & Geospatial",
  },
  description:
    "Data engineer specializing in geospatial data infrastructure and analytics.",
};

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-topo-slate antialiased">
        <header className="border-b border-stone-200">
          <nav className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="font-semibold text-topo-slate hover:text-topo-accent transition-colors"
            >
              Daniel Fisher
            </Link>
            <div className="flex gap-6">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-topo-muted hover:text-topo-slate transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-stone-200 py-8 text-center text-sm text-topo-muted">
          <p>Daniel Fisher · Data Engineering &amp; Geospatial</p>
        </footer>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add Tailwind topographic theme and root layout"
```

---

### Task 4: Shared UI components

**Files:**
- Create: `src/components/TagChip.tsx`
- Create: `src/components/PostCard.tsx`

- [ ] **Step 1: Create `src/components/TagChip.tsx`**

```typescript
import Link from "next/link";

interface TagChipProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
}

export default function TagChip({ tag, active, onClick }: TagChipProps) {
  const base =
    "inline-block text-xs px-2 py-0.5 rounded-sm transition-colors";
  const activeClass = active
    ? "bg-topo-accent text-white"
    : "bg-stone-100 text-topo-muted hover:bg-stone-200";

  if (onClick) {
    return (
      <button onClick={() => onClick(tag)} className={`${base} ${activeClass} cursor-pointer`}>
        {tag}
      </button>
    );
  }

  return (
    <Link href={`/blog?tag=${tag}`} className={`${base} ${activeClass}`}>
      {tag}
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/PostCard.tsx`**

```typescript
import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Post } from "@/lib/types";
import TagChip from "./TagChip";

interface PostCardProps {
  post: Post;
  href: string;
}

export default function PostCard({ post, href }: PostCardProps) {
  const { frontmatter } = post;
  return (
    <Link href={href} className="block group">
      <article className="border border-stone-200 rounded-lg p-5 hover:border-topo-earth/30 hover:shadow-sm transition-all">
        <h3 className="font-semibold text-topo-slate group-hover:text-topo-accent transition-colors mb-1">
          {frontmatter.title}
        </h3>
        {frontmatter.description && (
          <p className="text-sm text-topo-muted mb-3 line-clamp-2">
            {frontmatter.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-topo-muted">
          <time dateTime={frontmatter.date}>
            {format(parseISO(frontmatter.date), "MMM d, yyyy")}
          </time>
          <div className="flex gap-1.5 flex-wrap">
            {frontmatter.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/TagChip.tsx src/components/PostCard.tsx
git commit -m "feat: add TagChip and PostCard shared components"
```

---

### Task 5: Blog pages

**Files:**
- Create: `src/app/blog/layout.tsx`
- Create: `src/app/blog/page.tsx`
- Create: `src/app/blog/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/blog/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts on data engineering, geospatial analytics, and pipeline design.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Create `src/app/blog/page.tsx`**

```typescript
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import TagChip from "@/components/TagChip";

export default function BlogIndex() {
  const posts = getAllPosts("blog");
  const tags = getAllTags("blog");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-2">Blog</h1>
      <p className="text-topo-muted mb-8">
        Thoughts on data engineering, geospatial analytics, and pipelines.
      </p>

      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-topo-muted">No posts yet. Check back soon.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} href={`/blog/${post.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/blog/[slug]/page.tsx`**

```typescript
import { getPostSlugs, getPostBySlug, compilePost } from "@/lib/posts";
import TagChip from "@/components/TagChip";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug("blog", slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-topo-muted">Post not found.</p>
      </div>
    );
  }

  const { content } = await compilePost("blog", slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <article className="max-w-[680px] mx-auto">
        <div className="flex gap-2 flex-wrap mb-4">
          {post.frontmatter.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-topo-slate mb-2">
          {post.frontmatter.title}
        </h1>

        <time
          dateTime={post.frontmatter.date}
          className="text-sm text-topo-muted block mb-8"
        >
          {format(parseISO(post.frontmatter.date), "MMMM d, yyyy")}
        </time>

        <div className="prose prose-slate max-w-none">{content}</div>

        <div className="mt-10 pt-6 border-t border-stone-200">
          <div className="flex gap-2 flex-wrap">
            {post.frontmatter.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/
git commit -m "feat: add blog index and dynamic post pages"
```

---

### Task 6: Projects pages

**Files:**
- Create: `src/app/projects/layout.tsx`
- Create: `src/app/projects/page.tsx`
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `src/app/projects/layout.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Project case studies in data engineering and geospatial analytics.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

- [ ] **Step 2: Create `src/app/projects/page.tsx`**

```typescript
import { getAllPosts, getAllTags } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import TagChip from "@/components/TagChip";

export default function ProjectsIndex() {
  const projects = getAllPosts("projects");
  const tags = getAllTags("projects");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-2">Projects</h1>
      <p className="text-topo-muted mb-8">
        Project case studies and in-depth technical walkthroughs.
      </p>

      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>
      )}

      {projects.length === 0 ? (
        <p className="text-topo-muted">No projects posted yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <PostCard key={p.slug} post={p} href={`/projects/${p.slug}`} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/projects/[slug]/page.tsx`**

```typescript
import { getPostSlugs, getPostBySlug, compilePost } from "@/lib/posts";
import TagChip from "@/components/TagChip";
import { format, parseISO } from "date-fns";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs("projects").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPostBySlug("projects", slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getPostBySlug("projects", slug);

  if (!project) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <p className="text-topo-muted">Project not found.</p>
      </div>
    );
  }

  const { content } = await compilePost("projects", slug);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <article className="max-w-[680px] mx-auto">
        <div className="flex gap-2 flex-wrap mb-4">
          {project.frontmatter.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-topo-slate mb-2">
          {project.frontmatter.title}
        </h1>

        <time
          dateTime={project.frontmatter.date}
          className="text-sm text-topo-muted block mb-8"
        >
          {format(parseISO(project.frontmatter.date), "MMMM d, yyyy")}
        </time>

        <div className="prose prose-slate max-w-none">{content}</div>

        <div className="mt-10 pt-6 border-t border-stone-200">
          <div className="flex gap-2 flex-wrap">
            {project.frontmatter.tags.map((tag) => (
              <TagChip key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/
git commit -m "feat: add projects index and dynamic project pages"
```

---

### Task 7: Homepage

**Files:**
- Create: `src/app/page.tsx`

- [ ] **Step 1: Create `src/app/page.tsx`**

```typescript
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import TagChip from "@/components/TagChip";
import { format, parseISO } from "date-fns";

export default function Home() {
  const recentPosts = getAllPosts("blog").slice(0, 4);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
        <div className="sm:flex-1">
          <h1 className="text-3xl font-bold text-topo-slate mb-3">
            Daniel Fisher
          </h1>
          <p className="text-topo-accent font-medium mb-4">
            Data Engineering &amp; Geospatial
          </p>
          <p className="text-topo-muted leading-relaxed">
            I design and build data infrastructure for geospatial workloads.
            Focused on large-scale spatial data processing, pipeline design,
            and analytics that turn coordinates into insights.
          </p>
          <div className="flex gap-4 mt-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-topo-accent hover:text-topo-earth transition-colors"
            >
              Read blog →
            </Link>
            <Link
              href="/projects"
              className="text-sm font-medium text-topo-accent hover:text-topo-earth transition-colors"
            >
              View projects →
            </Link>
          </div>
        </div>

        <div className="sm:flex-1">
          <h2 className="text-sm font-semibold text-topo-muted uppercase tracking-wide mb-4">
            Recent Posts
          </h2>
          {recentPosts.length === 0 ? (
            <p className="text-topo-muted text-sm">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <h3 className="font-medium text-topo-slate group-hover:text-topo-accent transition-colors mb-0.5">
                    {post.frontmatter.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-topo-muted">
                    <time dateTime={post.frontmatter.date}>
                      {format(parseISO(post.frontmatter.date), "MMM d, yyyy")}
                    </time>
                    <span>·</span>
                    {post.frontmatter.tags.slice(0, 2).map((tag) => (
                      <TagChip key={tag} tag={tag} />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: add homepage with split layout and recent posts"
```

---

### Task 8: CV page

**Files:**
- Create: `src/app/cv/page.tsx`

- [ ] **Step 1: Create `src/app/cv/page.tsx`**

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum Vitae — Daniel Fisher",
};

export default function CVPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-6">CV</h1>

      <div className="border border-stone-200 rounded-lg overflow-hidden mb-4">
        <iframe
          src="/cv/fisher-cv.pdf"
          className="w-full h-[80vh]"
          title="Daniel Fisher CV"
        />
      </div>

      <div className="flex gap-4">
        <a
          href="/cv/fisher-cv.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-medium bg-topo-slate text-white px-4 py-2 rounded-md hover:bg-topo-slate/90 transition-colors"
        >
          Download PDF
        </a>
        <a
          href="/cv/fisher-cv.tex"
          className="inline-flex items-center gap-2 text-sm font-medium text-topo-muted hover:text-topo-slate transition-colors"
        >
          View LaTeX source
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/cv/page.tsx
git commit -m "feat: add CV page with PDF embed and download"
```

---

### Task 9: MDX embeddable components

**Files:**
- Create: `src/components/Callout.tsx`
- Create: `src/components/CodeBlock.tsx`
- Create: `src/components/MapEmbed.tsx`
- Modify: `src/app/blog/[slug]/page.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `src/components/Callout.tsx`**

```typescript
interface CalloutProps {
  children: React.ReactNode;
}

export default function Callout({ children }: CalloutProps) {
  return (
    <div className="my-6 border-l-4 border-topo-accent bg-amber-50/50 rounded-r-lg px-5 py-3 text-sm text-amber-900">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/CodeBlock.tsx`**

```typescript
interface CodeBlockProps {
  filename?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-stone-300">
      {filename && (
        <div className="bg-stone-100 px-4 py-1.5 border-b border-stone-200 text-xs text-topo-muted font-mono">
          {filename}
        </div>
      )}
      <pre className="bg-topo-slate text-stone-100 px-5 py-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/MapEmbed.tsx`**

```typescript
"use client";

interface MapEmbedProps {
  title?: string;
  children?: React.ReactNode;
}

export default function MapEmbed({ title, children }: MapEmbedProps) {
  return (
    <div className="my-6 rounded-lg border border-stone-200 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 text-xs text-topo-muted font-medium">
          {title}
        </div>
      )}
      <div className="bg-stone-100 min-h-[300px] flex items-center justify-center text-topo-muted text-sm">
        {children || <p>Map visualization placeholder</p>}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Update blog post page to pass MDX components**

In `src/app/blog/[slug]/page.tsx`, add the component imports and pass them to `compilePost`.

Add imports at top:
```typescript
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import MapEmbed from "@/components/MapEmbed";
```

Change the `compilePost` call from:
```typescript
const { content } = await compilePost("blog", slug);
```
to:
```typescript
const { content } = await compilePost("blog", slug, {
  Callout,
  CodeBlock,
  MapEmbed,
});
```

- [ ] **Step 5: Update project page to pass MDX components**

In `src/app/projects/[slug]/page.tsx`, add the same imports:
```typescript
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import MapEmbed from "@/components/MapEmbed";
```

Change the `compilePost` call from:
```typescript
const { content } = await compilePost("projects", slug);
```
to:
```typescript
const { content } = await compilePost("projects", slug, {
  Callout,
  CodeBlock,
  MapEmbed,
});
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Callout.tsx src/components/CodeBlock.tsx src/components/MapEmbed.tsx src/app/blog/[slug]/page.tsx src/app/projects/[slug]/page.tsx
git commit -m "feat: add MDX-embeddable components (Callout, CodeBlock, MapEmbed)"
```

---

### Task 10: Sample content and build verification

**Files:**
- Create: `content/blog/hello-world.mdx`

- [ ] **Step 1: Create content directories**

```bash
mkdir -p content/blog content/projects public/cv public/images
```

- [ ] **Step 2: Create `content/blog/hello-world.mdx`**

```mdx
---
title: "Hello, World"
date: "2026-05-09"
tags: [meta]
description: "First post on the new site"
---

This is the first post on my new site. I'll be writing about data engineering and geospatial analytics.

## What to expect

Project case studies, pipeline design deep-dives, and notes on working with spatial data at scale.
```

- [ ] **Step 3: Build the site**

Run: `npm run build`
Expected: Successful static export to `out/`. Check that `out/index.html`, `out/blog/index.html`, `out/blog/hello-world/index.html` exist.

- [ ] **Step 4: Commit**

```bash
git add content/ public/cv/ public/images/
git commit -m "feat: add sample blog post and content directory structure"
```

---

### Task 11: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: add GitHub Actions deploy workflow for Pages"
```
