import { useNavigate, useParams } from "react-router-dom";

export default function ClubSidebar({ club }) {
  const navigate = useNavigate();
  const { clubId } = useParams();

  return (
    <aside className="w-full max-w-[260px] shrink-0">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
          <img src={club.image} alt={club.name} className="h-full w-full object-cover" />
          {club.role === "회장" && (
            <span className="absolute right-2 top-2 rounded-full bg-modam-coral px-2.5 py-1 text-xs font-medium text-white">
              회장
            </span>
          )}
        </div>

        <h2 className="mt-4 font-bold text-gray-900">{club.name}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{club.description}</p>

        <div className="mt-4 flex border-y border-gray-100 py-3 text-center">
          <div className="flex-1">
            <p className="text-xs text-gray-400">멤버</p>
            <p className="text-sm font-bold text-gray-900">{club.memberCount}명</p>
          </div>
          <div className="flex-1 border-l border-gray-100">
            <p className="text-xs text-gray-400">게시글</p>
            <p className="text-sm font-bold text-gray-900">{club.postCount}개</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/club/${clubId}/write`)}
          className="mt-4 w-full rounded-xl bg-modam-coral py-3 text-sm font-bold text-white transition hover:brightness-95"
        >
          + 새 활동 기록하기
        </button>
      </div>
    </aside>
  );
}
