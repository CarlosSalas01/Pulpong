interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title,
  message,
  confirmLabel = "Confirmar",
  danger = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm animate-fade-in rounded-3xl border border-(--color-border) bg-(--color-surface) p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-2 text-lg font-black text-(--color-text)">{title}</h3>

        <p className="mb-6 text-sm font-medium text-(--color-muted)">
          {message}
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="app-button-secondary flex-1 rounded-xl border py-2.5 font-semibold transition-colors"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-2.5 font-bold transition-all active:scale-[0.98] ${
              danger
                ? "bg-red-600 text-white hover:bg-red-500"
                : "app-button-primary"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
