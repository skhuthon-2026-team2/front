import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTimelineStore } from "../../stores/timelineStore";

function slideLabel(slide, sort) {
  if (sort === "date") return slide.date;
  if (sort === "time") return slide.time;
  return `${slide.date} ${slide.time}`;
}

export default function TimelineViewerPage() {
  const navigate = useNavigate();
  const { clubId, timelineId } = useParams();
  const timelines = useTimelineStore((state) => state.timelines);

  const timeline = timelines.find((t) => String(t.id) === String(timelineId));
  const slides = timeline?.slides ?? [];

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

  if (!timeline) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-20 text-center">
        <p className="text-sm text-gray-400">타임라인을 찾을 수 없어요.</p>
        <button type="button" onClick={() => navigate(`/club/${clubId}/timeline`)}
          className="mt-4 text-sm font-medium text-modam-coral">목록으로</button>
      </div>
    );
  }

  const go = (i) => setCurrent((i + slides.length) % slides.length);
  const currentSlide = slides[current];

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <button type="button" onClick={() => navigate(`/club/${clubId}/timeline`)}
        className="text-sm text-gray-400 transition-colors hover:text-gray-600">← 타임라인 목록</button>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">{timeline.title}</h1>

      <div className="mt-4 overflow-hidden rounded-2xl bg-black">
        <div className="relative aspect-[16/9]">
          <img
            key={currentSlide?.id}
            src={currentSlide?.image}
            alt=""
            className="h-full w-full animate-rise object-cover"
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {slideLabel(currentSlide, timeline.sort)}
            </span>
          </div>

          {slides.length > 1 && (
            <>
              <button type="button" onClick={() => go(current - 1)}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">‹</button>
              <button type="button" onClick={() => go(current + 1)}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60">›</button>
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 flex gap-1.5 p-3">
            {slides.map((s, i) => (
              <button key={s.id} type="button" onClick={() => go(i)}
                className={`h-1 flex-1 rounded-full transition-colors ${i === current ? "bg-modam-coral" : "bg-white/40"}`} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 bg-black/90 py-2 text-white">
          <button type="button" onClick={() => setPlaying((p) => !p)} className="text-sm">
            {playing ? "❚❚ 일시정지" : "▶ 재생"}
          </button>
          <span className="text-xs text-white/50">{current + 1} / {slides.length}</span>
        </div>
      </div>
    </div>
  );
}
