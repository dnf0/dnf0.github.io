import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import type { ComponentType } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import type { Post, PostFrontmatter, ContentType } from "./types";

const contentRoot = path.join(process.cwd(), "content");

function readDir(dir: string): string[] {
  try {
    return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  } catch (err: any) {
    if (err?.code !== "ENOENT") console.warn(`Error reading ${dir}:`, err);
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
  components: Record<string, ComponentType<any>> = {}
) {
  const dir = path.join(contentRoot, type);
  const filePath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`Post not found: ${type}/${slug}`);
  const raw = fs.readFileSync(filePath, "utf-8");
  return compileMDX<PostFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [[rehypePrettyCode, { theme: "github-dark-dimmed" }]],
      },
    },
    components,
  });
}

export function getAllTags(type: ContentType): string[] {
  const posts = getAllPosts(type);
  const tagSet = new Set<string>();
  posts.forEach((p) => p.frontmatter.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
