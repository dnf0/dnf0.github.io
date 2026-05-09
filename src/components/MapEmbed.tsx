"use client";

interface MapEmbedProps {
  title?: string;
  children?: React.ReactNode;
}

export default function MapEmbed({ title, children }: MapEmbedProps) {
  return (
    <div className="my-6 rounded-lg border border-stone-200 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 text-xs text-topo-muted font-medium">
          {title}
        </div>
      )}
      <div className="bg-stone-100 min-h-[300px] flex items-center justify-center text-topo-muted text-sm">
        {children || <p>Map visualization placeholder</p>}
      </div>
    </div>
  );
}
