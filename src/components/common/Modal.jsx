export default function Modal({
  open,
  title,
  children,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="min-w-[280px] max-w-[90%] rounded-xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="mb-3 text-lg font-bold">{title}</h3>}
        <div className="text-sm text-gray-600">{children}</div>
        <div className="mt-5 flex justify-end gap-2">
          {cancelText && (
            <button
              className="rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-600"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          <button
            className="rounded-lg bg-black px-4 py-2 text-sm text-white"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
