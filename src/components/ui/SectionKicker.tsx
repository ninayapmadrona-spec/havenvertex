export function SectionKicker({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] ${
        light ? "text-accent" : "text-primary"
      }`}
    >
      {children}
      <span
        className={`h-px w-14 ${light ? "bg-accent/50" : "bg-primary/40"}`}
      />
    </div>
  );
}

export function ChapterTag({ index, label }: { index: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-secondary backdrop-blur">
      <span className="text-accent">Chapter {index}</span>
      <span className="h-1 w-1 rounded-full bg-primary/40" />
      {label}
    </div>
  );
}
