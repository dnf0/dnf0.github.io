import { Suspense } from "react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import FilterablePostList from "@/components/FilterablePostList";

export default function ProjectsIndex() {
  const projects = getAllPosts("projects");
  const tags = getAllTags("projects");

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-2">Projects</h1>
      <p className="text-topo-muted mb-8">
        Project case studies and in-depth technical walkthroughs.
      </p>

      <Suspense fallback={<div className="text-topo-muted">Loading...</div>}>
        <FilterablePostList
          posts={projects}
          tags={tags}
          emptyMessage="No projects posted yet."
          section="projects"
        />
      </Suspense>
    </div>
  );
}
