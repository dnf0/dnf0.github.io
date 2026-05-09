import { getPostSlugs, getPostBySlug, compilePost } from "@/lib/posts";
import TagChip from "@/components/TagChip";
import Callout from "@/components/Callout";
import CodeBlock from "@/components/CodeBlock";
import MapEmbed from "@/components/MapEmbed";
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

  const { content } = await compilePost("projects", slug, {
    Callout,
    CodeBlock,
    MapEmbed,
  });

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
