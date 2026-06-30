export default function ClubPreviewCard({ club, onSelect }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img src={club.image} alt={club.name} className="h-full w-full object-cover" />
        {/* 하단 글자 가독성을 위한 어두운 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-modam-lime px-2.5 py-1 text-xs font-medium text-white">
          확인된 동아리
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <h3 className="text-lg font-bold">{club.name}</h3>
          <p className="mt-1 text-sm text-white/85">{club.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4">
        <div className="flex gap-6">
          <div>
            <p className="text-xs text-gray-400">현재 인원</p>
            <p className="text-sm font-bold text-gray-900">
              {club.memberCount} / {club.capacity}명
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">개설일</p>
            <p className="text-sm font-bold text-gray-900">{club.createdAt}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSelect}
          className="inline-flex items-center gap-1 rounded-lg bg-modam-lime px-4 py-2.5 text-sm font-medium text-white transition hover:brightness-95"
        >
          이 동아리 선택하기
          <span aria-hidden>›</span>
        </button>
      </div>
    </div>
  );
}
