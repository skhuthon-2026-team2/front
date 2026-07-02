import { useNavigate, useParams } from "react-router-dom";

const TIMELINE_DETAIL = {
  id: 1,
  title: "봄 정기 산행 기록",
  period: "2026.05.03 ~ 2026.05.04",
  cover: "https://picsum.photos/seed/hiking/1200/500",
  description:
    "매년 봄, 동아리원들과 함께 떠나는 정기 산행. 올해는 북한산 둘레길을 따라 1박 2일 일정으로 진행했습니다. 함께 걸으며 나눈 이야기와 풍경을 기록으로 남깁니다.",
  sections: [
    {
      id: 1,
      date: "2026.05.03",
      title: "산행 첫째 날 - 둘레길 출발",
      image: "https://picsum.photos/seed/trail1/800/500",
      content:
        "아침 8시에 모여 다 함께 출발했습니다. 날씨가 맑아 초록빛 숲길이 정말 예뻤어요. 중간중간 쉬어가며 서로 사진도 찍어주고, 준비해온 간식을 나눠 먹었습니다.",
    },
    {
      id: 2,
      date: "2026.05.03",
      title: "저녁 - 캠프파이어와 이야기",
      image: "https://picsum.photos/seed/camp/800/500",
      content:
        "숙소에 도착해 짐을 풀고, 저녁에는 캠프파이어를 둘러앉아 이야기를 나눴습니다. 새로 가입한 멤버들과도 부쩍 가까워진 시간이었어요.",
    },
    {
      id: 3,
      date: "2026.05.04",
      title: "둘째 날 - 정상에서의 단체 사진",
      image: "https://picsum.photos/seed/summit/800/500",
      content:
        "이튿날 이른 아침 정상까지 올라 단체 사진을 남겼습니다. 힘들었지만 정상에서 본 풍경이 모든 피로를 씻어줬어요. 다음 산행이 벌써 기다려집니다.",
    },
  ],
};

export default function TimelineDetailPage() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const tl = TIMELINE_DETAIL;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <button
        type="button"
        onClick={() => navigate(`/club/${clubId}/timeline`)}
        className="text-sm text-gray-400 transition-colors hover:text-gray-600"
      >
        ← 타임라인 목록
      </button>

      <div className="mt-4 overflow-hidden rounded-2xl">
        <div className="relative aspect-12/5 bg-gray-100">
          <img src={tl.cover} alt={tl.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-sm text-white/80">{tl.period}</p>
            <h1 className="mt-1 text-2xl font-bold">{tl.title}</h1>
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-gray-600">{tl.description}</p>

      <div className="mt-8 flex flex-col gap-8">
        {tl.sections.map((section, i) => (
          <section key={section.id} className="relative pl-6">
            <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-modam-coral" />
            {i < tl.sections.length - 1 && (
              <span className="absolute left-1.5 top-4 h-full w-px -translate-x-1/2 bg-gray-200" />
            )}

            <p className="text-xs font-medium text-modam-coral">{section.date}</p>
            <h2 className="mt-1 font-bold text-gray-900">{section.title}</h2>

            <div className="mt-3 overflow-hidden rounded-xl bg-gray-100">
              <img src={section.image} alt={section.title} className="w-full object-cover" />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-gray-600">{section.content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
