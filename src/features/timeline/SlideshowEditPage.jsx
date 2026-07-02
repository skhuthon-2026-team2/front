import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTimelineStore } from "../../stores/timelineStore";

function slideLabel(slide, sort) {
  if (sort === "date") return slide.date;
  if (sort === "time") return slide.time;
  return `${slide.date} ${slide.time}`;
}

export default function SlideshowEditPage() {
  const navigate = useNavigate();
  const { clubId } = useParams();
  const location = useLocation();
  const addTimeline = useTimelineStore((state) => state.addTimeline);

  const sort = location.state?.sort ?? "datetime";

  // STEP1에서 넘어온 선택 게시글 → 사진 하나당 슬라이드 하나로 펼침 (날짜+시간 순)
  const initialSlides = useMemo(() => {
    const posts = location.state?.posts ?? [];
    const sorted = [...posts].sort((a, b) =>
      (a.date + a.time).localeCompare(b.date + b.time)
    );
    return sorted.flatMap((post) => {
      const images = post.images?.length ? post.images : [post.thumbnail].filter(Boolean);
      return images.map((src, i) => ({
        id: `${post.id}-${i}`,
        image: src,
        date: post.date,
        time: post.time,
        duration: 3,
      }));
    });
  }, [location.state]);

  const [title, setTitle] = useState("");
  const [slides, setSlides] = useState(initialSlides);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing || slides.length === 0) return;
    const ms = (slides[current]?.duration ?? 3) * 1000;
    const timer = setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, ms);
    return () => clearTimeout(timer);
  }, [current, playing, slides]);

  const go = (i) => setCurrent((i + slides.length) % slides.length);

  const move = (index, dir) => {
    const next = [...slides];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setSlides(next);
  };

  const remove = (id) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
    setCurrent(0);
  };

  const setDuration = (id, duration) =>
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, duration } : s)));

  const handleComplete = () => {
    const id = Date.now();
    addTimeline({
      id,
      title,
      sort,
      slides,
      cover: slides[0]?.image,
      createdAt: new Date().toLocaleDateString("ko-KR").replaceAll(" ", "").replace(/\.$/, ""),
    });
    navigate(`/club/${clubId}/timeline/${id}`);
  };

  const currentSlide = slides[current];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <p className="text-sm font-bold text-modam-coral">STEP 02. 슬라이드쇼 편집</p>
      <h1 className="mt-1 text-2xl font-bold text-gray-900">타임라인 슬라이드쇼</h1>

      <div className="mt-6">
        <label className="text-sm font-medium text-gray-500">타임라인 제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예) 봄 정기 산행 기록"
          className="mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
        />
      </div>

      {/* 미리보기 */}
      <div className="mt-6 overflow-hidden rounded-2xl bg-black">
        <div className="relative" style={{ aspectRatio: "16 / 9" }}>
          {currentSlide ? (
            <img src={currentSlide.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/50">
              선택된 사진이 없어요.
            </div>
          )}

          {currentSlide && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            {slideLabel(currentSlide, sort)}
            </span>
        </div>
        )}

          {slides.length > 1 && (
            <>
              <button type="button" onClick={() => go(current - 1)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">‹</button>
              <button type="button" onClick={() => go(current + 1)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">›</button>
            </>
          )}

          {/* 진행 바 */}
          <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-3">
            {slides.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)}
                className={`h-1 flex-1 rounded-full transition-colors ${i === current ? "bg-modam-coral" : "bg-white/40"}`} />
            ))}
          </div>
        </div>

        {slides.length > 0 && (
          <div className="flex items-center justify-center gap-4 bg-black/90 py-2 text-white">
            <button type="button" onClick={() => setPlaying((p) => !p)} className="text-sm">
              {playing ? "❚❚ 일시정지" : "▶ 재생"}
            </button>
            <span className="text-xs text-white/50">{current + 1} / {slides.length}</span>
          </div>
        )}
      </div>

      {/* 트랙 */}
      <p className="mt-6 text-sm font-medium text-gray-500">타임라인 트랙 구성 ({slides.length}장)</p>

      {slides.length === 0 ? (
        <div className="mt-3 rounded-2xl border border-gray-100 bg-white py-12 text-center text-sm text-gray-400">
          선택된 사진이 없어요. 이전 단계에서 게시글을 골라주세요.
        </div>
      ) : (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {slides.map((slide, i) => (
            <div key={slide.id}
              className={`relative w-40 shrink-0 overflow-hidden rounded-xl border ${i === current ? "border-modam-coral" : "border-gray-100"}`}>
              <button type="button" onClick={() => go(i)} className="block aspect-video w-full bg-gray-100">
                <img src={slide.image} alt="" className="h-full w-full object-cover" />
              </button>

              <button type="button" onClick={() => remove(slide.id)}
                className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">✕</button>

              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex gap-1">
                  <button type="button" onClick={() => move(i, -1)} disabled={i === 0}
                    className="rounded px-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30">‹</button>
                  <button type="button" onClick={() => move(i, 1)} disabled={i === slides.length - 1}
                    className="rounded px-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-30">›</button>
                </div>
                <select
                  value={slide.duration}
                  onChange={(e) => setDuration(slide.id, Number(e.target.value))}
                  className="rounded bg-gray-100 px-1.5 py-1 text-xs outline-none"
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>{s}s</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <button type="button" onClick={() => navigate(-1)}
          className="flex-1 rounded-xl border border-gray-200 py-3.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50">
          이전
        </button>
        <button type="button" onClick={handleComplete} disabled={!title.trim() || slides.length === 0}
          className="flex-1 rounded-xl bg-modam-coral py-3.5 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50">
          타임라인 완성
        </button>
      </div>
    </div>
  );
}
