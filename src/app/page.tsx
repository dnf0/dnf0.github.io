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

      {/* Interactive Playgrounds Section */}
      <div className="mt-16 pt-12 border-t border-stone-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-topo-slate">
              ⚡ Interactive Playgrounds &amp; Learning Tools
            </h2>
            <p className="text-sm text-topo-muted">
              Zero-install, browser-based WebAssembly learning environments and interactive tools.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="https://dnf0.github.io/spanglings/playground/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-stone-200 bg-topo-sand/40 hover:bg-topo-sand/80 hover:border-topo-accent/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-topo-accent bg-amber-100/60 px-2 py-0.5 rounded">
                Rust Wasm · 24 Topics · 136 Frames
              </span>
              <span className="text-xs text-topo-muted group-hover:text-topo-accent transition-colors">
                Launch ↗
              </span>
            </div>
            <h3 className="font-semibold text-topo-slate text-base group-hover:text-topo-accent transition-colors mb-1">
              🇪🇸 Spanglings Playground &amp; Arcade
            </h3>
            <p className="text-xs text-topo-muted leading-relaxed mb-3">
              Full client-side Spanish learning environment powered by Rust WebAssembly, Monaco Editor, dual-layer communicative/grammar models, and rapid showdown arcade.
            </p>
            <div className="flex items-center gap-1 text-xs text-topo-accent font-medium">
              <span>Launch Playground &amp; Arcade →</span>
            </div>
          </a>

          <a
            href="https://dnf0.github.io/kubelings/playground/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-stone-200 bg-topo-sand/40 hover:bg-topo-sand/80 hover:border-topo-accent/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-topo-accent bg-amber-100/60 px-2 py-0.5 rounded">
                Wasm IDE · 114 Exercises
              </span>
              <span className="text-xs text-topo-muted group-hover:text-topo-accent transition-colors">
                Launch ↗
              </span>
            </div>
            <h3 className="font-semibold text-topo-slate text-base group-hover:text-topo-accent transition-colors mb-1">
              ☸️ Kubelings Playground
            </h3>
            <p className="text-xs text-topo-muted leading-relaxed mb-3">
              Full client-side Kubernetes IDE powered by Pyodide (Python 3.12 Wasm) and Monaco Editor with real-time schema validation and test runner.
            </p>
            <div className="flex items-center gap-1 text-xs text-topo-accent font-medium">
              <span>Launch Playground →</span>
            </div>
          </a>

          <a
            href="https://dnf0.github.io/terralings/playground/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-stone-200 bg-topo-sand/40 hover:bg-topo-sand/80 hover:border-topo-accent/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-topo-accent bg-amber-100/60 px-2 py-0.5 rounded">
                Wasm IDE · 15 Chapters · 68 Exercises
              </span>
              <span className="text-xs text-topo-muted group-hover:text-topo-accent transition-colors">
                Launch ↗
              </span>
            </div>
            <h3 className="font-semibold text-topo-slate text-base group-hover:text-topo-accent transition-colors mb-1">
              🌍 Terralings Playground
            </h3>
            <p className="text-xs text-topo-muted leading-relaxed mb-3">
              Full client-side Terraform &amp; OpenTofu IDE powered by Pyodide WebAssembly, Monaco Editor, in-browser AST evaluation, and interactive terminal.
            </p>
            <div className="flex items-center gap-1 text-xs text-topo-accent font-medium">
              <span>Launch Playground →</span>
            </div>
          </a>

          <a
            href="https://dnf0.github.io/raylings/playground/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-5 rounded-xl border border-stone-200 bg-topo-sand/40 hover:bg-topo-sand/80 hover:border-topo-accent/40 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-topo-accent bg-amber-100/60 px-2 py-0.5 rounded">
                Wasm IDE · 14 Chapters · 66 Exercises
              </span>
              <span className="text-xs text-topo-muted group-hover:text-topo-accent transition-colors">
                Launch ↗
              </span>
            </div>
            <h3 className="font-semibold text-topo-slate text-base group-hover:text-topo-accent transition-colors mb-1">
              ⚡ Raylings Playground
            </h3>
            <p className="text-xs text-topo-muted leading-relaxed mb-3">
              Full client-side distributed computing &amp; Ray IDE powered by Pyodide WebAssembly, Monaco Editor, distributed task simulation, and live terminal.
            </p>
            <div className="flex items-center gap-1 text-xs text-topo-accent font-medium">
              <span>Launch Playground →</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
