interface CalloutProps {
  children: React.ReactNode;
}

export default function Callout({ children }: CalloutProps) {
  return (
    <div className="my-6 border-l-4 border-topo-accent bg-amber-50/50 rounded-r-lg px-5 py-3 text-sm text-amber-900">
      {children}
    </div>
  );
}
