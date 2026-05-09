import Link from "next/link";
import { format, parseISO } from "date-fns";
import type { Post } from "@/lib/types";
import TagChip from "./TagChip";

interface PostCardProps {
  post: Post;
  href: string;
  section?: "blog" | "projects";
}

export default function PostCard({ post, href, section = "blog" }: PostCardProps) {
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
              <TagChip key={tag} tag={tag} section={section} />
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
