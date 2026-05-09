"use client";

import { useSearchParams } from "next/navigation";
import type { Post } from "@/lib/types";
import PostCard from "./PostCard";
import TagChip from "./TagChip";

interface FilterablePostListProps {
  posts: Post[];
  tags: string[];
  emptyMessage: string;
  section: "blog" | "projects";
}

export default function FilterablePostList({
  posts,
  tags,
  emptyMessage,
  section,
}: FilterablePostListProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag");

  const filteredPosts = activeTag
    ? posts.filter((p) => p.frontmatter.tags.includes(activeTag))
    : posts;

  return (
    <>
      {tags.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-8">
          {tags.map((tag) => (
            <TagChip key={tag} tag={tag} active={tag === activeTag} />
          ))}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-topo-muted">{emptyMessage}</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              post={post}
              href={`/${section}/${post.slug}`}
              section={section}
            />
          ))}
        </div>
      )}
    </>
  );
}
