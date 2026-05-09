import Link from "next/link";

interface TagChipProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
  section?: "blog" | "projects";
}

export default function TagChip({ tag, active, onClick, section = "blog" }: TagChipProps) {
  const base =
    "inline-block text-xs px-2 py-0.5 rounded-sm transition-colors";
  const activeClass = active
    ? "bg-topo-accent text-white"
    : "bg-stone-100 text-topo-muted hover:bg-stone-200";

  if (onClick) {
    return (
      <button onClick={() => onClick(tag)} className={`${base} ${activeClass} cursor-pointer`}>
        {tag}
      </button>
    );
  }

  return (
    <Link href={`/${section}?tag=${tag}`} className={`${base} ${activeClass}`}>
      {tag}
    </Link>
  );
}
