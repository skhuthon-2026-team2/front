export default function AiLoading() {
    return (
        <div className="mx-auto flex min-h-[520px] w-full max-w-6xl flex-col items-center justify-center px-6 py-8">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-100 border-t-modam-coral" />

            <h2 className="mt-6 text-xl font-bold text-gray-900">
                AI가 활동을 분석하고 있어요
            </h2>

            <p className="mt-3 text-center text-sm leading-6 text-gray-500">
                최근 피드와 활동 기록을 바탕으로
                <br />
                다음 활동 추천을 준비하고 있습니다.
            </p>
        </div>
    );
}