interface CodeBlockProps {
  filename?: string;
  children: React.ReactNode;
}

export default function CodeBlock({ filename, children }: CodeBlockProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-stone-300">
      {filename && (
        <div className="bg-stone-100 px-4 py-1.5 border-b border-stone-200 text-xs text-topo-muted font-mono">
          {filename}
        </div>
      )}
      <pre className="bg-topo-slate text-stone-100 px-5 py-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
    </div>
  );
}
