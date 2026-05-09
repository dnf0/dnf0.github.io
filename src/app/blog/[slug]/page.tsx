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
