export default function MemberList({ members = [], totalCount }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">함께하는 멤버</h3>
        <span className="text-xs text-gray-400">{totalCount}명</span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3">
            <img src={m.avatar} alt={m.name} className="h-9 w-9 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900">{m.name}</p>
              <p className="truncate text-xs text-gray-400">{m.status}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full text-center text-xs text-gray-400 transition-colors hover:text-gray-600"
      >
        멤버 전체보기 ›
      </button>
    </div>
  );
}
