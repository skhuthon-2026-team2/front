import { useNavigate, useParams } from "react-router-dom";
import { useTimelineStore } from "../../stores/timelineStore";

const TIMELINES = [
  {
    id: 1,
    title: "봄 정기 산행 기록",
    date: "2026.05",
    cover: "https://picsum.photos/seed/hiking/600/400",
  },
  {
    id: 2,
    title: "4월 아이디어 워크숍",
    date: "2026.04",
    cover: "https://picsum.photos/seed/workshop/600/400",
  },
  {
    id: 3,
    title: "겨울 사진전 준비 과정",
    date: "2026.02",
    cover: "https://picsum.photos/seed/exhibition/600/400",
  },
];

export default function TimelinePage() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const storeTimelines = useTimelineStore((state) => state.timelines);
  const allTimelines = [...storeTimelines, ...TIMELINES];

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">동아리 타임라인</h1>
          <p className="mt-1.5 text-sm text-gray-500">
            우리의 소중한 활동 기록들을 한눈에 확인하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/club/${clubId}/timeline/create`)}
          className="rounded-xl bg-modam-coral px-5 py-3 text-sm font-bold text-white transition hover:brightness-95"
        >
          + 새 타임라인 생성
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allTimelines.map((tl) => (
          <button
            key={tl.id}
            type="button"
            onClick={() => navigate(`/club/${clubId}/timeline/${tl.id}`)}
            className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-3/2 overflow-hidden bg-gray-100">
              <img
                src={tl.cover}
                alt={tl.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <p className="text-xs text-white/80">{tl.date}</p>
                <h3 className="mt-0.5 text-lg font-bold">{tl.title}</h3>
              </div>
            </div>
            <div className="flex items-center justify-end p-4">
              <span className="inline-flex items-center gap-1 text-sm font-bold text-modam-coral">
                자세히 보기
                <span aria-hidden>›</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
