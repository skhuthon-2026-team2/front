export default function WriteSidebar() {
  return (
    <aside className="flex w-full max-w-[280px] shrink-0 flex-col gap-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-modam-lime/20 text-xs">✦</span>
          <h3 className="font-bold text-gray-900">AI 글쓰기 도우미</h3>
        </div>
        <p className="mt-3 rounded-xl bg-gray-50 p-3 text-xs leading-relaxed text-gray-500">
          "오늘 출사 활동의 소감을 적기 어렵다면, 사용한 렌즈나 촬영 당시의 날씨를 먼저 적어보세요!"
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-xl border border-modam-lime/60 py-2.5 text-sm font-medium text-modam-lime transition-colors hover:bg-modam-lime/5"
        >
          AI가 초안 작성해주기
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-base">💡</span>
          <h3 className="font-bold text-gray-900">기록 가이드</h3>
        </div>
        <ol className="mt-3 flex flex-col gap-2.5 text-xs leading-relaxed text-gray-500">
          <li className="flex gap-2">
            <span className="font-bold text-modam-coral">01</span>
            활동의 핵심이 되는 사진을 첫 번째로 올려주세요.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-modam-coral">02</span>
            함께한 멤버를 태그하면 타임라인에 함께 기록됩니다.
          </li>
          <li className="flex gap-2">
            <span className="font-bold text-modam-coral">03</span>
            첫 번째 사진은 피드 대표 이미지로 사용됩니다.
          </li>
        </ol>
      </div>
    </aside>
  );
}
