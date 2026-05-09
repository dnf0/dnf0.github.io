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
