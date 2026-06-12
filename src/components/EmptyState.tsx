interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export default function EmptyState({
  icon = "🏓",
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-(--color-border) bg-(--color-surface)/60 px-4 py-12 text-center">
      <span className="mb-4 text-5xl">{icon}</span>

      <p className="text-lg font-bold text-(--color-text)">{title}</p>

      {description && (
        <p className="mt-1 max-w-xs text-sm text-(--color-muted)">
          {description}
        </p>
      )}
    </div>
  );
}
