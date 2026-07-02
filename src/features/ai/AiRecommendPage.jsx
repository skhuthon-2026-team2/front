import { useState } from "react";
import { AI_RECOMMENDATION_RESULTS } from "./mockAiRecommendation";
import AiLoading from "./components/AiLoading";

export default function AiRecommendPage() {
    const [isResult, setIsResult] = useState(false);
    const [resultIndex, setResultIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const currentResult = AI_RECOMMENDATION_RESULTS[resultIndex];

    const handleStartRecommend = () => {
        setLoading(true);

        setTimeout(() => {
            setResultIndex(0);
            setIsResult(true);
            setLoading(false);
        }, 1500);
    };

    const handleRetryRecommend = () => {
        setLoading(true);

        setTimeout(() => {
            setResultIndex((prev) =>
                prev === AI_RECOMMENDATION_RESULTS.length - 1 ? 0 : prev + 1
            );

            setLoading(false);
        }, 1500);
    };

    if (isResult) {
        return (
            <div className="mx-auto w-full max-w-6xl px-6 py-8">
                <button
                    type="button"
                    onClick={() => setIsResult(false)}
                    className="text-sm text-gray-400 transition hover:text-gray-700"
                >
                    ← 돌아가기
                </button>

                <h1 className="mt-5 text-2xl font-bold text-gray-900">
                    AI 추천 결과
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                    AI가 우리 동아리 활동을 분석하여 추천한 결과입니다.
                </p>

                <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900">AI 활동 분석</h2>

                    <div className="mt-5 grid grid-cols-3 gap-4">
                        {currentResult.analysis.map((item) => (
                            <div
                                key={item.id}
                                className="rounded-2xl border border-gray-100 bg-white p-4 text-center"
                            >
                                <p className="text-xs text-gray-500">{item.label}</p>

                                <h3 className="mt-1 text-base font-bold text-gray-900">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-xs leading-5 text-gray-500">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900">다음 활동 추천</h2>

                    <div className="mt-5 grid grid-cols-3 gap-5">
                        {currentResult.recommendations.map((item, index) => (
                            <article
                                key={item.id}
                                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="relative">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-40 w-full object-cover"
                                    />

                                    <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-modam-coral">
                                        추천 {index + 1}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        {item.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        {item.description}
                                    </p>

                                    <div className="mt-4 space-y-2 text-sm">
                                        <p>
                                            <span className="font-semibold text-modam-coral">
                                                추천 장소
                                            </span>
                                            <span className="ml-2 text-gray-600">{item.place}</span>
                                        </p>

                                        <p>
                                            <span className="font-semibold text-modam-coral">
                                                활동 포인트
                                            </span>
                                            <span className="ml-2 text-gray-600">{item.point}</span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleRetryRecommend}
                        className="mt-8 w-full rounded-xl border border-modam-coral py-3.5 text-sm font-bold text-modam-coral transition hover:bg-modam-coral/5"
                    >
                        다시 분석하기
                    </button>
                </section>
            </div>
        );
    }
    if (loading) {
        return <AiLoading />;
    }

    return (
        <div className="mx-auto w-full max-w-6xl px-6 py-8">
            <h1 className="text-2xl font-bold text-gray-900">AI 추천</h1>

            <p className="mt-1.5 text-sm text-gray-500">
                최근 활동 사진과 기록을 분석하여 다음 활동을 추천해드려요.
            </p>

            <div className="mt-10 border-t border-gray-100 pt-12 text-center">
                <h2 className="text-xl font-bold text-gray-900">
                    다음 활동을 추천받아보세요!
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                    AI가 우리 동아리의 활동을 분석하여
                    <br />
                    다음 활동을 추천해드릴게요.
                </p>

                <button
                    type="button"
                    onClick={handleStartRecommend}
                    className="mt-8 rounded-xl bg-modam-coral px-10 py-3.5 text-sm font-bold text-white transition hover:brightness-95"
                >
                    ✨ 다음 활동 추천받기
                </button>
            </div>

            <div className="mt-16 rounded-2xl border border-gray-100 bg-gray-50 px-6 py-5 text-center">
                <p className="text-sm leading-6 text-gray-500">
                    AI는 최근 피드와 활동 사진을 분석하여
                    <br />
                    우리 동아리의 성향에 맞는 활동을 추천합니다.
                </p>
            </div>
        </div>
    );
}