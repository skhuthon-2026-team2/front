import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFeedStore } from "../../stores/feedStore";
import DateRangePicker from "./components/DateRangePicker";
import WriteSidebar from "./components/WriteSidebar";

const MAX_IMAGES = 10;
const AUTHOR = { name: "김서연", avatar: "https://i.pravatar.cc/80?img=47" };

export default function WriteFeedPage() {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const addFeed = useFeedStore((state) => state.addFeed);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");

  const handleAddImages = (e) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, MAX_IMAGES));
  };

  const handleUpload = () => {
    const createdAt = date?.start ?? "";
    addFeed({
      author: AUTHOR,
      title,
      content,
      images,
      createdAt,
      dateRange: date,
    });
    navigate(`/club/${clubId}/feed`);
  };

  const emptySlots = Math.max(0, 4 - images.length - 1);

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6 px-6 py-8">
      <main className="min-w-0 flex-1 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">새 활동 기록하기</h1>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg px-4 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleUpload}
              disabled={!title.trim()}
              className="rounded-lg bg-modam-coral px-5 py-2 text-sm font-bold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              업로드
            </button>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-gray-500">활동 제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="활동을 한 줄로 요약해주세요"
              className="mt-2 w-full rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
            />
          </div>
          <div className="w-64">
            <label className="text-sm font-medium text-gray-500">활동 날짜</label>
            <div className="mt-2">
              <DateRangePicker value={date} onChange={setDate} />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-500">
            사진 첨부 <span className="text-gray-400">(최대 {MAX_IMAGES}장)</span>
          </label>
          <div className="mt-2 grid grid-cols-4 gap-3">
            <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 transition-colors hover:border-modam-coral/60">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.5-3.5L9 20" />
              </svg>
              <span className="mt-1 text-xs">사진 추가</span>
              <input type="file" accept="image/*" multiple onChange={handleAddImages} className="hidden" />
            </label>

            {images.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img src={src} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/50 text-xs text-white"
                >
                  ✕
                </button>
              </div>
            ))}

            {Array.from({ length: emptySlots }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square rounded-xl bg-gray-50" />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-500">활동 내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="오늘의 활동은 어땠나요? 즐거웠던 순간들을 자유롭게 남겨주세요."
            className="mt-2 w-full resize-none rounded-xl bg-gray-100 px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-modam-coral/40"
          />
        </div>
      </main>

      <WriteSidebar />
    </div>
  );
}
