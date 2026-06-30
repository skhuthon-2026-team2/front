export default function FeedManageHeader({
    total,
    selected,
    onDelete,
}) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    피드 관리
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    게시글을 선택하여 삭제할 수 있습니다.
                </p>

                <p className="mt-2 text-sm text-modam-coral font-medium">
                    전체 {total}개 · 선택 {selected}개
                </p>
            </div>

            <button
                onClick={onDelete}
                disabled={selected === 0}
                className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition
        ${selected === 0
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
            >
                선택 삭제
            </button>
        </div>
    );
}