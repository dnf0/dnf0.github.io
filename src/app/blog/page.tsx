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
