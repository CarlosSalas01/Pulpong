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
    <div className="flex flex-col items-center justify-center py-12 text-center px-4">
      <span className="text-5xl mb-4">{icon}</span>
      <p className="text-neutral-300 font-semibold text-lg">{title}</p>
      {description && (
        <p className="text-neutral-500 text-sm mt-1 max-w-xs">{description}</p>
      )}
    </div>
  );
}
