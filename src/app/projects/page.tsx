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
