import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostSelectItem from "./components/PostSelectItem";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const fmt = (y, m, d) => `${y}.${String(m).padStart(2, "0")}.${String(d).padStart(2, "0")}`;

// 확인용 임시 피드. 실제로는 선택한 날짜로 조회한 게시글이 들어온다.
const POSTS = [
  { id: 1, title: "봄 정기 산행 출발", date: "2026.05.03", time: "09:12", thumbnail: "https://picsum.photos/seed/t1/200" },
  { id: 2, title: "둘레길 중턱에서", date: "2026.05.03", time: "13:40", thumbnail: "https://picsum.photos/seed/t2/200" },
  { id: 3, title: "저녁 캠프파이어", date: "2026.05.03", time: "19:05", thumbnail: "https://picsum.photos/seed/t3/200" },
  { id: 4, title: "정상에서 단체사진", date: "2026.05.04", time: "08:30", thumbnail: "https://picsum.photos/seed/t4/200" },
  { id: 5, title: "하산 후 뒤풀이", date: "2026.05.04", time: "15:20", thumbnail: "https://picsum.photos/seed/t5/200" },
];

const SORT_OPTIONS = [
  { key: "date", label: "날짜별" },
  { key: "time", label: "시간별" },
  { key: "datetime", label: "날짜+시간별" },
];

export default function CreateTimelinePage() {
  const navigate = useNavigate();
  const { clubId } = useParams();

  const [range, setRange] = useState(null);
  const [sort, setSort] = useState("datetime");
  const [checked, setChecked] = useState([]);

  const view = { year: 2026, month: 5 };
  const firstDay = new Date(view.year, view.month - 1, 1).getDay();
  const lastDate = new Date(view.year, view.month, 0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({ length: lastDate }, (_, i) => i + 1)];
  const postedDays = new Set(POSTS.map((p) => p.date));

  const handleDay = (day) => {
    const dateStr = fmt(view.year, view.month, day);
    if (!range?.start || range.end) setRange({ start: dateStr, end: null });
    else {
      const [start, end] = [range.start, dateStr].sort();
      setRange({ start, end });
    }
  };

  const inRange = (d) => {
    if (!range?.start) return false;
    const end = range.end ?? range.start;
    return d >= range.start && d <= end;
  };
  const isEdge = (d) => d === range?.start || d === range?.end;

  const visiblePosts = useMemo(() => {
    if (!range?.start) return [];
    const end = range.end ?? range.start;
    const filtered = POSTS.filter((p) => p.date >= range.start && p.date <= end);
    const sorters = {
      date: (a, b) => a.date.localeCompare(b.date),
      time: (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      datetime: (a, b) => (a.date + a.time).localeCompare(b.date + b.time),
    };
    return [...filtered].sort(sorters[sort]);
  }, [range, sort]);

  const toggle = (id) =>
    setChecked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleNext = () => {
    const selectedPosts = POSTS.filter((p) => checked.includes(p.id));
    navigate(`/club/${clubId}/timeline/create/slideshow`, {
      state: { posts: selectedPosts, sort },
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <p className="text-sm font-bold text-modam-coral">STEP 01. 게시글 선택</p>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">새 타임라인 만들기</h1>

      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-gray-900">대상 날짜 선택</h2>
        <div className="mt-4 grid grid-cols-7 gap-y-1.5 text-center text-xs">
          {WEEKDAYS.map((d) => (
            <span key={d} className="text-gray-400">{d}</span>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const dateStr = fmt(view.year, view.month, day);
            const posted = postedDays.has(dateStr);
            const selected = inRange(dateStr);
            return (
              <div key={i} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleDay(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    selected
                      ? isEdge(dateStr)
                        ? "bg-modam-coral font-bold text-white"
                        : "bg-modam-coral/20 text-modam-coral"
                      : posted
                      ? "font-bold text-modam-coral hover:bg-modam-coral/10"
                      : "text-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {range?.start && (
        <>
          <div className="mt-6 flex items-center gap-2">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSort(opt.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  sort === opt.key
                    ? "border-modam-coral bg-modam-coral/10 text-modam-coral"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">게시글 선택</h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="rounded-full bg-modam-coral/10 px-2.5 py-1 text-xs font-medium text-modam-coral">
                {SORT_OPTIONS.find((o) => o.key === sort)?.label}
              </span>
              <span className="text-gray-400">{checked.length}개 선택됨</span>
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post) => (
                <PostSelectItem key={post.id} post={post} checked={checked.includes(post.id)} onToggle={toggle} />
              ))
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white py-12 text-center text-sm text-gray-400">
                선택한 날짜에 게시글이 없어요.
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={checked.length === 0}
            className="mt-6 w-full rounded-xl bg-modam-coral py-3.5 text-[15px] font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            다음 ({checked.length}개)
          </button>
        </>
      )}
    </div>
  );
}
