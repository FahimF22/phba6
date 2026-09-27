export function LoadingState({
  label = 'Loading workouts…',
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-panel p-10">
      <div className="loader" />
      <p className="text-xs font-bold uppercase tracking-[.18em] text-muted">
        {label}
      </p>
    </div>
  );
}