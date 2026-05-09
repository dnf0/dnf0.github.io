import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import FilterablePostList from "@/components/FilterablePostList";

export default function BlogIndex() {
  const posts = getAllPosts("blog");
  const tags = getAllTags("blog");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-2">Blog</h1>
      <p className="text-topo-muted mb-8">
        Thoughts on data engineering, geospatial analytics, and pipelines.
      </p>

      <Suspense fallback={<div className="text-topo-muted">Loading...</div>}>
        <FilterablePostList
          posts={posts}
          tags={tags}
          emptyMessage="No posts yet. Check back soon."
          section="blog"
        />
      </Suspense>
    </div>
  );
}
