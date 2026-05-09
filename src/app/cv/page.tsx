import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum Vitae — Daniel Fisher",
};

export default function CVPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-topo-slate mb-6">CV</h1>

      <div className="border border-stone-200 rounded-lg overflow-hidden mb-4">
        <iframe
          src="/cv/fisher-cv.pdf"
          className="w-full h-[80vh]"
          title="Daniel Fisher CV"
        />
      </div>

      <div className="flex gap-4">
        <a
          href="/cv/fisher-cv.pdf"
          download
          className="inline-flex items-center gap-2 text-sm font-medium bg-topo-slate text-white px-4 py-2 rounded-md hover:bg-topo-slate/90 transition-colors"
        >
          Download PDF
        </a>
        <a
          href="/cv/fisher-cv.tex"
          className="inline-flex items-center gap-2 text-sm font-medium text-topo-muted hover:text-topo-slate transition-colors"
        >
          View LaTeX source
        </a>
      </div>
    </div>
  );
}
