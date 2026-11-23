export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6" aria-busy="true">
      <div className="h-4 w-24 animate-pulse rounded bg-surface-muted" />
      <div className="mt-4 h-10 w-2/3 max-w-xl animate-pulse rounded bg-surface-muted" />
      <div className="mt-8 aspect-[16/9] w-full animate-pulse rounded-2xl bg-surface-muted" />
      <div className="mt-8 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-4/6 animate-pulse rounded bg-surface-muted" />
      </div>
    </div>
  );
}
